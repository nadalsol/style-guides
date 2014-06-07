$(document).ready(function() {
    //noinspection JSCheckFunctionSignatures
    $('div[id^="wrapper-api-"]').on('change', 'select', function(){
        var $this = $(this),
            $datagroup = $this.closest('.control-group'),
            url = $datagroup.data('api-call'),
            selected = parseInt($datagroup.data('api-selected'));

        if (url) {
            var target = $datagroup.data('target'),
                $target = $('#' + target);

            $.ajax({
                type: "POST",
                url: url,
                data: {
                    id: $this.val(),
                    selected: selected
                },
                success: function(data){

                    $target.find('select').html(data).trigger('change');
                }
            });
        }
    });
});