//load library

const inquirer = require('inquirer');
const cTable = require('console.table');

const mDepartment = require('./lib/department.js');
const mRole = require('./lib/role.js');
const mEmployee = require('./lib/employee.js');





//define employee manager options
let managementOptions = [{
    type: 'list',
    message: 'How can I help you?',
    choices: ['View All Employees', 'View Employees By Manager', 'View Employees By Department', "Add Employee", "Update Employee Role", "Update Employee Manager", "Remove Employee", "View All Roles", "Add Role", "Remove Role", 'View All Departments', 'Add Department', "Remove Department", "Total Utilized Budget", "Quit"],
    name: 'action'
}];





//manager init function
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
        else if (res.action == "Update Employee Manager")
        {
            
            mEmployee.updateManager()
            .then((res) => {
                eManagerStart ();   
            });
            
        }
        else if (res.action == "Remove Employee")
        {
            mEmployee.remove()
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
        else if (res.action == "Remove Role")
        {
            
            mRole.remove()
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
        else if (res.action == "Remove Department")
        {
            mDepartment.remove()
            .then((res) => {
                eManagerStart ();   
            });
 
        }
        else if (res.action == "Total Utilized Budget")
        {
            mEmployee.totalUtilizedBudget()
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

//start employee manager
eManagerStart ();