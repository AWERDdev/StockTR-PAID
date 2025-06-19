## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Stock-TR-Remake.git
cd Stock-TR-Remake/NEWVERSION
```

---

### 2. Backend Setup (API)

1. **Install dependencies:**
   ```bash
   cd API
   npm install
   ```

2. **Environment Variables:**
   - Create a `.env` file in the `API` folder with your MongoDB URI and any secrets:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

3. **Run the backend server:**
   ```bash
   npm run Devstart
   ```
   - The server will start on [http://localhost:3500](http://localhost:3500) by default.

---

### 3. Frontend Setup (Client)

1. **Install dependencies:**
   ```bash
   cd ../client
   npm install
   ```

2. **Run the frontend dev server:**
   ```bash
   npm run dev
   ```
   - The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Other:** REST API, CORS, Multer (for file uploads)

---

## 📦 Available Scripts

### Backend (API)
- `npm run start` – Start server (production)
- `npm run Devstart` – Start server with nodemon (development)

### Frontend (Client)
- `npm run dev` – Start Next.js dev server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code

---

## 📋 API Endpoints

- `POST /api/signup` – Register a new user
- `POST /api/login` – User login
- `GET /api/stocks` – Get stock data
- `POST /api/watchlist` – Manage user watchlist
- `POST /api/update-password` – Update user password
- `POST /api/profile-icon` – Update profile icon

*(See code for more details and additional endpoints.)*

---

## 🙌 Credits

Created by a solo, self-taught developer (age 15).  
If you like this project, consider starring the repo or sharing your feedback!

---

## 💡 Future Ideas

- Add more stock analytics and charts
- Social features (share watchlists, comments)
- Deploy to Vercel/Heroku for live demo

---

## 🏁 License

MIT
