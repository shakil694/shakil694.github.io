$(document).ready(function () {
    $('#form-signup-publishers').validate({
        ignore: "",
        errorClass: "error",
        validClass: "valid",
        rules: {
            'name': "required",
            'terms': "required",
            'email': {
                required: true,
                email: true

            },
            'pass': {
              required: true,
              minlength: 5,
              maxlength: 20,
            },
            'pass_confirm': {
                required: true,
                equalTo: "#inputPassword"
            },
            'user_lang_code':{
                required: true,
            },
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
        },
        errorPlacement: function (error, element) {
            return false;
        },
	submitHandler: function(form) {
            dataLayer.push({'event': 'registration_publisher'});
            return true;
        },
    });

    $('#form-contacts').validate({
        ignore: "",
        errorClass: "error",
        validClass: "valid",
        rules: {
            name: "required",
            message: "required",
            email: {
                required: true,
                email: true
            },
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
        },

        unhighlight: function (element, errorClass, validClass) {

            $(element).removeClass(errorClass).addClass(validClass);
        },
        errorPlacement: function (error, element) {
            return false;
        }
    });

    $("#form-login").validate({
        ignore: "",
        errorClass: "error",
        validClass: "valid",
        rules: {
            _Login: "required",
            _Pass: "required",
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
        },

        unhighlight: function (element, errorClass, validClass) {

            $(element).removeClass(errorClass).addClass(validClass);
        },
        errorPlacement: function (error, element) {
            return false;
        }
    });

    $('#form-contacts-dvert').validate({
        ignore: "",
        errorClass: "error",
        validClass: "valid",
        rules: {
            name: "required",
            message: "required",
            companyname: "required",
            budget: "required",
            aboutproduct: "required",
            email: {
                required: true,
                email: true
            },
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
        },

        unhighlight: function (element, errorClass, validClass) {

            $(element).removeClass(errorClass).addClass(validClass);
        },
        errorPlacement: function (error, element) {
            return false;
        }
    });

    closeCookiePolitics();
    TrackPic.init();
});


function closeCookiePolitics() {
    $('#alert-cookie-policy').on('closed.bs.alert', function () {
        console.log('cookie set');
        console.log(window.location.host);
        $.cookie('cookie_info', '0', {expires: 365, path: '/', domain: '.adnow.com'});
        console.log('cookie set end');
    })
}


var TrackPic = {

    init: function () {

        this.initEvents();
    },
    initEvents: function () {
        TrackPic.onReadyScrollToFooter();
        TrackPic.onReadyInputCheckbox();
        TrackPic.onChangeSkypeField();
        TrackPic.onChangeEmailField();

    },
    onReadyInputCheckbox: function () {

        if ($('#form-signup-publishers').length) {

            var elementId = 'inputCheckbox';
            var checkboxAlreadyChecked = false;
            var $this = $('#' + elementId);
            if ($this.length) {
                $this.on('click', function () {

                    if (!checkboxAlreadyChecked && $this.is(':checked')) {
                        TrackPic.callPixel('http://adnow.adk2x.com/conv?id=72601211&t=img');
                        checkboxAlreadyChecked = true;
                    }
                });
            }
        }

    },
    onReadyScrollToFooter: function () {
        var alreadyScroll = false;
        if ($('#home-page-main-img').length) {
            $(window).scroll(function () {
                if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                    if (!alreadyScroll)
                        TrackPic.callPixel("http://adnow.adk2x.com/conv?id=72601207&t=img");
                    alreadyScroll = true;
                }
            });
        }

    },
    onChangeEmailField: function () {
        var $this = $('#form-signup-publishers');
        var alredyCallPixel = false;

        if ($this.length) {
            $('#inputEmail').on('change', function () {
                if (!alredyCallPixel)
                    TrackPic.callPixel("http://adnow.adk2x.com/conv?id=72601209&t=img");

                alredyCallPixel = true;
            });
        }
    },
    onChangeSkypeField: function () {
        var $this = $('#form-signup-publishers');
        var alredyCallPixel = false;
        if ($this.length) {
            $('#inputSkype').on('change', function () {
                if (!alredyCallPixel)
                    TrackPic.callPixel("http://adnow.adk2x.com/conv?id=72601210&t=img");

                alredyCallPixel = true;
            });
        }
    },
    callPixel: function (pixelUrl) {
        $('body').append('<img src="' + pixelUrl + '" width="1px" height="1px" alt="" style="display: none" />');
    }


};

