function addPerson(){
    var nm = document.getElementById("addPersonNameTxt").value;
    const data = { name: nm};
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addUser");
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send(JSON.stringify(data));
    $('.alert').addClass("show");
}

$(".close").click(function(){
    $('.alert').removeClass("show");
  });

function loadNames(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getNames");
    xhttp.onload = function() {

        const response = JSON.parse(this.responseText);
        
        for(let i = 0; i < response.length; i++){
            $(".names").append(`
            <tr>
            <th scope="row">${i + 1}</th>
            <td>${response[i]}</td>
            <td><button class="btn btn-danger" onclick="open_deleteUserModal('${response[i]}')">Delete</button></td>
          </tr>
            `);
        }
///delete?name=${response[i]}
       
    }
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send();
}

function open_deleteUserModal(name){
    $("#userName").html(name);
    $("#deleteUserModal").modal();
}

function deleteUser(){
    const name = $("#userName").html();
    // alert(name);
    location.href = "/delete?name=" + name;
}


loadNames();
