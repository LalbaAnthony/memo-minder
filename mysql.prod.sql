USE 'memo-minder';

-- Create user
DROP USER IF EXISTS 'mmuser'@'localhost';
CREATE USER 'mmuser'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON `memo-minder`.* TO 'mmuser'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;