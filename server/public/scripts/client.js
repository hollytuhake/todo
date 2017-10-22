console.log('js');

$(document).ready(readyNow);


function readyNow() {
    console.log('JQ');
    // event handlers
    $("#addTask").on('click',addTask);
    $("#tasksTable").on('click','#completeBtn',completeTask);
    $("#tasksTable").on('click', '.delete', deleteTask);
    getTasks();
} // end doc ready

//get data from database
function getTasks() {
    console.log('in getTasks');
    $.ajax({
        url: '/list',
        type: 'GET',
        success: function (data){
            console.log('retrieving tasks');
            appendTasks(data);
        }
    })
    $('#importance').css('background-color', '');
    $('#task').css('background-color', '');
}

// append task list
function appendTasks(tasks){
    console.log('in appendTasks');
    // empty old data and input fields
    $('#tasksTableData').empty();
    $("#importance").val('');
    $("#task").val('');
    // loop thorugh tasks and append to dom
    for(var i = 0; i < tasks.length; i += 1){
        var task = tasks[i];
        var $trow = $('#tasksTableData').append('<tr></tr>');
        console.log(task.complete);
        if(task.complete===false){
            $($trow).append('<td class="color' + task.importance +'">' + task.task + '</td>');
            $($trow).append('<td class="color' + task.importance +'"> <button id="completeBtn" type=button class="complete btn btn-primary" data-id =" ' + task.id + '">  Complete </button> </td>');
            $($trow).append('<td class="color' + task.importance +'"> <button type=button class="delete btn btn-danger" data-id =" ' + task.id + '">  Delete </button> </td>');
        }else{
            $($trow).append('<td class="color' + task.importance +'">' + task.task + '</td>');
            $($trow).append('<td class="color' + task.importance +'"> Complete! </td>');
            $($trow).append('<td class="color' + task.importance +'"> <button type=button class="delete btn btn-danger" data-id =" ' + task.id + '">  Delete </button> </td>');
        }
    }//end for loop
}//end append tasks

function addTask() {
    console.log('in addTask');
    if ($('#importance').val() > 3 || $('#importance').val()<1 ){
        alert("Please enter a number between 1 and 3 for importance level");
        $('#importance').val('');
        $('#importance').css('background-color','tomato');
    }
    else if ($('#task').val() == null || $('#task').val() ==""){
        alert("You entered a blank task. Please enter a new task to complete.");
        $('#task').val('');
        $('#task').css('background-color', 'tomato');
    }
    else{
        var objectToSend = {
            importance: $('#importance').val(),
            task: $('#task').val()
        };

        console.log(objectToSend);
        $.ajax({
            url: 'list',
            type: 'POST',
            data: objectToSend,
            success:function( data ){
                console.log(data);
                getTasks();        
            } //end success
        });//end ajax POST request
    }//end else
}//end function

function completeTask() {
    console.log('in completeTask function');
    var taskId = $(this).data("id");
    $(this).remove();
    $.ajax({
        type: "PUT",
        url: '/list/' + taskId,
    }).done(function (response) {
        console.log(response);
        getTasks();
    });
}//end completeTask

function deleteTask(){
    console.log('in deleteTask');
    var confirmation = confirm("Are you sure you don't want to make this hapen?");
    if(confirmation===true){
        var taskId = $(this).data("id");
        $.ajax({
            type: "DELETE",
            url: '/list/'+taskId,
        }).done(function(response){
            getTasks();
        }).fail(function(error){
            console.log('deleteTask ajax Error');
        });
    }
    else{
        console.log('decided against deleting');
    }
}//end deleteTask