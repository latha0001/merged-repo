# TheTop36.com Backend

This is the backend server for TheTop36.com, a digital product vault with a branded raffle engine.

## Project Structure

```
thetop36/
├── frontend/             # React frontend
│   ├── src/             # Source files
│   ├── public/          # Static files
│   └── package.json     # Frontend dependencies
├── backend/             # Express backend
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
└── README.md           # Project documentation
```

## Setup Instructions

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
NODE_ENV=development
```

4. Start the development servers:

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start

# Or start both servers concurrently (from backend directory)
npm run dev:full
```

## API Endpoints

- `GET /api/prizes` - Get all prizes
- `POST /api/prizes` - Create a new prize
- `PUT /api/prizes/:id` - Update a prize
- `POST /api/raffle/draw/:prizeId` - Draw a winner for a prize
- `POST /api/enroll` - Enroll a user
- `POST /api/opt-out/:emailHash` - Opt out a user

## Development

The backend uses:

- Express.js for the server
- CORS for cross-origin requests
- dotenv for environment variables
- MongoDB for database (to be implemented)

The frontend uses:

- React.js
- Material-UI for components
- React Router for navigation
- Axios for API calls

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
