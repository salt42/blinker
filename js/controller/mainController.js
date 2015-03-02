/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4 */
/*global angular, document */
var STATIC_BLINKER_COLORS = [
	{
		name: 'Rainbow',
		color: '#00f',
		data: [
			{
				backColor:[255,0,0],//red
				textColor:[0,0,0],
				char:""
			},{
				backColor:[255,165,0],//orange
				textColor:[0,0,0],
				char:""
			},{
				backColor:[255,255,0],//gelb
				textColor:[0,0,0],
				char:""
			},{
				backColor:[0,255,0],//green
				textColor:[0,0,0],
				char:""
			},{
				backColor:[0,0,255],//blue
				textColor:[0,0,0],
				char:""
			},{
				backColor:[98,0,255],//indigo
				textColor:[0,0,0],
				char:""
			},{
				backColor:[238,130,238],//violet
				textColor:[0,0,0],
				char:""
			}
		]
	},{
		name: 'Red',
		color: '#bc1339',
		data: [{
			backColor:[255,0,0],//red
			textColor:[0,0,0],
			char:""
		}]
	},{
		name: 'blue',
		color: '#00f',
		data: [{
			backColor:[255,0,0],//red
			textColor:[0,0,0],
			char:""
		}]
	},{
		name: 'blue',
		color: '#00f',
		data: [{
			backColor:[255,0,0],//red
			textColor:[0,0,0],
			char:""
		}]
	},{
		name: 'blue',
		color: '#00f',
		data: [{
			backColor:[255,0,0],//red
			textColor:[0,0,0],
			char:""
		}]
	},{
		name: 'blue',
		color: '#00f',
		data: [{
			backColor:[255,0,0],//red
			textColor:[0,0,0],
			char:""
		}]
	},{
		name: 'blue',
		color: '#00f',
		data: [{
			backColor:[255,0,0],//red
			textColor:[0,0,0],
			char:""
		}]
	},{
		name: 'blue',
		color: '#00f',
		data: [{
			backColor:[255,0,0],//red
			textColor:[0,0,0],
			char:""
		}]
	},{
		name: 'blue',
		color: '#00f',
		data: [{
			backColor:[255,0,0],//red
			textColor:[0,0,0],
			char:""
		}]
	}
];
function Cbuffer(max) {
	this.data = [];
	this.pointerNext = 0;
	this.max = max;
}
Cbuffer.prototype = {
	get: function() {
		var re = [],
			i = this.pointerNext - 1;

		for(;i>=0;i--) {
			if (this.data[i] != undefined) {
				re.push(this.data[i]);
			}
		}
		for(i=this.max;i >= this.pointerNext;i--) {
			if (this.data[i] != undefined) {
				re.push(this.data[i]);
			}
		}
		return re;
	},
	push: function(item) {
		this.data[this.pointerNext] = item;
		this.pointerNext++;
		if (this.pointerNext > this.max) {
			this.pointerNext = 0;
		}
	}
};

angular.module('NAME.controllers', [])
	.controller('AppCtrl', function($scope) {
		console.log("AppCtrl")
	})
	.controller('HomeCtrl', function($scope, $location) {
		$scope.topContent = 'static';
		$scope.bottomContent = 'shake';
		$scope.topClick = function() {
			$location.path("blinker/static");
		};
		$scope.bottomClick = function() {
			$location.path("blinker/shake");
		};
	})
	.controller('BlinkerCtrl', function($scope) {})
	.controller('BlinkerStaticCtrl', function($scope, $rootScope, $location) {
		//list with collors and rainbow
		//start blinker on click
		$scope.list = STATIC_BLINKER_COLORS;
		$scope.run = function(item) {
			$rootScope.blinkerConf = {
				data: item.data,
				mode: 'static'
			};
			$location.path("blinker/run");
		}
	})
	.controller('BlinkerShakeCtrl', function($scope, $location, $rootScope) {
		//select rainbow or text
		//on rainbow start blinker and on text open text config view
		$scope.topContent = 'Rainbow';
		$scope.bottomContent = 'Text';
		$scope.topClick = function() {
			$rootScope.blinkerConf = {
				data: STATIC_BLINKER_COLORS[0].data,
				mode: 'shake'
			};
			$location.path("blinker/run");
		};
		$scope.bottomClick = function() {
			$location.path("blinker/text");
		};
	})
	.controller('BlinkerTextCtrl', function($scope, $location, $rootScope) {
		//text config
		$scope.text = 'LOVE';
		$scope.run = function() {
			//create data array and run

			$rootScope.blinkerConf = {
				data: createData($scope.text, [200,80,0]),
				mode: 'shake'
			};
			$location.path("blinker/run");
		}
		function createData(text, rgb) {
			var data = [];

			text = text.toUpperCase();
			for (var i=0;i<text.length;i++) {
				data.push({
					backColor: [0,0,0],
					textColor: rgb,
					char: text[i]
				});
			}
			console.log(data)
			return data;
		}
	})
	.controller('BlinkerRunCtrl', function($scope, $rootScope, $location) {
		var spikeState = 'none',
			watcher;
		if (typeof $rootScope.blinkerConf != 'object' || typeof $rootScope.blinkerConf.data != 'object') {
			$location.path("/");
			return;
		}
		//the blinker controller
		$scope.blinkerData = $rootScope.blinkerConf.data;
		$scope.blinkerControl = {};

		function goForward(timeee) {
			$scope.blinkerControl.stop();
			$scope.blinkerControl.setMode(1);
			$scope.blinkerControl.setTime(50, 50);
			$scope.blinkerControl.setDirection(true);
			$scope.blinkerControl.setLoop(false);
			$scope.blinkerControl.start();
		}

		if ($rootScope.blinkerConf.mode === 'shake') {
			watcher = navigator.accelerometer.watchAcceleration(function (a) {
					if (a.x > 9) {
						if (spikeState !== 'left') {
							spikeState = 'left';
						}
					} else if (a.x < -9) {
						if (spikeState !== 'right') {
							spikeState = 'right';
						}
					} else {
						if (spikeState == 'left') {
							spikeState = 'toRight';
							//goBackward(a.timestamp);
						} else if (spikeState == 'right') {
							spikeState = 'toLeft';
							goForward(a.timestamp);
						}
					}
				},
				function () {
				},
				{frequency: 5}
			);
		} else {
			setTimeout(function () {
				$scope.blinkerControl.setMode(1);
				$scope.blinkerControl.setTime(300, 200);
				$scope.blinkerControl.setDirection(true);
				$scope.blinkerControl.setLoop(true);
				$scope.blinkerControl.start();
			}, 50);
		}
	})


	.controller('TestAccelCtrl', function($scope) {
		console.log("TestAccelCtrl")
		var canvas = document.getElementById("diagram");
		var ctx = canvas.getContext('2d');
		var data = new Cbuffer(500);
		var lastTime = 0;
		var eventInterval = 0;

		$scope.draw = function() {
			ctx.fillStyle = '#000000';
			ctx.fillRect(0, 0, 700, 500);
			ctx.save();
			ctx.translate(0, 300);
			ctx.fillStyle = '#f0a000';
			ctx.beginPath();
			ctx.strokeStyle = '#00ff00';


			var d = data.get();
			var bigBang = new Date().getTime();
			var x = 0;
			if (typeof d[0] == "object") {
				ctx.moveTo((bigBang - d[0].timestamp) * 0.05, d[0].x * 10);
			}
			for(var i=0;i<d.length;i++) {
				if (typeof d[i] == "object") {
					x = bigBang - d[i].timestamp;
					ctx.lineTo(x * 0.05, d[i].x * 10);
				}
			}
			ctx.stroke();
			ctx.fillStyle = '#ff0000';
			for(var i=0;i<d.length;i++) {
				if (typeof d[i] == "object") {
					x = bigBang - d[i].timestamp;
					ctx.beginPath();
					ctx.arc(x * 0.05, d[i].x * 10, 3, 0, 2 * Math.PI, false);
					ctx.fill();
				}
			}
			ctx.font = 'bold 20pt Calibri';
			ctx.fillText(eventInterval + ' :', 40, 40);
			ctx.restore();

		};

		//function draw(a) {
		//	ctx.fillStyle = a;
		//	ctx.fillRect(0,0,700,500);
		//	//ctx.fillText(a,40,40);
		//	ctx.fill();
		//}
		//zeit zwischen den letzten spikes merken
		//wenn
		//var lastSpikeTime = 0,
		//	spikeState = 'none';
		//function spikeLeft(a) {
		//	//check
		//	var b = a.timestamp - lastSpikeTime;
		//	//console.log(b)
		//	lastSpikeTime = a.timestamp;
		//}
		//function spikeRight(a) {
		//	var b = a.timestamp - lastSpikeTime;
		//	//console.log(b)
		//	lastSpikeTime = a.timestamp;
		//}
		//function goForward() {}
		//function goBackward() {}
		//var lastX = 0;
		window.requestAnimationFrame(function step() {
			$scope.draw();
			window.requestAnimationFrame(step);
		});

		function onMove(a) {
			if (a.timestamp != lastTime) {
				data.push(a);
				eventInterval = a.timestamp - lastTime;
				lastTime = a.timestamp;
			}
		}
		setInterval(function() {
			if (navigator.accelerometer) {
				navigator.accelerometer.getCurrentAcceleration(onMove, function (e) {
					//error
					console.log(e);
				});
			}
		}, 10);
	})
	//	var watchID = navigator.accelerometer.watchAcceleration(function(a) {
	//			if (a.timestamp != lastTime) {
	//				data.push(a);
	//				eventInterval = a.timestamp - lastTime;
	//				lastTime = a.timestamp;
	//			}
	//			//$scope.draw();
	//			//if (a.x > 15) {
	//			//	if (spikeState !== 'left') {
	//			//		spikeLeft(a);
	//			//		spikeState = 'left';
	//			//	}
	//			//
	//			//} else if (a.x < -15) {
	//			//	if (spikeState !== 'right') {
	//			//		spikeRight(a);
	//			//		spikeState = 'right';
	//			//	}
	//			//} else {
	//			//	if (spikeState == 'left') {
	//			//		spikeState = 'toRight';
	//			//		goForward();
	//			//	}else if (spikeState == 'right') {
	//			//		spikeState = 'toLeft';
	//			//		goBackward();
	//			//	}
	//			//}
	//		},
	//		function() {},
	//		{frequency: 5});
	//})
	.controller('testBlinkerCtrl', function($scope) {
		$scope.blinkerControl = {};
		$scope.blinkerData = [{
			textColor:[255,0,0],
			backColor:[0,0,0],
			char:"L"
		},{
			textColor:[0,255,0],
			backColor:[0,0,0],
			char:"O"
		},{
			textColor:[255,0,0],
			backColor:[0,0,0],
			char:"V"
		},{
			textColor:[0,255,0],
			backColor:[0,0,0],
			char:"E"
		}];

		$scope.start = function() {
			$scope.blinkerControl.start();
		};
		$scope.stop = function() {
			$scope.blinkerControl.stop();
		};
		//var last = 0,
		//	timeStack = new Cbuffer(3);

		//function calcRunTime(time) {
		//	var duration = time - last;
		//	last = time;
		//	timeStack.push(duration);
		//	var times = timeStack.get(),
		//		calced = 0;
		//
		//	for (var i=0;i<times.length;i++) {
		//		calced += times[i];
		//	}
		//	calced = calced / times.length;
		//	return (calced > 800)? 400: calced;
		//}
		//function goBackward(time) {
		//	time = calcRunTime(time);
		//	time = time - 4 * 40;
		//	var blackTime = time / 4;
		//	if (blackTime < 5 ) {blackTime = 10}
		//	$scope.blinkerControl.stop();
		//	$scope.blinkerControl.setMode(1);
		//	$scope.blinkerControl.setTime(25, blackTime);
		//	$scope.blinkerControl.setDirection(false);
		//	$scope.blinkerControl.setLoop(false);
		//	$scope.blinkerControl.start();
		//}
		var breakTime = 0,
			time = 0;

		//var onSliderChange = function(){
		//	breakTime = document.getElementById("breaktime").value;
		//	time = document.getElementById("time").value;
		//	document.getElementById("breaktimeui").value = breakTime;
		//	document.getElementById("timeui").value = time;
		//};
		//document.getElementById("time").onchange = onSliderChange;
		//document.getElementById("breaktime").onchange = onSliderChange;
		function goForward(timeee) {
			//time = calcRunTime(time);
			//time = time - 4 * 40;
			//var blackTime = time / 4;
			//if (blackTime < 5 ) {blackTime = 10}
			$scope.blinkerControl.stop();
			$scope.blinkerControl.setMode(1);
			$scope.blinkerControl.setTime(time, breakTime);
			$scope.blinkerControl.setDirection(true);
			$scope.blinkerControl.setLoop(false);
			$scope.blinkerControl.start();
		}
		var spikeState = 'none';
		var watchID = navigator.accelerometer.watchAcceleration(function(a) {
				if (a.x > 9) {
					if (spikeState !== 'left') {
						spikeState = 'left';
					}
				} else if (a.x < -9) {
					if (spikeState !== 'right') {
						spikeState = 'right';
					}
				} else {
					if (spikeState == 'left') {
						spikeState = 'toRight';
						//goBackward(a.timestamp);
					}else if (spikeState == 'right') {
						spikeState = 'toLeft';
						goForward(a.timestamp);
					}
				}
			},
			function() {},
			{frequency: 5});
	})
	.controller('ColorBlinkerCtrl', function($scope) {

		$scope.blinkerControl = {};
		var dataPointer = 0;
		var data = [
			//text
			[{
				textColor:[200,80,50],
				backColor:[0,0,0],
				char:"L"
			},{
				textColor:[1,80,50],
				backColor:[0,0,0],
				char:"O"
			},{
				textColor:[20,80,150],
				backColor:[0,0,0],
				char:"V"
			},{
				textColor:[1,80,50],
				backColor:[0,0,0],
				char:"E"
			}],
			//rainbow
			[{
				backColor:[255,0,0],//red
				textColor:[0,0,0],
				char:""
			},{
				backColor:[255,165,0],//orange
				textColor:[0,0,0],
				char:""
			},{
				backColor:[255,255,0],//gelb
				textColor:[0,0,0],
				char:""
			},{
				backColor:[0,255,0],//green
				textColor:[0,0,0],
				char:""
			},{
				backColor:[0,0,255],//blue
				textColor:[0,0,0],
				char:""
			},{
				backColor:[98,0,255],//indigo
				textColor:[0,0,0],
				char:""
			},{
				backColor:[238,130,238],//violet
				textColor:[0,0,0],
				char:""
			}],
		];
		$scope.blinkerData = data[dataPointer];
		$scope.changeData = function() {
			dataPointer++
			if (dataPointer >= data.length) {
				dataPointer = 0;
			}
			$scope.blinkerData = data[dataPointer];
		};


		//bewegungen aufzeichnen, auswerten und reagieren

	});