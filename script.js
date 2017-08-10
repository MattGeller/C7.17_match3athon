// constructor for entire Game object
$(document).ready(initialize);

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
    }
    this.init();

}

function Playfield(grid_width) {
    this.tiles = [];
    this.first_tile_clicked = null;
    this.marked_for_death = [];
    this.playfield_width = grid_width;
    this.celestial_bodies =[];
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
        this.celestial_bodies = ["Earth", "Mars", "Venus", "Jupiter", "Mercury", "Saturn"];
    };
    this.tile_clicked = function (tile_index){
        if(this.first_tile_clicked === null) this.first_tile_clicked = tile_index;
        else {
            this.swap_attempt(this.first_tile_clicked, tile_index);
            this.first_tile_clicked = null;
        }
        console.log("Tile " + tile_index + " was clicked.");
    }
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

        this.tiles[0].celestial_body = "Venus";
        this.tiles[1].celestial_body = "Venus";
        this.tiles[2].celestial_body = "Earth";
        this.tiles[3].celestial_body = "Earth";
        this.tiles[4].celestial_body = "Mars";
        this.tiles[5].celestial_body = "Mars";
        this.tiles[6].celestial_body = "Jupiter";
        this.tiles[7].celestial_body = "Jupiter";
        this.marked_for_death.push(0);
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
        if (index_num -1 % this.playfield_width === 0){
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
        if (index_num > this.tiles.length - this.playfield_width){
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
    //this function will be called on the highest marked for death tile in each column first followed by the lower ones.
    this.shift_column_down_by_one_tile = function(tile_to_kill_index){
        var j = this.get_index_above(tile_to_kill_index);
        while(j !== false){
            this.tiles[tile_to_kill_index].celestial_body = this.tiles[j].celestial_body;
            tile_to_kill_index = j;
            j = this.get_index_above(tile_to_kill_index);
        }
        this.tiles[tile_to_kill_index].celestial_body = this.generate_celestial_body();
    }
    this.kill_marked_tiles_update_tile_grid = function(){
        var lowest_tiles_replaced_by_column = [];
        var highest_marked_tiles_in_each_column = this.highest_tiles_marked_for_death_by_column();
        for(var i = 0; i < highest_marked_tiles_in_each_column.length; i++){
            lowest_tiles_replaced_by_column.push(highest_marked_tiles_in_each_column[i]);
            if(highest_marked_tiles_in_each_column[i] !== -1){
                this.shift_column_down_by_one_tile(highest_marked_tiles_in_each_column[i]);
                var j = this.get_index_below(highest_marked_tiles_in_each_column[i]);
                while(j !== false){
                    if(this.marked_for_death[j] === true){
                        lowest_tiles_replaced_by_column[i] = j;
                        this.shift_column_down_by_one_tile(j);
                    }
                    j = this.get_index_below(j);
                }
            }
        }
        return lowest_tiles_replaced_by_column;
    }
    this.find_tiles_to_check = function(lowest_tiles_replaced_by_column){
        var tiles_to_check = [];
        for(var i = 0; i < lowest_tiles_replaced_by_column.length; i++){
            if(lowest_tiles_replaced_by_column[i] !== -1){
                tiles_to_check.push(lowest_tiles_replaced_by_column[i]);
                j = this.get_index_above(lowest_tiles_replaced_by_column[i]);
                while(j !== false){
                    tiles_to_check.push(j);
                    j = this.get_index_above(lowest_tiles_replaced_by_column[i]);
                }
            }
        }
    }
    this.swap_attempt = function(first_tile_index, second_tile_index){
        this.simple_swap(first_tile_index, second_tile_index);
        var swap_success = this.check_for_matches(first_tile_index);
        swap_success = swap_success || this.check_for_matches(second_tile_index);
        if(!swap_success){
            this.simple_swap(first_tile_index,second_tile_index);
            return;
        }
        var tiles_to_kill = true;
        while(tiles_to_kill){
            tiles_to_kill = false;
            var lowest_tiles_replaced_by_column = this.kill_marked_tiles_update_tile_grid();
            var tiles_to_check = this.find_tiles_to_check(lowest_tiles_replaced_by_column);
            for(var i = 0; i < tiles_to_check.length; i++){
                tiles_to_kill = tiles_to_kill || this.check_for_matches(tiles_to_check[i]);
            }
        }
    }
    this.simple_swap = function(one_index, other_index) {
        var temp = this.tiles[one_index].celestial_body;
        this.tiles[one_index].celestial_body = this.tiles[other_index].celestial_body;
        this.tiles[other_index].celestial_body = temp;
    };
    this.check_for_matches = function(original_index) {
        var index_of_interest = original_index;
        while ((this.get_index_left(index_of_interest) || this.get_index_left(index_of_interest) ===0) && true){
            //TODO: finish
        }
    }
    this.highest_tiles_marked_for_death_by_column = function(){
        var highest_tiles = [];
        for(var i = 0; i < this.playfield_width; i++){
            var j = i;
            while(j !== false && this.marked_for_death[j] !== true){
                j = this.get_index_below(j);
            }
            if (j === false) highest_tiles.push(-1);
            else highest_tiles.push(j);
        }
        return highest_tiles;
    }
    this.generate_celestial_body = function (){
        return this.celestial_bodies[Math.floor(Math.random()*this.celestial_bodies.length)];
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

