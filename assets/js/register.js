(function ($) {
    "use strict";
    $(document).ready(function () {
        
        function isNewRegistration() {
            return $("#signupform input[name='registration_type']:checked").val() === $("#signupform #registration_type_new").val();
        }

		// validate signup form on keyup and submit
		var validator = $("#signupform").validate({
            ignore: "",
			rules: {
                "registration_type": "required",
				"applicant_name": "required",
				"address_rakino": {
                    required: {
                        depends: function (element) {
                            return (isNewRegistration());
                        }
                    }
                },
                "contact_phone": {
                    required: {
                        depends: function (element) {
                            return (isNewRegistration());
                        }
                    }
                },
                "contact_email": {
                    required: true,
                    email: true
                },
                "address_postal": {
                    maxlength: 500
                },
                "payment_method": "required",
                "g-recaptcha-response": "required"
			},
			messages: {
                "registration_type": "Please indicate what type of registration your are performing",
				"applicant_name": "Your name is required",
				"address_rakino": "Please enter your address on the island (Lot No. or Street Address)",
				"contact_phone": "Please enter a contact phone number",
				"contact_email": "Please enter a valid email address",
                "address_postal": {
                    "maxlength": $.validator.format("Too long, must be under {0} characters")
                },
                "payment_method": "Choose your payment method",
                "g-recaptcha-response": "Please check the box above to prove your are not a spam-bot!"
			},
            highlight: function (element, errorClass, validClass) {
                $(element).closest('.form-group').removeClass('has-success has-feedback').addClass('has-error has-feedback');
                $(element).closest('.form-group').find('i.fa').remove();
                $(element).closest('.form-group').append('<i class="fa fa-exclamation fa-lg form-control-feedback"></i>');
            },
            unhighlight: function (element, errorClass, validClass) {
                if ($(element).val()) {
                    $(element).closest('.form-group').removeClass('has-error has-feedback').addClass('has-success has-feedback');
                } else {
                    $(element).closest('.form-group').removeClass('has-error has-feedback');
                }
                $(element).closest('.form-group').find('i.fa').remove();
                $(element).closest('.form-group').append('<i class="fa fa-check fa-lg form-control-feedback"></i>');
            },
            errorPlacement: function (error, element) {
                if (element.parents('.input-group').length) {
                    error.insertAfter(element.parents('.input-group')[0]);
                } else if (element.parents('.form-control').length) {
                    error.insertAfter(element.parents('.form-control')[0]);
                } else {
                    error.insertAfter(element);
                }
            },
			// specifying a submitHandler prevents the default submit, good for the demo
            submitHandler: function () {
                
                $("#signupform input,textarea").prop("disabled", true);
                $("#form-inprogress").show();
                $("#form-error").hide();
                $("#form-success").hide();
                
                $.ajax({
                    type: "POST",
                    crossDomain: true,
                    url: "https://rranz.azurewebsites.net/api/registration",
                    data: $("#signupform").serialize() // serializes the form's elements.
                }).done(function (data, textStatus, jqXHR) {
                    $("#form-success").show();
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    $("#form-error").show();
                }).always(function (data, textStatus, errorThrown) {
                    $('#signupform input,textarea').removeProp('disabled');
                    $("#form-inprogress").hide();
                });
			}
		});

	});
}(jQuery));