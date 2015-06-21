(function ($) {
    "use strict";
    $(document).ready(function () {
        
        function isRenewal() {
            return $("#is-renewal").is(":checked");
        }

		// validate signup form on keyup and submit
		var validator = $("#signupform").validate({
			rules: {
				"applicant-name": "required",
				"address-rakino": {
                    required: {
                        depends: function (element) {
                            return (!isRenewal());
                        }
                    }
                },
                "contact-phone": {
                    required: {
                        depends: function (element) {
                            return (!isRenewal());
                        }
                    }
                },
                "contact-email": {
                    required: {
                        depends: function (element) {
                            return (!isRenewal());
                        }
                    },
                    email: true
                },
                "address-postal": {
                    maxlength: 500
                },
                "payment-method": "required"
			},
			messages: {
				"applicant-name": "Your name is required",
				"address-rakino": "enter your address on the island",
				"contact-phone": "Enter a contact phone number",
				"contact-email": {
					required: "Please enter a valid email address",
					minlength: "Please enter a valid email address"
				},
                "address-postal": {
                    "maxlength": $.validator.format("Too long, must be under {0} characters")
                },
                "payment-method": "Choose your payment method"
			},
            highlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).closest('.form-group').removeClass('has-success has-feedback').addClass('has-error has-feedback');
                    $(element).closest('.form-group').find('i.fa').remove();
                    $(element).closest('.form-group').append('<i class="fa fa-exclamation fa-lg form-control-feedback"></i>');
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    if ($(element).val()) {
                        $(element).closest('.form-group').removeClass('has-error has-feedback').addClass('has-success has-feedback');
                    } else {
                        $(element).closest('.form-group').removeClass('has-error has-feedback');
                    }
                    $(element).closest('.form-group').find('i.fa').remove();
                    $(element).closest('.form-group').append('<i class="fa fa-check fa-lg form-control-feedback"></i>');
                }
            },
            errorPlacement: function (error, element) {
                if (element.parents('.form-group').length) {
                    error.insertAfter(element.parents('.form-group')[0]);
                } else {
                    error.insertAfter(element);
                }
            },
			// specifying a submitHandler prevents the default submit, good for the demo
			submitHandler: function () {
				alert("submitted!");
			}
		});

	});
}(jQuery));