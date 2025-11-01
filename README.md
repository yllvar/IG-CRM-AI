# 📊 Chatbot + Instagram Analytics Dashboard

A full-stack MERN project featuring:
- AI-Powered Content Idea Assistant (using OpenAI API)
- Instagram-style Analytics Dashboard (Charts, Export, MongoDB)

## 🔧 Tech Stack
- Frontend: HTML, CSS, JavaScript (Vanilla), Chart.js
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT
- AI: OpenAI API
- Export: `json2csv`
- Deployment: Vercel (Frontend), Render (Optional for backend)

## ✨ Features
### 🧠 Content Idea Assistant
- Enter a topic + niche → get AI-generated Reel ideas, caption, hook, hashtags
- Save ideas to MongoDB
- User Authentication (Signup/Login)

### 📊 Analytics Dashboard
- Simulated Instagram analytics data (Follower growth, Likes, Comments)
- Dynamic charts using Chart.js
- Export analytics report as CSV
- Best time to post display

## 📂 Folder Structure
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── data/
├── index.js
client/
├── index.html
├── analytics.html
├── scripts/
├── main.js
├── analytics.js

## 🚀 Getting Started

1. Clone the repo & install server deps:
```bash
   cd server
   npm install
```
 
2. Create .env file: 
    GEMINI_API_KEY=AIzaSyDTC5sdBEcAAOiUUkCBJe8sjd37Z7N7OCU
    GOOGLE_CLOUD_PROJECT=215730524438
    GOOGLE_CLOUD_LOCATION=global
    GOOGLE_GENAI_USE_VERTEXAI=false
    MONGO_URI=mongodb://localhost:27017/chatbotAnalytics
    JWT_SECRET=secretkey

3. Start server:
```bash
    nodemon index.js
```
4. Open index.html or analytics.html in browser to use frontend.

---
