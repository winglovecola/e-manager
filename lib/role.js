const db = require('./db.js');
const inquirer = require('inquirer');

view = () =>
  new Promise((resolve, reject) => {

    db.promise().query(`SELECT role.id, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role JOIN department ON role.department_id = department.id`)
    .then(function ([rows,fields]) {
        console.table(rows);
   
        resolve(true);
    })
    .catch(function (err, results) {
        console.log(`Failed to load data from Roles database\n`);
        resolve(false);
    });
});

add = () =>
  new Promise((resolve, reject) => {

    let departmentArrayName = [], departmentArrayId = [];

    db.promise().query(`SELECT * FROM department`)
    .then(function ([rows,fields]) {
        console.log(rows);
        
        if (rows.length > 0)
        {
            rows.forEach ((element) => {
                departmentArrayName.push (element.name);
                departmentArrayId.push (element.id);
            })
        }
        else
        {
            console.log(`Failed to add role. No department found. Please add a department first.\n`);
            resolve(false);
        }

        let roleOptions = [{
            type: 'input',
            message: 'Role Name?',
            name: 'roleTitle',
        },
        {
            type: 'input',
            message: 'Role Annual Salary?',
            name: 'roleSalary',
        },
        {
            type: 'list',
            message: 'Select a department.',
            choices: departmentArrayName,
            name: 'departmentName'
        }]; 

        inquirer.prompt(roleOptions).then((res) => {

            let departmentArrayIndex = departmentArrayName.indexOf(res.departmentName);

            let roleId = departmentArrayId[departmentArrayIndex];


            db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${res.roleTitle}", "${res.roleSalary}", "${roleId}");`)
            .then(function ([rows,fields]) {
                console.log(`Added "${res.roleTitle}" to Roles database\n`);
                resolve(true);
            })
            .catch(function (err, results) {
                console.log(`Failed to add "${res.roleTitle}" to Roles database\n`);
                resolve(false);
            });
        });

    });


});



module.exports = {view, add};


