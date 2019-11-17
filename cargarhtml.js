const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');


module.exports.cargarHtml = function(dt) {
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        fs.readFile('index.html', null, function(error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Archivo no encontrado!');
            } else {
                res.write(data + dt);
            }
            res.end();
        });

    });
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

module.exports.guardarDatos = (nombre, dato, definicion) => {

    return new Promise((resolve, reject) => {

        let data = definicion;

        for (let i = 0; i < dato.length; i++) {
            data += `${ dato[i]} \n`;
        }


        fs.appendFile(`${ nombre }.txt`, data, (err) => {

            if (err)
                reject(err)
            else
                resolve(`${ nombre }.txt`.green);

        });

    });

}