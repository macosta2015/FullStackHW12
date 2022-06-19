--Department Seeds
INSERT INTO department (department_name)
VALUES 
('Engineering'),
('HR'),
("Finance"),
('Programming'),
('IT'),
("Legal"),
('Executive');
----------------------------------------------------

--Roles Seeds
INSERT INTO role (title, salary, department_id)
VALUES
('CEO', 10000000, 1),
('CFO', 150000, 1),
('CTO', 200000, 1),
('HR Coordinator', 75000, 2),
("Account Manager", 170000, 2),
('Jr. Developer', 85000, 3),
('Sr. Developer', 125000, 3),
('Programming Director', 225000, 3),
('IT Project Manager', 850000, 4),
('Team Lead', 100000, 4),
('Engineer I', 300000, 5),
('Engineer II', 275000, 5),
('Intern', 275000, 5);
----------------------------------------------------

--Employees Seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Cristiano', 'Ronaldo', 12, NULL),
('Elon', 'Musk', 13, 1),
('Richard', 'Branson', 14, 1),
('Jeff', 'Bezos', 3, 2),
('Ricardo', 'Paredes', 9, 2),
('Iker', 'Casillas', 11, 2),
('Tom', 'Brady', 6, 2),
('Tiger', 'Woods', 1, 4),
('Frank', 'Alonso', 1, 4),
('Ana', 'Cueva', 2, 4),
('Isabel', 'Delgado', 4, 7),
('Maria', 'Luz', 5, 7),
('Andrea', 'Lobo', 5, 7),
('Hanna', 'Venegas', 7, 5),
('Carla', 'Acosta', 8, 5),
('Rosa', 'Murillo', 10, 6),
('Gilberto', 'Garcia', 10, 6);
----------------------------------------------------

