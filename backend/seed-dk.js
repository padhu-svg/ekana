require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
    duration: '2-3 hours',
    created_at: new Date().toISOString()
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
    duration: '1 day',
    created_at: new Date().toISOString()
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
    duration: '1 day',
    created_at: new Date().toISOString()
  },
  {
    name: 'Pilikula Nisargadhama',
    category: 'Eco-Tourism',
    state: 'Karnataka',
    district: 'Dakshina Kannada',
    description: 'Pilikula Nisargadhama is a major eco-education and tourism development project promoted by the District Administration of Dakshina Kannada. It includes a biological park, golf course, and artisan village.',
    images: ['https://images.unsplash.com/photo-1448375240586-882707db888b?w=800'],
    latitude: 12.9298,
    longitude: 74.8966,
    best_time: 'Year-round',
    duration: '4-5 hours',
    created_at: new Date().toISOString()
  }
];

async function seed() {
  console.log('Seeding Dakshina Kannada places...');
  const { data, error } = await supabase.from('tourist_places').insert(places);
  if (error) {
    console.error('Error inserting places:', error);
  } else {
    console.log('Successfully inserted places!');
  }
}

seed();
