

const csv = require('csv-parser');
const fs = require('fs');
const rgv =require('yargs').argv;

const filepath = "pro.csv"
const results = [];

fs.createReadStream(filepath)

    .on('error', () => {

        // handle error
    })
    .pipe(csv())
    //.pipe(fs.createWriteStream('./jola.json'))
    .on('data', (row) => {
    
        results.push(row)
        //console.log(row)
        //console.log(results)
        //fs.createWriteStream(row)
    })

    .on('end', () => {
        // handle end of CSV
        //console.log(results)

        if (rgv.usuario ==='mostrar'){
            //console.log(results);
            //let res=results[4];
            //console.log(res.col);
         
            //let resul= results.find(Country_Name => Country_Name=='Aruba');
            //console.log(resul)
            //console.log(results);
        }else{
            console.log("codigo no valido");
            
        

        }
    });


fs.readFile('api.csv', 'utf8', function (err, data) {
  var dataArray = data.split(/\r?\n/);
  //Be careful if you are in a \r\n world...
  //Your array contains ['ID', 'D11', ... ]
  //console.log(dataArray); 
  //console.log(dataArray.length);
let b=0;
let d=0;
let acum=0;
let count=0;
let sus_pai=0;
let pais="";
const mayor1 = [];
const mayor = [];
let l=0;
  for(var i = 0; i < dataArray.length-1;i++){
        
        d=dataArray[i].split('","');
        //console.log(); 
        //console.log(d); 
        

        for(var j = 0; j < d.length;j++){
           
            if (d[j]=='2005'){
                 b = j
                 console.log(d[j]);   
                
            }
            
            if (sus_pai<Number(d[b]) && i>4 && l<6){
              mayor1.push(d[j]+":"+Number(d[b]));
              console.log(d[0]);
              l+=1;
            }
                

             if (d[j]=='"Aruba'){
             pais=d[j];
                sus_pai=Number(d[b])
                
                 console.log(Number(d[b]));
            }   
        }
        if (i>4){ 
           
            
          if(d[b]==""){
            console.log(d[0],' : ',0);
            
            //console.log(0);
            acum+=0;
            count=count+1;
          }else{
            console.log(d[0],':',d[b]);
           // console.log(d[b]);
            count=count+1;
              acum+=Number(d[b]);
             mayor.push(Number(d[b]));
            
          }
        }
        //console.log(dataArray[i].split(','));
        

    
       }
      /* console.log(acum);
       console.log(count);
       console.log(acum/count);*/

       console.log('LOS QUE 5 MAYORES')
       console.log(mayor1);
       
      //  console.log(mayor.sort(function (a, b){
      //   return a - b;
      // }))
      
      // // Sintaxis ES2015
      // console.log(mayor.sort((a, b) => a - b ))
       
      

       console.log("media mundial");
       console.log(acum/count);
       if(sus_pai<acum)  {
        console.log("la sucripcion: ",sus_pai ," del país: ",pais," es menor a la media mundial")

       } else{
        console.log("la sucripcion: ",sus_pai ," del país: ",pais," es mayor a la media mundial")

       }
       
  //console.log(dataArray);
  //console.log(dataArray.length);
  //let m=dataArray[1].split(',');
  //console.log(m[0]);
//   for(var i = 0; i < m.length;i++){
//     console.log(i);
//   }
})
// Sintaxis ES5
