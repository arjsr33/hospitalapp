const express = require ('express');
const router = new express.Router();
const fs = require('fs');
const path = require('path');
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const filePath = path.join('hospitals.json');

// To read JSON file
const readJSONFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};

// To write JSON file
const writeJSONFile = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data,null,2));
    } catch (err) {
        console.error('Error writing file:', err);
    }
};

// GET Method
router.get('/getJSON', (req, res) => {
    const hospitals = readJSONFile();
    res.json(hospitals);

});

// POST Method
router.post('/postJSON', (req, res) => {
    hospitals = readJSONFile();
    hospitals.push(req.body);
    writeJSONFile(hospitals);
    res.send('Post Successful');
});

// Update Operation
router.put('/updateJSON', (req, res) => {
    const hospitals = readJSONFile();
    const index = req.body.index;

    if (index >= 0 && index < hospitals.length) {
        hospitals.splice(index, 1, req.body.hospital);
        writeJSONFile(hospitals);
        res.send('Update Successful');
    } else {
        res.status(400).send('Invalid index');
    }
});

// Deletion Operation
router.delete('/deleteJSON', (req, res) => {
    const hospitals = readJSONFile();
    const index = req.body.index;

    if (index >= 0 && index < hospitals.length) {
        hospitals.splice(index, 1);
        writeJSONFile(hospitals);
        res.send('Deletion Successful');
    } else {
        res.status(400).send('Invalid index');
    }
});

module.exports = router;