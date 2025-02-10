# 🚀 Event Rocket - Frontend

## 📌 Project Overview

**Event Rocket** is a frontend application that allows users to view and attend events, while admins can create, update, and delete events. The project integrates **Socket.IO** for real-time attendance tracking.

---

## 🚀 Getting Started

### 🔧 Installation

1. Clone the repository

   ```sh
   git clone https://github.com/anuragsingh922/swissmote-frontend.git
   cd swissmote-frontend
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Start the development server
   ```sh
   npm run dev
   ```

---

## ✨ Features

### 🎭 User

- View all events
- Mark attendance (attending/not attending)

### 🔧 Admin

- Create new events
- Update existing events
- Delete events

---

## 🖥️ Pages

1. **Landing Page**

   - Displays options for:
     - Creating an event (admin)
     - Viewing all events

2. **Event Page**
   - Lists all available events

---

## 📡 API Endpoints

### 👥 User

- **GET** `/events` → Fetch all events

### 🛠️ Admin

- **POST** `/events` → Create a new event
- **PATCH** `/events` → Update an event
- **DELETE** `/events` → Delete an event

---

## 🔄 Real-Time Attendance with **Socket.IO**

- Users can mark whether they are attending an event or not in real-time using **Socket.IO**.

---

## 🛠️ Tech Stack

- **Frontend**: React.js(Vite)
- **State Management**: Redux
- **Real-Time**: Socket.IO
- **Styling**: Tailwind CSS
- **API Handling**: Axios

---

## 👨‍💻 Developer

- **Name**: Anurag
- **Phone**: +91 9896424841
- **Email**: [anuragjadu922@gmail.com](mailto:anuragjadu922@gmail.com)
- **Institution**: IIIT Sonepat
