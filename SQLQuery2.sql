SELECT name FROM sys.databases;
USE posts;
GO

SELECT * FROM information_schema.tables WHERE table_schema = 'dbo' AND table_name = 'users';

SELECT * FROM dbo.users;
