$(document).ready(function() {
  console.log("czy ruszam?");
  var show_error, stripeResponseHandler, submitHandler;

  submitHandler = function (event) {
     var $form = $(event.target);
     console.log("mordooo");
     $form.find("input[type=submit]").prop("disabled", true);

     //If Stripe was initialized correctly this will create a token using the credit card info
     if(Stripe){
       Stripe.card.createToken($form, stripeResponseHandler);
        console.log("tutaj w ifie jestem");
     } else {
       show_error("Failed to load credit card processing functionality. Please reload this page in your browser.")
     }
     return false;
  };

  $(".cc_form").on('submit', submitHandler);

  stripeResponseHandler = function (status, response) {
    var token, $form;
    $form = $('.cc_form');
    console.log("kupo");
    if (response.error) {
      console.log(response.error.message);
      show_error(response.error.message);
      $form.find("input[type=submit]").prop("disabled", false);
    } else {
      console.log("dupa zdanexa");
      token = response.id;
      $form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token));
      $("[data-stripe=number]").remove();
      $("[data-stripe=cvv]").remove();
      $("[data-stripe=exp-year]").remove();
      $("[data-stripe=exp-month]").remove();
      $("[data-stripe=label]").remove();
      $form.get(0).submit();
    }
    console.log("dupa adamexa");
    return false;
  };
  show_error = function (message) {
    if($("#flash-messages").size() < 1){
      $('div.container.main div:first').prepend("<div id='flash-messages'></div>")
    }
    $("#flash-messages").html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><div id="flash_alert">' + message + '</div></div>');
    $('.alert').delay(5000).fadeOut(3000);
    return false;
  };
});
