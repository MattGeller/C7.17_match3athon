$(document).ready(function () {


// Header

var $header = $('<header>');
$header.appendTo('body');

    var $h1 = $('<h1>', {
        text: "SPACE WARS SAGA"
    });
    $h1.appendTo('header');


// Game Area

var $div1 = $('<div>', {
    id: 'game_area',
});
$div1.appendTo('body');


// Left Field

var $div2 = $('<div>', {
    class: 'left_field'
});
$div2.appendTo('#game_area');

    var $h2 = $('<h2>', {
        text: "SCORE"
    });
    $h2.appendTo('.left_field');


    // Progress Bar

    var $div3 = $('<div>', {
        class: 'progress progressbar',
        id: 'score'
    });
    $div3.appendTo('.left_field');


// Display Stats

    function display_stats(){
        $('#score > .value').text(score);

        $(function() {
            $("#score").progressbar({
                value: score
            });
        } );
    }


// Play Field

var $div4 = $('<div>', {
    class: 'play_field'
});
$div4.appendTo('#game_area');

    for(var i = 0; i < 64; i++){
        var $div5 = $('<div>', {
            class: 'tile',
            id: i
        });
        $div5.css('order', i);
        $div5.appendTo('.play_field');
    }

    $('.tile').click(function(){
        $(this).css('order', 9);
        $(this).css({bottom: '86px'});
        $('#9').remove();
        var $div7 = $('<div>', {
            class: 'tile',
            id: 1
        });
        $div7.css('order', 1);
        $div7.html('<img src="assets/mars.png">');
        $div7.appendTo('.play_field');
        $(this).animate({top: '0'});
    });



// Right Field

var $div6 = $('<div>', {
    class: 'right_field'
});
$div6.appendTo('#game_area');

    $h2 = $('<h2>', {
        text: "LEVEL"
    });
    $h2.appendTo('.right_field');

    $p = $('<p>', {
        class: 'level',
        text: "3"
    });
    $p.appendTo('.right_field');


// Footer

var $footer = $('<footer>');
$footer.appendTo('body');


// Win Modal

// var $div6 = $('<div>',{
//    class: 'modal',
//     id: 'win_modal',
//     role: 'dialog'
// });
// $div6.appendTo('body');
//
//     var $div7 = $('<div>',{
//        class: 'modal-dialog win'
//     });
//     $div7.appendTo.($div6);




});