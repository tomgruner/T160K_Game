$(function() {

	var enable_profile = false,
		paper = Raphael("canvas", 760, 480),
		game,
	    books = [],
	    booksBB = [],
		umbrellas = [],
		circles = [],
	 	rain,
	 	drop_check_interval,
	 	game_over_interval,
	 	enable_umbrella_move = true,
		orig_angle, 
		dragging_umbrella,
		umbrella_real_width,
		umbrella_real_height,
		current_level,
		level_time_left,
		level_time_interval,
		score=0,
		game_over,
		$score_node,
		umbrella_src = [{"type":"path","fill":"#897D74","stroke":"none","path":"M169.024,357.665l11.014-15.611l11.502-16.483l13.35-17.742l14.223-17.253l16.072-18.512\r\n\t\t\tl16.945-18.024l18.305-18.409l19.178-17.922l20.925-16.946l21.797-16.458l23.543-15.482l25.289-14.507l27.035-13.532\r\n\t\t\tl28.293-11.683l29.551-9.834l32.17-8.371l-26.162,14.019l-23.852,22.184l-21.052,29.476l-18.151,34.534l-13.786,36.972\r\n\t\t\tL384.921,287l-4.851,37.383l-0.281,35.354l-10.861-7.214l-10.859-7.214l-11.836-5.468l-11.836-5.468l-12.812-3.722l-14.173-3.337\r\n\t\t\tl-12.427-2.362l-14.275-1.103l-14.763-0.231l-13.505,1.618l-14.866,2.003l-13.12,2.978l-14.583,5.598l-14.583,5.597l-13.324,7.446\r\n\t\t\tL169.024,357.665z"},{"type":"path","fill":"#897D74","stroke":"none","path":"M387.393,362.766l1.154-34.866l7.084-37.279l9.808-38.051l14.658-36.484l16.79-34.148\r\n\t\t\tl19.691-29.09l20.848-25.008l20.924-16.946l16.586,9.269l13.377,10.911l12.891,11.784l11.04,13.042l10.063,14.789l8.704,15.174\r\n\t\t\tl6.856,16.432l7.241,17.792l5.494,16.817l3.646,18.075l4.134,17.202l3.158,18.948l2.774,17.587l2.284,18.46l1.9,17.099\r\n\t\t\tl0.54,17.485l-10.373-8.087l-11.349-6.341l-11.836-5.468l-13.197-5.083l-13.686-4.209l-14.659-2.464l-13.788-1.977l-15.637-0.718\r\n\t\t\tl-14.763-0.231l-15.739,1.516l-14.479,3.364l-15.354,2.876l-14.583,5.597l-14.583,5.598l-14.686,7.831L387.393,362.766z"},{"type":"path","fill":"#897D74","stroke":"none","path":"M824.553,363.156l-10.064-14.789l-12.196-17.125l-13.069-17.612l-13.941-18.101\r\n\t\t\tl-15.688-19.076l-16.176-18.203l-17.922-19.178l-18.409-18.306l-21.131-17.536l-22.005-18.02l-22.979-16.277l-25.315-14.146\r\n\t\t\tl-26.189-14.634l-27.65-12.015l-29.989-9.884l-32.324-7.752l14.07,5.571l11.732,7.702l12.504,10.424l11.04,13.042l11.042,13.042\r\n\t\t\tl10.449,16.149l8.217,16.046l8.603,17.408l7.626,19.153l6.753,18.666l5.393,19.051l4.032,19.435l3.158,18.948l2.286,18.46\r\n\t\t\tl0.539,17.485l-0.82,17.869l11.091-7.548l10.604-6.676l10.987-5.315l13.225-5.212l12.244-3.467l12.634-2.106l14.866-2.003\r\n\t\t\tl12.527,0.128l14.764,0.23l13.787,1.977l14.174,3.337l14.173,3.337l13.195,5.083l14.455,6.932l13.097,7.316L824.553,363.156z"},{"type":"rect","fill":"#897D74","stroke":"none","x":498,"y":229.829,"width":9,"height":512},{"type":"rect","fill":"#000","stroke":"none","x":184,"y":161,"width":622,"height":247}];

	/* ********************************* Umbrellas *************************************/
	function addUmbrellaToPaper(x, y, scale, rotation, color) {
		var umbrella_set = paper.add(umbrella_src);

		//Set our real width and height for each umbrella
		if (!umbrella_real_width) {
			var bb = umbrella_set.getBBox();
			umbrella_real_width = bb['x2'] - bb['x']; 
			umbrella_real_height = bb['y2'] - bb['y'];
		}

		//Add a circle to the umbrella base
		var circle = paper.circle(x + (6*scale),y, 12*scale);
		circle.attr({fill: color});

		//Hide the hit rectangles which are used for hit testing
		umbrella_set.forEach(function(element){

		    if(element.type == 'rect' && element.attr('height') == 247) {
				element.attr({opacity : 0});
			} else {
				element.attr({fill : color, cursor: 'pointer'});
			}

		});

		//Add custom props so we can use them in transforms later
		umbrella_set.custom_props = {
			x : x,
			y : y,
			scale : scale,
			angle : rotation,
			bb: getExtendedBBox(umbrella_set)
		}

		//Position the umbrella
		transformUmbrella(umbrella_set);

		function dragging_start(event) {
		    orig_angle = umbrella_set.custom_props['angle'];
		    dragging_umbrella = umbrella_set;
		}
		
		umbrella_set.drag(dragging_move, dragging_start, dragging_up);

		umbrellas.push(umbrella_set);
		umbrella_set.toFront();

		circles.push(circle);
		circle.toFront();

	}

	function dragging_move(dx, dy) {
		 
		 if (dragging_umbrella && enable_umbrella_move) {
		   enable_umbrella_move = false;
		   setTimeout(function(){enable_umbrella_move = true}, 50);
		   var changer = dx > 0 ? 1 : -1;
		   if(Math.abs(dx) < 20) {
		   		changer = changer * 1 / (20 - Math.abs(dx));
		   }
		   var newAngle = orig_angle  + (dx/3) + (dy/3 * changer);
		   if(newAngle < -110) newAngle = -110;
		   if(newAngle > 110) newAngle = 110;
		   dragging_umbrella.custom_props['angle'] = newAngle;
	       transformUmbrella(dragging_umbrella);
	    }
	}

	function dragging_up() {
		dragging_umbrella = false;
	}

	function getExtendedBBox(element) {
		var bb = element.getBBox();
		bb['cx'] = (bb['x'] + bb['x2']) / 2;
		bb['cy'] = (bb['y'] + bb['y2']) / 2;
		return bb;
	}

	function transformUmbrella(umbrella_set) {

		umbrella_set.transform("");
		
		var props = umbrella_set.custom_props;
		var bb = props.bb;
		var transform = 't' + (props['x'] - bb['cx']) + ',' + (props['y'] - bb['y2']) 
				   			 + 's' + props['scale'] + ',' + props['scale'] + ',' + bb['cx'] + ',' + bb['y2']
				             + 'r' + props['angle'] + ','  + bb['cx'] + ',' + bb['y2'];
		umbrella_set.transform(transform);
	}


	


	/**************** Rain Drop Handling **************************/


	function makeSplash(x,y,to_x,to_y, size, speed, color) {
		var sp = paper.circle(x, y, size);
		sp.attr({fill: color, stroke:'none'});
		sp.animate({cx: to_x, cy: to_y, opacity:0}, speed, function() { sp.remove(); });	
	}


	function splashAndRemove(drop, x, y, color) {
		drop.remove();

				
		var rand = Math.random() * 30;
		
		
		makeSplash(x,
			       y,
			       x+(Math.random() * 50) + 10,y-rand-15, 
			       Math.ceil(Math.random() * 3), 
			       Math.random() * 900 + 500, 
			       color); 
		makeSplash(x,
				   y,
				   x-(Math.random() * 50) + 10,y-rand-15, 
				   Math.ceil(Math.random() * 3), 
				   Math.random() * 900 + 500, 
				   color); 
	}

	function checkDrops() {
		
		for (var ri in rain.drops) {
			
			var drop = rain.drops[ri];
			
			if (drop.disabled) continue;
			
			var dbb = drop.getBBox();
			
			try {
				var x = dbb.cx;
				var y = dbb.y2;
			} catch (e) {
				//bbox may be undefined if drop is removed by another timer?
				continue;
			}

		
			for (var i in books) {
				if(books[i] && Raphael.isPointInsideBBox(booksBB[i], x, y)) {
					rain.drops[ri].disabled = true;
					books[i].hits++;
					if (books[i].hits > 4) {
						books[i].remove();
						books[i] = false;
					} else {
						books[i].attr({opacity: 1 - (books[i].hits/5)});
					}
					splashAndRemove(drop, x, y, '#FF8C00');
					addToScore(-13);
				}
			}

			for (var i in umbrellas) {
				umbrellas[i].forEach(function(element) {
					if(element.type == 'rect' && element.isPointInside(x,y)) {
						splashAndRemove(drop, x, y, '#97c3cc');
						addToScore(10 + Math.floor(Math.random() * 2));
					} 
				});
			}

		}
	}
	    

	/************************* IMAGE PRELOADING ***************************/
	var imagesToLoad = 0,	
	    enableGameLoaded = false;	

	var image_resources = { 
		book_1 : { src: 'images/book_1.png' },
		book_2 : { src: 'images/book_2.png' },
		book_3 : { src: 'images/book_3.png' },  
		bg_init : { src: 'images/bg_init.jpg' },
		bg_1 : { src: 'images/bg_1.jpg' },
		bg_2 : { src: 'images/bg_2.jpg' },
		drop_1 : { src: 'images/drop_1.png' }
	};

	//After all images are loaded then show level
	function preloadImage(key) {
		var image = new Image();
		image.src = image_resources[key]['src'];
		image.onload=function () {
			image_resources[key]['image'] = image;
			imagesToLoad--;
			if (imagesToLoad === 0 && enableGameLoaded) {
				gameLoaded();
			}
		}
	}

	for (key in image_resources) {
		imagesToLoad++;
		preloadImage(key);
	}

	enableGameLoaded = true;

	function addImageToPaper(image_resource_key, x, y, scale, rotation) {
		var image = image_resources[image_resource_key]['image'];
		var p_image = paper.image(image.src, x, y, image.width * scale, image.height * scale);
		p_image.rotate(rotation);
		return p_image;
	}


	/******************************* Game end and next level ***********************/

	function updateLevelTime() {
		level_time_left --;
		if(level_time_left == 0) {
			levelComplete();
		}
	}

	function stopGame() {
		if (enable_profile) console.profileEnd();
		clearInterval(drop_check_interval);
		clearInterval(game_over_interval);
		clearInterval(level_time_interval);
	}

	function cleanUp() {

		$('#level-complete, #next-options').slideUp();

		for (var i in umbrellas) {
			umbrellas[i].remove();
		}
		for (var i in circles) {
			circles[i].remove();
		}

		for (var i in books) {
			if(books[i]) books[i].remove();
		}

		books = [];
		booksBB = [];
		umbrellas = [];

	}

	function gameOver() {
		/* This is called at interval */
		for (var i in books) {
			if (books[i]) return;
		}
		game_over = true;
		rain.stop();
		stopGame();
		setTimeout(function() {
			$('#game-over').slideDown();
		}, 100);

		setTimeout(function() {
			showNextOptions();
		}, 1000);
	}

	function levelComplete() {
		
		rain.stop();

		setTimeout(function() {
			stopGame();
			//The game may have been lost while the rain was stopping...
			if (game_over) return;
			for (var i in books) {
				if(books[i]) {
					addToScore(2000);
				}
			}

			if(current_level == levels.length -1) {
				var screen_id = '#game-complete';
			} else {
				var screen_id = '#level-complete';
			}
			setTimeout(function() {
				showNextOptions();
			}, 1000);

			$(screen_id).slideDown();
		}, 4000);	
	}

	function showNextOptions() {
		var player_level = '';

		if (score < 4000) {
			player_level = '';
		} else if (score < 10000) {
			player_level= ' - apprentice';
		} else if (score < 14000) {
			player_level = ' - master';
		} else if (score < 15000) {
			player_level = ' - grand master';
		} else if (score > 15000) {
			player_level = ' - ninja!';
		}

		$('#share-score-display').html(score + player_level);
		$('#next-options').slideDown();
	}

	/************************* Level Rendering / Flow Control / Score ***************************/

	function renderLevel(level_number) {

		if(enable_profile) console.profile();
		cleanUp();
		current_level = level_number;
		var level = levels[level_number];
		level_time_left = level['time'];
		game_over = false;

		//Add in bg
		var bg_src = image_resources[level['bg']]['src'];
		$('#intro-screen').slideUp();
		$('#bg-image').remove();
		$('#bg-images').append('<img id="bg-image" src="' + bg_src + '">');

		for (var index in level['books']) {
			//Call addImageToPaper with the arguments for the book image
			var book = addImageToPaper.apply(null, level['books'][index]);
			//Add some custom properties
			book.hits = 0;
			books.push(book);	
		}	

		for (var index in books) {
			booksBB.push(books[index].getBBox());
		}

		//Add in the umbrellas
		for (var index in level['umbrellas']) {
			addUmbrellaToPaper.apply(null, level['umbrellas'][index]);
		}	

		rain = new Rain(paper, {
	      speed: level['rainSpeed'], 
	      angles: level['rainAngles'], 
	      intensity: level['rainIntensity'], 
	      size: level['rainSize'],
	      color: '#cdf'
	    });

	    drop_check_interval = setInterval(checkDrops, 200);
	    game_over_interval = setInterval(gameOver, 1000);
	    level_time_interval = setInterval(updateLevelTime, 1000);
	}

	function addToScore(points) {
		score += points;
		if (!$score_node) $score_node = $('#score-display');
		if (score < 0) score = 0;
		$score_node.html(score);	
	}

	/* Called after all of the resources are loaded in */
	function gameLoaded() {
		$('#loading').hide();
		$('#bg-images').append('<img id="bg-image" src="images/bg_init.jpg">');
		$('#intro-screen').slideDown();

		//Add level select
		for (var i in levels) {
			var ln = 1 + (i * 1);
			$('#levels').append('<div id="level-' + ln +'" class="level" data-level="' + ln +'">Level ' + ln +' <br><span class="level-title">'+ levels[i]['title'] +'</span></div>');
		}

		$('.level').click(function(){
			$('#levels').hide();
			var level = $(this).data('level');
			renderLevel(level-1);
		});

		$('#next-level').click(function() {
			renderLevel(current_level +1);
		});

		$('#share-fb').click(function() {
			shareScoreToFacebook(score);
		});

		$('#share-tw').click(function() {
			shareScoreToTwitter(score);
		});

		$('#play-it-again').click(function() {
			window.location.reload();
		});
	}

});
