import Ember from 'ember';

export default Ember.View.extend({
	templateName: 'board',
	currentPosition: [0,0],
	click: function(e) {

		var board = this.get('controller.model.board');


		var clicked = e.target,
			td_parent = $(e.target).parent('td'),
			x = td_parent.data('x'),
			y = td_parent.data('y');

		if(((x >= 0) && (y >= 0)) && ((x < board[0].length) && (y < board[0].length))){
			var moveState = checkMove(x,y,this.currentPosition[0],this.currentPosition[1]);
			console.log(moveState);
			if(moveState == true){
				console.log(board[x][y]);
				if(board[x][y] == 0){
					var nearestSquares = getNearestSquares(board,[x,y]);
					actualizeColors(board, nearestSquares);
					$('#'+this.currentPosition[0]+'_'+this.currentPosition[1]).removeClass('player');
					this.currentPosition[0] = x;
					this.currentPosition[1] = y;
					$('#'+x+'_'+y).addClass('player');
					if((x == board[0].length - 1) && (y == board[0].length - 1)){
						alert('you won !');
						location.reload();
					}
				}else{
					$('#'+this.currentPosition[0]+'_'+this.currentPosition[1]).removeClass('player');
					this.currentPosition[0] = x;
					this.currentPosition[1] = y;
					$('#'+x+'_'+y).addClass('lost');
					alert('you lost ! ');
					location.reload();
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
		var colorTuple = getSquareColor(board,square);
		if($('#'+square[0]+'_'+square[1]).hasClass('blank'))
			$('#'+square[0]+'_'+square[1]).removeClass('blank');
		$('#'+square[0]+'_'+square[1]).addClass(colorTuple[0]);
		console.log(colorTuple[1]);
		if(colorTuple[1] != null){
			$('#'+square[0]+'_'+square[1]).html('<a href=#>'+colorTuple[1]+'</a>');
		}
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
	var res = [];

	if(count > 0){
		res[0] = "yellow";
		res[1] = parseInt(count);
	}
	
	if(count >= 2){
		res[0] = "orange";
		res[1] = parseInt(count);
	}
	
	if(count >= 4){
		res[0] = "red";
		res[1] = parseInt(count);
	}
	
	if(count >= 7){
		res[0] = "black";
		res[1] = parseInt(count);
	}

	if(count == 0){
		res[0] = "blank";
	}
	return res;
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

window.onkeydown = function(e) {
	var key = e.keyCode || e.which;

	switch (key) {
	    case 37:	//left
		    alert('left');
		    break;

	    case 38:	//up
	    	alert('up');
		    break;
		
		case 39:	//right
		    alert('right');
		    break;
		
		case 40:	//down
		    alert('down');
		    break;
	}
};