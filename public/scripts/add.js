function addPerson(){
    var nm = document.getElementById("addPersonNameTxt").value;
    const data = { name: nm};
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addUser");
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send(JSON.stringify(data));
    loadNames();
    $('.alert').addClass("show");
    setTimeout(function(){$('.alert').removeClass("show");},2000);
}

$(".close").click(function(){
    $('.alert').removeClass("show");
  });

function loadNames(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getNames");
    xhttp.onload = function() {

        const response = JSON.parse(this.responseText);
        $(".names").html("");
        for(let i = 0; i < response.length; i++){
            $(".names").append(`
            <tr>
            <th scope="row">${i + 1}</th>
            <td>${response[i].name}</td>
            <td class="namelist_container">
            <a href="${response[i].namelist}" id="${response[i].name}-link">Namelist</a>
            <input class="form-control disp-hide" type="text" id="${response[i].name}-text"/> 
            <button id="${response[i].name}-btn" class="btn btn-info btn-sm" onclick="show_editText('${response[i].name}')"><i class="fa-solid fa-pen"></i></button>
            </td>
            <td><button class="btn btn-danger" onclick="open_deleteUserModal('${response[i].name}')">Delete</button></td>
          </tr>
            `);
        }
///delete?name=${response[i]}
       
    }
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send();
}

function show_editText(name){
    if($("#" + name + "-btn").html() == '<i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>'){
        //save
        $("#" + name + "-text").removeClass("disp-show").addClass("disp-hide");
        $("#" + name + "-link").removeClass("disp-hide").addClass("disp-show");
        $("#" + name + "-btn").html('<i class="fa-solid fa-pen"></i>');
    }else{
        //edit
        $("#" + name + "-text").val($("#" + name + "-link").attr("href"));
        $("#" + name + "-link").removeClass("disp-show").addClass("disp-hide");
        $("#" + name + "-text").removeClass("disp-hide").addClass("disp-show");
        $("#" + name + "-btn").html('<i class="fa-solid fa-floppy-disk"></i>');
    }
    
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
