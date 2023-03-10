const db = require('./db.js');
const inquirer = require('inquirer');



//list all roles
view = () =>
  new Promise((resolve, reject) => {

    db.promise().query(`SELECT role.id, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role JOIN department ON role.department_id = department.id`)
    .then(function ([rows,fields]) {

        if (rows.length > 0)
        {
            console.table(rows);
            resolve(true);
        }
        else
        {
            console.log(`Currently no role in database\n`);
            resolve(false);
        }
    })
    .catch(function (err, results) {
        console.log(`Failed to load data from Roles database\n`);
        resolve(false);
    });
});




//add a roles
add = () =>
  new Promise((resolve, reject) => {

    let departmentArrayName = [], departmentArrayId = [];

    db.promise().query(`SELECT * FROM department`)
    .then(function ([rows,fields]) {
        //console.log(rows);
        
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


//remove a role
remove = () =>
  new Promise((resolve, reject) => {

    let roleArrayTitle = [], roleArrayId = [];

    db.promise().query(`SELECT id, title FROM role`)
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
            console.log(`Currently there is no department in database. Please add a department first.\n`);
            resolve(false);
        }
        
        let roleOptions = [
        {
            type: 'list',
            message: 'Which role you want to remove?',
            choices: roleArrayTitle,
            name: 'roleTitle'
        }]; 

        inquirer.prompt(roleOptions).then((res) => {

            let roleArrayIndex = roleArrayTitle.indexOf(res.roleTitle);
            let roleId = roleArrayId[roleArrayIndex];

            //console.log (`DELETE FROM role WHERE id="${roleId}"`);
            db.promise().query(`DELETE FROM role WHERE id="${roleId}"`)
            .then(function ([rows,fields]) {
                console.log(`Removed role ${res.roleTitle} from database\n`);
                resolve(true);
            })
            .catch(function (err, results) {
                console.log(`Failed to remove role ${res.roleTitle} from database. This role currently has dependency\n`);
                resolve(false);
            });
        });

        

    });


});

module.exports = {view, add, remove};


