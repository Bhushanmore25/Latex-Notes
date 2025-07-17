# Latex Notes App

A full-stack Notes App supporting LaTeX equations, built with a modern React frontend and a Node.js/Express backend. This application allows users to securely create, edit, and manage notes with mathematical notation, featuring authentication and a clean, user-friendly interface.

## Features

- **User Authentication:** Secure login and registration system.
- **Create, Edit, and Delete Notes:** Full CRUD functionality for personal notes.
- **LaTeX Equation Support:** Easily add and render mathematical equations in your notes.
- **Rich Text Editing:** Enhanced note-taking experience with formatting tools.
- **Responsive UI:** Built with React for a seamless experience across devices.
- **RESTful API:** Backend built with Express.js and MongoDB for robust data management.
- **Protected Routes:** Middleware ensures only authenticated users can access their notes.

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT-based authentication
- **Other:** ESLint for code quality, modular component structure

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhushanmore25/Latex-Notes.git
   cd Latex-Notes
   ```
2. **Install backend dependencies**
   ```bash
   cd notes-app-backend
   npm install
   ```
3. **Install frontend dependencies**
   ```bash
   cd ../notes-app-frontend
   npm install
   ```
4. **Configure environment variables**
   - Create a `.env` file in `notes-app-backend` for MongoDB URI and JWT secret.

5. **Start the backend server**
   ```bash
   cd ../notes-app-backend
   npm start
   ```
6. **Start the frontend dev server**
   ```bash
   cd ../notes-app-frontend
   npm run dev
   ```
7. **Open your browser** at `http://localhost:5173` (or as indicated in the terminal)

## Folder Structure

```
Latex-Notes/
  ├── notes-app-backend/   # Express backend (API, auth, models)
  └── notes-app-frontend/  # React frontend (UI, pages, components)
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
