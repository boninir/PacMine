import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(board) {
	
	
	var boardHTML = '<table id="pac-mine" border=1>';

	for (var i = 0; i < board.length; i++) {
		boardHTML += '<tr>';
		for (var j = 0; j < board[i].length; j++) {
			if((i == 0) && (j == 0)){
				boardHTML += '<td id="'+i+'_'+j+'" class="player" data-x="'+i+'" data-y="'+j+'">';
			}
			else{
				boardHTML += '<td id="'+i+'_'+j+'" class="blanck" data-x="'+i+'" data-y="'+j+'">';
			}
			boardHTML += '<a href="#">';
			boardHTML += '</a>';
			boardHTML += '</td>';
		}
		boardHTML += '</tr>';
	}
	boardHTML += '</table>';
	return boardHTML.htmlSafe();
});