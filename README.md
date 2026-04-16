# AI Prompt Library (MERN)

A full-stack application representing an AI Prompt tracker.
Built using React + Vite on the Frontend, Node.js + Express + MongoDB on the Backend. 

## Features
- **Prompt Viewing:** Load dynamic prompt cards directly.
- **View Count System:** Captures single reads and increments automatically within MongoDB.
- **Validation Blocks:** Strictly enforcing length limitations (Titles > 3, content > 20) via Node validation headers.

## Deployment Steps

This application provides dual-support for running. It can run seamlessly through Docker Orchestration, or Natively via active shells.

### 1. Docker Deployment (Recommended Standard)
Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on host. 
1. Map your shell to the target root folder `ai-prompt-library`.
2. Run the compose engine:
   ```bash
   docker-compose up --build
   ```
3. Docker will establish 3 microservice networks representing `Mongo`, `Backend (Node)`, `Frontend (React)`.
4. Access the UI at: `http://localhost:5173`

### 2. Local Node Environment (Without Docker)
Requires `Node.js` installed on your machine.
1. Map your shell to the backend path: `cd ai-prompt-library/backend`
2. Install its packages via `npm install` and run the server by typing:
   ```bash
   npm start
   ```
   > **Note:** The backend detects if MongoDB is completely missing on your host machine and seamlessly fires an "in-memory" MongoDB instance meaning no setup is required on your computer.
3. Open a second shell mapping to the frontend: `cd ai-prompt-library/frontend`
4. Run the frontend local server:
   ```bash
   npm run dev
   ```
5. Navigate to `http://localhost:5173`!
