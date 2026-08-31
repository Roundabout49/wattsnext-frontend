# Watts Next Frontend

This is the React frontend of the online multiplayer implementation of the board game Watts Next.
The backend can be found [here](https://github.com/niklaskerkhoff/wattsnextbackend).

See `DEPLOYMENT.md` for how the app is deployed to the production server.

## What is Watts Next?

Watts Next is a cooperative board game on the energy transition.
Visit the [website](https://www.enzo.kit.edu/wattsnext) for more information.

## Prerequisites

Node.js 20.19+ or 22.12+ (required by Vite 7).

## Structure

The source folder contains the following subfolders:

| Folder        | Content                                                                   |
| ------------- | ------------------------------------------------------------------------- |
| `api/`        | REST API to create, join and leave games                                  |
| `assets/`     | Progresscard images                                                       |
| `components/` | Visible, reusable UI components                                           |
| `context/`    | Global contexts providing state or services                               |
| `handlers/`   | One handler for every action handling state changes                       |
| `hooks/`      | Custom React hooks                                                        |
| `pages/`      | Composite components representing whole pages                             |
| `reducers/`   | One reducer for every action handling action dispatches                   |
| `services/`   | Services for sending messages to the backend                              |
| `types/`      | Definitions of types used in the project, compatible to the websocket API |
| `ui/`         | Config file for rendering different actions                               |
| `utils/`      | Unique ids for cards and card spaces                                      |
| `ws/`         | Files concerning the websocket connection                                 |

A few notable files live directly in `src/`: `base.ts` (backend URLs), `gameConfig.ts` (the `GameVariant` flag for the dormant advanced mode), `themes.ts` (the MUI theme) and `animationTimings.ts` (durations for card/die/event animations).

## Communication

The backend provides two APIs:

- A REST API for creating a new game, joining an existing game, leaving a game, cancelling a game or requesting the current game state
- A websocket API to perform actions in the game and get updates about the game state.

As this is a real-time multiplayer game, the websocket API is necessary to inform other players about the actions of the active player.

## State Management

The session info (game id and player id) is saved in the local storage of the browser to enable reconnection after a reload or reopening the browser.
It can be accessed via the `SessionContext`.

The current game state is stored in the `GameContext`.
It mirrors the state of the game in the backend.

Additionally, the frontend has to store the state of the current action.
Each action consists of multiple steps.
The current action and action step are managed by the `ActionContext`.
When a game action (not a complete action, but a part of an action) is dispatched, the `ActionContext` delegates it to the correct reducer based on the current action.
The `reducers` then change the action state which is visible in UI components using the action state, for example the `ActionBar`.
The `ActionHandlers` also listen to the action type and state and initiate backend calls and animation when necessary.
These messages are sent via the `WebSocketProvider`.
Answers are handled by the functions in the `MessageHandler`, which update the `ActionContext`, closing the circle.

## Usage

Locally, the frontend can be started with the command `npm run dev` in the root folder and is then available under [http://localhost:5173](http://localhost:5173).
It is also necessary to run the backend for the frontend to work.
To test the multiplayer modus locally, use an incognito window or a second browser.

`.env.development` points the app at a backend on `localhost:8080` during local development. A production build has no env values set, so it falls back to its own origin and expects a reverse proxy to forward `/api` and `/ws` to the backend (see `DEPLOYMENT.md`).

## Open Issues

- Recycling, stacking and other advanced-mode mechanics exist in the backend and have a matching `GameVariant` flag in `gameConfig.ts`, but are dormant and not wired up to any UI. Add a mode switch once an advanced/expert mode is offered to players.
- When a modifier fully clears a card's system-point conditions (for example the event card "Windiges Wetter"), `CardPoints.tsx` hides the conditions entirely instead of showing what would still be required without the event. Show the base conditions in that case too.
- Add a game history logging every action.
