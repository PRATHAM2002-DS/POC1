CREATE DATABASE Serri;



CREATE TABLE employee (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile_number VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL,updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id));
	
	
	
	
	
	
	
