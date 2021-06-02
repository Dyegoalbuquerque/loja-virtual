DROP DATABASE IF EXISTS LojaVirtual


CREATE DATABASE LojaVirtual


USE LojaVirtual


CREATE TABLE Produto(id INT IDENTITY(1,1) NOT NULL, nome NVARCHAR(50) NOT NULL, urlImagem NVARCHAR(150) NULL, valor decimal(13, 2) NOT NULL)


INSERT INTO Produto VALUES ('nescau 2.0', 'https://http2.mlstatic.com/D_NQ_NP_752488-MLB31841990642_082019-O.jpg', 233.33); 
INSERT INTO Produto VALUES ('abacate', 'https://static.todamateria.com.br/upload/ab/ac/abacate-cke.jpg', 400.00);