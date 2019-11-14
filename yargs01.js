const rgv =require('yargs').argv;


const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;
 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end("'<h1>hola</h1>'");
  
});

 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

if (rgv.usuario ==='publicar'){

    let x={'nombre':"jaime"};
    let y={'apodo':"sebas"};
    let z=[
        {nombre:"danilo",apellido:"guandinango",edad:26},
        {nombre:"inty",apellido:"De la cruz",edad:23}
    ];

    let resul= z.find(nombre=>nombre.apellido);
    console.log(resul);
  
}else{
    console.log("usuario no valido");
    
}
