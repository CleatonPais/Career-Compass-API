
// Integration with Frontend
// To integrate with the frontend (React), ensure that your frontend makes API calls to the endpoints defined in userRoutes.js:

// Sign Up: POST request to /api/users/signup
// Login: POST request to /api/users/login
// Forgot Password: POST request to /api/users/forgot-password
// Ensure that the frontend sends the required fields in the request body as per the validations defined in the routes.



// endpoint for creating companyprofile
http://localhost:5000/api/profile/createcompanyprofile

// endpoint for getcompanyprofile
http://localhost:5000/api/profile/getcompanyprofile

// endpoint for creating job
http://localhost:5000/api/jobs/createjob

//end point for updating job
http://localhost:5000/api/jobs/update/6669303014314226ac752060
// make sure you update 6669303014314226ac752060 with /:id ==> "job id"

//end point for delete job
http://localhost:5000/api/jobs/delete/6669303014314226ac752060
// make sure you update 6669303014314226ac752060 with /:id ==> "job id"


// end point for creating userprofile
http://localhost:5000/api/userprofile/createuserprofile

// end point for update userprofile
http://localhost:5000/api/userprofile/updateprofile/6670e6049d0b7a3b47f72c29

// end point for get userprofile
http://localhost:5000/api/userprofile/getuserprofile


// To get all the jobs
http://localhost:5000/api/jobs/all