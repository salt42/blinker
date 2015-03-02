/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4 */
/*global $, angular */
angular.module('blinker', [])
	.directive('blinker', function($timeout) {


		//loop through an array of colors
		//needs: colorArray and stepTime
		//flag for stapwise | not means calculate colors between them array colors
		//var colorArray = [[90, 85, 37], [223, 230, 37], [37, 230, 175], [46, 37, 230], [230, 37, 185]],
		//	colorPointer = 0,
		//	stepTime = 5,
		//	stepwise = true,
		//	canvas = document.getElementById("blinker"),
		//	ctx = canvas.getContext('2d');
		//
		//function getColor(from, to, step) {
		//	var v = [];
		//	v[0] = to[0] - from[0];
		//	v[1] = to[1] - from[1];
		//	v[2] = to[2] - from[2];
		//	//scale down
		//	v[0] = v[0] * step;
		//	v[1] = v[1] * step;
		//	v[2] = v[2] * step;
		//	//add to from
		//	v[0] = Math.floor(v[0] + from[0]);
		//	v[1] = Math.floor(v[1] + from[1]);
		//	v[2] = Math.floor(v[2] + from[2]);
		//	return v;
		//}
		//
		////var grd = ctx.createLinearGradient(0,0,1000,0);
		////var multi = 1/(colorArray.length - 1);
		////for (var i=0;i<colorArray.length;i++) {
		////	grd.addColorStop(multi*i,colorArray[i]);
		////}
		//
		////var c = getColor([255,0,0],[0,255,0],0.1);
		////ctx.fillStyle = 'rgb('+ c[0] +','+ c[1] +','+ c[2] +')';
		////ctx.rect(0,0,1000,150);
		////ctx.fill();
		//
		//var smoth = 0;
		//function hop() {
		//	setTimeout(function () {
		//		if (smoth >= 1) {
		//			smoth = 0;
		//			colorPointer++;
		//			if (!(colorPointer < colorArray.length)) {
		//				colorPointer = 0;
		//			}
		//		}
		//		var nextColor = colorArray[colorPointer+1] || colorArray[0];
		//		//console.log(nextColor)
		//		var c = getColor(colorArray[colorPointer], nextColor, smoth)
		//		ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
		//		ctx.rect(0, 0, 1000, 150);
		//		ctx.fill();
		//		smoth = smoth + 0.01;
		//
		//		hop();
		//	}, stepTime);
		//}
		//hop();





		/*
		* data structure
		*
		* [{
		*   backColor:[r,g,b],
		*   textColor:[r,g,b],
		*   char:""
		* }]

		* */

		var canvas,
			ctx,
			controller,
			timeout,
			data = [],
			rawData,
			dataPointer = 0,
			frameTime = 1,
			state = 0,
			fontSize = 400,
			time = 25,
			breakTime = 10,
			mode = 0,
			direction,
			loop = true;

		function vec2rgb(rgbArray) {
			return 'rgb('+ rgbArray[0] +','+ rgbArray[1] +','+ rgbArray[2] +')';
		}
		function clearScreen() {
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, 1000, 1000);
		}
		function draw() {
			if (!ctx || !data || !data[dataPointer]) { return; }
			switch (state) {
				case 0:
					ctx.fillStyle = vec2rgb(data[dataPointer].backColor);
					ctx.fillRect(0, 0, 1000, 1000);
					ctx.fillStyle = vec2rgb(data[dataPointer].textColor);
					ctx.textColor = vec2rgb(data[dataPointer].textColor);
					ctx.font = 'bold ' + fontSize + 'pt Calibri';
					ctx.fillText(data[dataPointer].char, 10, fontSize);
					break;
				case 1:
					clearScreen();
					break;
			}

			//draw current state
		}
		function nextState() {
			//anhand vom mode den nächsten frame ermitteln

			//frameTime =
			switch (mode) {
				case 0: // just loop through the array
					frameTime = time;
					dataPointer++;
					if (dataPointer >= data.length) {
						if (!loop) {
							return false;
						}
						dataPointer = 0;
					}
					return true;
					break;
				case 1: // flash single chars and between them black
					if (state == 0) {
						//black for a while
						state = 1;
						frameTime = breakTime;
						dataPointer++;
						if (dataPointer >= data.length) {
							if (!loop) {
								clearScreen();
								return false;
							}
							dataPointer = 0;
						}
					} else {
						//short blink with colored char
						state = 0;
						frameTime = time;
					}
					return true;
					break;
			}
		}
		function stop() {
			clearTimeout(timeout);

		}
		function start() {
			stop();
			fontSize = window.innerHeight * 0.75;
			data = rawData.slice();
			if (!direction) {
				data.reverse();
			}
			switch (mode) {
				case 0:
					state = 0;
					dataPointer = 0;
					run();
					break;
				case 1:
					state = 1;
					dataPointer = 0;
					run();
					break;
			}
		}
		function run() {
			timeout = setTimeout(function() {
				if (nextState()) {
					draw();
					run();
				} else {
				}
			}, frameTime);
		}
		function setMode(m) {
			mode = m;
		}
		function setTime(t, bt) {
			//update time
			time = t || 40;
			breakTime = bt || 50;
		}
		function setDirection(d) {
			direction = d;
		}
		function setLoop(l) {
			loop = l;
		}
		var directiveDefinitionObject = {
			restrict: 'E',
			priority: -10,
			link: function(scope, element) {
				scope.$watch("data", function(newValue) {
					stop();
					dataPointer = 0;
					rawData = newValue;
				});
			},
			controller: function($scope) {
				canvas = document.getElementById("blinker");
				ctx = canvas.getContext('2d');
				if (typeof $scope.control != 'object') {
					return;
				}
				controller = $scope.control;
				controller.start = start;
				controller.stop = stop;
				controller.setMode = setMode;
				controller.setTime = setTime;
				controller.setDirection = setDirection;
				controller.setLoop = setLoop;
			},
			scope: {
				data: '=',
				control: '='
			},
			template:   '<canvas id="blinker" width="1000px" height="1000px"></canvas>'
		};
		return directiveDefinitionObject;
	});
