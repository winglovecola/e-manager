const db = require('./db.js');
const inquirer = require('inquirer');


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



module.exports = {view, add};


