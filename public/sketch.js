let canvas;
let dogoData = undefined; // A - .message
let catData  = undefined; // B - .fact
let usaDataP  = undefined;
let usaDataY  = undefined; // C - .Year || .Population
let userData = undefined; // D - .results..name.first ||.results.city
let bitcoinData = undefined; // E  - bpi.USD.rate


function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    
}

function draw() {
    background(0, 50);
    newCursor();
    fill(255);

    text("Welcome to my API workshop" ,10, 10, 170, 180 );
    text("Type any of the following letters and watch the magic happen ;)" ,10, 50, 170, 180 );
    text(" A, B, C, D, E" ,10, 110, 170, 180 );


if (dogoData !== undefined) {
        image(dogoData,0,190,200,200);
    };

if (catData !== undefined) {
        fill(255)
        text(catData, 10, 500, 170, 180);
    };

if (usaDataP !== undefined) {
        fill(255)
        text ("USA population by year", 10, 600, 170, 180 )
        text(usaDataP, 10, 620, 170, 180);
        text(usaDataY, 10, 635, 170, 180);
    };

if (userData !== undefined) {
        fill(255)
        text(userData, 10, 720, 170, 180);
    };

    if (bitcoinData !== undefined) {
        fill(255)
        text ("Bitcoin EUR rate", 10, 800, 170, 180 )
        text(bitcoinData, 10, 820, 170, 180);
    };

    
} 

function mouseClicked(){
    /*
   fetch('https://dog.ceo/api/breeds/image/random')
   .then(res =>res.json())
   .then(data=> console.log(data));*/

  
   /*getDataUsa('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
   getDataUser('https://randomuser.me/api/');
   getDataBitcoin('https://api.coindesk.com/v1/bpi/currentprice.json' );*/
}
 //PROBLEMA IDENTIFICADO: Las imagenes de la API de perros son de diferentes tamaños. Sol 1: estandarizar un recuadro en el cual se hace el display. Sol 2: Que al presionar otra tecla para llamar otra API desaparezca la imagen (misma dinamica para todos)

 //creo que igual necesito estandarizar el tamaño somehow?
 
 //IDEA: Hacer una interface donde cada API tenga un espacio de display para la información + instrucciones de la tecla a presionar. 
 // Podría diseñar la imagen en figma y cargarla, usar zonas delimitadas para cada espacio (o usar HTML pero naaaaahhhhh que locha)  

function keyTyped () {
    if (key.toUpperCase() === 'A') {
    getDataDog('https://dog.ceo/api/breeds/image/random');
    } else if (key.toUpperCase() === 'B') {
        getDataCat('https://catfact.ninja/fact');
    } else if (key.toUpperCase() === 'C') {
        getDataUsa('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
    } else if (key.toUpperCase() === 'D') {
        getDataUser('https://randomuser.me/api/');
    } else if (key.toUpperCase() === 'E') {
        getDataBitcoin('https://api.coindesk.com/v1/bpi/currentprice.json');
    }
}

 // A - .message
async function getDataDog(URL) {
    const res = await fetch (URL);
    const data = await res.json();
    console.log(data.message);
    dogoData = loadImage (data.message);
}

// B - .fact
async function getDataCat(URL) {
    const res = await fetch (URL);
    const data = await res.json();
    console.log(data.fact);
    catData = data.fact;
}

//let usaData; // C - .Year || .Population

//QUE PASA SI QUIERO DISPLAY 2 DATOS? CREO QUE YA QUEDÓ

async function getDataUsa(URL) {
    const res = await fetch (URL);
    const data = await res.json();
    console.log(data.data[0].Population);
    usaDataP = data.data[0].Population;
    usaDataY = data.data[0].Year;
}
// let userData; D - .results.name.first ||.results.city
async function getDataUser(URL) {
    const res = await fetch (URL);
    const data = await res.json();
    console.log(data.results[0].name.first);
    userData = data.results[0].name.first; 
}

//let bitcoinData;// E  - bpi.USD.rate
async function getDataBitcoin(URL) {
    const res = await fetch (URL);
    const data = await res.json();
    console.log(data.bpi.EUR.rate);
    bitcoinData = data.bpi.EUR.rate; 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

