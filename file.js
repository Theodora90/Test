let button = document.getElementById("login");
button.addEventListener("click", login);

async function login(e) {
    e.preventDefault();
    let email = document.getElementById('exampleInputEmail1').value;
    let password = document.getElementById('exampleInputPassword1').value;


    let data = {
        email: email,
        password: password
    };

   let response = await fetch('https://cors-anywhere.herokuapp.com/https://fcs.concept-nova.com/api/v1/login ',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    let result = await response.json();

    if (result.code == 200) {
        localStorage.setItem('token', result.message.token);
        window.location.replace('./index.html');
    }
}
