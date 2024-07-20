$("#rollno").focus();
function validateAndGetFormData() {
    var rollnovar = $("#rollno").val();
    if (rollnovar === "") {
        alert("Rollno Required Value");
        $("#rollno").focus();
        return "";
    }
    var stunamevar = $("#stuname").val();
    if (stunamevar === "") {
        alert("Student Name is Required Value");
        $("#empName").focus();
        return "";
    }
    var stuclassvar = $("#stuclass").val();
    if (stuclassvar === "") {
        alert("student class is Required Value");
        $("#stuclass").focus();
        return "";
    }
    var stubirthvar = $("#stubirth").val();
    if (stubirthvar === "") {
        alert("Birth is Required Value");
        $("#stubirth").focus();
        return "";
    }
    var stuaddvar = $("#stuadd").val();
    if (stuaddvar === "") {
        alert("Address is Required Value");
        $("#stuadd").focus();
        return "";
    }
    var stuenrollvar = $("#stuenroll").val();
    if (stuenrollvar === "") {
        alert("Enrollment no. is Required Value");
        $("#stuenroll").focus();
        return "";
    }
    var jsonStrObj = {
        rollno: rollnoVar,
        stuName: stunamevar,
        stuclass: stuclassVar,
        stubirth: stubirthvar,
        stuadd: stuaddvar,
        stuenroll: stuenrollvar
    };
    return JSON.stringify(jsonStrObj);
}
// This method is used to create PUT Json request.
function resetForm() {
    $("#rollno").val("")
    $("#stuname").val("");
    $("#stuclass").val("");
    $("#stubirth").val("");
    $("#stuadd").val("");
    $("#stuenroll").val("");
    $("#rollno").focus();
}
function savedata() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === "") {
        return;
    }
    var putReqStr = createPUTRequest("90932184|-31949215853145343|90963492",
        jsonStrObj, "SCHOOL-DB", "STUDENT-TABLE");
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $('#rollno').focus();
}

function changedata() {
    $('#change').prop("disabled",true);
    jsonChg = validateData();
    var UpdateRequest = createUPDATERecordREQUEST("90932184|-31949215853145343|90963492",jsonChg,"SCHOOL-DB","STUDENT-TABLE",localStorage.getItem("recno"))
    jQuery.ajaxSetup({async:flase});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,"http://api.login2explore.com:5577","/api/iml");
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#rollno').focus();
}

function getStu(){
    var empIdJsonObj = gettEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest("90932184|-31949215853145343|90963492","SCHOOL-DB","STUDENT-TABLE",empIdJsonObj);
    JQuery.ajaxSetup({async:true});
    if (resJsonObj.status === 400) {
        $("#Save").prop("disabled",false);
        $("#Reset").prop("disabled",false);
        $("#rollno").focus();
    } else if (resJsonObj.status === 200) {
        $("#empid").prop('disabled',true);
        fillData(resJsonObj);

        $("change").prop("disabled",false);
        $("#rollno").focus();
    }

}

function getEmpIdAsJsonObj(){
    var empid = $('#rollid').val();
    var jsonStr = {
        id: empid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    SaveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#empname').val(record.name);
    $('#empsal').val(record.salary);
    $('#hra').val(record.da);
    $('#deduct').val(record.deduction);
}

function SaveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);

}