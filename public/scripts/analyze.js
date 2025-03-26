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
    totalList = totalList + Number(list[index].innerHTML);
    totalNetworkingDone = totalNetworkingDone + Number(networkingDone[index].innerHTML);
    totalNetworkingTarget = totalNetworkingTarget + Number(networkingTarget[index].innerHTML);
    totalInfosDone = totalInfosDone + Number(infosDone[index].innerHTML);
    totalInfosTarget = totalInfosTarget + Number(infosTarget[index].innerHTML);
    totalReinfosDone = totalReinfosDone + Number(reinfosDone[index].innerHTML);
    totalReinfosTarget = totalReinfosTarget + Number(reinfosTarget[index].innerHTML);
    totalMeetupDone = totalMeetupDone + Number(meetupsDone[index].innerHTML);
    totalMeetupTarget = totalMeetupTarget + Number(meetupsTarget[index].innerHTML);
    totalInviDone = totalInviDone + Number(inviDone[index].innerHTML);
    totalInviTarget = totalInviTarget + Number(inviTarget[index].innerHTML);
    totalPlanDone = totalPlanDone + Number(plans[index].innerHTML);
    totalPendingPlans = totalPendingPlans + Number(pendingPlans[index].innerHTML);
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

function getData(){
    $(".loading").removeClass("hide");
    var wkFrom = document.getElementById("inputWeekFrom").value;
    var wkTo = document.getElementById("inputWeekTo").value;
    var yr = document.getElementById("inputYear").value;
    var nm = document.getElementById("name").value;

    const data = { weekFrom: wkFrom, weekTo : wkTo, year : yr, name: nm};

    // console.log(data);
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // alert(JSON.parse(this.responseText).length);

        const response = JSON.parse(this.responseText);

        $(".skbData").html("");

        for(let i = 0; i < response.length; i++){
            $(".skbData").append(`<tr>
            <th scope="row" class="middle">${response[i].sl}</th>
            <td>Week ${response[i].name}</td>
            <td class="txt-align-center bg-info list">${response[i].list}</td>
            <td class="txt-align-center done_data networkingDone">${response[i].networkingDone }</td>
            <td class="txt-align-center bg-warning networkingTarget">${response[i].networkingTarget}</td>
            <td class="txt-align-center done_data infosDone">${response[i].infosDone}</td>
            <td class="txt-align-center bg-warning infosTarget">${response[i].infosTarget}</td>
            <td class="txt-align-center done_data reinfosDone">${response[i].reinfosDone}</td>
            <td class="txt-align-center bg-warning reinfosTarget">${response[i].reinfosTarget }</td>
            <td class="txt-align-center done_data meetupsDone">${response[i].meetupsDone }</td>
            <td class="txt-align-center bg-warning meetupsTarget">${response[i].meetupsTarget }</td>
            <td class="txt-align-center done_data invisDone">${response[i].invisDone}</td>
            <td class="txt-align-center bg-warning invisTarget">${response[i].invisTarget }</td>
            <td class="txt-align-center bg-success plans">${response[i].plans }</td>
            <td class="txt-align-center bg-plan pendingPlans">${response[i].pendingPlans}</td>
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
              </tr>
        `);
        sumData();

        $("#searchName").html(document.getElementById("name").value);

        $("#dataTable").removeClass("hide");
        $(".loading").addClass("hide");
      }
    xhttp.open("POST", "analyzeData");
    xhttp.setRequestHeader('Content-Type', 'application/json'); 
    xhttp.send(JSON.stringify(data));
    // $('.alert').addClass("show");
}

$("#searchBtn").click(function(){
    getData();
   
});

function fromWeekChanged(){
    // alert($("#inputWeekFrom").val());
    generateWeekTwo($("#inputWeekFrom").val());
}

function generateWeekTwo(fromWeek){
    $("#inputWeekTo").html("");
    for(let i = fromWeek; i <=53; i++){
        $("#inputWeekTo").append("<option>" + i +"</option>");
    }
}

// sumData();
generateWeekTwo(1);