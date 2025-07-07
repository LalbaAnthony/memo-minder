USE 'preprod-memo-minder';

-- Create user
DROP USER IF EXISTS 'preprod-mmuser'@'localhost';
CREATE USER 'preprod-mmuser'@'localhost' IDENTIFIED BY 'hbR9GNYoxtzR9h';

-- Grant privileges
GRANT ALL PRIVILEGES ON `memo-minder`.* TO 'preprod-mmuser'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;