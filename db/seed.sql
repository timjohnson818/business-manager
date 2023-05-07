use business;

INSERT INTO department
    (department_name)
VALUES
    ('Human Resources'),
    ('Sales'),
    ('Accounting'),
    ('Product');

INSERT INTO job
    (job_title, pay, department_id)
VALUES
    ('HR Representative', 55000, 1),
    ('HR Manager', 85000, 1),
    ('Salesman', 90000, 2),
    ('Sales Manager', 105000, 2),
    ('Accountant', 120000, 3),
    ('Accounting Manager', 150000, 3),
    ('Product Developer', 100000, 4),
    ('Product Manager', 140000, 4);

INSERT INTO employee
    (last_name, first_name, job_id, manager_id)
VALUES
    ('Johns', 'Jimmy', 1, NULL),
    ('McDonald', 'Ronald', 2, 1),
    ('King', 'Burger', 3, NULL),
    ('Jersey', 'Mike', 4, 3),
    ('Cane', 'Raising', 5, NULL),
    ('Bellium', 'Taco', 6, 5),
    ('Queen', 'Dairy', 7, NULL),
    ('Eye', 'Pop', 8, 7);