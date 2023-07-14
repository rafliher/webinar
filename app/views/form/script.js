$(document).ready(function() {
    $('#registration-form').submit(function(e) {
      e.preventDefault();
  
      // Retrieve form data
      var name = $('#name').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
  
      // Prepare data for AJAX request
      var formData = {
        name: name,
        email: email,
        phone: phone
      };
  
      // Perform AJAX request
      $.ajax({
        url: '/api/register',
        type: 'POST',
        data: formData,
        success: function(response) {
          // Show SweetAlert popup on success
          swal({
            title: 'Success!',
            text: 'Registration submitted.',
            icon: 'success',
            button: 'OK',
          }).then(()=>{
              window.reload();
          });
        },
        error: function(error) {
          // Show SweetAlert popup on error
            console.log(error);
          swal({
            title: 'Error!',
            text: error.responseJSON.message,
            icon: 'error',
            button: 'OK',
          });
        }
      });
    });
  });
  