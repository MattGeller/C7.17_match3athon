// constructor for entire Game object
function Game() {
    this.playfield = null;
    this.score = null;
    this.turns_total= null;
    this.turns_taken = null;

}

function Playfield(grid_width) {
    this.tiles = [];
    this.indicies_of_tiles_marked_for_death = [];
    this.playfield_width = grid_width;

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
}




function Tile () {
    this.celestial_body = null;

}

var game = new Game();

