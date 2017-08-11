$(document).ready(function () {

// Body Fade In

$('body').css('display', 'none');

$('body').fadeIn(2000);


// Header

var $header = $('<header>');
$header.appendTo('body');

    var $h1 = $('<h1>', {
        text: "SPACE WARS SAGA"
    });
    $h1.appendTo('header');


// Game Area

var $div1 = $('<div>', {
    id: 'game_area'
});
$div1.appendTo('body');


// Left Field

var $div2 = $('<div>', {
    class: 'left_field'
});
$div2.appendTo('#game_area');

    var $h2 = $('<h2>', {
        text: "SCORE",
        class: "animated infinite pulse"
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

    var first_tile_index = 1;
    var second_tile_index = 10;

    // Move planet down

    // $('.tile').click(move_planet_down);
    //
    // function move_planet_down() {
    //     $(this).css('order', 9);
    //     $(this).css({bottom: '86px'});
    //     $('#9').remove();
    //     var $div6 = $('<div>', {
    //         class: 'tile',
    //         id: 1
    //     });
    //     $div6.css('order', 1);
    //     $div6.html('<img src="assets/mars.png">');
    //     $div6.appendTo('.play_field');
    //     $(this).animate({top: '0'});
    // }


    // False swap animation vertical

    // $('.tile').click(false_swap_animation_vertical);
    //
    // function false_swap_animation_vertical(first_tile_index, second_tile_index ) {
    //     $(this).css('order', first_tile_index);
    //     $(this).animate({bottom: '86px'});
    //     $(this).css('order', second_tile_index );
    //     $(this).animate({bottom: '0px'});
    // }

    function false_swap_animation_vertical(first_tile_index, second_tile_index ) {
        var $top_element = $(document.getElementById(first_tile_index));
        var $bottom_element = $(document.getElementById(second_tile_index));

        $top_element.animate({bottom: '86px'});
        $top_element.animate({bottom: '0px'});

        $bottom_element.animate({top: '86px'});
        $bottom_element.animate({top: '0'});
    }

    // False swap animation horizontal

    var first_tile_clicked = null;
    var second_tile_clicked = null;

    $('.tile').click(function () {
        tile_clicked(parseInt($(this).attr('id')));
        // debugger;
    });

    function tile_clicked(tile_index){
        debugger;
        if(first_tile_clicked === null)
            first_tile_clicked = tile_index;
        else {
            false_swap_animation_vertical(first_tile_clicked, tile_index);
            first_tile_clicked = null;
        }
        console.log("Tile " + tile_index + " was clicked.");
    }

    // function false_swap_animation_horizontal() {
    //     $(this).css('order', 2);
    //     $(this).css({right: '86px'});
    //     $(this).css('order', 3);
    //     $(this).animate({left: '0'});
    // }


// Right Field

var $div7 = $('<div>', {
    class: 'right_field'
});
$div7.appendTo('#game_area');

    $h2 = $('<h2>', {
        text: 'LEVEL',
        class: 'animated infinite pulse'
    });
    $h2.appendTo('.right_field');

    $p = $('<p>', {
        class: 'level animated infinite pulse',
        text: "3"
    });
    $p.appendTo('.right_field');


// Footer

var $footer = $('<footer>');
$footer.appendTo('body');


// Win Modal

var $div8 = $('<div>',{
   class: 'modal',
    id: 'win_modal',
    role: 'dialog'
});
$div8.appendTo('body');

    var $div9 = $('<div>',{
       class: 'modal-dialog win'
    });
    $div9.appendTo($div8);


});