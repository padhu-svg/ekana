const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

const places = [
  {
    name: 'Panambur Beach',
    category: 'Coast',
    state: 'Karnataka',
    district: 'Dakshina Kannada',
    description: 'Panambur Beach is a popular beach in the city of Mangaluru in Dakshina Kannada. It is known for its beautiful sunsets, port area, and beach festivals.',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'],
    latitude: 12.9463,
    longitude: 74.8153,
    best_time: 'Oct-Feb',
    duration: '2-3 hours'
  },
  {
    name: 'Kukke Subramanya Temple',
    category: 'Heritage',
    state: 'Karnataka',
    district: 'Dakshina Kannada',
    description: 'Kukke Subramanya is a Hindu temple located in the village of Subramanya, Kadaba taluk. Here Kartikeya is worshipped as Subramanya, lord of all serpents.',
    images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800'],
    latitude: 12.6644,
    longitude: 75.6200,
    best_time: 'Sep-Mar',
    duration: '1 day'
  },
  {
    name: 'Dharmasthala Temple',
    category: 'Heritage',
    state: 'Karnataka',
    district: 'Dakshina Kannada',
    description: 'Dharmasthala is an Indian temple town on the banks of the Nethravathi River. It is known for its Manjunatha Temple and its unique tradition of administration and charity.',
    images: ['https://images.unsplash.com/photo-1600100397608-f010f41cb83a?w=800'],
    latitude: 12.9515,
    longitude: 75.3854,
    best_time: 'Oct-Mar',
    duration: '1 day'
  },
  {
    name: 'Yadgir Fort',
    category: 'Heritage',
    state: 'Karnataka',
    district: 'Yadgir',
    description: 'Yadgir Fort is a historical fort located on a hillock in Yadgir. Built by the Yadavas, it features bastions, ancient temples, and offers a panoramic view of the town.',
    images: ['https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800'],
    latitude: 16.7667,
    longitude: 77.1333,
    best_time: 'Oct-Feb',
    duration: '3-4 hours'
  }
];

async function seed() {
  await client.connect();
  console.log('Connected to DB');
  
  for (const place of places) {
    await client.query(`
      INSERT INTO tourist_places 
      (name, category, state, district, description, images, latitude, longitude, best_time, duration, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
    `, [
      place.name, place.category, place.state, place.district, place.description,
      place.images, place.latitude, place.longitude, place.best_time, place.duration
    ]);
  }
  
  console.log('Successfully inserted places!');
  await client.end();
}

seed().catch(console.error);
