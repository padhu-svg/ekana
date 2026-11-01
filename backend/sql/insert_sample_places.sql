-- Insert 10 popular Karnataka tourist places
INSERT INTO tourist_places (name, category, state, district, description, images, latitude, longitude, best_time, duration, created_at) VALUES

('Mysore Palace', 'Heritage', 'Karnataka', 'Mysuru', 'The Mysore Palace is a historical palace and a royal residence at Mysore in the Indian State of Karnataka. It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore.', 
ARRAY['/images/places/district_22_mysuru_palace.jpg'], 12.3051, 76.6551, 'Oct-Mar', '2-3 hours', NOW()),

('Hampi', 'Heritage', 'Karnataka', 'Ballari', 'Hampi is an ancient village in Karnataka. Located within the ruins of Vijayanagara, the former capital of the Vijayanagara Empire, it is a UNESCO World Heritage Site known for its ancient temples and monuments.',
ARRAY['/images/places/district_29_hampi.jpg'], 15.3350, 76.4600, 'Oct-Mar', '2 days', NOW()),

('Coorg (Kodagu)', 'Hills', 'Karnataka', 'Kodagu', 'Coorg is a hill station in Karnataka known for its coffee plantations, misty hills, and lush greenery. It is often called the Scotland of India for its scenic beauty.',
ARRAY['/images/places/district_18_madikeri_coorg.jpg'], 12.3375, 75.8069, 'Oct-May', '2-3 days', NOW()),

('Gokarna', 'Coast', 'Karnataka', 'Uttara Kannada', 'Gokarna is a temple town and beach destination on the Arabian Sea coast. It is famous for its pristine beaches, ancient temples, and laid-back atmosphere.',
ARRAY['/images/places/district_28_murudeshwar_gokarna.jpg'], 14.5492, 74.3200, 'Oct-Mar', '2-3 days', NOW()),

('Chikmagalur', 'Hills', 'Karnataka', 'Chikmagalur', 'Chikmagalur is a hill station known for its coffee plantations, scenic beauty, and trekking opportunities. It is the birthplace of coffee in India.',
ARRAY['/images/places/district_9_mullayanagiri.jpg'], 13.3161, 75.7720, 'Sep-May', '2-3 days', NOW()),

('Badami', 'Heritage', 'Karnataka', 'Bagalkot', 'Badami is famous for its rock-cut cave temples dating back to the 6th century. The town was the capital of the Chalukya dynasty and showcases ancient Indian architecture.',
ARRAY['/images/places/district_1_badami.jpg'], 15.9149, 75.6767, 'Oct-Mar', '1 day', NOW()),

('Bandipur National Park', 'Wildlife', 'Karnataka', 'Chamarajanagar', 'Bandipur National Park is a wildlife sanctuary known for its tiger population, elephants, and diverse flora and fauna. It is part of the Nilgiri Biosphere Reserve.',
ARRAY['/images/places/district_7_bandipur.jpg'], 11.7401, 76.5026, 'Oct-May', '1-2 days', NOW()),

('Udupi', 'Culture', 'Karnataka', 'Udupi', 'Udupi is a temple town famous for its Krishna temple, traditional cuisine, and cultural heritage. It is known for its vegetarian food and religious significance.',
ARRAY['/images/places/district_27_udupi_krishna.jpg'], 13.3409, 74.7421, 'Oct-Mar', '1 day', NOW()),

('Bangalore Palace', 'Heritage', 'Karnataka', 'Bengaluru', 'Bangalore Palace is a 19th-century royal palace located in Bengaluru. Built in Tudor style architecture, it showcases elegant wood carvings and beautiful gardens.',
ARRAY['/images/places/district_5_vidhana_soudha.jpg'], 12.9988, 77.5928, 'Year-round', '2-3 hours', NOW()),

('Jog Falls', 'Nature', 'Karnataka', 'Shimoga', 'Jog Falls is one of the highest waterfalls in India. Located in the Western Ghats, it is formed by the Sharavathi River and offers breathtaking views during monsoon season.',
ARRAY['/images/places/district_25_jog_falls.jpg'], 14.2291, 74.8131, 'Jul-Jan', '1 day', NOW());