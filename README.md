# Task App HTML

A simple web application for user authentication with login and registration functionality.

## Features

- User login with email and password
- User registration
- Client-side validation
- Responsive design

## Pages

- **Home** (`/home/index.html`): Main page after login
- **Login** (`/login/index.html`): User login form
- **Register** (`/sign/index.html`): User registration form

## Routes

The application uses client-side routing via direct navigation:

- `/` or `/index.html`: Redirects to login
- `/login/index.html`: Login page
- `/sign/index.html`: Registration page
- `/home/index.html`: Home page (requires login)

## Setup

1. Clone or download the repository.
2. Open `index.html` in a web browser, or serve the files using a local server (e.g., `python -m http.server 8000`).
3. For proper ES module support, use a local server instead of opening files directly.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6 Modules)

## Publishing

To publish this site:

1. **GitHub Pages**: Push the code to a GitHub repository and enable Pages in the repository settings.
2. **Netlify**: Drag and drop the folder to Netlify for instant hosting.
3. **Vercel**: Connect your repository to Vercel for deployment.
4. **Any static host**: Upload the files to any web server that supports static files.

Note: User data is stored in memory and will reset on page refresh. For persistent data, integrate with a backend API.

## License

This project is for educational purposes.
