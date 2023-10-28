window.getAllAppointments = () =>  {
    axios.get(`/api/v1/posts`,{withCredentials: true})
        .then(function (response) {
            // handle success
            console.log(response.data);
            let appointment = ``
            response.data.map((eachAppoinment) => {
                appointment += `<div id='card-${eachAppoinment._id}' class="appointment">
                <div class='top'> 
                <div class='profile'></div>
                <h2>${eachAppoinment.from}</h2>
                </div>
                <h4>Patient Name: ${eachAppoinment.paName}</h4>
                <h4>Doctor Name: ${eachAppoinment.docName}</h4>
                <p>Booked Appointment: ${eachAppoinment.availibility}</p>
                <button onclick="deleteAppointment('${eachAppoinment._id}')">Delete</button>
                <button onclick="editAppointment('${eachAppoinment._id}','${eachAppoinment.paName}','${eachAppoinment.docName}','${eachAppoinment.availibility}')">Edit</button>
                </div>`
            });
            document.querySelector("#appointment").innerHTML = appointment

        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            if(error.response.status == 401){
                window.location.href = "/login.html"
            }
            document.querySelector("#appointment").innerHTML = "Server Error, Try again later!"
        })
}
window.deleteAppointment = (postId) => {Swal.fire({
    title: 'Enter Password',
    input: 'password',
    inputAttributes: {
        autocapitalize: 'off'
    },
    showCancelButton: true,
    cancelButtonColor: "#24232c",
    confirmButtonText: 'Delete',
    confirmButtonColor: "#24232c",
    showLoaderOnConfirm: true,
    preConfirm: (password) => {
        if (password === '3737701') {

            return axios.delete(`/api/v1/post/${postId}`)
                .then(response => {
                        Swal.fire({
                        icon: 'success',
                        title: 'Appointement Cancelled!',
                        timer: 1000,
                        showConfirmButton: false
                    });

                    getAllAppointments();
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Appointement Cancelled!',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    getAllAppointments();
                });
        } else {

            return Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Please enter correct password',
                timer: 1000,
                showConfirmButton: false
            });
        }
    }
});
}
window.editAppointment = (postId, docName, paName, availibility) => {

    console.log("Edit: ", postId);

    document.querySelector(`#card-${postId}`).innerHTML =
        `<form onsubmit="saveAppointment('${postId}')">
        Patient Name: <input type='text' value='${docName}' id='title-${postId}' />
        <br/>
        Doctor Name: <input type='text' value='${paName}' id='title-${postId}' />
        <br/>
        Availibility: <input type='text' value='${availibility}' id='text-${postId}' />
        <br/>
            <button>Save</button>

        </form>`
}
window.saveAppointment = (postId)=>{
    const updatedDocName = document.querySelector(`#docName-${postId}`).value;
    const updatedPaName = document.querySelector(`#paName-${postId}`).value;
    const updatedAvailibility = document.querySelector(`#availibility-${postId}`).value;

    axios.put(`/api/v1/post/${postId}`, {
        docName: updatedDocName,
        paName: updatedPaName,
        availibility: updatedAvailibility
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
        })

}