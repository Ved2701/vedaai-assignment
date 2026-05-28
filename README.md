# VedaAI – AI Assessment Creator

An AI-powered Assessment Creation platform built using **Next.js, Node.js, MongoDB, Redis, BullMQ, and WebSockets**.

The platform allows teachers to generate structured AI-based question papers with real-time processing, background job queues, PDF export, and live updates.

---

# Live Demo

## Frontend

https://vedaai-assignment-ebon.vercel.app/

## Backend

https://vedaai-assignment-production-f2a0.up.railway.app/

---

# Features

## Assignment Creation

* Create AI-powered assessments
* Configure:

  * Due date
  * Question types
  * Marks distribution
  * Number of questions
  * Additional instructions
* Input validation and error handling

---

## AI Question Generation

* Converts form input into structured prompts
* Generates:

  * Exam Sections (A, B, etc.)
  * Questions
  * Difficulty Levels
  * Marks Distribution
* Structured parsing instead of rendering raw LLM output

---

## Real-Time Architecture

* BullMQ queue-based background processing
* Redis-powered job management
* Socket.IO real-time updates
* Live frontend status synchronization

---

## Output Generation

* Structured exam-paper UI
* Student information section
* Difficulty badges
* Section-wise organization
* Clean responsive layout
* PDF export support

---

# Tech Stack

## Frontend

* Next.js
* TypeScript
* Zustand
* Tailwind CSS
* Socket.IO Client

---

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Redis
* BullMQ
* Socket.IO

---

## AI

* OpenAI API
* Prompt Engineering
* Structured Output Parsing

---

# System Architecture

```text
Frontend (Next.js)
        ↓
Express API Server
        ↓
BullMQ Queue (Redis)
        ↓
AI Worker Processing
        ↓
MongoDB Storage
        ↓
WebSocket Event Emission
        ↓
Frontend Real-Time Updates
```

---

# Project Workflow

1. User creates assignment
2. Backend validates request
3. BullMQ adds generation job
4. Worker processes AI generation
5. Structured assignment stored in MongoDB
6. WebSocket emits live updates
7. Frontend displays generated paper
8. User exports generated paper as PDF

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/Ved2701/vedaai-assignment.git
```

---

# Install Dependencies

## Frontend

```bash
cd client
npm install
```

## Backend

```bash
cd server
npm install
```

---

# Run Redis

```bash
docker run -d -p 6379:6379 redis
```

---

# Start Frontend

```bash
cd client
npm run dev
```

---

# Start Backend

```bash
cd server
npm run dev
```

---

# Environment Variables

## Frontend (`client/.env.local`)

```env
NEXT_PUBLIC_API_URL=your_backend_url
```

---

## Backend (`server/.env`)

```env
MONGO_URI=your_mongodb_uri

OPENAI_API_KEY=your_openai_api_key

REDIS_HOST=localhost
REDIS_PORT=6379

PORT=5000
```

---

# Folder Structure

```text
client/
 ├── src/
 ├── app/
 ├── components/
 ├── store/
 └── lib/

server/
 ├── src/
 ├── controllers/
 ├── routes/
 ├── queues/
 ├── workers/
 ├── services/
 ├── sockets/
 └── models/
```

---

# Bonus Features Implemented

* PDF Export
* Real-time WebSocket updates
* Queue-based AI processing
* Responsive UI
* Structured AI parsing
* Redis caching/job management

---

# Challenges Solved

* Real-time frontend synchronization using Socket.IO
* Queue-based background AI processing with BullMQ
* Production deployment with Railway + Vercel
* Structured AI output parsing
* Redis integration and worker handling

---

# Future Improvements

* Authentication & teacher accounts
* Assignment editing
* Multi-format exports
* AI-generated answer keys
* Advanced analytics dashboard

---

# Author

Ved Sinha

GitHub:
https://github.com/Ved2701

