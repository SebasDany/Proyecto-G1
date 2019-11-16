let parse =require('fast-csv');
const fs = require('fs');

fs.createReadStream('path/to/my.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', row => console.log(row))