USE 'memo-minder';

-- Create user
DROP USER IF EXISTS 'mmuser'@'localhost';
CREATE USER 'mmuser'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT INSERT ON 'memo-minder'.* TO 'mmuser'@'localhost';
GRANT SELECT ON 'memo-minder'.* TO 'mmuser'@'localhost';
GRANT UPDATE ON 'memo-minder'.* TO 'mmuser'@'localhost';
GRANT DELETE ON 'memo-minder'.* TO 'mmuser'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;