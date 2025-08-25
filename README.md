# ⚡ EEE Project Platform (MERN)

This is a MERN stack project platform for EEE/ECE students where they can post, explore, and learn about IoT, MATLAB, and circuit projects.

## 🚀 Features

- User Authentication (JWT + bcrypt)
- Post & Manage Topics (with Image Upload)
- Secure Admin Routes
- MongoDB Atlas Integration
- React Frontend with DaisyUI Styling

## 🛠 Tech Stack

- **Frontend**: React, DaisyUI, Axios
- **Backend**: Node.js, Express.js, Multer
- **Database**: MongoDB Atlas
- **Deployment**: Render (Backend), Vercel/Netlify (Frontend)

## ⚡ Installation

### 1. Clone repo

```bash
git clone https://github.com/sparsh313/EEE.git
cd EEE
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file:

ini
Copy
Edit
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret
Start server:
bash
Copy
Edit
npm start
3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
4. Deployment
Backend → Render

Frontend → Vercel

Update API base URL in frontend/src/services/axios.js

📸 Screenshots
<img src="https://res.cloudinary.com/ddv5lbkgh/image/upload/v1756103484/project_images/w3ozlcfsmskif7r5s2ek.png">

👨‍💻 Author
Sparsh Singh

