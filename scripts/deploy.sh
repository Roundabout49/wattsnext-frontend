#!/usr/bin/env bash
#
# Deploy the WattsNext frontend to the KIT SCC VM.
# Run from the repository root, inside the KIT network/VPN (SSH is internal only).
# See DEPLOYMENT.md for the manual steps this automates.
#
# The remote staging dir is deleted before upload: scp -r into an existing
# directory nests dist/ inside it instead of replacing it, which silently
# deploys nothing new.
#
# The sudo copy into the web root runs over `ssh -t` and will prompt once for
# the selgrad password.

set -euo pipefail

HOST="energy-game.enzo.kit.edu"
REMOTE_STAGING="~/wattsnext/frontend"
WEB_ROOT="/var/www/wattsnext"

cd "$(dirname "$0")/.."

echo "==> Building frontend"
npm run build

echo "==> Clearing remote staging dir"
ssh "$HOST" "rm -rf $REMOTE_STAGING"

echo "==> Uploading dist"
scp -r dist "$HOST:$REMOTE_STAGING"

echo "==> Copying into web root (sudo)"
ssh -t "$HOST" "sudo cp -r $REMOTE_STAGING/* $WEB_ROOT/"

echo "==> Verifying deployed bundle matches local build"
local_bundle=$(grep -o 'index-[A-Za-z0-9_-]*\.js' dist/index.html | head -1)
remote_bundle=$(ssh "$HOST" "grep -o 'index-[A-Za-z0-9_-]*\.js' $WEB_ROOT/index.html | head -1")
echo "   local:  $local_bundle"
echo "   server: $remote_bundle"
if [[ "$local_bundle" != "$remote_bundle" ]]; then
  echo "!! Bundle mismatch — the server is not serving this build. Re-run the deploy." >&2
  exit 1
fi

echo "==> Done. Hard-reload the browser (Ctrl+Shift+R) to bypass the cache."
