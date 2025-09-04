# X3.Chat — AI-Powered Streaming Chat App

X3 Chat is a modern AI-powered chat application built with **Next.js 15 (App Router)**, **Prisma**, **NextAuth**, and **Google Gemini API**.
It supports **real-time streaming responses**, **user authentication**, and a **credit-based usage system**.


## 🚀 Features

* 🔑 **Authentication** (via NextAuth)
* 🗂️ **Multiple chat sessions** per user
* 💰 **Credits system** – each AI request deducts a credit
* 💾 **Persistent chat history** with Prisma & PostgreSQL
* ⚡ **Real-time streaming AI replies** (chunked with SSE)
* 🌙 **Dark mode support**
* 🎨 **Markdown + Syntax highlighting** for AI responses
* 📱 **Responsive UI** with TailwindCSS


## 🖼️ Screenshots

### Home Page
<img src="public/home.png" alt="Home" style="width:600px; border-radius:5px;" />

### Chat Page
<img src="public/chat.png" alt="Chat" style="width:600px; border-radius:5px;" />


---

## 🛠️ Tech Stack

* **Frontend**: Next.js 15 (App Router), TailwindCSS
* **Backend**: Next.js API routes
* **Database**: PostgreSQL + Prisma ORM
* **Auth**: NextAuth.js
* **AI**: Google Gemini (`@google/genai`)
* **Deployment**: Vercel

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/x3-chat.git
cd x3-chat
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/x3chat
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GEMINI_API=your-google-gemini-api-key
```

### 4️⃣ Setup Prisma

```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Run the development server

```bash
npm run dev
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 📡 API Overview

### **POST /api/ask-stream**

Streams AI responses chunk by chunk.

**Request Body:**

```json
{
  "chatId": "clxyz123",
  "message": "Explain quantum computing simply."
}
```

**Streamed Response (SSE):**

```json
{ "type": "chunk", "text": "Quantum computing is..." }
{ "type": "chunk", "text": " unlike classical..." }
{ "type": "done", "message": { ... }, "creditsLeft": 4 }
```

---
