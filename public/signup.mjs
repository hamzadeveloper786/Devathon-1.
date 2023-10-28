document.querySelector('#signupForm')
            .addEventListener('submit',async (event)=>{
                event.preventDefault();

                let firstName = document.querySelector('#firstName').value;
                let lastName = document.querySelector('#lastName').value;
                let email = document.querySelector('#email').value;
                let password = document.querySelector('#password').value;
                console.log(firstName, lastName, email, password);
            
                const res = await axios.post(`/api/v1/signup`, {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
                    .then(function (response) {
                        // handle success
                        console.log(response.data);
                        document.querySelector("#result").innerHTML = `<div class="userSuccess">${response.data.message}</div> `;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error.data);
                        document.querySelector("#result").innerHTML = `<div class="userError">User already exists with email!</div> `
                    })
            })