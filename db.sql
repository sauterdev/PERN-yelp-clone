-- for help \?
-- list database \l
-- create databas CREATE DATABASE database_name
-- list all tables \d
--list table columns \d table_name


CREATE TABLE products (
id INT, 
name VARCHAR(255),
price INT,
on_sale BOOLEAN
);

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    NAME varchar(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) VALUES (123, 'mcdonalds', 'new york', 3);

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id  BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(255) NOT NULL,
    review_content TEXT NOT NULL,
    rating INT check(rating >= 1 AND rating <= 5) NOT NULL
);

SELECT TRUNC(AVG(rating),2) FROM reviews WHERE restaurant_id = 2;
SELECT COUNT(rating) FROM reviews WHERE restaurant_id=2;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating
FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;