window.bookApp = () => {

    let docName = document.querySelector("#docName").value;
    let paName = document.querySelector("#paName").value;
    let availibility = document.querySelector("#availibility").value;
    console.log(docName, availibility);

    axios.post(`/api/v1/post`, {
        docName: docName,
        paName: paName,
        availibility: availibility
    })
        .then(function (response) {
            // handle success
            console.log(response.data);
            document.querySelector("#result").innerHTML = `<div class="bookingSuccess">${response.data}</div> `;
            return;
        })
        .catch(function (error) {
            // handle error
            if(error.response.status == 401){
                window.location.href = "/login.html"
            }
            console.log(error.data);
            document.querySelector("#result").innerHTML = `<div class="bookingError">Error in Post Submission! </div> `
        })
}