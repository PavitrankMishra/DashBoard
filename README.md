Link to access the website: 
Link: https://role-admin-dashboard.netlify.app/

The frontend of the website is not hosted on Netlify and the backend of the website is hosted on Render.

Admin Dashboard Features:
View List of Users:

You can access a list of all users in the system.
This will display user details such as their name, email, and any other associated data in a tabular format.
The list can be filtered or sorted based on user attributes (if implemented).
Edit a User:

You can select any user from the list and make changes to their details.
This includes editing user information (e.g., name, email, role) and updating user-specific settings.
This functionality typically involves opening a user-specific form, where fields are populated with the current user data, and you can modify and save it.
Delete a User:

Users can be deleted from the system.
This will remove the user from the list and may also permanently delete any associated data (depending on your setup).
A confirmation dialog may be included to prevent accidental deletions.
Add a New User:

You can create and add new users by filling out a form with necessary information such as:
Name
Email
Password (if applicable)
Role (e.g., Admin, User, etc.)
After submitting the form, the new user is added to the system and can be viewed in the user list.
Setup frontend environment:
cd frontend
npm install
npm run start - Start the frontend server

Setup backend: 
cd backend
npm install 
npm install -g nodemon
nodemon index.js - Start the backend server




