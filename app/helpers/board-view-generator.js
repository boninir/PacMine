import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(board) {
	
	var boardHTML = '<table id="pac-mine">';

	for (var i = 0; i < board.length; i++) {
		boardHTML += '<tr>';
		for (var j = 0; j < board[i].length; j++) {
			boardHTML += '<td id="case_'+j+'_'+i+'" class="'+getBombCount(board,i,j)+'">'+getBombCount(board,i,j)+'';
			boardHTML += '</td>';
		}
		boardHTML += '</tr>';
	}
	
	boardHTML += '</table>';
	return boardHTML.htmlSafe();
});

function getBombCount(board,x,y){
	var count = 0;
	
	if (x-1 >= 0){
		if (y-1 >= 0){
			count += parseInt(board[x-1][y-1]);
			count += parseInt(board[x][y-1]);
		}
		count += parseInt(board[x-1][y]);
		if (y+1 < board[x].length){
			count += parseInt(board[x-1][y+1]);
			count += parseInt(board[x][y+1]);
		}
	}
	if (x+1 < board[x].length) {
		if (y-1 >= 0)
			count += parseInt(board[x+1][y-1]);
		count += parseInt(board[x+1][y]);
		if (y+1 < board[x].length)
			count += parseInt(board[x+1][y+1]);
	}

	return count;

}