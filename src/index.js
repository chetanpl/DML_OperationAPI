const cors = require('cors');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const fs = require("fs");
const _ = require('lodash');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());;
app.use(cors());
 const filePath = 'db.json';
//read file data common function
async function readFreshJsonFileData() {
    let readFile = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return readFile = readFile;
}
//write data in file common function
async function writeFreshJsonFileData(freshData) {
    try {
        await fs.writeFileSync(filePath, JSON.stringify(freshData, null, 2));
        // file written successfully
    } catch (err) {
        console.error(err);
    }
}
// delete a record
async function deleteData(id) {
    try {
        let readFile = readFreshJsonFileData();
        await readFile.then(r => {
            let output = _.filter(r, function (current) { return current.id != id });
            // file written successfully
            writeFreshJsonFileData(output);
        });
    } catch (err) {
        console.error(err);
    }
}

app.get('/api/proposal', async (request, response) => {
    try {
        //fs.readFileSync(filePath, 'utf8');
        let readFile = readFreshJsonFileData();
        await readFile.then(r => {
            if (r && _.size(r) > 0) {
                response.status(200).send({
                    message: 'Successfully',
                    result: r
                });
            }
            else {
                response.status(200).send({
                    message: 'Successfully',
                    result: 'no records available in Json file.'
                });
            }
        });
    } catch (err) {
        console.log(err);
        response.status(500).send({
            message: err.message,
            result: null,
        })
    }
});
// fetch a record behalf of id
app.get('/api/proposal/:id', async (request, response) => {
    try {
        let readFile = readFreshJsonFileData();//JSON.parse(fs.readFileSync(filePath, 'utf8'));
        await readFile.then(r => {
            if (r && _.size(r) > 0) {
                let data = _.find(r, function (res) {
                    return res.id == request.params['id'];
                });
                if(!data){
                    response.json({
                        message: `Record ${request.params['id']} is not available into file.}`,
                        status: 200,
                        data:null
                    });
                }
                else{
                response.json({
                    message:  `Record ${request.params['id']} is available into file.}`,
                    status: 200,
                    data
                });
            }
            }
            else {
                response.status(500).send({
                    error: err.message,
                    data: 'no records available in Json file.'

                })
            }
        });
    }
    catch (err) {
        response.status(500).send({
            error: err.message
        })
    }
});;
// add new entry in json file
app.post('/api/proposal', async (request, response) => {
    try {
        const user = request.body;
        if (Object.keys(user).length>0) {
            //Recieve user data
            let readFile = readFreshJsonFileData();//JSON.parse(fs.readFileSync(filePath, 'utf8'));
            await readFile.then(r => {
                //maximum id
                let fetch_Max = _.maxBy(r, 'id');
                fetch_Max = fetch_Max.id > 0 ? Number(fetch_Max.id) + 1 : 0;
                // merge the new user provided data.
                _.merge(user, { 'id': fetch_Max });
                //concat new user data to exisiting stored data.
                let data = r.concat(user);
                // write into json file the complate data.
                writeFreshJsonFileData(data);
                response.json({
                    message: 'Successfully',
                    status: 200,
                });
            });
        } else {
            throw new Error('Input is empty, please provide user data is not available');
        }
    }
    catch (err) {
        response.status(500).send({
            error: err.message
        })
    }
});
//update
app.put('/api/proposal', async (request, response) => {
    try {
        const user = request.body;
        const readFile = readFreshJsonFileData();
        let updateArray = [];
        await readFile.then(r => {
            let output = _.find(r, function (res) {
                if (res.id == user.id) {
                    updateArray.push(user);
                }
                else {
                    updateArray.push(res);
                }
            });
        });
        await writeFreshJsonFileData(updateArray);
        response.json({
            message: 'Record Successfully Updated',
            status: 200,
        });
    }
    catch (err) {
        response.status(500).send({
            error: err.message
        })
    }

});

//delete a record by id
app.delete('/api/proposal/:id', async (request, response) => {
    try {
        const id = request.params['id'];
        await deleteData(id);
        response.json({
            message: 'Record Deleted Successfully',
            status: 200,
        });
    }
    catch (err) {
        response.status(500).send({
            error: err.message
        })
    }
});


app.listen(3000);
console.log(`Order API is running at 3000`)