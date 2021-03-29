var genButton = document.getElementById('gen-button');
var delButton = document.getElementById('del-button');


genButton.addEventListener("click", function() {

    const priceFactor = 0.21; //price per km
    const juniorDiscount = 1.0 - 0.2;
    const seniorDiscount = 1.0 - 0.4;

    var userName = document.getElementById('username').value;
    var distanceInKm = parseInt(document.getElementById('distance').value);

    if (userName === "" || !distanceInKm || distanceInKm <= 0) {
        alert("Dati inseriti non validi")
    } else {
        var outputString;
        var priceCoeff;
        switch (document.getElementById('age-range').value) {
            case 'under':
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

        var finalPrice = priceFactor * priceCoeff * distanceInKm;
        document.getElementById('ticket-wrapper').className = '';
        populateHTML('user', userName);
        populateHTML('offer', outputString);
        populateHTML('wagon', getRandInt(1, 10));
        populateHTML('cp-code', getRandInt(10000, 99999));
        populateHTML('price', finalPrice.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));
    }

})

delButton.addEventListener("click", function() {
    var idElementsToEmpty = ['user', 'offer', 'wagon', 'cp-code', 'price'];
    for (var element of idElementsToEmpty) {
        populateHTML(element, '');
    }
    console.log(element)
    document.getElementById('ticket-wrapper').className = 'nada';
    document.getElementById('username').value = '';
    document.getElementById('distance').value = '';
    document.getElementById('age-range').value = 'placeholder';
})

function populateHTML(id, content) {
    var el = document.getElementById(id);
    el.innerHTML = content;
}

function getRandInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}