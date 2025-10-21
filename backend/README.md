# EKaNa Backend - Node.js/Express

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
Update `.env` file with your credentials:
```
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
RAPIDAPI_KEY=your_rapidapi_key
SECRET_KEY=your_secret_key
PORT=8000
```

### 3. Database Setup
Run the SQL commands in `sql/create_tables.sql` in your Supabase SQL editor to create the required tables.

### 4. Create Admin User
```bash
npm start
# In another terminal:
node create-admin.js
```

### 5. Start Server
```bash
npm run dev  # Development with nodemon
# or
npm start    # Production
```

## API Endpoints

### Public Routes
- `GET /` - API info
- `GET /health` - Health check
- `GET /api/v1/destinations` - Get destinations
- `GET /api/v1/community` - Get community listings
- `GET /api/v1/places?query=<search>` - Search places with AI

### Admin Routes
- `POST /api/v1/admin/login` - Admin login
- `GET /api/v1/admin/dashboard` - Dashboard data (protected)
- `GET /api/v1/admin/places` - Get all places (protected)
- `POST /api/v1/admin/places` - Create place (protected)
- `POST /api/v1/admin/create-admin` - Create admin (setup only)

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`
- Email: `admin@ekana.com`

## Tech Stack
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Supabase** - Database & Auth
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client for RapidAPI