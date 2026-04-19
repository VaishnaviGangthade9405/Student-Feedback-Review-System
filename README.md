# Feedback Application

A full-stack feedback application built with React and Express.js with MongoDB.

## Project Structure

```
├── backend/
│   ├── routes/
│   │   └── feedbackRoutes.js
│   ├── models/
│   │   └── Feedback.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env.local
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on `localhost:27017`

4. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will open on `http://localhost:3000`

## Features

- **Submit Feedback**: Users can submit feedback with name, subject, rating (1-10), and comments
- **View Feedback**: All submitted feedback is displayed in a responsive grid
- **Delete Feedback**: Users can delete feedback entries
- **Validation**: Form validation on both client and server side
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Mobile-friendly interface

## API Endpoints

### Feedback Routes

- **POST** `/api/feedback/add` - Submit new feedback
  - Body: `{ name, subject, rating, comments }`

- **GET** `/api/feedback/all` - Get all feedback

- **GET** `/api/feedback/:id` - Get feedback by ID

- **DELETE** `/api/feedback/:id` - Delete feedback by ID

### Other Endpoints

- **GET** `/health` - Health check endpoint

## Technologies Used

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- CORS - Cross-Origin Resource Sharing
- Node.js - Runtime

### Frontend
- React - UI library
- CSS3 - Styling with gradients and animations
- Fetch API - HTTP requests

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/feedbackDB
NODE_ENV=development
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

### CORS Error
- Make sure backend is running on port 5000
- CORS is already configured in server.js

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Change port in terminal with `PORT=3001 npm start`

## Future Enhancements

- User authentication
- Edit feedback functionality
- Advanced filtering and search
- Rating analytics
- Email notifications
- Pagination
- Database indexing for performance

## License

MIT
