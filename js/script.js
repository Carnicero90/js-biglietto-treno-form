// EVENT LISTENER HTML ELEMENTS

var genButton = document.getElementById('gen-button');
var delButton = document.getElementById('del-button');
var payButton = document.getElementById('pay-button');

// EVENTS

// GENERATE TICKET
genButton.addEventListener("click", function() {
    // PRICE FACTOR VALUES
    const priceFactor = 0.21; //price per km
    const juniorDiscount = 1.0 - 0.2; //20% discount for under 18
    const seniorDiscount = 1.0 - 0.4; //40% discount for over 65
    var distanceInKm = parseInt(document.getElementById('distance').value);

    var userName = document.getElementById('username').value;

    // VALIDATE USER DATA
    if (userName === "" || !distanceInKm || distanceInKm <= 0) {
        alert("Dati inseriti non validi")
    } else {
        // MAIN

        // SET DISCOUNT BASED ON USER SELECTED OPTION
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
        // FINAL PRICE
        var finalPrice = priceFactor * priceCoeff * distanceInKm;

        // DISPLAY div#ticket-detail (CONTAINING TRAVEL DATA)
        removeClass("ticket-detail", 'nada')
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

// RESET PAGE CONTENT
delButton.addEventListener("click", function() {
    // HIDE div#ticket-detail AND UNFILL HIS .innerHTMLs
    addClass('ticket-detail', 'nada');
    var idElementsToEmpty = ['user', 'offer', 'wagon', 'cp-code', 'price'];
    for (var element of idElementsToEmpty) {
        populateHTML(element, '');
    }
    // UNFILL div.user-form
    document.getElementById('username').value = '';
    document.getElementById('distance').value = '';
    document.getElementById('age-range').value = 'placeholder';
})

payButton.addEventListener('click', function() {
    removeClass('logging-wrapper', 'nada');
    addClass('main', 'opaq');
    setTimeout(function() {
        location.reload();
    }, 5000);
})


// HTML MANIPULATION FUNCTIONS

function populateHTML(idElement, content) {
    // idElement --> html element's id
    // content --> content to fill .innerHTML
    document.getElementById(idElement).innerHTML = content;
}

function addClass(idElement, toAdd) {
    // idElement --> html element's id
    // toAdd --> class to add
    document.getElementById(idElement).classList.add(toAdd);
}

function removeClass(idElement, toRemove) {
    // idElement --> html element's id
    // toAdd --> class to remove
    document.getElementById(idElement).classList.remove(toRemove);
}

// MISC FUNCTIONS

function getRandInt(min, max) {
    // return a random integer between min and max (included)
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}