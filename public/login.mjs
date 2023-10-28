document.querySelector('#loginForm')
            .addEventListener('submit', async (event) => {
                event.preventDefault();

                const email = document.querySelector('#emailInp').value;
                const password = document.querySelector('#passInp').value;


                try {
                    const resp = await axios.post("/api/v1/login", {
                        email: email,
                        password: password
                    })

                    console.log("response: ", resp.status)

                    if (resp.status === 200) {
                        window.location.href = "/";
                    }

                } catch (e) {
                    console.log(e)
                    document.querySelector("#result").innerHTML= e.response.data.message
                }

            })