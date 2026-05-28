# VedaAI – AI Assessment Creator

AI-powered assessment creator built with Next.js, Node.js, MongoDB, Redis, BullMQ, and WebSockets.

## Features

* AI-generated structured question papers
* Real-time updates using WebSockets
* Assignment management
* PDF export support
* Redis + BullMQ background job processing
* MongoDB storage
* Responsive UI inspired by provided Figma

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Zustand
* Socket.IO Client (WebSockets)

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Redis
* BullMQ
* Socket.IO (WebSockets)

### AI

* OpenAI API
* Prompt Structuring & Parsing

---

## Architecture Flow

1. User creates assignment
2. Backend adds job to BullMQ queue
3. Worker processes AI generation
4. MongoDB stores assignment
5. WebSocket notifies frontend
6. Frontend displays generated paper

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/Ved2701/vedaai-assignment.git
```

---

## Install Dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

---

## Run Redis

```bash
docker run -d -p 6379:6379 redis
```

---

## Start Frontend

```bash
cd client
npm run dev
```

---

## Start Backend

```bash
cd server
npm run dev
```

---

## Environment Variables

### Server `.env`

```env
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_api_key
PORT=5000
```

---

## Bonus Features

* PDF export
* Real-time socket updates
* Queue-based AI processing
* Clean exam-paper formatting
