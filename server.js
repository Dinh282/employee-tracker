import mysql2 from 'mysql2';
import logBanner from './util/helpers/banner.js';


//Creates connection from Nodejs to database engine on local machine with .createConnection.
//We are required to pass an object with the following properties. 
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_employees_db',
});

logBanner();

db.query('select * from employee', function(err, data){
    if (err) {
        console.log("Error!", err);
    } else {
        console.log('here is the data:', data);
    }

})