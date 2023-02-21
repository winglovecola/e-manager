const db = require('./db.js');
const inquirer = require('inquirer');

view = () =>
  new Promise((resolve, reject) => {


    db.promise().query(`SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS Role, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`)
    .then(function ([rows,fields]) {
        console.table(rows);
   
        resolve(true);
    })
    .catch(function (err, results) {
        console.log(`Failed to load data from Enployee\n`);
        resolve(false);
    });
});


viewBy = (mode) =>
  new Promise((resolve, reject) => {

    if (mode == "Manager")
    {

        let managerArrayName = [], managerArrayId = [];


        db.promise().query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`)
        .then(function ([rows,fields]) {
            if (rows.length > 0)
            {
                rows.forEach ((element) => {
                    managerArrayName.push (element.name);
                    managerArrayId.push (element.id);
                    
                })
                
            }
            else
            {
                console.log(`Currently there is no manager in the database. Please add a manager first.\n`);
                resolve(false);
            }
    
            let employeeOptions = [
            {
                type: 'list',
                message: 'Please select a manager.',
                choices: managerArrayName,
                name: 'managerName'
            }]; 
    
            inquirer.prompt(employeeOptions).then((res) => {
    
                let managerNameArrayIndex = managerArrayName.indexOf(res.managerName);
                let managerNameId = managerArrayId[managerNameArrayIndex];
    
                db.promise().query(`SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS Role, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id WHERE employee.manager_id="${managerNameId}"`)
                .then(function ([rows,fields]) {
                    console.table(rows);
            
                    resolve(true);
                })
                .catch(function (err, results) {
                    console.log(`Failed to load data from Enployee\n`);
                    resolve(false);
                });
            });
    
        });
        
    }
    else if (mode == "Department")
    {
        let departmentArrayName = [], departmentArrayId = [];


        db.promise().query(`SELECT id, name FROM department`)
        .then(function ([rows,fields]) {
            if (rows.length > 0)
            {
                rows.forEach ((element) => {
                    departmentArrayName.push (element.name);
                    departmentArrayId.push (element.id);
                    
                })
                
            }
            else
            {
                console.log(`Currently there is no department in the database. Please add a department first.\n`);
                resolve(false);
            }
    
            let employeeOptions = [
            {
                type: 'list',
                message: 'Please select a department.',
                choices: departmentArrayName,
                name: 'departmentName'
            }]; 
    
            inquirer.prompt(employeeOptions).then((res) => {
    
                let departmentNameArrayIndex = departmentArrayName.indexOf(res.departmentName);
                let departmentNameId = departmentArrayId[departmentNameArrayIndex];
    
                db.promise().query(`SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS Role, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id WHERE role.department_id="${departmentNameId}"`)
                .then(function ([rows,fields]) {
                    console.table(rows);
            
                    resolve(true);
                })
                .catch(function (err, results) {
                    console.log(`Failed to load data from Enployee\n`);
                    resolve(false);
                });
            });
    
        });

    }


});


add = () =>
  new Promise((resolve, reject) => {

    let roleArrayTitle = [], roleArrayId = [], managerArrayName = [], managerArrayId = [];

    db.promise().query(`SELECT * FROM role`)
    .then(function ([rows,fields]) {
        
        
        if (rows.length > 0)
        {
            rows.forEach ((element) => {
                roleArrayTitle.push (element.title);
                roleArrayId.push (element.id);
            })
        }
        else
        {
            console.log(`Failed to add employee. No role found. Please add a role first.\n`);
            resolve(false);
        }
        
        db.promise().query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`)
        .then(function ([rows,fields]) {
            if (rows.length > 0)
            {
                rows.forEach ((element) => {
                    managerArrayName.push (element.name);
                    managerArrayId.push (element.id);
                    
                })
            }

            managerArrayName.unshift ("None");
            managerArrayId.unshift ("null");
            let employeeOptions = [{
                type: 'input',
                message: 'Employee first name?',
                name: 'employeeFirstName',
            },
            {
                type: 'input',
                message: 'Employee last name?',
                name: 'employeeLastName',
            },
            {
                type: 'list',
                message: 'Please select a role.',
                choices: roleArrayTitle,
                name: 'roleTitle'
            },
            {
                type: 'list',
                message: 'Please select a manager.',
                choices: managerArrayName,
                name: 'managerName'
            }]; 
    
            inquirer.prompt(employeeOptions).then((res) => {
    
                let roleArrayIndex = roleArrayTitle.indexOf(res.roleTitle);
                let roleId = roleArrayId[roleArrayIndex];


                let managerArrayIndex = managerArrayName.indexOf(res.managerName);
                let managerId = managerArrayId[managerArrayIndex];
    
       
                db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${res.employeeFirstName}", "${res.employeeLastName}", ${roleId}, ${managerId});`)
                .then(function ([rows,fields]) {
                    console.log(`Added "${res.roleTitle}" to Employee database\n`);
                    resolve(true);
                })
                .catch(function (err, results) {
                    console.log(`Failed to add "${res.roleTitle}" to Employee database\n`);
                    resolve(false);
                });
            });

        })
        

    });


});







updateRole = () =>
  new Promise((resolve, reject) => {

    let employeeArrayName = [], employeeArrayId = [], roleArrayTitle = [], roleArrayId = [];

    db.promise().query(`SELECT * FROM role`)
    .then(function ([rows,fields]) {
        
        
        if (rows.length > 0)
        {
            rows.forEach ((element) => {
                roleArrayTitle.push (element.title);
                roleArrayId.push (element.id);
            })
        }
        else
        {
            console.log(`Failed to update employee. No role found. Please add a role first.\n`);
            resolve(false);
        }
        
        db.promise().query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`)
        .then(function ([rows,fields]) {
            if (rows.length > 0)
            {
                rows.forEach ((element) => {
                    employeeArrayName.push (element.name);
                    employeeArrayId.push (element.id);
                    
                })
                
            }
            else
            {
                console.log(`Currently there is no employee in database. Please add a employee first.\n`);
                resolve(false);
            }

            let employeeOptions = [
            {
                type: 'list',
                message: 'Which employee you want to update?',
                choices: employeeArrayName,
                name: 'employeeName'
            },
            {
                type: 'list',
                message: 'Please select a role.',
                choices: roleArrayTitle,
                name: 'roleTitle'
            }]; 
    
            inquirer.prompt(employeeOptions).then((res) => {
    
                let roleArrayIndex = roleArrayTitle.indexOf(res.roleTitle);
                let roleId = roleArrayId[roleArrayIndex];


                let employeeArrayIndex = employeeArrayName.indexOf(res.employeeName);
                let employeeId = employeeArrayId[employeeArrayIndex];
    
                console.log (`UPDATE employee SET role_id=${roleId} WHERE id="${employeeId}");`)
                db.promise().query(`UPDATE employee SET role_id=${roleId} WHERE id="${employeeId}");`)
                .then(function ([rows,fields]) {
                    console.log(`Added "${res.roleTitle}" to Employee database\n`);
                    resolve(true);
                })
                .catch(function (err, results) {
                    console.log(`Failed to add "${res.roleTitle}" to Employee database\n`);
                    resolve(false);
                });
            });

        })
        

    });


});


module.exports = {view, viewBy, add, updateRole};


