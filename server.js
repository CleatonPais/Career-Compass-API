import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Integration with Frontend
// To integrate with the frontend (React), ensure that your frontend makes API calls to the endpoints defined in userRoutes.js:

// Sign Up: POST request to /api/users/signup
// Login: POST request to /api/users/login
// Forgot Password: POST request to /api/users/forgot-password
// Ensure that the frontend sends the required fields in the request body as per the validations defined in the routes.