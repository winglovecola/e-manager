const db = require('./db.js');
const inquirer = require('inquirer');

//list all departments
view = () =>
  new Promise((resolve, reject) => {

    db.query('SELECT id, name AS Name FROM department', function (err, rows) {
        if (err)
        {
            console.log(`Failed to load data from Department database\n`);
            resolve(false);
        }
        else
        {
            console.table(rows);
            resolve(true);
        }
    });

});


//add a department
add = () =>
  new Promise((resolve, reject) => {


    let departmentOptions = [{
        type: 'input',
        message: 'Department Name?',
        name: 'departmentName',
      }]; 

    inquirer.prompt(departmentOptions).then((res) => {
        db.promise().query(`INSERT INTO department (name) VALUES ("${res.departmentName}");`)
        .then(function ([rows,fields]) {
            console.log(`Added "${res.departmentName}" to Department database\n`);
            resolve(true);
        })
        .catch(function (err, results) {
            console.log(`Failed to add "${res.departmentName}" to Department database\n`);
            resolve(false);
        });
    });  

});


//remove a department
remove = () =>
  new Promise((resolve, reject) => {

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
            console.log(`Currently there is no department in database. Please add a department first.\n`);
            resolve(false);
        }
        
        let departmentOptions = [
        {
            type: 'list',
            message: 'Which department you want to remove?',
            choices: departmentArrayName,
            name: 'departmentName'
        }]; 

        inquirer.prompt(departmentOptions).then((res) => {

            let departmentArrayIndex = departmentArrayName.indexOf(res.departmentName);
            let departmentId = departmentArrayId[departmentArrayIndex];

            //console.log (`DELETE FROM department WHERE id="${departmentId}"`);
            db.promise().query(`DELETE FROM department WHERE id="${departmentId}"`)
            .then(function ([rows,fields]) {
                console.log(`Removed department ${res.departmentName} from database\n`);
                resolve(true);
            })
            .catch(function (err, results) {
                console.log(`Failed to remove department ${res.departmentName} from database. This department currently has dependency\n`);
                resolve(false);
            });
        });

        

    });


});

module.exports = {view, add, remove};


