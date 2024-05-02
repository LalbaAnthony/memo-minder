-- Create user
DROP USER IF EXISTS 'memo-minder-user'@'localhost';
CREATE USER 'memo-minder-user'@'localhost' IDENTIFIED BY 'ejo9uSRkmPzZxtWIFSM1AqDkgT2Lw';

-- Grant privileges
GRANT SELECT ON `memo-minder`.mood TO 'memo-minder-user'@'localhost';
GRANT INSERT ON `memo-minder`.mood TO 'memo-minder-user'@'localhost';
GRANT UPDATE ON `memo-minder`.mood TO 'memo-minder-user'@'localhost';
GRANT DELETE ON `memo-minder`.mood TO 'memo-minder-user'@'localhost';

GRANT SELECT ON `memo-minder`.music TO 'memo-minder-user'@'localhost';
GRANT INSERT ON `memo-minder`.music TO 'memo-minder-user'@'localhost';
GRANT UPDATE ON `memo-minder`.music TO 'memo-minder-user'@'localhost';
GRANT DELETE ON `memo-minder`.music TO 'memo-minder-user'@'localhost';

GRANT SELECT ON `memo-minder`.person TO 'memo-minder-user'@'localhost';
GRANT INSERT ON `memo-minder`.person TO 'memo-minder-user'@'localhost';
GRANT UPDATE ON `memo-minder`.person TO 'memo-minder-user'@'localhost';
GRANT DELETE ON `memo-minder`.person TO 'memo-minder-user'@'localhost';

GRANT SELECT ON `memo-minder`.event TO 'memo-minder-user'@'localhost';
GRANT INSERT ON `memo-minder`.event TO 'memo-minder-user'@'localhost';
GRANT UPDATE ON `memo-minder`.event TO 'memo-minder-user'@'localhost';
GRANT DELETE ON `memo-minder`.event TO 'memo-minder-user'@'localhost';

GRANT SELECT ON `memo-minder`.season TO 'memo-minder-user'@'localhost';
GRANT INSERT ON `memo-minder`.season TO 'memo-minder-user'@'localhost';
GRANT UPDATE ON `memo-minder`.season TO 'memo-minder-user'@'localhost';
GRANT DELETE ON `memo-minder`.season TO 'memo-minder-user'@'localhost';

GRANT SELECT ON `memo-minder`.user TO 'memo-minder-user'@'localhost';
GRANT INSERT ON `memo-minder`.user TO 'memo-minder-user'@'localhost';
GRANT UPDATE ON `memo-minder`.user TO 'memo-minder-user'@'localhost';
GRANT DELETE ON `memo-minder`.user TO 'memo-minder-user'@'localhost';
