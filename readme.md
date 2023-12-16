#  Notes App

Your Notes App is a simple application for managing and organizing notes. It includes user authentication (login/logout) and uses Express for the backend, Firebase for data storage, and React Vite for the frontend.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)
- [Contact](#Contact)
- [Author](#Author)

## Features

- User authentication with login and logout functionality.
- Create, read, update, and delete (CRUD) notes.
- Firebase integration for data storage and retrieval.
- Responsive and intuitive user interface.

## Technologies Used

- **Frontend:**
  - React Vite
  - React Router for navigation
  - Styling Tailwind Css

- **Backend:**
  - Express.js
  - Firebase (Firestore for data storage, Authentication for user management)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/avinashtare/Notes-App-Firebase.git
    cd Notes-App-Firebase
    ```

2. Install dependencies:

    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

## Configuration

1. **Firebase Configuration:**

    - Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com/).
    - Obtain your Firebase configuration (API Key, Auth Domain, Project ID, etc.).

2. **Environment Variables:**

    - Create a `.env` file in the `server` directory and add necessary environment variables.
    - replace .env.example with below variables

``` ev
    # SecretKey for bcrypt js
    SecretKey="This is my secret key how are you"

    FIREBASE_ApiKey=your-api-key
    FIREBASE_AuthDomain=your-auth-domain
    FIREBASE_ProjectId=your-project-id
    FIREBASE_StorageBucket=your_storage_buket
    FIREBASE_MessagingSenderId=your_messaging_sendig_id
    FIREBASE_AppId=your_firebase_app_id
    FIREBASE_DatabaseURL=firebase_database_url
```

## Usage

1. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

2. Start the client development server:

    ```bash
    cd client
    npm run dev
    ```

3. Open your browser and visit `http://localhost:3000` to use the application.


## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
This project is released under the [MIT License](LICENSE).  



## Contact

**[avinashtare.work@gmail.com](mailto:avinashtare.work@gmail.com)**

## Author
**卐🕉 Avinash Tare 🕉 卐**