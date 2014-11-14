(function (root) {

	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

	var Snake = SnakeGame.Snake = function(start_pos) {
		this.head_pos = start_pos;
		this.body_length = 1;
	}

	Snake.prototype.move = function() {
		var last_pos = this.head_pos.join("_");
		if (this.head_pos[1] < 16) {
			this.head_pos[1] ++;
		} else {
			this.head_pos[1] = 0;
		}
		var cur_pos = this.head_pos.join("_");

		$("#"+last_pos).toggleClass("snake");
		$("#"+cur_pos).toggleClass("snake");
	}

	var Game = SnakeGame.Game = function() {
		this.snakes = [];
	};

	Game.prototype.setBoard = function() {
		var row = 0;
		var col = 0;
		var snk = "snake";
		for(i = 0; i < 256; i++) {
			$(".container").append("<div id=" + row + "_" + col + " class='tile'></div>");
			if (col === 15) {
				row ++;
				col = 0;
			} else {
				snk = "";
				col ++;
			}
		}
	}

	Game.prototype.tick = function(n) {
		this.snakes.forEach( function(snake) {
			snake.move();
		});
	}

	Game.prototype.run = function() {
		setInterval(this.tick.bind(this), 50);
	}

	Game.prototype.addSnake = function(start_pos) {
		var snake = new Snake(start_pos);
		this.snakes.push(snake);
		$('#'+ start_pos.join("_")).toggleClass('snake');
	}

})(this);