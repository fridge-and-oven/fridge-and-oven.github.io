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
    
        // 1. Check if Amount is a valid number
        var isAmountNumeric = (amount !== "" && !isNaN(amount));
        
        // 2. Check if all fields are filled
        var allFilled = (name !== "" && phone !== "" && size !== null && amount !== "" && date !== "" && pickup !== undefined);
    
        // 3. Logic to determine error message text
        if (!isAmountNumeric && amount !== "") {
            $('#validationMsg').html('<i class="bi bi-exclamation-circle me-1"></i>Amount must be a number.');
            $('#validationMsg').fadeIn(200);
            $('#orderButton').prop('disabled', true);
        } else if (!allFilled) {
            $('#validationMsg').html('<i class="bi bi-exclamation-circle me-1"></i>Please fill in all fields before submitting.');
            $('#validationMsg').fadeIn(200);
            $('#orderButton').prop('disabled', true);
        } else {
            // Everything is perfect
            $('#validationMsg').fadeOut(200);
            $('#orderButton').prop('disabled', false);
        }
    }
    


    function addLegend() {
        setTimeout(function() {
            var footer = $('<div class="datepicker-footer-legend">' +
                '<div class="legend-row"><div class="legend-box box-yellow"></div>Pickup in Store (Mon/Thu)</div>' +
                '<div class="legend-row"><div class="legend-box box-blue"></div>Pickup at Home (Tue/Wed/Fri/Sat)</div>' +
            '</div>');
            if ($('#ui-datepicker-div').find('.datepicker-footer-legend').length === 0) {
                $('#ui-datepicker-div').append(footer);
            }
        }, 1);
    }

    var today = new Date();
    var dayOfWeek = today.getDay(); 
    var minD = (dayOfWeek === 0 || dayOfWeek === 1) ? 5 : 6;

    $("#datepicker").datepicker({
        minDate: minD,
        beforeShow: addLegend,
        onChangeMonthYear: addLegend,
        // 2. Trigger validation when a date is selected
        onSelect: function() {
            validateForm();
        },
        beforeShowDay: function (d) {
            var day = d.getDay();
            var pickupType = $("input[name='pickupMethod']:checked").val();
            var isSunday = (day === 0);
            var isStoreDay = (day === 1 || day === 4);
            var isHomeDay = (day === 2 || day === 3 || day === 5 || day === 6);

            var isSelectable = false;
            var className = "";

            if (!isSunday) {
                if (pickupType === "store" && isStoreDay) {
                    isSelectable = true;
                    className = "highlight-yellow";
                } else if (pickupType === "home" && isHomeDay) {
                    isSelectable = true;
                    className = "highlight-blue";
                }
            }
            return [isSelectable, className];
        }
    });

    // 3. Listeners for input changes
    $('#name, #phone, #amount, #size').on('keyup change input', validateForm);

    $("input[name='pickupMethod']").on("change", function() {
        $("#datepicker").val(""); 
        $("#datepicker").datepicker("refresh");
        validateForm(); // Re-validate when method changes
    });
});
