const csv = require('csv-parser');
const fs = require('fs');
const rgv =require('yargs').argv;


const filepath = "pro.csv"
const results = [];
let path=rgv.file;
let ciudadCod=rgv.country;
let anio=rgv.year
const metodo = require('./cargarhtml.js');
let salir=rgv.out
if (rgv.year==null){
  anio=2018;
}

  if (rgv.usuario ==='publicar' || rgv.usuario==='guardar'){
            //console.log(results);

fs.readFile(path, 'utf8', function (err, data) {
  data = data.replace(/"/g, "");
  var dataArray = data.split(/\r?\n/);

let b=0;
let d=0;
let acum=0;
let count=0;
let sus_pai;
let pais="";
let Cod="";

const mayor1 = [];
const top = {};
const top2 = [];

const menor = [];
let l=0;
let m=0;
let k='';
let k1='';
let an=''
let sg;
let top1='';
  for(var i = 0; i < dataArray.length-1;i++){
        
        d=dataArray[i].split(',');

        for(var j = 0; j < d.length;j++){
           
            if (d[j]==anio){
                 b = j
                 console.log('AÑO :',d[j]); 
                 an =d[j];
            }
             if (d[j]==ciudadCod){
             pais=d[j-1];
             Cod=d[j];
                sus_pai=Number(d[b])
            }   
        }
        if (i>4){ 

          if (sus_pai<Number(d[b])  && l<5){
            mayor1.push(d[0]+":"+Number(d[b]));
           // console.log(d[0]);
            l+=1;
          }
          if (sus_pai>Number(d[b])  && m<5){
            menor.push(d[0]+":"+Number(d[b]));
           // console.log(d[0]);
            m+=1;
          }   
          if(d[b]==""){
            console.log(d[0],d[1],' : ',0);
            acum+=0;
            count=count+1;
          }else{
            console.log(d[0],d[1],':',d[b]);
            count=count+1;
              acum+=Number(d[b]);
             top[Number(d[b])]=d[0];           
          }
        }

       }

       console.log('LOS QUE 5 MAYORES')
       console.log(mayor1);
       
       console.log('LOS QUE 5 menores')
       console.log(menor);
       
       console.log('top  5 mayores')
       //console.log(top);
var keys = Object.keys(top);
var i, len = keys.length;  
keys.sort((a, b) => a - b );
var sortedDict = [];
for (i = 0; i < len; i++)
{

k = keys[i];
sortedDict.push({'valor': k, 'pais':top[k]});
}

//Result
let x=0
for (let t5=sortedDict.length-1;t5>=sortedDict.length-5;t5--){
  console.log(sortedDict[t5]);
  JSON.stringify(sortedDict[t5]);
  x+=1;
  top1 +="<tr><tr><th scope=row>"+x+"</th><td>"+JSON.stringify(sortedDict[t5]).replace(/"/g, "");+"<td></tr>";
  top2.push(JSON.stringify(sortedDict[t5]));
}
       console.log("Media mundial :",acum/count);
       sg=acum/count;
       if(sus_pai<acum)  {
        console.log("la sucripcion: ",sus_pai ," del país: ",pais,":",Cod," es menor a la media mundial")

       } else{
        console.log("la sucripcion: ",sus_pai ," del país: ",pais,":",Cod," es mayor a la media mundial")

       }   
       if (rgv.usuario==='guardar' && rgv.out===salir ){
         console.log(salir)
        metodo.guardarDatos(salir, " ","\n==="+pais+"\t"+Cod+"\t"+an+"\t"+"Media mundial: "+sg+"===")
        metodo.guardarDatos(salir,mayor1,"\nLos cinco países por encima del valor de suscripciones en \t"+an+"\n")
        metodo.guardarDatos(salir,menor,"\nLos cinco países por debajo del valor de suscripciones en \t"+an+"\n") 

       }
       
      for(var j = 0; j < mayor1.length;j++){
        k += "<tr><th scope=row>"+j+"</th><td>"+mayor1[j]+"<td></tr>";
        k1 += "<tr><tr><th scope=row>"+j+"</th><td>"+menor[j]+"<td></tr>";

     }
       metodo.cargarHtml("<div class=container><div id=content><table class=table><thead class=thead-dark><tr><th scope=col>ANIO</th><th scope=col>PAIS</th><th scope=col>CODIGO</th><th scope=col>#SUSCRIPCIONES</th><th scope=col>MEDIA GOLBAL</th></tr></thead><tbody><tr><td>"+an+"</td><td>"+pais+"</td><td>"+Cod+"</td><td>"+sus_pai+"</td><td>"+sg+"</td></tbody></table><div class=container><div id=content><table class=table><thead class=thead-dark><tr><th scope=col>#</th><th scope=col> Paises por encima del valor de suscripciones </th></tr></thead><tbody>"+k+"</tbody></table><table class=table><thead class=thead-dark><tr><th scope=col>#</th><th scope=col> Paises por debajo del valor de suscripciones </th></tr></thead><tbody>"+k1+"</tbody></table><table class=table><thead class=thead-dark><tr><th scope=col>#</th><th scope=col> Top de los 5 paises con mas suscripciones </th></tr></thead><tbody>"+top1+"</tbody></table></div></div></div>")

});
}else{
  console.log("comando no valido");
}


