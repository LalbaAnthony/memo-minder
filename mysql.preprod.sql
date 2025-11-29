CREATE DATABASE IF NOT EXISTS `preprod-memo-minder` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE 'preprod-memo-minder';

-- Create user
DROP USER IF EXISTS 'preprod-mmuser'@'localhost';
CREATE USER 'preprod-mmuser'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON `preprod-memo-minder`.* TO 'preprod-mmuser'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;