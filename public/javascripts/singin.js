if (document.getElementById('register')) {
    document.getElementById('register').addEventListener('submit', event => {
        event.preventDefault();
        const email = event.target.querySelector('input[name=email]').value;
        const password = event.target.querySelector('input[name=password]').value;
        var data = {
            'email': email,
            'password': password,
        };
        fetch('/users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        )
            .then(function (r) { return r.json() })
            .then(function (response) {
                if (response.status) {
                    document.location.reload();
                } else {
                    alert(response.message || 'Une erreur est survenue');
                }
            })
    });
}