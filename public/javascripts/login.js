
document.getElementById('login').addEventListener('submit', event => {
event.preventDefault();
const email = event.target.querySelector('input[name=email]').value;
const password = event.target.querySelector('input[name=password]').value;
var data = {
    'email': email,
    'password': password,
};
fetch('/users', { 
    method: 'put', 
    headers: { 
        'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify(data) }
    )
    .then(function(r) { return r.json()})
    .then(function(response) {
        if(response.status) {
            document.location.reload();
        } else {
            alert('stop');
        }
    })
})
