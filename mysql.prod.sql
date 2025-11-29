CREATE DATABASE IF NOT EXISTS `memo-minder` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE 'memo-minder';

-- Create user
DROP USER IF EXISTS 'mmuser'@'localhost';
CREATE USER 'mmuser'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON `memo-minder`.* TO 'mmuser'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;