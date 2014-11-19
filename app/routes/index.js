import Ember from 'ember';

function generateBoard(){
	var size = 30;
	
	var board = [];

    for (var x = 1; x < size; x++) { //1st case is unbombable because player's spawn
        board[x] = [];
        for (var y = 0; y < size; y++) {
            board[x][y] = [Math.random()<.8 ? 0 : 1];
        }
    }

    alert(board);

	return board;
}

export default Ember.Route.extend({
	model: function() {
		return {board: generateBoard()};
	}
});