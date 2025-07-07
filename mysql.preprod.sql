USE 'preprod-memo-minder';

-- Create user
DROP USER IF EXISTS 'preprod-mmuser'@'localhost';
CREATE USER 'preprod-mmuser'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON `preprod-memo-minder`.* TO 'preprod-mmuser'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;