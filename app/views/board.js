import Ember from 'ember';

export default Ember.View.extend({
	templateName: 'board',
	click: function(e) {

		var currentPosition = $('.player').attr('id').split("_");

		var board = this.get('controller.model.board');

		var accessibleSquares = getAccessibleSquares(board,currentPosition);

		actualizeColors(board, accessibleSquares);

		var clicked = e.target,
			td_parent = $(e.target).parent('td');

		console.log(clicked);
		console.log(td_parent);
		
	}
});

function actualizeColors(board,accessibleSquares){
	for (var i = accessibleSquares.length - 1; i >= 0; i--) {
		var square = accessibleSquares[i];
		$('#'+square[0]+'_'+square[1]).addClass(getSquareColor(board,square));
	};
}

function getAccessibleSquares(board,currentPosition){

	var x = parseInt(currentPosition[0]);
	var y = parseInt(currentPosition[1]);
	var accessibleSquares = [];

	var i = 0;

	if (x-1 >= 0){
		if (y-1 >= 0){
	
			accessibleSquares[i] = [x-1,y-1];
			i++;
	
			accessibleSquares[i] = [x,y-1];
			i++;
		}

		accessibleSquares[i] = [x-1,y];
		i++;
		if (y+1 < board[0].length){
	
			accessibleSquares[i] = [x-1,y+1];
			i++;
		}
	}
	if (x+1 < board[0].length) {
		if (y-1 >= 0){
	
			accessibleSquares[i] = [x+1,y-1];
			i++;
		}

		accessibleSquares[i] = [x+1,y];
		i++;
		if (y+1 < board[0].length){
	
			accessibleSquares[i] = [x+1,y+1];
			i++;
		}
	}
	if (y+1 < board[0].length){

		accessibleSquares[i] = [x,y+1];
	}

	return accessibleSquares;
}

function getSquareColor(board,square){
	var count = getBombCount(board,square);

	if(count == 0){
		return "blank";
	}
	if(count >= 7){
		return "black";
	}
	if(count >= 5){
		return "red";
	}
	if(count >= 3){
		return "orange";
	}
	if(count > 0){
		return "yellow";
	}

	return "error";
}

function getBombCount(board,square){
	var x = parseInt(square[0]);
	var y = parseInt(square[1]);

	var count = 0;
	
	if (x-1 >= 0){
		if (y-1 >= 0){
			count += parseInt(board[x-1][y-1]);
			count += parseInt(board[x][y-1]);
		}
		count += parseInt(board[x-1][y]);
		if (y+1 < board[0].length){
			count += parseInt(board[x-1][y+1]);
		}
	}
	if (x+1 < board[0].length) {
		if (y-1 >= 0)
			count += parseInt(board[x+1][y-1]);
		count += parseInt(board[x+1][y]);
		if (y+1 < board[0].length)
			count += parseInt(board[x+1][y+1]);
	}
	if (y+1 < board[0].length)
		count += parseInt(board[x][y+1]);

	return count;

}