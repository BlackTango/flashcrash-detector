//la variable qui va contenir tout les json files pour les comparer entre eux
var datamaster =[];


// fonction pour faire des assync call pour les api 
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

//la fonction qui est appelé apres le api call(assync).
function datatransformer(data){
    // on transforme le json en array.
    var a=JSON.parse(data) 
    
    // Si la variable qui contient tout les json file est plus grand que 25 (5 minutes),
    // enleve le premier et ajoute le nouveau.
    // si non ajoute le nouveau.
    if(datamaster.length>=30){
        datamaster.shift();
        datamaster.push(a);
    }else{
        datamaster.push(a);
    }

    var crach=[];

    for (var a=0;a<datamaster[0].length;a++){

        var temp={
            name : "lol",
            changement : 0
        };

        temp.name=datamaster[0][a].name;
        temp.changement = (datamaster[0][a].price_usd/datamaster[datamaster.length-1][a].price_usd)-1
        crach.push(temp);
        
    }
    console.log(crach);



 // console.log("the coin name is : "+datamaster[0][0].name)
  //console.log("the first price is : "+datamaster[0][0].price_usd)
  //console.log("the last case is :"+(datamaster.length-1))
  //console.log("the last price is : "+datamaster[datamaster.length-1][0].price_usd)
  //console.log("the price div : "+(datamaster[0][0].price_usd/datamaster[datamaster.length-1][0].price_usd))




}

function appel(){
    // fait un appel asynk a coin market cap pour avoir tout les prix de tout les coins 
    httpGetAsync("https://api.coinmarketcap.com/v1/ticker/",datatransformer);
}


setInterval(appel,10000);




