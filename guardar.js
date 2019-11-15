const fs = require('fs')

let crearArchivo = (dato) => {
    return new Promise((resolve, reject) => {
        let data = '';
            data = `Hola Mundo\n`;


        fs.writeFile(`archivo/resultado-${dato}.txt`, data, (err) => {
            if (err)
                reject(err);
            else
                resolve(`resultado-${dato} ha sido creada!`);
        });
    });
}
// Exportar la función en el módulo
module.exports = {
    crearArchivo
}