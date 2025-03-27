$(document).ready(function () {

    $('p').click(function () {
        //console.log("clicked on p");
        $(this).hide();
    });

    // $('#lorem1').hide(5000);
    // $('#lorem1').show(5000);
    $('#but').click(function () {
        //$('#lorem1').toggle(1000);
        // $('#lorem1').fadeIn(5000);
        // $('#lorem1').fadeOut(2000);
        // $('#lorem1').fadeIn(2000);
        // $('#lorem1').fadeToggle(2000);
        //$(selector).fadeTo(speed,opacity,easing,callback)
        $('#lorem1').fadeTo(5000,0.5);
    })
    $('#but1').click(function () {
        $('#img1').hide(2000);
        $('#img1').show(2000);
    })
});
