var env;
if (typeof process === 'undefined') {
  env = null;
} else  {
  env = process.env;
}

var newsletter = {
  apiUrl: 'http://localhost:3000',

  init: function() {
    var newsletterRegisterButton = document.getElementById('newsletter-register');
    newsletterRegisterButton.addEventListener('click', newsletter.register);

    if (env) {
      if (env.API_URL) {
        newsletter.apiUrl = env.API_URL;
      }
    }
  },

  register: function() {
    var newsletterEmail = document.getElementById('newsletter-email');
    var email = newsletterEmail.value;
    var payload = {
      email
    };

    var request = new Request(newsletter.apiUrl + '/register', {
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
