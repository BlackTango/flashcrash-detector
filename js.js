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

function datatransformer(data){
    var a=JSON.parse(data) 



    for(var b=0;b<a.length;b++){
        var best1=0;
        if(a[b].percent_change_1h > best1){
            best1=a[b].percent_change_1h;
        }
    }

    console.log(best1);

    for(var b=0;b<a.length;b++){
        var best24=0;
        if(a[b].percent_change_24h > best24){
             best24=a[b].percent_change_24h;
        }
    }

    console.log(best24);

    for(var b=0;b<a.length;b++){
        var best7=0;
        if(a[b].percent_change_7d > best7){
            best7=a[b].percent_change_7d;
        } 
    }

    console.log(best7);

    for(var b=0;b<a.length;b++){
        if(a[b].percent_change_1h <= -5 || a[b].percent_change_24h <= -15 || a[b].percent_change_7d <= -30 ){   
            console.log(a[b].id);
            console.log(a[b].percent_change_1h);
            console.log(a[b].percent_change_24h);
            console.log(a[b].percent_change_7d);
        }
    }


}



httpGetAsync("https://api.coinmarketcap.com/v1/ticker/",datatransformer);

