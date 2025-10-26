# Google Places API Integration - Setup Guide

## Overview
This project integrates Google Places API to provide real-time search and detailed information about tourist places in Karnataka, India.

## Features
- **Real-time Place Search**: Search for places using Google Places Text Search API
- **Detailed Place Information**: Get comprehensive details including photos, reviews, ratings, and contact info
- **Wikipedia Integration**: Additional descriptions from Wikipedia API
- **Responsive UI**: Clean, mobile-friendly interface with Tailwind CSS

## API Endpoints

### Backend Routes
- `GET /api/v1/search/places?query=<search_term>` - Search for places
- `GET /api/v1/search/places/:id` - Get detailed place information

## Setup Instructions

### 1. Google Places API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Places API
   - Places API (New)
   - Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the API key to your domain/IP for security

### 2. Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `.env` file with your Google API key:
   ```env
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:8000`

### 3. Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Usage

### Search Places
1. Open the application in your browser
2. Use the search bar on the home page
3. Type queries like:
   - "temples in Udupi"
   - "hills in Karnataka"
   - "beaches Dakshina Kannada"
   - "Mysore Palace"

### View Place Details
1. Click on any search result
2. View comprehensive information including:
   - High-quality photos from Google Places
   - User reviews and ratings
   - Contact information
   - Opening hours
   - Wikipedia descriptions
   - Location details

## API Response Format

### Search Results
```json
{
  "success": true,
  "places": [
    {
      "id": "ChIJ...",
      "name": "Place Name",
      "address": "Full Address",
      "coordinates": {
        "lat": 12.345,
        "lng": 76.543
      },
      "rating": 4.5,
      "category": "tourist_attraction",
      "photos": ["photo_url_1", "photo_url_2"]
    }
  ]
}
```

### Place Details
```json
{
  "success": true,
  "place": {
    "id": "ChIJ...",
    "name": "Place Name",
    "location": "Full Address",
    "description": "Detailed description",
    "images": ["image_url_1", "image_url_2"],
    "rating": "4.5",
    "reviews": [...],
    "timings": {...},
    "contact": {...}
  }
}
```

## Error Handling
- Invalid API key: Returns 500 error with message
- No results found: Returns empty places array
- Rate limit exceeded: Returns appropriate error message
- Network issues: Graceful fallback with error display

## Security Notes
- API key is stored in environment variables
- CORS is properly configured
- Rate limiting is implemented
- Input validation and sanitization

## Troubleshooting

### Common Issues
1. **"API key not valid"**: Check your Google Cloud Console API key
2. **"This API project is not authorized"**: Enable Places API in Google Cloud Console
3. **"CORS error"**: Ensure backend CORS is configured for your frontend URL
4. **"No results found"**: Try different search terms or check API quotas

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

## Cost Optimization
- Results are limited to 5 places per search
- Photos are limited to 6 per place
- Implement caching for frequently searched places
- Monitor API usage in Google Cloud Console

## Future Enhancements
- Add map view integration
- Implement place favorites/bookmarks
- Add user reviews and ratings
- Integrate with booking systems
- Add offline support with cached data