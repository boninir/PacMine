import Ember from 'ember';

function generateBoard(){
	var size = 10;
	var board = [];

    for (var x = 0; x < size; x++) { 
        board[x] = [];
        for (var y = 0; y < size; y++) {
        	board[x][y] = [Math.random()<.5 ? 0 : 1];
        }
    }
    board[0][0] = [0];								//1st case is the player's spawn, so unbombable.
    board[size-1][size-1] = [0];					//last case is the exit, can't be bombed.
    return board;
}


var checked = [];

function getBoard(){
	var board = generateBoard();
	console.log(board.length-1);
    while (verifyBoard(board,0,0,1) != 0){
    	board = generateBoard();
    	checked = [];
    }
	return board;
}

function isChecked(x,y){
	for (var i = checked.length - 1; i >= 0; i--) {
		if(checked[i] == (x+"_"+y)){
			return true;
		}
	};
	return false;
}

function check(x,y){
	checked.push(x+"_"+y);
}

function verifyBoard(board,x,y,flag){

	if((x == board.length-1) && (y == board.length-1) || (flag == 0))
		return 0;

	if (x-1 >= 0){
		if (y-1 >= 0){
			if((board[x-1][y-1] == 0) && (flag != 0) && !(isChecked(x-1,y-1))){
				check(x-1,y-1);
				flag = verifyBoard(board,x-1,y-1,flag);
			}
			if((board[x][y-1] == 0) && (flag != 0) && !(isChecked(x,y-1))){
				check(x,y-1);
				flag = verifyBoard(board,x,y-1,flag);
			}
		}
		if((board[x-1][y] == 0) && (flag != 0) && !(isChecked(x-1,y))){
			check(x-1,y);
			flag = verifyBoard(board,x-1,y,flag);
		}
		if (y+1 < board.length){
			if((board[x-1][y+1] == 0) && (flag != 0) && !(isChecked(x-1,y+1))){
				check(x-1,y+1)
				flag = verifyBoard(board,x-1,y+1,flag);
			}
		}
	}
	if (x+1 < board.length) {
		if (y-1 >= 0)
			if((board[x+1][y-1] == 0) && (flag != 0) && !(isChecked(x+1,y-1))){
				check(x+1,y-1);
				flag = verifyBoard(board,x+1,y-1,flag);
			}
		if((board[x+1][y] == 0) && (flag != 0) && !(isChecked(x+1,y))){
			check(x+1,y);
			flag = verifyBoard(board,x+1,y,flag);
		}
		if (y+1 < board.length)
			if((board[x+1][y+1] == 0) && (flag != 0) && !(isChecked(x+1,y+1))){
				check(x+1,y+1);
				flag = verifyBoard(board,x+1,y+1,flag);
			}
	}

	if (y+1 < board.length){
		if((board[x][y+1] == 0) && (flag != 0) && !(isChecked(x,y+1))){
			check(x,y+1);
			flag = verifyBoard(board,x,y+1,flag);
		}
	}

	return flag;
}



export default Ember.Route.extend({
	model: function() {
		return {
			board: getBoard()
		};
	}
});