-- Import celebrity data with correct GitHub URLs
INSERT INTO characters (id, name, height, cat_ids, media_type, media_url, thumbnail_url, color, color_customizable, color_property, order_num, gender, description, source) VALUES
-- Entertainment Celebrities
('celebrity-entertainment_celebs-tom_cruise', 'Tom Cruise', 1.73, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/tom-cruise-1.73.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/tom-cruise-1.73.png', NULL, false, NULL, 2000, 'male', 'American actor and producer', 'GitHub Repository'),

('celebrity-entertainment_celebs-ariana_grande', 'Ariana Grande', 1.53, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Ariana%20Grande-1.53.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Ariana%20Grande-1.53.png', NULL, false, NULL, 2000, 'female', 'American singer and actress', 'GitHub Repository'),

('celebrity-entertainment_celebs-dwayne_johnson', 'Dwayne Johnson', 1.93, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Dwayne%20Johnson-1.93.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Dwayne%20Johnson-1.93.png', NULL, false, NULL, 2000, 'male', 'American actor and former wrestler', 'GitHub Repository'),

('celebrity-entertainment_celebs-taylor_swift', 'Taylor Swift', 1.78, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Taylor%20Swift-1.78.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Taylor%20Swift-1.78.png', NULL, false, NULL, 2000, 'female', 'American singer-songwriter', 'GitHub Repository'),

('celebrity-entertainment_celebs-leonardo_dicaprio', 'Leonardo DiCaprio', 1.75, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Leonardo%20DiCaprio-1.75.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Leonardo%20DiCaprio-1.75.png', NULL, false, NULL, 2000, 'male', 'American actor and film producer', 'GitHub Repository'),

('celebrity-entertainment_celebs-scarlett_johansson', 'Scarlett Johansson', 1.60, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Scarlett%20Johansson-1.6.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Scarlett%20Johansson-1.6.png', NULL, false, NULL, 2000, 'female', 'American actress', 'GitHub Repository'),

('celebrity-entertainment_celebs-brad_pitt', 'Brad Pitt', 1.80, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Brad%20Pitt-1.8.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Brad%20Pitt-1.8.png', NULL, false, NULL, 2000, 'male', 'American actor and film producer', 'GitHub Repository'),

('celebrity-entertainment_celebs-jennifer_lawrence', 'Jennifer Lawrence', 1.75, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Jennifer%20Lawrence-1.75.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Jennifer%20Lawrence-1.75.png', NULL, false, NULL, 2000, 'female', 'American actress', 'GitHub Repository'),

('celebrity-entertainment_celebs-kevin_hart', 'Kevin Hart', 1.65, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/kevin-hart-1.65.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/kevin-hart-1.65.png', NULL, false, NULL, 2000, 'male', 'American comedian and actor', 'GitHub Repository'),

('celebrity-entertainment_celebs-gal_gadot', 'Gal Gadot', 1.78, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Gal%20Gadot-1.78.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Gal%20Gadot-1.78.png', NULL, false, NULL, 2000, 'female', 'Israeli actress and model', 'GitHub Repository'),

('celebrity-entertainment_celebs-lady_gaga', 'Lady Gaga', 1.55, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Lady%20Gaga-1.55.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Lady%20Gaga-1.55.png', NULL, false, NULL, 2000, 'female', 'American singer and actress', 'GitHub Repository'),

('celebrity-entertainment_celebs-benedict_cumberbatch', 'Benedict Cumberbatch', 1.83, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Benedict%20Cumberbatch-1.83.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Benedict%20Cumberbatch-1.83.png', NULL, false, NULL, 2000, 'male', 'British actor', 'GitHub Repository'),

('celebrity-entertainment_celebs-blake_lively', 'Blake Lively', 1.78, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Blake%20Lively-1.78.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Blake%20Lively-1.78.png', NULL, false, NULL, 2000, 'female', 'American actress', 'GitHub Repository'),

('celebrity-entertainment_celebs-johnny_depp', 'Johnny Depp', 1.78, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Johnny%20Depp-1.78.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Johnny%20Depp-1.78.png', NULL, false, NULL, 2000, 'male', 'American actor', 'GitHub Repository'),

('celebrity-entertainment_celebs-zendaya', 'Zendaya', 1.78, ARRAY[2], 'image', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Zendaya-1.78.png', 'https://raw.githubusercontent.com/heightcomparisonme/Clone-HeightComparison-Website/refs/heads/main/celebrity/entertainment_celebs/Zendaya-1.78.png', NULL, false, NULL, 2000, 'female', 'American actress and singer', 'GitHub Repository'),

-- Generic Reference People
('generic-average_man', 'Average Man', 1.75, ARRAY[1], 'image', NULL, NULL, '#4A90E2', false, NULL, 1000, 'male', 'Average height for adult males worldwide', 'Statistical Reference'),

('generic-average_woman', 'Average Woman', 1.62, ARRAY[1], 'image', NULL, NULL, '#E24A90', false, NULL, 1000, 'female', 'Average height for adult females worldwide', 'Statistical Reference'),

('generic-tall_man', 'Tall Man', 1.95, ARRAY[1], 'image', NULL, NULL, '#2E7D32', false, NULL, 1000, 'male', 'Tall adult male reference', 'Statistical Reference'),

('generic-short_woman', 'Short Woman', 1.50, ARRAY[1], 'image', NULL, NULL, '#FF6B6B', false, NULL, 1000, 'female', 'Short adult female reference', 'Statistical Reference'),

('generic-child_10', 'Average Child (10 years)', 1.40, ARRAY[1], 'image', NULL, NULL, '#FFD93D', false, NULL, 1000, 'other', 'Average height for 10-year-old children', 'Statistical Reference')

ON CONFLICT (id) DO NOTHING;
