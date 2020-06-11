function initDelete(id) {
    console.log(id)
    $.post('/deletetask/' + id + '/delete', function (status) {
        if (status) {
            document.location.reload();
        }
    });

}