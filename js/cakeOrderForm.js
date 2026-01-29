var cake;
function setCake(){
    try{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Get a specific parameter
        cake = urlParams.get('cake'); // cake name
        document.getElementById('cake').innerHTML = cake.replaceAll("-"," ");
        
    }
    catch (error) {
        console.error(error);
        document.getElementById('cake').innerHTML = "Please order a cake";
    }

}
function order(){
    var name = document.getElementById('name').value; // Nomad
    var phone = document.getElementById('phone').value;
    var size = document.getElementById('size').value;
    var amount = document.getElementById('amount').value;
    var deliveryDate = document.getElementById('datepicker').value;
    var notes = document.getElementById('notes').value;
    var url = "https://line.me/R/oaMessage/@fridgeandoven/?";
    var message = "Pre-order:%20"+cake.replaceAll("-","%20")+"%20name:%20"+name+"%20phone:%20"+phone+"%20size:%20"+size+"%20amount:%20"+amount+"%20Delivery%20Date:%20"+deliveryDate+"%20notes:%20"+notes;
    console.log(url+message);

    window.open(url+message);
    }

function test(){
    document.getElementById("demo").innerHTML = "Hello World";
}
window.onload = setCake();
