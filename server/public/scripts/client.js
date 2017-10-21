console.log('js');

$(document).ready(readyNow);

function readyNow() {
    console.log('JQ');
    // event handlers

} // end doc ready


function appendList(list) {
    console.log('in append list');
    $('#viewlist').empty();
    $("#importance").val('');
    $("#task").val('');
    //loop through list and append to dom
    for (var i = 0; i < list.length; i++) {
        //added an 's'
        var listItem = list[i];
        var $trow = $('#viewList').append('<tr></tr>');
            $($trow).append('<td>' + list.importance + '</td> <td>' + list.task + '</td>  <td> <button type=button class="complete btn btn-primary" data-id =" ' + list.id + '"> Complete </button> </td> <td> <button type="button" class= "deleteButton btn btn-danger" data-id= "' + list.id + '"> Delete </button> </td>');
        }

    }
}