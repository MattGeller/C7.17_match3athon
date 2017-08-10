$(document).ready(function () {


// Start Game - links to index.html

var $div1 = $('<div>').addClass("start_game");
$div1.appendTo('body');

var $h1 = $('<h1>', {
    class: 'animated infinite pulse',
});
$h1.appendTo($div1);
$h1.html('<a href="index.html">START GAME</a>');


// Audio Control

var $div2 = $('<div>', {
    class: 'panel-heading text-center'
});
$div2.appendTo('body');

    var $span1 = $('<span>', {
        class: 'glyphicon glyphicon-volume-up'
    });
    $span1.appendTo($div2);

    var $span2 = $('<span>', {
        class: 'glyphicon glyphicon-volume-off'
    });
    $span2.appendTo($div2);


    // Star Audio

    $('.glyphicon-volume-up').on('click', function(){
        $("<audio></audio>").attr({
            'src':'assets/intro.mp3',
            'volume':0.4,
            'autoplay':'autoplay'
        }).appendTo("body");
    });


    // Stop Audio

    $('.glyphicon-volume-off').on('click', function(){
        $("body").children("audio").remove();
    });

    });