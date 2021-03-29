var genButton = document.getElementById('gen-button');
var delButton = document.getElementById('del-button');


genButton.addEventListener("click", function () {
    const priceFactor = 0.21; //price per km
    const juniorDiscount = 1.0 - 0.2;
    const seniorDiscount = 1.0 - 0.4;

    var userName = document.getElementById('username').value;
    var distanceInKm = parseInt(document.getElementById('distance').value);

    var outputString;
    var priceCoeff;
        switch (document.getElementById('age-range').value) {
            case 'minorenne': 
            priceCoeff = juniorDiscount;
                outputString = "Sconto Minorenne";
                break;
            case 'over':
                priceCoeff = seniorDiscount;
                outputString = "Sconto Over 65";
                break;
            default:
                priceCoeff = 1;
                outputString = "Tariffa piena";
        }

    var finalPrice = priceFactor*priceCoeff*distanceInKm;
    var el = document.getElementById('ticket-wrapper');
    el.className = 'block';
    populateHTML('user', userName);
    populateHTML('offer', outputString);
    populateHTML('price', finalPrice.toLocaleString("it-IT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }));
 
})

delButton.addEventListener("click", function () { 
    document.getElementById('ticket-wrapper').className = 'nada';
    document.getElementById('username').value = '';
    document.getElementById('distance').value = '';
    document.getElementById('age-range').value = 'placeholder';
})

function populateHTML(id, content) {
    var el = document.getElementById(id);
    el.innerHTML = content;
}






