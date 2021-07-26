const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const API_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=981a406d4a3c26821eaa234cb3fe0ba6&format=1"

let html =  '';

async function currency(){
    const res = await fetch(API_URL);
    const data = await res.json();
    const rates = data.rates;
    const arrKeys = Object.keys(data.rates);
    console.log(arrKeys)
    arrKeys.map(item=>{
        return html += `<option value=${item}>${item}</option>`
    })
    for(let i=0;i<select.length;i++){
        select[i].innerHTML = html;
    }
    input[0].addEventListener('keyup', ()=>{
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
    })
    input[1].addEventListener('keyup', ()=>{
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];
    })
    select[0].addEventListener('change', ()=>{
        input[0].value = input[0].value * rates[select[1].value] / rates[select[0].value];
    })
    select[1].addEventListener('change', ()=>{
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];
    })
}

function initMap(){
    var options ={
        center:{lat: 52.370216 , lng: 4.895168},
        zoom:13 

    }
    map = new google.maps.Map(document.getElementById("map"),options)
}


currency();
