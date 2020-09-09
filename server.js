const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRouters = require('./app/routes/UserRoutes')
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// DB
const db = require('./app/models');
db.sequelize.sync();

// drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and re-sync db.');
// });

app.all('/*', function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
})

app.use('/users', userRouters);
app.get('/', (req, res)=>{
    res.json({message: 'welcome to application.'})
    });


// set port, listen for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})
