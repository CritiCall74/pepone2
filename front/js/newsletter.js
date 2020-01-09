var newsletter = {
  init: function() {
    var newsletterRegisterButton = document.getElementById('newsletter-register');
    newsletterRegisterButton.addEventListener('click', newsletter.register);
  },

  register: function() {
    var newsletterEmail = document.getElementById('newsletter-email');
    var email = newsletterEmail.value;
    var payload = {
      email
    };

    var request = new Request('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(payload)
    })
    fetch(request)
    .then(function(res) {
      if (!res.ok) {
        console.error('Registration failed');
      } else {
        console.log('Registration succesful');
      }; 
    })
    .catch(function(err) { console.error('Error in registration request'); })
  }
}

window.addEventListener('DOMContentLoaded', newsletter.init);
