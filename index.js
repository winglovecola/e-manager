//load library

const inquirer = require('inquirer');
const cTable = require('console.table');

const mDepartment = require('./lib/department.js');
const mRole = require('./lib/role.js');
const mEmployee = require('./lib/employee.js');





//define questions
//questions declare in particular order has a purpose, make sure the sequence of question array is not moved

let managementOptions = [{
    type: 'list',
    message: 'How can I help you?',
    choices: ['View All Employees', 'View Employees By Manager', 'View Employees By Department', "Add Employee", "Update Employee Role", "View All Roles", "Add Role", 'View All Departments', 'Add Department', "Quit"],
    name: 'action'
}];





  
function eManagerStart ()
{
    inquirer.prompt(managementOptions).then((res) => {

        if (res.action == "View All Employees")
        {
            
            mEmployee.view()
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "View Employees By Manager")
        {
            
            mEmployee.viewBy("Manager")
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "View Employees By Department")
        {
            
            mEmployee.viewBy("Department")
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "Add Employee")
        {
            
            mEmployee.add()
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "Update Employee Role")
        {
            
            mEmployee.updateRole()
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "View All Roles")
        {
            
            mRole.view()
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "Add Role")
        {
            
            mRole.add()
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "View All Departments")
        {
            
            mDepartment.view()
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "Add Department")
        {
            mDepartment.add()
            .then((res) => {
                eManagerStart ();   
            });
 
        }
        else if (res.action == "Quit")
        {
            process.exit();
        }    
        
        
        
    });
}


eManagerStart ();