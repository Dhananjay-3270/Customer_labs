Segment Saving React App
Features
Add multiple schemas (user and group traits) to a segment.
Remove selected schemas from the segment.
Save the segment to a backend server.
Modal interface for segment creation and schema management.
Axios integration for HTTP requests.

Demo
This project sends POST requests to a test endpoint powered by Beeceptor.
Online Server

Installation
Clone the repository:
git clone  https://github.com/Dhananjay-3270/Customer_labs.git
cd modal
Install dependencies:
npm install
Run the application:
npm run dev 
Open the application in your browser:

The app will be available at http://localhost:3000/.


Saving Segments
To save a segment, follow these steps in the UI:

Click on the "Save Segment" button.
Enter the name of the segment.
Select schemas to add to the segment.
Click "Save the Segment" to send the segment data to the Beeceptor endpoint.
Backend API
The app sends a POST request with the segment data to a test endpoint hosted on Beeceptor:

POST https://customerlabs.free.beeceptor.com


Technologies Used
React: Front-end library for building UI components.
Axios: Promise-based HTTP client for making API requests.
CSS: Styling for the application.
Beeceptor: Mock backend to test API requests.
