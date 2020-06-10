/**
 * Execute this file from the command line by typing:
 *   mysql -u root < schema.sql
 */

DROP DATABASE IF EXISTS howdy;
CREATE DATABASE howdy;

USE howdy;

CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  google_id varchar(255) UNIQUE,
  image_url varchar(255),
  name varchar(255),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  city varchar(255),
  region varchar(255)
);

CREATE TABLE messages (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  message varchar(255),
  created_at timestamp,
  room_id int
);

CREATE TABLE rooms (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(60),
  host_id int,
  host_long decimal(11, 8),
  host_lat decimal(10, 8),
  radius int,
  details varchar(255),
  date date,
  start time,
  end time,
  city varchar(255),
  region varchar(255)
);
 
CREATE TABLE characters (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255)
 );

-- ALTER TABLE rooms FOREIGN KEY (user_id) REFERENCES users (id);
-- ALTER TABLE rooms FOREIGN KEY (id) REFERENCES messages (room_id);
-- ALTER TABLE rooms FOREIGN KEY (host_id) REFERENCES users (id);
-- ALTER TABLE messages FOREIGN KEY (user_id) REFERENCES users (id);
-- ALTER TABLE users FOREIGN KEY (location) REFERENCES rooms (host_location);
-- ALTER TABLE users FOREIGN KEY (character_id) REFERENCES characters (id);

INSERT INTO messages (message) VALUES ('hi');
INSERT INTO messages (message) VALUES ('this is an example message');
INSERT INTO users (google_id, image_url, name, latitude, longitude) VALUES (123456789, 'https://vignette.wikia.nocookie.net/kyoukainokanata/images/2/20/Mirai_Kuriyama.png/revision/latest?cb=20131009053737&path-prefix=es', 'Mirai Kuriyama', 29.961919, -90.057390);
INSERT INTO users (google_id, image_url, name, latitude, longitude) VALUES (987654321, 'https://avatars0.githubusercontent.com/u/57510574?s=460&u=04ca64a9c9ddaa924a8ee2168b2c714d29cb02b9&v=4', 'Jess', 29.961919, -90.057390);
INSERT INTO rooms (name, host_id, host_lat, host_long, city, region, radius, details, date, start, end) VALUES ('Hackathon PennApps', 1, 39.9525, -75.1652, 'Philadelphia', 'Pennsylvania', 500, 'Gotta catch\'em all! ', '2020-07-24', '11:00:00', '14:00:00');
INSERT INTO rooms (name, host_id, host_lat, host_long, city, region, radius, details, date, start, end) VALUES ('House Plant Party', 2, 39.0997, -94.5786, 'Kansas City', 'Missouri', 50, 'Share, learn, & grow', '2020-06-12', '02:00:00', '05:00:00');

-- dummy data for location restrictions

INSERT INTO rooms (name, host_id, host_lat, host_long, radius, details, city, region, date, start, end) VALUES ('New Year\'s Eve in NYC', 3, 40.7306, -73.9352, 1350, 'Toast with your favorite drink', 'New York City', 'New York', '2020-12-31', '16:00:00', '12:00:00');
INSERT INTO rooms (name, host_id, host_lat, host_long, radius, details, city, region, date, start, end) VALUES ('Surf Stories', 4, 20.7984, -156.3319, 1, 'Successes & Wipeouts of June', 'Maui', 'Hawaii', '2020-06-30', '12:00:00', '14:00:00');
INSERT INTO rooms (name, host_id, host_lat, host_long, radius, details, city, region, date, start, end) VALUES ('Jazz Fest at Home', 4, 29.9511, -90.0715, 30, 'Share favorite JazzFest memories', 'New Orleans', 'Louisiana', '2020-06-10', '10:00:00', '14:00:00');
INSERT INTO rooms (name, host_id, host_lat, host_long, radius, details, city, region, date, start, end) VALUES ('Couch Coffee Crawl', 4, 45.5051, -122.6750, 30, 'What coffee are you brewing?', 'Portland', 'Oregon', '2020-06-15', '07:00:00', '09:00:00');
