// constructor for entire Game object
// $(document).ready(initialize);

function initialize(){
    create_test_html();
    var game = new Game();
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
    };

    //function to log a game with a 5x4 grid. I am too tired to write it so that it logs
    this.log_gamestate = function () {
        var string_to_print = "\n";
        var i = 0;
        for (i = 0; i <= 4; i++){
            string_to_print += this.playfield.tiles[i].celestial_body;
            string_to_print += "\t";
        }
        console.log(string_to_print);
        string_to_print = "";
        for (i = 5; i <= 9; i++){
            string_to_print += this.playfield.tiles[i].celestial_body;
            string_to_print += "\t";
        }
        console.log(string_to_print);
        string_to_print = "";

        for (i = 10; i <= 14; i++){
            string_to_print += this.playfield.tiles[i].celestial_body;
            string_to_print += "\t";
        }
        console.log(string_to_print);
        string_to_print = "";

        for (i = 15; i <= 19; i++){
            string_to_print += this.playfield.tiles[i].celestial_body;
            string_to_print += "\t";
        }
        console.log(string_to_print);
        string_to_print = "";

    };

    this.init();

}

function Playfield(grid_width) {
    this.tiles = [];
    this.first_tile_clicked = null;
    this.marked_for_death = [];
    this.playfield_width = grid_width;
    this.init = function() {
        var tile_grid = $(".tile");
        for (var i = 0; i < grid_width * grid_width; i++) {
            var tile = new Tile();
            tile.parent = this;
            tile.dom_element = tile_grid[i];
            tile.grid_position = i;
            tile.dom_element.addEventListener("click", tile.handle_click.bind(tile));
            this.tiles[i] = tile;
        }
        for (i = 0; i < grid_width*grid_width; i++){
            this.marked_for_death[i] = false;
        }

    };
    this.tile_clicked = function (tile_index){
        if(this.first_tile_clicked === null) this.first_tile_clicked = tile_index;
        else {
            this.swap_attempt(this.first_tile_clicked, tile_index);
            this.first_tile_clicked = null;
        }
        console.log("Tile " + tile_index + " was clicked.");
    };
    this.populateArrayIn3TileTestMode = function () {
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());

        this.tiles[0].celestial_body = "Earth";
        this.tiles[1].celestial_body = "Mars";
        this.tiles[2].celestial_body = "Jupiter";
    };

    this.populateForTesting = function () {
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());
        this.tiles.push(new Tile());

        this.tiles[0].celestial_body = "Mars";
        this.tiles[1].celestial_body = "Earth";
        this.tiles[2].celestial_body = "Earth";
        this.tiles[3].celestial_body = "Earth";
        this.tiles[4].celestial_body = "Saturn";
        this.tiles[5].celestial_body = "Mars";
        this.tiles[6].celestial_body = "Jupiter";
        this.tiles[7].celestial_body = "Earth";
        this.tiles[8].celestial_body = "Jupiter";
        this.tiles[9].celestial_body = "Saturn";
        this.tiles[10].celestial_body = "Jupiter";
        this.tiles[11].celestial_body = "Mars";
        this.tiles[12].celestial_body = "Earth";
        this.tiles[13].celestial_body = "Saturn";
        this.tiles[14].celestial_body = "Mars";
        this.tiles[15].celestial_body = "Venus";
        this.tiles[16].celestial_body = "Mars";
        this.tiles[17].celestial_body = "Jupiter";
        this.tiles[18].celestial_body = "Mars";
        this.tiles[19].celestial_body = "Saturn";

        this.playfield_width = 5;

        for (var i = 0; i < grid_width*grid_width; i++){
            this.marked_for_death[i] = false;
        }
    };

    this.get_body_at_left = function(index_num){
        if (index_num % this.playfield_width === 0){
            return false;
        } else {
            return this.tiles[index_num -1].celestial_body;
        }
    };

    this.get_index_left = function (index_num) {
        if (index_num % this.playfield_width === 0){
            return false;
        } else {
            return index_num -1;
        }
    };

    this.get_body_at_right = function(index_num){
        if (index_num -1 % this.playfield_width === 0){
            return false;
        } else {
            return this.tiles[index_num +1].celestial_body;
        }
    };

    this.get_index_right = function(index_num) {
        if (index_num +1 % this.playfield_width === 0){
            return false;
        } else {
            return index_num +1;
        }
    };

    this.get_body_above = function (index_num){
        if (index_num > this.playfield_width){
            return false;
        } else {
            return this.tiles[index_num - this.playfield_width].celestial_body;
        }
    };

    this.get_index_above = function (index_num) {
        if (index_num < this.playfield_width){
            return false;
        }
        else {
            return index_num - this.playfield_width;
        }
    };

    this.get_body_below = function(index_num) {
        if (index_num > this.tiles.length - this.playfield_width){
            return false;
        }
        else {
            return this.tiles[index_num + this.playfield_width].celestial_body;
        }
    };

    this.get_index_below = function (index_num) {
        if (index_num >= this.tiles.length - this.playfield_width){
            return false;
        }
        else {
            return index_num + this.playfield_width;
        }
    };
    this.fill_in_from_above = function(index_num) {
        var counter_for_how_many_new_things_come_down = 1;
        var other_index = index_num;
        //loop that happens once per row above
        for (var i = Math.floor(index_num/this.playfield_width); i >0;i--){
            //other_index is now the index that's one above
            other_index = this.get_index_above(other_index);

            //if other_index points to a card that's NOT in the death list
            if (this.marked_for_death.indexOf(other_index) <= -1){
                //clobber the data at other_index straight into the tile at index_num
                this.tiles[index_num].celestial_body = this.tiles[other_index].celestial_body;
            } else {
                counter_for_how_many_new_things_come_down++;
            }
            index_num = this.get_index_above(index_num);

        }
        for (i = 0; i < counter_for_how_many_new_things_come_down; i++){
            this.tiles[other_index].celestial_body = "Ready for another planet!";
            other_index = this.get_index_below(other_index);
        }
    };

    this.swap_attempt = function (index_1, index_2) {
        this.simple_swap(index_1,index_2);
        if(!(this.check_for_matches(index_1) || this.check_for_matches(index_2))){
            this.simple_swap(index_1,index_2);
            return false;
        }
        return true;
    };


    this.simple_swap = function(one_index, other_index) {
        var temp = this.tiles[one_index].celestial_body;
        this.tiles[one_index].celestial_body = this.tiles[other_index].celestial_body;
        this.tiles[other_index].celestial_body = temp;
    };

    this.check_for_matches = function(original_index) {
        debugger;
        var horizontal_array = [];
        var vertical_array = [];
        var index_of_interest = original_index;
        var returnbool = false;

        //go left until not a match (or reach end of playfield)
        while ((this.get_index_left(index_of_interest) || this.get_index_left(index_of_interest) ===0) && this.tiles[this.get_index_left(index_of_interest)].celestial_body === this.tiles[original_index].celestial_body){
            index_of_interest = this.get_index_left(index_of_interest);
        }
        //go right, adding each index of same type to the horizontal array
        do {
            horizontal_array.push(index_of_interest);
            index_of_interest = this.get_index_right(index_of_interest);
        } while(this.tiles[index_of_interest].celestial_body === this.tiles[original_index].celestial_body);

        //same thing as above but vertical

        index_of_interest = original_index;
        //go up until not a match (or reach end of playfield)
        while ((this.get_index_above(index_of_interest) || this.get_index_above(index_of_interest) ===0) && this.tiles[this.get_index_above(index_of_interest)].celestial_body === this.tiles[original_index].celestial_body){
            index_of_interest = this.get_index_above(index_of_interest);
        }
        //go down, adding each index of same type to the vertical array
        do {
            vertical_array.push(index_of_interest);
            index_of_interest = this.get_index_below(index_of_interest);
        } while(this.tiles[index_of_interest].celestial_body === this.tiles[original_index].celestial_body);

        //if there's 3 or more in a row, mark each of those indices for death
        if (horizontal_array.length >= 3){
            for (var i = 0; i < horizontal_array.length; i++ ) {
                this.marked_for_death[horizontal_array[i]] = true;
            }
            returnbool = true;
        }

        //if there's 3 or more in a column, mark each of those indices for death
        if (vertical_array.length >= 3) {
            for (i = 0; i < vertical_array.length; i++ ) {
                this.marked_for_death[vertical_array[i]] = true;
            }
            returnbool = true;
        }
        //return true or false, depending on whether anything became marked for death.
        return returnbool;
    }

}

function Tile () {
    this.parent = null;
    this.celestial_body = null;
    this.dom_element = null;
    this.grid_position = null;
    this.handle_click = function() {
        this.parent.tile_clicked(this.grid_position);
    }

}

var The_Game = new Game();
The_Game.playfield.populateForTesting();
// The_Game.playfield.check_for_matches(2);