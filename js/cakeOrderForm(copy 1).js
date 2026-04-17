var cake;
var cakeSizes = {}; // เปลี่ยนเป็น Object เพื่อเก็บคู่ "ไซส์:ราคา"

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
function order() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var sizeElement = document.getElementById('size').value;
    var size = sizeElement.value;
    var amount = parseInt(document.getElementById('amount').value) || 1;
    
    // --- ส่วนคำนวณราคาและส่วนลด ---
    var pricePerUnit = parseFloat(sizeElement.options[sizeElement.selectedIndex].getAttribute('data-price')) || 0;
    var totalPrice = pricePerUnit * amount;
    var discountDetail = "";

    var noQuestions = document.getElementById('noQuestions') ? document.getElementById('noQuestions').checked : false;

    if (noQuestions && totalPrice > 0) {
        var discount = totalPrice * 0.10;
        totalPrice = totalPrice - discount;
        discountDetail = `\n(Discount 10% Applied: No more questions)`;
    }
    // ----------------------------

    var deliveryDate = document.getElementById('datepicker').value;
    var pickupTime = document.getElementById('pickup-time').value;
    var notes = document.getElementById('notes').value;
    var serviceType = document.querySelector('input[name="serviceType"]:checked').value;

    var url = "https://line.me/R/oaMessage/@fridgeandoven/?";
    var method = document.querySelector('input[name="pickupMethod"]:checked').value;

    // แก้ไขจุดนี้: ใช้ if/else หรือแก้ Ternary ให้ถูกต้อง
// แก้ไขจาก : : เป็น if/else แบบนี้จะปลอดภัยที่สุดครับ
    var locationDetail = "";
    if (serviceType === "delivery") {
        locationDetail = `Location: ${method}\n    Delivery Address: ${document.getElementById('deliveryAddress').value}\n    Delivery Pin: ${document.getElementById('deliveryAddressPin').value}`;
    } else {
        locationDetail = `Pickup Location: ${method}`;
    }

    // ใช้ความพยายามดึงค่า cake (เช็คว่ามีการประกาศไว้นอกฟังก์ชันแล้ว)
    var cakeName = (typeof cake !== 'undefined' && cake) ? cake.replaceAll("-", " ") : "Cake";

    var rawMessage = `Pre-order: ${cakeName}
Name: ${name}
Phone: ${phone}
Size: ${size}
Amount: ${amount}
Total Price: ${totalPrice.toLocaleString()} THB ${discountDetail}
Delivery Date: ${deliveryDate}
Pickup Time: ${pickupTime}
Notes: ${notes}
${locationDetail}`;

    var message = encodeURIComponent(rawMessage);
    window.open(url + message);
}