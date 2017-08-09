// constructor for entire Game object
$(document).ready(initialize);

function initialize(){
    create_test_html();
    game = new Game();
}
function create_test_html(){
    var temp = $('<div>').addClass('playfield');
    var color_array = ['blue','green','orange','purple','red','yellow'];
    $('body').append(temp);
    for(var i = 0; i < 64; i++){
        var rando_color = Math.floor(Math.random()*6);
        temp = $('<div>').addClass('tile').css({'background-color': color_array[rando_color], 'border': 'solid 1px black'});
        $('.playfield').append(temp);
    }
}

function Game() {
    this.playfield = null;
    this.score = null;
    this.score_to_pass = null;
    this.turns_total= null;
    this.turns_taken = null;
    this.points_awarded_per_3_match = null;
    this.points_awarded_per_4_match = null;
    this.points_awarded_per_double_3_match = null;
    this.init = function() {
        this.playfield = new Playfield(8);
        this.score = 0;
        this.score_to_pass = 3000;
        this.turns_total = 25;
        this.turns_taken = 0;
        this.points_awarded_per_3_match = 100;
        this.points_awarded_per_4_match = 200;
        this.points_awarded_per_double_3_match = 300;

    }
    this.handle_click = function(){
        var clicked_element = event.target;
        if(clicked_element.parentElement.id === 'playfield'){
            this.playfield.handle_click(clicked_element);
        }
    }
    this.init();

}

function Playfield(grid_width) {
    this.tiles = [];
    this.indicies_of_tiles_marked_for_death = [];
    this.playfield_width = grid_width;
    this.init = function(){
        var tile_grid = $(".tile");
        for(var i = 0; i< grid_width*grid_width; i++){
            var tile = new Tile();
            tile.dom_element = tile_grid[i];
            tile.grid_position = i;
            tile.dom_element.addEventListener("click", this.tiles[i].handle_click)
            this.tiles[i] = tile;
        }

    }
    this.get_body_at_left = function(index_num){
        if (index_num % this.playfield_width === 0){
            return false;
        } else {
            return this.tiles[index_num -1].celestial_body;
        }
    };

    this.get_body_at_right = function(index_num){
        if (index_num -1 % this.playfield_width === 0){
            return false;
        } else {
            return this.tiles[index_num +1].celestial_body;
        }
    }
    this.init();
}




function Tile () {
    this.celestial_body = null;
    this.dom_element = null;
    this.grid_position = null;
    this.handle_click = function() {

    }

}

//var game = new Game();

