var cake;
var cakeSizes;

function setCake(){
    try{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Get a specific parameter
        cake = urlParams.get('cake'); // cake name
        document.getElementById('cake').innerHTML = cake.replaceAll("-"," ");

        //set the cake sizes
        setCakeSizes(urlParams);
        
    }
    catch (error) {
        console.error(error);
        document.getElementById('cake').innerHTML = "Please order a cake";
    }

}

function setCakeSizes(urlParams){
    try{
        // Get a specific parameter
        cakeSizes = urlParams.get('sizes'); // sizes names
        const sizeSelect = document.getElementById('size');

        if (cakeSizes) {
            // Clear existing static options except the first "Select Cake Size"
            sizeSelect.innerHTML = '<option value="" selected disabled>Select Cake Size</option>';
            
            // Split string by comma and create new options
            const sizesArray = cakeSizes.split('{');
            sizesArray.forEach(size => {
                const option = document.createElement('option');
                option.value = size.trim().toLowerCase();
                // Capitalize first letter for the display label
                option.textContent = size.trim().charAt(0).toUpperCase() + size.trim().slice(1);
                sizeSelect.appendChild(option);
            });
        }

    }
    catch (error) {
        console.error("cake sizes weren't added to url params: " + error);
        document.getElementById('cake').innerHTML = "Please order a cake";
    }

}

function order(){
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var size = document.getElementById('size').value;
    var amount = document.getElementById('amount').value;
    var deliveryDateRaw = document.getElementById('datepicker').value;
    var pickupTime = document.getElementById('pickup-time').value;
    var notes = document.getElementById('notes').value;
    var serviceType = document.querySelector('input[name="serviceType"]:checked').value;// Get Service Type (Pickup or Delivery)  

    var url = "https://line.me/R/oaMessage/@fridgeandoven/?";

    // Convert the date
    var deliveryDate = formatDate(deliveryDateRaw);

    // Build the dynamic part of the message
    var locationDetail = "";
    var method = document.querySelector('input[name="pickupMethod"]:checked').value;
    if (serviceType === "delivery") {
        var address = document.getElementById('deliveryAddress').value;
        var addressPin = document.getElementById('deliveryAddressPin').value;
        locationDetail = `Location: ${method}
    Delivery Address: ${address}
    Delivery Pin: ${addressPin}`;
    } else {
        locationDetail = `Pickup Location: ${method}`;
    }

    var rawMessage = `Pre-order: ${cake.replaceAll("-", " ")}
    Name: ${name}
    Phone: ${phone}
    Size: ${size}
    Amount: ${amount}
    Delivery Date: ${deliveryDate}
    Pickup Time: ${pickupTime}
    Notes: ${notes}
    ${locationDetail}`;

    var message = encodeURIComponent(rawMessage);

    console.log(url+message);

    window.open(url+message);
}

// Helper function to format MM/DD/YYYY to "Month DaySuffix, Year"
function formatDate(dateStr) {
    if (!dateStr) return "";
    
    var date = new Date(dateStr);
    // Check if the date is valid
    if (isNaN(date.getTime())) return dateStr; 

    var months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
    
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    // Determine the correct ordinal suffix (st, nd, rd, th)
    var suffix = "th";
    if (day < 11 || day > 13) {
        // eslint-disable-next-line default-case
        switch (day % 10) {
            case 1: suffix = "st"; break;
            case 2: suffix = "nd"; break;
            case 3: suffix = "rd"; break;
        }
    }

    return `${month} ${day}${suffix}, ${year}`;
}

function test(){
    document.getElementById("demo").innerHTML = "Hello World";
}
window.onload = setCake();
