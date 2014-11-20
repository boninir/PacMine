import Ember from 'ember';

function generateBoard(){
	var size = 10;
	
	var board = [];

    for (var x = 0; x < size; x++) { 
        board[x] = [];
        for (var y = 0; y < size; y++) {
        	board[x][y] = [Math.random()<.8 ? 0 : 1];
        }
    }
    board[0][0] = [0];		//1st case is the player's spawn, so unbombable
	return board;
}

export default Ember.Route.extend({
	model: function() {
		return {board: generateBoard()};
	}
});