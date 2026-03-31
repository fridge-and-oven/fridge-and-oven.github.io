/* eslint-disable complexity */
$(function () {
    // 1. New Validation Function
    function validateForm() {
        var name = $('#name').val().trim();
        var phone = $('#phone').val().trim();
        var size = $('#size').val();
        var amount = $('#amount').val().trim();
        var date = $('#datepicker').val().trim();
        var pickup = $("input[name='pickupMethod']:checked").val();
        var pickupTime = $('#pickup-time').val();

        var isAmountNumeric = (amount !== "" && !isNaN(amount));
        var isPhoneGood = (phone !== "" && !isNaN(phone) && phone.length === 10);
        
        var serviceType = $("input[name='serviceType']:checked").val();
        var address = $('#deliveryAddress').val().trim();
        var addressPin = $('#deliveryAddressPin').val().trim();

        var allFilled = (name !== "" && phone !== "" && size !== null && amount !== "" && date !== "" && pickupTime !== null && pickup !== undefined);

        if (serviceType === "delivery") {
            allFilled = allFilled && (address !== "") && (addressPin !== "");
        } 

        if (!isPhoneGood && phone !== "") {
            $('#validationMsg').html('<i class="bi bi-exclamation-circle me-1"></i>Phone number must be 10 numbers.');
            $('#validationMsg').fadeIn(200);
            $('#orderButton').prop('disabled', true);
        }
        else if (!isAmountNumeric && amount !== "") {
            $('#validationMsg').html('<i class="bi bi-exclamation-circle me-1"></i>Amount must be a number.');
            $('#validationMsg').fadeIn(200);
            $('#orderButton').prop('disabled', true);
        } else if (!allFilled) {
            $('#validationMsg').html('<i class="bi bi-exclamation-circle me-1"></i>Please fill in all fields before submitting.');
            $('#validationMsg').fadeIn(200);
            $('#orderButton').prop('disabled', true);
        } else {
            $('#validationMsg').fadeOut(200);
            $('#orderButton').prop('disabled', false);
        }
    }

    function addLegend() {
        setTimeout(function() {
            var footer = $('<div class="datepicker-footer-legend">' +
                '<div class="legend-row"><div class="legend-box box-yellow"></div>Srinakarin 38 (Mon/Thu)</div>' +
                '<div class="legend-row"><div class="legend-box box-blue"></div>Chongnonsi (Tue/Wed/Fri/Sat)</div>' +
            '</div>');
            if ($('#ui-datepicker-div').find('.datepicker-footer-legend').length === 0) {
                $('#ui-datepicker-div').append(footer);
            }
        }, 1);
    }

    // ข้อมูลวันหยุดร้าน (YYYY-MM-DD)
    var disabledDates = ["2026-04-10", "2026-04-11", "2026-04-13", "2026-04-14", "2026-04-15", "2026-04-16"];

    // เริ่มตั้งค่า Datepicker
    $("#datepicker").datepicker({
        minDate: +5, 
        dateFormat: 'dd/mm/yy',
        beforeShow: addLegend, // แสดง Legend สีข้างล่างปฏิทิน
        onChangeMonthYear: addLegend,
        beforeShowDay: function(date) {
            var day = date.getDay();
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            var pickupType = $("input[name='pickupMethod']:checked").val();
            
            var isHoliday = (disabledDates.indexOf(string) != -1);
            var isSunday = (day === 0);
            var isStoreDay = (day === 1 || day === 4); 
            var isHomeDay = (day === 2 || day === 3 || day === 5 || day === 6); 

            var isSelectable = false;
            var className = "";

            if (!isSunday && !isHoliday) {
                if (pickupType === "Srinakarin 38" && isStoreDay) {
                    isSelectable = true;
                    className = "highlight-yellow";
                } else if (pickupType === "Chongnonsi" && isHomeDay) {
                    isSelectable = true;
                    className = "highlight-blue";
                }
            }
            return [isSelectable, className];
        }
    }); // <--- ปิด Datepicker ตรงนี้ให้ครบ

    // 3. Listeners for input changes
    $('#name, #phone, #amount, #size, #pickup-time, #deliveryAddress, #deliveryAddressPin').on('keyup change input', validateForm);

    $("input[name='pickupMethod']").on("change", function() {
        $("#datepicker").val(""); 
        $("#datepicker").datepicker("refresh");
        validateForm();
    });

    $("input[name='serviceType']").on("change", function() {
        var serviceType = $(this).val();
        if (serviceType === "pickup") {
            $("#deliveryAddressContainer").hide();
            $("#deliveryAddressPinContainer").hide();
            $("#deliveryAddress").val("");
            $("#deliveryAddressPin").val("");
        } else {
            $("#deliveryAddressContainer").show();
            $("#deliveryAddressPinContainer").show();
        }
        $("#datepicker").val(""); 
        $("#datepicker").datepicker("refresh");
        validateForm();
    });
});


