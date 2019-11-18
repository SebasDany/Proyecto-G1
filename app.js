const csv = require('csv-parser');
const fs = require('fs');
const rgv = require('yargs').argv;
const colors = require('colors');

let  km = ''
const results = [];
let path = rgv.file;
let ciudadCod = rgv.country;
let anio = rgv.year
const metodo = require('./cargarhtml.js');
let salir = rgv.out
if (rgv.year == null) {
    anio = 2018;
}




if ((rgv.usuario === 'publicar' || rgv.usuario === 'guardar') && Number(rgv.year)) {
    //console.log(results);

    fs.readFile(path, 'utf8', function(err, data) {
        data = data.replace(/"/g, "");
        var dataArray = data.split(/\r?\n/);

        let b = 0;
        let d = 0;
        let acum = 0;
        let count = 0;
        let sus_pai;
        let pais = "";
        let Cod = "";

        const mayor1 = [];
        const top = {};
        const top2 = [];

        const menor = [];
        let l = 0;
        let m = 0;
        let k = '';
        let k1 = '';
        let an = ''
        let sg;
        let top1 = '';
        for (var i = 0; i < dataArray.length - 1; i++) {

            d = dataArray[i].split(',');

            for (var j = 0; j < d.length; j++) {

                if (d[j] == anio) {
                    b = j
                        //console.log('AÑO :',d[j]); 
                    an = d[j];
                }
                if (d[j] == ciudadCod) {
                    pais = d[j - 1];
                    Cod = d[j];
                    sus_pai = Number(d[b])
                }
            }
            if (i > 4) {

                if (sus_pai < Number(d[b]) && l < 5) {
                    mayor1.push(d[0] + ":" + Number(d[b]));
                    // console.log(d[0]);
                    l += 1;
                }
                if (sus_pai > Number(d[b]) && m < 5) {
                    menor.push(d[0] + ":" + Number(d[b]));
                    // console.log(d[0]);
                    m += 1;
                }
                if (d[b] == "") {
                    //console.log(d[0],d[1],' : ',0);
                    acum += 0;
                    count = count + 1;
                } else {
                    // console.log(d[0],d[1],':',d[b]);
                    count = count + 1;
                    acum += Number(d[b]);
                    top[Number(d[b])] = d[0];
                }
            }

        }
        if(pais!=""){

        

        console.log('')
        console.log('')
        console.log(`LA MEDIA DE SUSCRIPCIONES DE TODOS LOS PAISES EN LA ANUALIDAD (YEAR) ESPECIFICADA : `.blue, `${ acum/count}`.green);
        console.log('')
        console.log('')
        sg = acum / count;
        
        if (sus_pai < acum) {

            console.log(`LAS SUSCRIPCIONES:`.blue, ` ${ sus_pai} `.green, ` DEL PAIS:`.blue, ` ${pais} : ${Cod}`.green, `ES MENOR A LA MEDIA MUNDIAL `.blue)
            console.log('')
            console.log('')

        } else {
            console.log(`LAS SUSCRIPCIONES:`.blue, ` ${ sus_pai} `.green, ` DEL PAIS:`.blue, ` ${pais} : ${Cod}`.green, `ES MAYOR A LA MEDIA MUNDIAL `.blue)
            console.log('')
            console.log('')

        }

        console.log(`LOS CINCO PAISES POR ENCIMA DEL VALOR DE SUSCRIPCIONES DEL PAIS DETERMINADO`.blue)
        if(mayor1.length==0){
            console.log(`NO HAY PAISES`.red);
        }
        for (var j = 0; j < mayor1.length; j++) {
             console.log(mayor1[j].green);
            
        }
        
        console.log('')
        console.log('')

        console.log(`LOS CINCO PAISES POR DEBAJO DEL VALOR DE SUSCRIPCIONES DEL PAIS DETERMINADO`.blue)
        if(menor.length==0){
            console.log(`NO HAY PAISES`.red);
        }
        for (var j = 0; j < menor.length; j++) {
            console.log(menor[j].green);
            
           
       }
        console.log('')
        console.log('')

        console.log(`EL TOP CINCO DE PAISES PARA LA ANUALIDAD(YEAR) ESPECIFICADA`.blue)
        console.log(`SU->SUSCRIPCIONES`.bgBlue)
            //console.log(top);
        var keys = Object.keys(top);
        var i, len = keys.length;
        keys.sort((a, b) => a - b);
        var sortedDict = [];
        for (i = 0; i < len; i++) {

            k = keys[i];
            sortedDict.push({ 'SU': k, ' PAIS ': top[k] });
        }

        //Result
        let x = 0
        for (let t5 = sortedDict.length - 1; t5 >= sortedDict.length - 5; t5--) {
            console.log(JSON.stringify(sortedDict[t5]).replace(/["{} ]/g, " ").green);

            JSON.stringify(sortedDict[t5]);
            x += 1;
            top1 += "<tr><tr><th scope=row>" + x + "</th><td>" + JSON.stringify(sortedDict[t5]).replace(/["{} ]/g, " "); + "<td></tr>";
            top2.push(JSON.stringify(sortedDict[t5]).replace(/["{} ]/g, " "));
        }
        console.log('')
        console.log('')

        if (rgv.usuario === 'guardar' && rgv.out === salir) {
            console.log(salir)
            metodo.guardarDatos(salir, " ", "\n=== PAIS BUSCADO: " + pais + "\t, CODIGO DEL PAIS: " + Cod + "\t, ANUALIDAD (YEAR): " + an + "\t" + ", LA MEDIA DE SUSCRIPCIONES MUNDIAL: " + sg + " ===")
        
    
                s1=sus_pai<acum
                if(s1===true){
                    s1='Verdadero'
                }else{
                    s1='Falso'
                }
                metodo.guardarDatos(salir, " ", "\n LAS SUSCRIPCIONES: " + sus_pai + "\t, DEL PAIS: " + pais + " ES MENOR A LA MEDIA MUNDIAL: "+s1)
                metodo.guardarDatos(salir, mayor1, "\nLOS CINCO PAISES POR ENCIMA DEL VALOR DE SUSCRIPCIONES DEL PAIS DETERMINADO  EN LA ANUALIDAD (YEAR):  \t" + an + "\n")
                metodo.guardarDatos(salir, menor, "\nLOS CINCO PAISES POR DEBAJO DEL VALOR DE SUSCRIPCIONES DEL PAIS DETERMINADO EN LA ANUALIDAD (YEAR):  \t" + an + "\n")
               
                metodo.guardarDatos(salir, top2, "\nEL TOP CINCO DE PAISES PARA LA ANUALIDAD(YEAR) ESPECIFICADA: \t" + an + "\n")
                metodo.guardarDatos(salir, " ", "\n================================================================================================================")
    
        
          
           
        }

        for (var j = 0; j < mayor1.length; j++) {
            km += "<tr><th scope=row>" + j + "</th><td>" + mayor1[j] + "<td></tr>";
            

        }
        for (var j = 0; j < menor.length; j++) {
        k1 += "<tr><tr><th scope=row>" + j + "</th><td>" + menor[j] + "<td></tr>";

    }
        metodo.cargarHtml("<div class=container><div id=content><table class=table><thead class=thead-dark><tr><th scope=col>AÑO</th><th scope=col>PAÍS</th><th scope=col>CÓDIGO</th><th scope=col>#SUSCRIPCIONES</th><th scope=col>MEDIA GLOBAL</th></tr></thead><tbody><tr><td>" + an + "</td><td>" + pais + "</td><td>" + Cod + "</td><td>" + sus_pai + "</td><td>" + sg + "</td></tbody></table><div class=container><div id=content><table class=table><thead class=thead-dark><tr><th scope=col>#</th><th scope=col> Paises por encima del valor de suscripciones </th></tr></thead><tbody></BR>" + km + "</tbody></table><table class=table><thead class=thead-dark><tr><th scope=col>#</th><th scope=col> Paises por debajo del valor de suscripciones </th></tr></thead><tbody>" + k1 + "</tbody></table><table class=table><thead class=thead-dark><tr><th scope=col>#</th><th scope=col> Top de los 5 paises con mas suscripciones (SU -> SUSCRIPCIONES) </th></tr></thead><tbody>" + top1 + "</tbody></table></div></div></div>")
    }else{
        console.log(`USTED DEBE ESCRIBIR UN PAIS EXISTENTE EN LA BASE DE DATOS CAMBIE EL CODIGO EN COUNTRY`.red);
        console.log('');
        console.log('RECUERDE QUE TAMBIEN SU CODIGO DEBE ESTAR EN MAYUSCULAS'.cyan);
    }
});
} else {

    console.log(`USTED ESCRIBIO:`.cyan, ` ${ rgv.usario }`.red, `  `.cyan, `${ rgv.year }`.red)
    console.log('');
    console.log(`USTED DEBE ESCRIBIR DE ESTA MANERA SI QUIERE PUBLICAR`.cyan);
    console.log('');
    console.log(`node app.js --usuario=publicar --file=api.csv --country=BDI --year=2000`.green)
    console.log('');
    console.log(`USTED DEBE ESCRIBIR DE ESTA MANERA SI QUIERE GUARDAR `.cyan);
    console.log('');
    console.log(`node app.js --usuario=guardar --file=api.csv --country=BDI --year=2000 --out=resultado/informacion`.green)
    console.log('');
    if (!Number(rgv.year)) {
        console.log(`EL VALOR INTRODUCIDO:`.cyan, ` ${ rgv.year }`.red, `NO ES UN NUMERO`.cyan)

    }
}