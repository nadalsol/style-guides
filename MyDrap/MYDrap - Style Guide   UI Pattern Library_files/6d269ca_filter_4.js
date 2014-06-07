$(document).ready(function() {
    //remove all filters
    $('#btn-filters').click(function(){
        $("input:checkbox").removeAttr('checked');
        $("input[type=checkbox]").removeAttr('checked');
    });

    $('.checkbox input[type=checkbox]').click(function() {
        $("input[type=checkbox]:checked").each(function() {
            $("#filters").submit();
        });
    });
});