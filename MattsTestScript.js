var The_Game = new Game();
The_Game.playfield.populateForTesting();
The_Game.log_gamestate();
debugger;

var index_A = 12;
var index_B = The_Game.playfield.get_index_below(index_A);
The_Game.playfield.simple_swap(index_A,index_B);
debugger;
The_Game.log_gamestate();
debugger;
The_Game.playfield.check_for_matches(index_A);
console.log(The_Game.playfield.marked_for_death);
debugger;
// The_Game.playfield.swap_attempt(12,17);