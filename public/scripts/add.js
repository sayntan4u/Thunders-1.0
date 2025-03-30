var userJson = {};

function addPerson(){
    var nm = document.getElementById("addPersonNameTxt").value;
    const data = { name: nm};
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addUser");
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send(JSON.stringify(data));
    loadNames();
    $("#newPersonName").html(nm);
    $('.alert').addClass("show");
    setTimeout(function(){$('.alert').removeClass("show");},3000);
}

$(".close").click(function(){
    $('.alert').removeClass("show");
  });

function loadNames(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getNames");
    xhttp.onload = function() {

        const response = JSON.parse(this.responseText);
        userJson = response;

        generateNamesTable(response);

        }
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send();
}

function generateNamesTable(response){
    $(".names").html("");
    for(let i = 0; i < response.length; i++){
        $(".names").append(`
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${response[i].name}</td>
        <td class="namelist_container">
        <a href="${response[i].namelist == "" ? "#" : response[i].namelist}" id="${response[i].name}-link" target="_blank" class=${response[i].namelist == "" ? "text-danger" : "text-success"}>${response[i].name}'s Namelist</a>
        
        <input class="form-control disp-hide" type="text" id="${response[i].name}-text"/> 
        &nbsp;
        <button id="${response[i].name}-btnCancel" class="btn btn-info btn-sm disp-hide" onclick="cancel_edit('${response[i].name}')"><i class="fa-solid fa-xmark"></i></button>
        <button id="${response[i].name}-btn" class="btn btn-info btn-sm" onclick="show_editText('${response[i].name}')"><i class="fa-solid fa-pen"></i></button>
        </td>
        <td><button class="btn btn-danger" onclick="open_deleteUserModal('${response[i].name}')">Delete Person</button></td>
      </tr>
        `);

    $(".loading").addClass("hide");
}
}

function show_editText(name){
    if($("#" + name + "-btn").html() == '<i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>'){
        //save
        const data = { name: name, link: $("#" + name + "-text").val() };

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/updateNamelist");
        xhttp.setRequestHeader('Content-Type', 'application/json'); 
        xhttp.send(JSON.stringify(data));

        if($("#" + name + "-text").val() == ""){
            $("#" + name + "-link").attr("href", "#");
            $("#" + name + "-link").removeClass("text-success").addClass("text-danger");
        }else{
            $("#" + name + "-link").attr("href", $("#" + name + "-text").val());
            $("#" + name + "-link").removeClass("text-danger").addClass("text-success");
        }

        $("#" + name + "-text").removeClass("disp-show").addClass("disp-hide");
        $("#" + name + "-link").removeClass("disp-hide").addClass("disp-show");
        $("#" + name + "-btnCancel").removeClass("disp-show").addClass("disp-hide");
        $("#" + name + "-btn").html('<i class="fa-solid fa-pen"></i>');

        // location.href = "/add";


       
    }else{
        //edit
        $("#" + name + "-text").val($("#" + name + "-link").attr("href") == "#" ? "" : $("#" + name + "-link").attr("href"));
        $("#" + name + "-link").removeClass("disp-show").addClass("disp-hide");
        $("#" + name + "-text").removeClass("disp-hide").addClass("disp-show");
        $("#" + name + "-btnCancel").removeClass("disp-hide").addClass("disp-show");
        $("#" + name + "-btn").html('<i class="fa-solid fa-floppy-disk"></i>');
    }
    
}

function cancel_edit(name){
    $("#" + name + "-text").removeClass("disp-show").addClass("disp-hide");
    $("#" + name + "-link").removeClass("disp-hide").addClass("disp-show");
    $("#" + name + "-btnCancel").removeClass("disp-show").addClass("disp-hide");
    $("#" + name + "-btn").html('<i class="fa-solid fa-pen"></i>');
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

function search(){
    const searchStr = $("#search_text").val();
    resultJson = [];

    if(searchStr != ""){
        for(let i=0; i< userJson.length; i++){
            if(userJson[i].name.toLowerCase().match(searchStr.toLowerCase())){
                resultJson.push(userJson[i]);
            }
        }
    }else{
        resultJson = userJson;
    }
    generateNamesTable(resultJson);
}

loadNames();
