$(document).ready(function(){
  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org


  // GENERIC FUNCTIONS
  ////////////////////

  var validateErrorPlacement = function(error, element) {
    error.addClass('ui-group__validation');
    error.appendTo(element.parent("div"));
  }
  var validateHighlight = function(element) {
    $(element).parent('div').addClass("has-error");

  }
  var validateUnhighlight = function(element) {
    $(element).parent('div').removeClass("has-error");

  }
  var validateSubmitHandler = function(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test
        } else {
            $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  }

  var validatePhone = {
    required: true,
    normalizer: function(value) {
        var PHONE_MASK = '+X (XXX) XXX-XXXX';
        if (!value || value === PHONE_MASK) {
            return value;
        } else {
            return value.replace(/[^\d]/g, '');
        }
    },
    minlength: 11,
    digits: true
  }

  ////////
  // FORMS


  /////////////////////
  // REGISTRATION FORM
  ////////////////////
  $(".js-registration-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      last_name: "required",
      first_name: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6,
      }
      // phone: validatePhone
    },
    messages: {
      last_name: "Заполните это поле",
      first_name: "Заполните это поле",
      email: {
          required: "Заполните это поле",
          email: "Email содержит неправильный формат"
      },
      password: {
          required: "Заполните это поле",
          email: "Пароль мимимум 6 символов"
      },
      // phone: {
      //     required: "Заполните это поле",
      //     minlength: "Введите корректный телефон"
      // }
    }
  });



  $("[js-validate-form]").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      last_name: "required",
      first_name: "required",
      org: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6,
      },
      password_confirm: {
        required: true,
        minlength: 6,
        equalTo: "#password"
      },

      phone: validatePhone
    },
    messages: {
      last_name: "Заполните это поле",
      first_name: "Заполните это поле",
      org: "Заполните это поле",
      email: {
          required: "Заполните это поле",
          email: "Email содержит неправильный формат"
      },
      password: {
          required: "Заполните это поле",
          minlength: "Миниальное количество символов 6"
      },
      password_confirm: {
          required: "Заполните это поле",
          minlength: "Миниальное количество символов 6",
          equalTo: "Пароли не совпадают"
      },
      phone: {
          required: "Заполните это поле",
          minlength: "Введите корректный телефон"
      }
    }
  });


  $("[js-validate-contact]").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      message: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      name: "Заполните это поле",
      email: {
          required: "Заполните это поле",
          email: "Email содержит неправильный формат"
      },
      message: {
          required: "Заполните это поле",
          minlength: "Сообщение слишком короткое"
      }
    }
  });

});
