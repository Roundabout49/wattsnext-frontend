# WattsNext – Deployment Guide (KIT SCC VM)

Last updated: July 2026.

## 0. Overview

|                     |                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| Server              | `energy-game.enzo.kit.edu` (KIT SCC vSphere VM, Debian 13)                                        |
| SSH user            | `selgrad`                                                                                         |
| SSH access          | KIT network/VPN only, passwordless via key `~/.ssh/id_ed25519_wattsnext` + `~/.ssh/config` entry  |
| Backend             | `/home/selgrad/wattsnext/app.jar`, systemd unit `wattsnext-backend`                               |
| Frontend            | `/var/www/wattsnext`, nginx site `wattsnext`                                                      |
| Public URL          | https://energy-game.enzo.kit.edu (HTTPS, Let's Encrypt certificate)                               |
| Server/root contact | KIT SCC vSphere admin (ask the project coordinator for current contact details)                   |
| Coordination        | Project coordinator at the WIN institute (ask an existing maintainer for current contact details) |

**Note:** SSH access requires the KIT network or VPN. Ports 80/443 are publicly reachable; SSH (port 22) is not.

---

## 1. Prerequisites

Each maintainer needs their own SSH access — access is per-key, not shared.

**One-time setup (if you don't have server access yet):**

- [ ] Generate an SSH keypair if you don't already have one you want to use for this (e.g. `ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_wattsnext`)
- [ ] Get the `selgrad` account password from the coordinator (see overview table)
- [ ] Add your public key to the server's `authorized_keys` yourself:
  ```bash
  ssh-copy-id -i ~/.ssh/id_ed25519_wattsnext.pub selgrad@energy-game.enzo.kit.edu
  ```
  (prompts for the password once, no admin involvement needed)
- [ ] Add an entry to your local `~/.ssh/config`:
  ```
  Host energy-game.enzo.kit.edu
      User selgrad
      IdentityFile ~/.ssh/id_ed25519_wattsnext
  ```

**Before every deployment session:**

- [ ] Connected to the KIT network or VPN
- [ ] `ssh energy-game.enzo.kit.edu` succeeds without a password prompt
- [ ] `sudo` commands on the server still require the account **password** (ask the coordinator for it — see overview table)

---

## 2. Backend deployment

1. **Build locally** (Windows/PowerShell):
   ```powershell
   $env:JAVA_HOME='C:\Program Files\Java\jdk-21'
   .\gradlew.bat :app:build -x test
   ```
2. **Stop the backend on the server** (must happen _before_ uploading — otherwise the old JVM's graceful shutdown can throw `NoClassDefFoundError` against the already-replaced jar, which may abort persistence of in-memory games):
   ```bash
   ssh energy-game.enzo.kit.edu
   sudo systemctl stop wattsnext-backend
   ```
3. **Upload the new jar** (from the local machine):
   ```powershell
   scp app/build/libs/app-0.0.1-SNAPSHOT.jar energy-game.enzo.kit.edu:~/wattsnext/app.jar
   ```
4. **Start the backend:**
   ```bash
   sudo systemctl start wattsnext-backend
   ```
5. **Verify:**
   ```bash
   sudo systemctl status wattsnext-backend
   ```

**Rule of thumb:** the order is **stop → upload → start**, never `restart` while the jar is already overwritten.

---

## 3. Frontend deployment

> **For a one-command deploy, run `scripts/deploy.sh`** (from the repo root, inside the KIT VPN). It performs the steps below and verifies the deployed bundle matches the local build. The manual steps are kept here as reference and for troubleshooting.

> **Before every upload, clear the remote staging directory (step 2 below).** If `~/wattsnext/frontend` already exists on the server, `scp -r` nests the `dist` folder _inside_ it instead of replacing its contents, and the subsequent copy step silently deploys nothing new. This has caused a stale-frontend incident before (2026-07-29) — the symptom was a frontend/backend state mismatch (backend expecting a client action the UI didn't support yet).

1. **Build locally:**

   ```bash
   npm run build
   ```

   Expect roughly 1–5 minutes depending on machine and project size.

2. **Clear the remote staging directory:**

   ```bash
   ssh energy-game.enzo.kit.edu "rm -rf ~/wattsnext/frontend"
   ```

3. **Copy the `dist` folder to the server:**

   ```bash
   scp -r dist energy-game.enzo.kit.edu:~/wattsnext/frontend
   ```

4. **Copy into the public web root** (requires sudo):

   ```bash
   ssh energy-game.enzo.kit.edu
   sudo cp -r ~/wattsnext/frontend/* /var/www/wattsnext/
   ```

5. **Verify the deployed build matches the local build** by comparing asset hashes:

   ```powershell
   # local (PowerShell)
   Select-String -Path dist\index.html -Pattern assets
   ```

   ```bash
   # server
   cat /var/www/wattsnext/index.html | grep assets
   ```

   Filenames (e.g. `index-7nUEh35n.js`) must match. If they don't, repeat steps 2–4.

6. **Hard-reload the browser** (`Ctrl+Shift+R`) to bypass the cache.

No nginx restart is required — only static files are replaced.
