const fs = require('fs'); // filesystem
const csv = require('csv-parse'); // Encargado de parsear

const parseador = csv({
    delimiter: ',', //Delimitador, por defecto es la coma ,
    cast: true, // Intentar convertir las cadenas a tipos nativos
    comment: '#' // El carácter con el que comienzan las líneas de los comentarios, en caso de existir
});

parseador.on('readable', function() {
    let fila;
    while (fila = parseador.read()) {
        console.log("Tenemos una fila:", fila);
    }
});

parseador.on('error', function(err) {
    console.error("Error al leer CSV:", err.message);
});

fs.createReadStream("hola.csv") // Abrir archivo
    .pipe(parseador) // Pasarlo al parseador a través de una tubería
    .on("end", function() { // Y al finalizar, terminar lo necesario
        console.log("Se ha terminado de leer el archivo");
        parseador.end();
    });