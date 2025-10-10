# EKaNa - Experience Karnataka Naturally

A visually stunning, production-ready tourism web platform showcasing Karnataka's destinations, culture, and communities through a warm, immersive, and nature-inspired user experience.

## 🌟 Features

- **Interactive Map Integration** - Mapbox GL JS for destination discovery
- **AI-Powered Trip Planning** - Smart itinerary suggestions
- **Community Connect** - Local entrepreneurs and service providers
- **Sustainability Focus** - UN SDG alignment and eco-tourism
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern Animations** - Framer Motion for smooth interactions

## 🎨 Design System

- **Colors**: Forest Green (#2D5A27), Terracotta (#B55E2A), Sand Beige (#E7D7B7), Sky Blue (#7DC4E4)
- **Typography**: Poppins font family
- **Theme**: Natural, elegant, modern eco-tourism aesthetic

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database and API keys
```

5. Run the server:
```bash
python run.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
ekana/
├── backend/
│   ├── app/
│   │   ├── api/v1/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **Supabase** - Authentication and storage
- **Mapbox API** - Route calculation

### Frontend
- **React 19** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Mapbox GL JS** - Interactive maps
- **Axios** - API client

## 🌍 API Endpoints

- `GET /api/v1/destinations` - Get all destinations
- `GET /api/v1/destinations/{id}` - Get destination by ID
- `POST /api/v1/destinations` - Create new destination
- `GET /api/v1/community` - Get community listings
- `GET /api/v1/community/{id}` - Get community listing by ID

## 🎯 Core Pages

1. **Home** - Hero section with search and featured destinations
2. **Discover** - Interactive map with filtering
3. **Community** - Local entrepreneurs directory
4. **Sustainability** - SDG goals and eco-initiatives
5. **Partner** - Business collaboration (coming soon)

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://username:password@localhost:5432/ekana_db
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token
SECRET_KEY=your_secret_key_here
```

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Adaptive layouts for tablets
- **Desktop Enhanced** - Rich desktop experience

## 🎨 Custom Components

- **Header** - Responsive navigation with mobile menu
- **Footer** - Contact info and social links
- **Card** - Reusable destination/community cards
- **Filters** - Interactive filtering system

## 🚀 Deployment

### Backend
- Deploy to Railway, Heroku, or AWS
- Set up PostgreSQL database
- Configure environment variables

### Frontend
- Deploy to Vercel, Netlify, or AWS S3
- Build with `npm run build`
- Configure API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Karnataka Tourism Board
- Local communities and entrepreneurs
- Open source contributors
- Unsplash for demo images