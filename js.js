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
    if(datamaster.length>25){
        datamaster.shift();
        datamaster.push(a);
    }else{
        datamaster.push(a);
    }


    console.log(datamaster)

}


while (1){
    httpGetAsync("https://api.coinmarketcap.com/v1/ticker/",datatransformer);
    setTimeout(function(){}, 3000);
}

