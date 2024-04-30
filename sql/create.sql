DROP DATABASE IF EXISTS insurance;
CREATE DATABASE IF NOT EXISTS insurance;

USE insurance;

START TRANSACTION;
CREATE TABLE user (
    uid INT PRIMARY KEY AUTO_INCREMENT,
    pwd_hash VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),
    created_at DATETIME
);


CREATE TABLE customer (
    customer_id INT PRIMARY KEY REFERENCES user,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_no CHAR(10),
    gender CHAR(1),
    pan_no CHAR(10)
);

CREATE TABLE staff (
    staff_id INT PRIMARY KEY REFERENCES user,
    role VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_no CHAR(10),
    email VARCHAR(255),
    gender CHAR(1)
);

-- CREATE TABLE nok (
--     nok_id INT PRIMARY KEY AUTO_INCREMENT,
--     first_name VARCHAR(255),
--     last_name VARCHAR(255),
--     phone_no CHAR(10),
--     gender CHAR(1),
--     pan_no CHAR(10)
-- );

CREATE TABLE policy_type (
    policy_type_id INT PRIMARY KEY AUTO_INCREMENT,
    maturity_duration INT,
    renew_duration INT,
    title VARCHAR(255) NOT NULL DEFAULT(""),
    description TEXT DEFAULT(""),
    coverage NUMERIC(2,2)
);

CREATE TABLE policy (
    policy_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT REFERENCES customer,
    policy_type_id INT REFERENCES policy_type,
    vehicle_manufacturer VARCHAR(255),
    vehicle_type VARCHAR(255),
    vehicle_make VARCHAR(255),
    registration_year INT,
    registration_month INT,
    vehicle_number VARCHAR(255) UNIQUE,
    vehicle_price INT,
    premium_amount INT,
    -- nok_id INT REFERENCES nok,
    status VARCHAR(255), -- pending, active, expired
    CHECK (vehicle_price > 0),
    CHECK (registration_month > 0 AND registration_month <= 12),
    CHECK (premium_amount > 0)
);

CREATE TABLE incident_report (
    incident_id INT PRIMARY KEY AUTO_INCREMENT,
    damage_type VARCHAR(255),
    damage_description TEXT,
    status VARCHAR(255) -- accepted / pending / rejected
);

CREATE TABLE claim (
    claim_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT REFERENCES customer,
    policy_id INT REFERENCES policy,
    claim_amount INT,
    incident_id INT REFERENCES incident_report,
    created_at DATETIME,
    status VARCHAR(255), -- pending, accepted, rejected
    CHECK (claim_amount > 0)
);

CREATE TABLE premium_receipt (
    receipt_id INT PRIMARY KEY AUTO_INCREMENT,
    amount INT NOT NULL,
    policy_id INT REFERENCES policy,
    created_at DATETIME,
    txn_id INT NOT NULL,
    CHECK (amount > 0)
);

CREATE TABLE claim_receipt (
    claim_id INT REFERENCES claim,
    created_at DATETIME,
    amount INT NOT NULL,
    txn_id INT NOT NULL,
    CHECK (amount > 0)
);

COMMIT;


-- Password 123456
INSERT INTO user VALUES
(1, '$2b$10$4aEcjoBCg9w7CtVybHjgyOGKmY0zm3My47ttD8TlhUFIe.vIWlFX2', 'dbadmin@gmail.com', 'dbadmin', CURDATE()),
(2, '$2b$10$4aEcjoBCg9w7CtVybHjgyOGKmY0zm3My47ttD8TlhUFIe.vIWlFX2', 'inspector@gmail.com', 'inspector', CURDATE()),
(3, '$2b$10$4aEcjoBCg9w7CtVybHjgyOGKmY0zm3My47ttD8TlhUFIe.vIWlFX2', 'manager@gmail.com', 'manager', CURDATE()),
(4, '$2b$10$4aEcjoBCg9w7CtVybHjgyOGKmY0zm3My47ttD8TlhUFIe.vIWlFX2', 'customer@gmail.com', 'customer', CURDATE());

INSERT INTO customer VALUES
(4, 'Mario', 'Luigi', 'customer@gmail.com', '9876543210', 'M', '1234567890');

INSERT INTO staff VALUES
(1, 'dbadmin', 'Pata', 'Nahi', '4564564560', 'dbadmin@gmail.com', 'M'),
(2, 'inspector', 'Big', 'Smoke', '1231231230', 'inspector@gmail.com', 'M'),
(3, 'manager', 'Tommy', 'Vercetti', '9879879870', 'manager@gmail.com', 'M');