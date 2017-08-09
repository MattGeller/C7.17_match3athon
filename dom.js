$(document).ready(function () {

//Header
var $header = $('<header>');
$header.appendTo('body');


//Game Area
var $div1 = $('<div>', {
    id: "game_area",
});
$div1.appendTo('body');

//Left Field
var $div2 = $('<div>', {
    class: "left_field",
});
$div2.appendTo('#game_area');

//Play Field

var $div3 = $('<div>', {
    class: "play_field",
});
$div3.appendTo('#game_area');

for(var i = 0; i < 64; i++){
        var $div4 = $('<div>', {
            class: "tile",
            html: i
        });
        $div4.appendTo('.play_field');
}

//Right Field
var $div5 = $('<div>', {
    class: "right_field",
});
$div5.appendTo('#game_area');


//Footer
var $footer = $('<footer>');
$footer.appendTo('body');

});