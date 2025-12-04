# Sagepath

Sagepath is a gamified learning platform designed to make education engaging and interactive. It features course tracking, XP/leveling systems, and community interaction.

## Tech Stack

**Frontend:**
*   React
*   Vite
*   CSS (Custom styling)

**Backend:**
*   Node.js
*   Express

**Database & Auth:**
*   Supabase

## Features

*   **Course Tracking**: Track progress through video-based courses.
*   **Gamification**: Earn XP and level up by completing topics.
*   **Community**: Share posts and interact with other learners.
*   **Profile**: Customize your profile with avatars and track your stats.
*   **Doubts Panel**: Ask questions directly within the course interface.

## Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   npm (v6 or higher)
*   A Supabase project (for database and authentication)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abhigyan-21/Sagepath-Main.git
    cd Sagepath-Main
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    cd ..
    ```

### Configuration

#### Backend
Create a `.env` file in the `backend` directory with the following variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
FRONTEND_URL=http://localhost:5173 # Or your deployed frontend URL
PORT=5000
```

#### Frontend
Create a `.env` file in the root directory (if needed for custom API URL, otherwise defaults work for local dev):

```env
VITE_API_URL=/api
```

### Running the Application

1.  **Start the Backend:**
    Open a terminal, navigate to the `backend` folder, and run:
    ```bash
    cd backend
    npm run dev
    ```
    The server will start on port 5000 (or your specified PORT).

2.  **Start the Frontend:**
    Open a new terminal in the root folder and run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Deployment

The application is set up to be deployed on platforms like Vercel. Ensure you configure the environment variables in your deployment platform settings.

## License

[MIT](https://choosealicense.com/licenses/mit/)
