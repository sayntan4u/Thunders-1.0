function sumData() {

var list= document.getElementsByClassName("list");
var networkingDone= document.getElementsByClassName("networkingDone");
var networkingTarget= document.getElementsByClassName("networkingTarget");
var infosDone= document.getElementsByClassName("infosDone");
var infosTarget= document.getElementsByClassName("infosTarget");
var reinfosDone= document.getElementsByClassName("reinfosDone");
var reinfosTarget= document.getElementsByClassName("reinfosTarget");
var meetupsDone= document.getElementsByClassName("meetupsDone");
var meetupsTarget= document.getElementsByClassName("meetupsTarget");
var inviDone= document.getElementsByClassName("invisDone");
var inviTarget= document.getElementsByClassName("invisTarget");
var plans= document.getElementsByClassName("plans");
var pendingPlans= document.getElementsByClassName("pendingPlans");



var totalList = 0;
var totalNetworkingDone = 0;
var totalNetworkingTarget = 0;
var totalInfosDone = 0;
var totalInfosTarget = 0;
var totalReinfosDone = 0;
var totalReinfosTarget = 0;
var totalMeetupDone = 0;
var totalMeetupTarget = 0;
var totalInviDone = 0;
var totalInviTarget = 0;
var totalPlanDone = 0;
var totalPendingPlans = 0;

for (let index = 0; index < list.length; index++) {
    totalList = totalList + Number(list[index].value);
    totalNetworkingDone = totalNetworkingDone + Number(networkingDone[index].value);
    totalNetworkingTarget = totalNetworkingTarget + Number(networkingTarget[index].value);
    totalInfosDone = totalInfosDone + Number(infosDone[index].value);
    totalInfosTarget = totalInfosTarget + Number(infosTarget[index].value);
    totalReinfosDone = totalReinfosDone + Number(reinfosDone[index].value);
    totalReinfosTarget = totalReinfosTarget + Number(reinfosTarget[index].value);
    totalMeetupDone = totalMeetupDone + Number(meetupsDone[index].value);
    totalMeetupTarget = totalMeetupTarget + Number(meetupsTarget[index].value);
    totalInviDone = totalInviDone + Number(inviDone[index].value);
    totalInviTarget = totalInviTarget + Number(inviTarget[index].value);
    totalPlanDone = totalPlanDone + Number(plans[index].value);
    totalPendingPlans = totalPendingPlans + Number(pendingPlans[index].value);
}

// document.getElementsByClassName("totalList")[0].innerHTML = totalList;
document.getElementsByClassName("totalNetworkingDone")[0].innerHTML = totalNetworkingDone;
document.getElementsByClassName("totalNetworkingTarget")[0].innerHTML = totalNetworkingTarget;
document.getElementsByClassName("totalInfosDone")[0].innerHTML = totalInfosDone;
document.getElementsByClassName("totalInfosTarget")[0].innerHTML = totalInfosTarget;
document.getElementsByClassName("totalReinfosDone")[0].innerHTML = totalReinfosDone;
document.getElementsByClassName("totalReinfosTarget")[0].innerHTML = totalReinfosTarget;
document.getElementsByClassName("totalMeetupDone")[0].innerHTML = totalMeetupDone;
document.getElementsByClassName("totalMeetupTarget")[0].innerHTML = totalMeetupTarget;
document.getElementsByClassName("totalInviDone")[0].innerHTML = totalInviDone;
document.getElementsByClassName("totalInviTarget")[0].innerHTML = totalInviTarget;
document.getElementsByClassName("totalPlanDone")[0].innerHTML = totalPlanDone;
document.getElementsByClassName("totalPendingPlans")[0].innerHTML = totalPendingPlans;
}

function valueChanged(docName, triggeredFrom){
    // console.log(docName);
    // console.log(triggeredFrom);
    // console.log($("." + docName + "-" + triggeredFrom).val());
    var wk = document.getElementById("inputWeek").value;
    var yr = document.getElementById("inputYear").value;

    var value_input = $("." + docName + "-" + triggeredFrom).val();


    if(value_input == '' && triggeredFrom != "remarks"){
        value_input = 0;
    }

    const data = { week: wk, year : yr, name : docName, fieldName : triggeredFrom, value : value_input};

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "updateUser");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
    sumData();
}

function getData(){
    $(".loading").removeClass("hide");
    var wk = document.getElementById("inputWeek").value;
    var yr = document.getElementById("inputYear").value;
    const data = { week: wk, year : yr};

    // console.log(data);
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // alert(JSON.parse(this.responseText).length);

        const response = JSON.parse(this.responseText);

        $(".skbData").html("");

        for(let i = 0; i < response.length; i++){
            $(".skbData").append(`<tr>
            <th scope="row" class="middle">${response[i].sl}</th>
            <td>${response[i].name}</td>
            <td><input type="text" class="form-control bg-info list ${response[i].name +'-list'}" value="${(response[i].list > 0) ? response[i].list : ''}" onchange="valueChanged('${response[i].name}', 'list')"></td>
            <td><input type="text" class="form-control done_data networkingDone ${response[i].name +'-networkingDone'}" value="${(response[i].networkingDone > 0) ? response[i].networkingDone : ''}" onchange="valueChanged('${response[i].name}', 'networkingDone')"></td>
            <td><input type="text" class="form-control bg-warning networkingTarget ${response[i].name +'-networkingTarget'}" value="${(response[i].networkingTarget > 0) ? response[i].networkingTarget : ''}" onchange="valueChanged('${response[i].name}', 'networkingTarget')"></td>
            <td><input type="text" class="form-control done_data infosDone ${response[i].name +'-infosDone'}" value="${(response[i].infosDone > 0) ? response[i].infosDone : ''}" onchange="valueChanged('${response[i].name}', 'infosDone')"></td>
            <td><input type="text" class="form-control bg-warning infosTarget ${response[i].name +'-infosTarget'}" value="${(response[i].infosTarget > 0) ? response[i].infosTarget : ''}" onchange="valueChanged('${response[i].name}', 'infosTarget')"></td>
            <td><input type="text" class="form-control done_data reinfosDone ${response[i].name +'-reinfosDone'}" value="${(response[i].reinfosDone > 0) ? response[i].reinfosDone : ''}" onchange="valueChanged('${response[i].name}', 'reinfosDone')"></td>
            <td><input type="text" class="form-control bg-warning reinfosTarget ${response[i].name +'-reinfosTarget'}" value="${(response[i].reinfosTarget > 0) ? response[i].reinfosTarget : ''}" onchange="valueChanged('${response[i].name}', 'reinfosTarget')"></td>
            <td><input type="text" class="form-control done_data meetupsDone ${response[i].name +'-meetupsDone'}" value="${(response[i].meetupsDone > 0) ? response[i].meetupsDone : ''}" onchange="valueChanged('${response[i].name}', 'meetupsDone')"></td>
            <td><input type="text" class="form-control bg-warning meetupsTarget ${response[i].name +'-meetupsTarget'}" value="${(response[i].meetupsTarget > 0) ? response[i].meetupsTarget : ''}" onchange="valueChanged('${response[i].name}', 'meetupsTarget')"></td>
            <td><input type="text" class="form-control done_data invisDone ${response[i].name +'-invisDone'}" value="${(response[i].invisDone > 0) ? response[i].invisDone : ''}" onchange="valueChanged('${response[i].name}', 'invisDone')"></td>
            <td><input type="text" class="form-control bg-warning invisTarget ${response[i].name +'-invisTarget'}" value="${(response[i].invisTarget > 0) ? response[i].invisTarget : ''}" onchange="valueChanged('${response[i].name}', 'invisTarget')"></td>
            <td><input type="text" class="form-control bg-success plans ${response[i].name +'-plans'}" value="${(response[i].plans > 0) ? response[i].plans : ''}" onchange="valueChanged('${response[i].name}', 'plans')"></td>
            <td><input type="text" class="form-control bg-plan pendingPlans ${response[i].name +'-pendingPlans'}" value="${(response[i].pendingPlans > 0) ? response[i].pendingPlans : ''}" onchange="valueChanged('${response[i].name}', 'pendingPlans')"></td>
            <td><input type="text" class="form-control remarks ${response[i].name +'-remarks'}" value="${response[i].remarks}" onchange="valueChanged('${response[i].name}', 'remarks')"></td>
          </tr>`);
        }

        $(".skbData").append(`
        <tr class="">
                
                <td colspan="3" class="txt-align-center"> <b>Total</b> </td>
                
                <th class="txt-align-center done_data totalNetworkingDone"></th>
                <th class="txt-align-center bg-warning  totalNetworkingTarget"></th>
                <th class="txt-align-center done_data totalInfosDone"></th>
                <th class="txt-align-center bg-warning  totalInfosTarget"></th>
                <th class="txt-align-center done_data totalReinfosDone"></th>
                <th class="txt-align-center bg-warning  totalReinfosTarget"></th>
                <th class="txt-align-center done_data totalMeetupDone"></th>
                <th class="txt-align-center bg-warning  totalMeetupTarget"></th>
                <th class="txt-align-center done_data totalInviDone"></th>
                <th class="txt-align-center bg-warning  totalInviTarget"></th>
                <th class="txt-align-center bg-success totalPlanDone"></th>
                <th class="txt-align-center bg-plan totalPendingPlans"></th>
                <th class="txt-align-center"></th>
              </tr>
        `);
        sumData();

        $("#dataTable").removeClass("hide");
        $(".loading").addClass("hide");
      }
    xhttp.open("POST", "getData");
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send(JSON.stringify(data));
    // $('.alert').addClass("show");
}

$("#searchBtn").click(function(){
    getData();
   
});

// sumData();