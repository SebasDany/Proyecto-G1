

const csv = require('csv-parser');
const fs = require('fs');

const filepath = "producto.csv"
console.log(filepath)

fs.createReadStream(filepath)

    .on('error', () => {

        // handle error
    })
    .pipe(csv())
    //.pipe(fs.createWriteStream('./jola.json'))
    .on('data', (row) => {
        console.log(row);
        //fs.createWriteStream(row)
    })

    .on('end', () => {
        // handle end of CSV
    })