# mern-stack-assessment
MERN Stack Assessment – Product Listing App

This is a MERN Stack Product Listing Application built for the internship assignment. It includes:

Search bar with autosuggestions Product list from backend Filters (category) Price sorting Responsive UI (mobile, tablet, desktop) ✔ Clean folder structure (frontend + backend)

Project Structure mern-stack-assessment/ │ ├── backend/ │ ├── index.js │ ├── config/ │ ├── models/ │ ├── seed/ │ ├── package.json │ └── .env │ ├── frontend/ │ ├── src/ │ ├── public/ │ ├── package.json │ └── README.md

Backend (Node.js + Express + MongoDB) Features

Express server MongoDB connection Seed data (20+ products) Search API Category + price filtering

#Run Backend cd backend npm install npm start

API Endpoints 1️ GET /products

Returns all products.

2️ GET /search?q=keyword

Autosuggest API.

Example:

http://localhost:5000/search?q=apple

Environment Variables (backend/.env) MONGO_URI=private to me PORT=5000

Frontend (React) Features

Search bar Autosuggest dropdown Product Grid Rating stars Filters Sorting Mobile-first UI Beautiful cards

#Run Frontend cd frontend npm install npm start

Frontend runs at: http://localhost:3000

Screenshots

folder:

screenshots/ home.png search.png filters.png

Paste your Google Drive or YouTube link here:

Demo Video: https://drive.google.com/your-video-link

🚀 How to Run Full Project https://drive.google.com/file/d/1sW3Jq3tmWR8wdlAB_DltzkYrJI4Rad43/view?usp=drivesdk cd mern-stack-assessment

Start backend: cd backend npm install npm start

Start frontend: cd frontend npm install npm start