document.getElementById('deco').addEventListener('submit', event => {
    console.log('popo')
    event.preventDefault();
    fetch('/users', { 
        method: 'delete', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        credentials: "include",
    }
        .then(function(r) { return r.json()})
        .then(function(response) {
            if(response.status) {
                document.location.reload();
            } else {
                alert('stop');
            }
        })
    )
})
    