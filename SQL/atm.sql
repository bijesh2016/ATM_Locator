CREATE TABLE atms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bank_id INT,
    location_name VARCHAR(255),
    address VARCHAR(500),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_24_hours BOOLEAN,
    is_drive_through BOOLEAN,
    is_deposit_available BOOLEAN,
    is_wheelchair_accessible BOOLEAN,
    STATUS VARCHAR(50),  -- Active, Temporarily Closed, Permanently Closed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bank_id) REFERENCES banks(id)
);

