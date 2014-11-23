import Ember from 'ember';

export default Ember.View.extend({
	templateName: 'board',
	currentPosition: [0,0],
	click: function(e) {

		var board = this.get('controller.model.board');

		var nearestSquares = getNearestSquares(board,this.currentPosition);

		actualizeColors(board, nearestSquares);

		var clicked = e.target,
			td_parent = $(e.target).parent('td'),
			x = td_parent.data('x'),
			y = td_parent.data('y');

		console.log(x+'_'+y);

		//à partir de là ça merdouille... incompréhensible jusque fin de "click"

		if(((x >= 0) && (y >= 0)) && ((x < board[0].length) && (y < board[0].length))){
			var moveState = checkMove(x,y,this.currentPosition[0],this.currentPosition[1]);
			console.log(moveState);
			if(moveState == true){
				console.log(board[x][y]);
				if(board[x][y] == 0){
					console.log('valid move');
					$('#'+this.currentPosition[0]+'_'+this.currentPosition[1]).removeClass('player');
					this.currentPosition[0] = x;
					this.currentPosition[1] = y;
					$('#'+x+'_'+y).addClass('player');
				}
				else{
					alert('you lost !');
				}
			}
			else
			{
				alert('you can\'t go there');
			}
		}
		console.log('currentPosition = '+this.currentPosition[0]+'_'+this.currentPosition[1]);
	}
});

function actualizeColors(board,accessibleSquares){
	for (var i = accessibleSquares.length - 1; i >= 0; i--) {
		var square = accessibleSquares[i];
		$('#'+square[0]+'_'+square[1]).addClass(getSquareColor(board,square));
	};
}

function getNearestSquares(board,currentPosition){

	var x = parseInt(currentPosition[0]);
	var y = parseInt(currentPosition[1]);
	var nearestSquares = [];

	var i = 0;

	if (x-1 >= 0){
		if (y-1 >= 0){
	
			nearestSquares[i] = [x-1,y-1];
			i++;
	
			nearestSquares[i] = [x,y-1];
			i++;
		}

		nearestSquares[i] = [x-1,y];
		i++;
		if (y+1 < board[0].length){
	
			nearestSquares[i] = [x-1,y+1];
			i++;
		}
	}
	if (x+1 < board[0].length) {
		if (y-1 >= 0){
	
			nearestSquares[i] = [x+1,y-1];
			i++;
		}

		nearestSquares[i] = [x+1,y];
		i++;
		if (y+1 < board[0].length){
	
			nearestSquares[i] = [x+1,y+1];
			i++;
		}
	}
	if (y+1 < board[0].length){

		nearestSquares[i] = [x,y+1];
	}

	return nearestSquares;
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

function checkMove(x,y,oldx,oldy){
	var res = ((x == oldx+1) && (y == oldy)) ;
	res = (res || ((x == oldx-1) && (y == oldy)));
	res = (res || ((x == oldx) && (y == oldy+1)));
	res = (res || ((x == oldx) && (y == oldy-1)));

	return res;
}





















