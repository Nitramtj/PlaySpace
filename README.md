PlaySpace is a project for hosting a multiplayer, live updateable environment from your browser.

## How to Run
> npm install

> npm start

## How it Works
The start script runs an express server with PeerJS and WebPack middleware. These provide signaling for WebRTC and the hot loading of modules as they are updated. The server.html and client.html files are served at the root of the express server, and can be used to host or connect.
