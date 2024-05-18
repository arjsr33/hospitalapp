var express = require ('express');
const fs = require('fs');
const app = new express();
const path = require('path');
const filePath = path.join('hospitals.json');
const morgan = require ('morgan');
app.use(morgan('dev'));
require('dotenv').config();
const base_route = require('./routes');
const readJSONFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};
const hospitals = readJSONFile();
app.use('/hospitals',base_route);
app.listen(process.env.PORT,()=>{
    console.log(`server is in listening to PORT ${process.env.PORT}`);
    console.log(`Total Number of Hospital ${hospitals.length}`);
});

