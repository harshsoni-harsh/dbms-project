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
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_no CHAR(10),
    gender CHAR(1),
    pan_no CHAR(10),
    FOREIGN KEY customer(customer_id) REFERENCES user(uid)
);

CREATE TABLE staff (
    staff_id INT PRIMARY KEY,
    role VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_no CHAR(10),
    email VARCHAR(255),
    gender CHAR(1),
    FOREIGN KEY staff(staff_id) REFERENCES user(uid)
);

CREATE TABLE policy_type (
    policy_type_id INT PRIMARY KEY AUTO_INCREMENT,
    maturity_duration INT,
    renew_duration INT,
    title VARCHAR(255) NOT NULL DEFAULT(""),
    description TEXT DEFAULT(""),
    coverage NUMERIC(4,2)
);

CREATE TABLE policy (
    policy_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    policy_type_id INT,
    vehicle_manufacturer VARCHAR(255),
    vehicle_type VARCHAR(255),
    vehicle_make VARCHAR(255),
    registration_year INT,
    registration_month INT,
    vehicle_number VARCHAR(255) UNIQUE,
    vehicle_price INT,
    premium_amount INT,
    status VARCHAR(255),
    CHECK (vehicle_price > 0),
    CHECK (registration_month > 0 AND registration_month <= 12),
    CHECK (premium_amount > 0),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (policy_type_id) REFERENCES policy_type(policy_type_id)
);

CREATE TABLE incident_report (
    incident_id INT PRIMARY KEY AUTO_INCREMENT,
    damage_type VARCHAR(255),
    damage_description TEXT,
    status VARCHAR(255)
);

CREATE TABLE claim (
    claim_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    policy_id INT,
    incident_id INT,
    claim_amount INT,
    created_at DATETIME,
    status VARCHAR(255),
    CHECK (claim_amount > 0),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (policy_id) REFERENCES policy(policy_id),
    FOREIGN KEY (incident_id) REFERENCES incident_report(incident_id)
);

CREATE TABLE premium_receipt (
    receipt_id INT PRIMARY KEY AUTO_INCREMENT,
    amount INT NOT NULL,
    policy_id INT,
    created_at DATETIME,
    txn_id INT NOT NULL,
    CHECK (amount > 0),
    FOREIGN KEY (policy_id) REFERENCES policy(policy_id)
);

CREATE TABLE claim_receipt (
    claim_id INT,
    created_at DATETIME,
    amount INT NOT NULL,
    txn_id INT NOT NULL,
    CHECK (amount > 0),
    FOREIGN KEY (claim_id) REFERENCES claim(claim_id)
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

INSERT INTO policy_type (maturity_duration, renew_duration, title, description, coverage) VALUES 
(1, 1, 'Comprehensive Coverage', 'Covers damages to your car from accidents, theft, and natural disasters.', 95.50), 
(1, 1, 'Third-Party Liability', 'Covers damages to another person’s property or injuries to others in an accident.', 75.25), 
(1, 1, 'Collision Coverage', 'Covers damages to your car from a collision, regardless of who is at fault.', 85.00), 
(1, 1, 'Personal Injury Protection', 'Covers medical expenses and lost wages for you and your passengers after an accident.', 90.75);
