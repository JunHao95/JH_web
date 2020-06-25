alert("Disclaimer: Venture at your own risk" );

/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
// Instruction from https://materializecss.com/navbar.html
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
});
M.AutoInit();


var prices = document.getElementsByClassName("price");
Object.keys(prices);

var volumes = document.getElementsByClassName("volume");
Object.keys(volumes);

var UTCtoday = new Date();
let UTCdatetime = UTCtoday.toISOString();
UTCdatetime = UTCdatetime.slice(0, 23);


var usaTime = new Date().toLocaleString("en-US", {
  timeZone: "America/New_York",
  hour12: false
});
console.log(usaTime);
var month = usaTime.slice(0, 1);
var year = usaTime.slice(5, 9);
var day = usaTime.slice(2, 4);

var hour = usaTime.slice(11, 13);

var min = usaTime.slice(14, 16);
//var sec = usaTime.slice(17,19);
const sec = "00";

if (min % 5 != 0) {
  min = min - (min % 5);
  if (min <= 9) {
    min = "0" + min;
  }
}

var time = hour + ":" + min + ":" + sec;
console.log(time)

if (day <= 9) {
  day = "0" + day;
}
if (month <= 9) {
  month = "0" + month;
}

if(hour >= 16) {
  var time = "16" + ":" + "00" + ":" + "00";
}

if(hour <= "09") {
  var day = day - 1;
  var time = "16" + ":" + "00" + ":" + "00";
 
}
console.log(hour);



var newDate = year + "-" + month + "-" + day;
var dateTime = newDate + " " + time;
console.log(dateTime);

async function getSPrice(ticker,i) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=TJRW9PM95YXUB39H`
  );
  const data = await response.json(); // FX_INTRADAY&from_symbol=EUR&to_symbol=USD OR DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY

  //const ul = document.getElementById('stocks');
  const price = data["Time Series (5min)"][dateTime]["4. close"];//["2020-05-20 16:00:00"]["4. close"];//
  const vol = data["Time Series (5min)"][dateTime]["5. volume"];
  console.log(price);
  prices[i].innerHTML = price;
  volumes[i].innerHTML = vol;
}

async function getFPrice(ticker,i) {
  
  var currency = ticker.split("/");
  var fromCurrency = currency[0];
  var toCurrency = currency[1];
  console.log(toCurrency);
  
  const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=TJRW9PM95YXUB39H`);
  const data = await response.json(); // FX_INTRADAY&from_symbol=EUR&to_symbol=USD OR DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY
  console.log(data);
  
  const price = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];//["2020-05-20 16:00:00"]["4. close"];//
  
  console.log(price);
  prices[i].innerHTML = price;
  volumes[i].innerHTML = "Not Available";
  
}


//can get volume as well
//  data.bids.forEach(bid => {
// 	const li = document.createElement('li');
//   li.classList.add('some-class'); // for style
//   li.innerHTML = bid.price;
//    ul.appendChild(li);
// })
//}

function refreshStocks() {
  var tickers = document.getElementsByClassName("ticker");
  var priceArray 
  var navlist = document.querySelector('#mobile-demo');
  var childNode = navlist.querySelector('.active');
  
  Object.keys(tickers).forEach(function(key) {
    var currentTicker = tickers[key].innerHTML;
    if(childNode.firstChild.innerHTML == "Stocks"){
       var currentPrice = getSPrice(currentTicker,key);
       console.log(currentPrice);
    }
    else if(childNode.firstChild.innerHTML == "Forex" || childNode.firstChild.innerHTML == "Bitcoin"){
       var currentPrice = getFPrice(currentTicker,key);
       console.log(currentPrice);
    }
   
    
   // prices[0].innerHTML = currentPrice;
    
  });
}


//document.getElementById("add").addEventListener("click", addItem())

function addItem(){
  console.log("ds");
  var ticker = prompt("Please enter ticker symbol of stock:", "IBM or SGD/USD OR BTC/USD");
  
  if (ticker== "") {
    while (ticker== "") {
      alert("Please enter a valid ticker");
      var ticker = prompt("Please enter ticker symbol of stock:", "IBM or SGD/USD OR BTC/USD");
      if(ticker == null){
        return;
      }
    }
  }
  else if(ticker == null){
    return;
  }
  
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  tr.setAttribute("id", ticker);
  td1.classList.add('ticker'); // for style
  td2.classList.add('price'); // for style
  td3.classList.add('volume'); // for style
  td1.innerHTML = ticker;
  tr.appendChild(td1); 
  tr.appendChild(td2); 
  tr.appendChild(td3); 
  document.getElementById("stockstbl").appendChild(tr);
}

function deleteItem(ticker){
  var item = document.getElementByID(ticker);
  item.remove();
}

window.addEventListener('load',function(){
  console.log("the");
  document.getElementById("add").addEventListener("click", addItem, false);
  //refreshStocks();
   
});
  
//var testContainer = document.querySelector('#test');
//var fourChildNode = testContainer.querySelector('.four');


//694D4BGKIBXX1N4E api key for