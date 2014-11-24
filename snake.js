(function (root) {

	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

	var Snake = SnakeGame.Snake = function() {
		this.head_pos = [4, 4];
		this.body_positions = [[4, 3], [4, 2], [4, 1], [4, 0]];
		this.direction = "right";
		this.opposite = "left";
		this.body_length = 4;
	}

	Snake.prototype.move = function() {
		for (var i = this.body_length - 1; i > 0; i--) {
			this.body_positions[i] = this.body_positions[i - 1].slice(0);
		}
		this.body_positions[0] = this.head_pos.slice(0);

		if (this.direction === "up") {
			this.head_pos[0] --;
		} else if (this.direction === "right") {
			this.head_pos[1] ++;
		} else if (this.direction === "down") {
			this.head_pos[0] ++;
		} else if (this.direction === "left") {
			this.head_pos[1] --;
		}

		if (this.head_pos[1] === 16) {
			this.head_pos[1] = 0;
		} else if (this.head_pos[1] === -1) {
			this.head_pos[1] = 15;
		} else if (this.head_pos[0] === 16) {
			this.head_pos[0] = 0;
		} else if (this.head_pos[0] === -1) {
			this.head_pos[0] = 15;
		}

		this.draw();
	}

	Snake.prototype.draw = function() {
		$(".tile").removeClass("snake");

		$("#"+this.head_pos.join("_")).toggleClass("snake");

		if(this.body_length > 1) {
			$.each(this.body_positions, function(idx, pos) {
				$("#" + pos.join("_")).toggleClass("snake");
			});
		}
	}

	var Game = SnakeGame.Game = function() {
		this.paused = false;
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
		this.snake.move();
	}

	Game.prototype.setDir = function(dir) {

		if (dir === this.snake.opposite) {
			return
		}

		this.snake.direction = dir;
		switch(dir) {
			case "up":
			this.snake.opposite = "down";
			break;

			case "left":
			this.snake.opposite = "right";
			break;

			case "right":
			this.snake.opposite = "left";
			break;

			case "down":
			this.snake.opposite = "up";
			break;

			default: return;
		}
	}

	Game.prototype.run = function() {
		var that = this;

		$(document).keydown(function(e) {
			switch(e.which) {
				case 37:
				that.setDir("left");
				break;

				case 38:
				that.setDir("up");
				break;

				case 39:
				that.setDir("right");
				break;

				case 40:
				that.setDir("down");
				break;

				case 32:
				if (!that.paused) {
					clearInterval(that.intervalID);
					that.paused = true;
				} else {
					that.intervalID = setInterval(that.tick.bind(that), 200);
					that.paused = false;
				}
				break;

				default: return;
			}
			e.preventDefault();
		});

		this.intervalID = setInterval(this.tick.bind(this), 200);
	}

	Game.prototype.addSnake = function() {

		var snake = new Snake();
		this.snake = snake;
	}

})(this);