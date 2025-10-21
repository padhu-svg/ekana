# Admin Panel Setup Instructions

## 1. Backend Setup

### Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Database Setup
1. Make sure PostgreSQL is running
2. Update `.env` with your database URL:
```
DATABASE_URL=postgresql://username:password@localhost:5432/ekana_db
```

### Create Database Tables
```bash
cd backend
python -c "from app.core.database import engine; from app.models.admin import Base; Base.metadata.create_all(bind=engine)"
```

### Create Admin User
```bash
cd backend
python create_admin.py
```
This creates admin with:
- Username: `admin`
- Password: `admin123`
- Email: `admin@ekana.com`

### Start Backend
```bash
python run.py
```

## 2. Frontend Setup

### Start Frontend
```bash
cd frontend
npm run dev
```

## 3. Access Admin Panel

1. Go to: http://localhost:5173/admin/login
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. You'll be redirected to: http://localhost:5173/admin/dashboard

## 4. Admin Features

### Dashboard
- View total places statistics
- Overview of categories
- Admin profile info

### Add Tourist Places
- Click "Add New Place" button
- Fill form with:
  - Place Name
  - Category (Hills, Heritage, Wildlife, Coast, Culture, Eco-Tourism)
  - District
  - Description
  - Image URL
  - Best Time to Visit
- Submit to add to database

### Manage Places
- View all added places in grid layout
- Edit/Delete functionality (buttons available)
- Filter by categories

## 5. Database Schema

### Admins Table
- id, username, email, hashed_password, created_at

### Tourist Places Table
- id, name, category, state, district, description
- images[], latitude, longitude, best_time, duration, rating
- created_at

## 6. Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected routes
- Auto logout on token expiry