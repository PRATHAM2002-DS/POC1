CREATE DATABASE Serri;



-- CREATE TABLE employee (
--     id int NOT NULL AUTO_INCREMENT,
--     first_name VARCHAR(255) NOT NULL,
--     last_name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     mobile_number VARCHAR(100) NOT NULL UNIQUE,
--     created_at TIMESTAMP NOT NULL,
--     updated_at TIMESTAMP NOT NULL,
--     PRIMARY KEY (id)); 

CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  full_name varchar(255),
  email varchar(255),
  phone varchar(20),
  about varchar(255),
  linkedin_url varchar(255)
);

CREATE TABLE IF NOT EXISTS interests (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255)
);
CREATE TABLE IF NOT EXISTS users_interests (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int(11),
  interest_id int(11)
);
CREATE TABLE IF NOT EXISTS potential_connections (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user1_id int(11),
  user2_id int(11)
);
CREATE TABLE IF NOT EXISTS discarded_connections (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user1_id int(11),
  user2_id int(11)
);
CREATE TABLE IF NOT EXISTS connections (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  from_user_id int(11),
  to_user_id int(11),
  is_accepted tinyint(1)
);
	
	
	
	
	
	
	
