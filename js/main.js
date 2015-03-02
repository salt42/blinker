var app = angular.module('NAME', ['ui.router', 'NAME.controllers', 'blinker', 'ngAnimate'])
	.run(function() {

	})
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/layouts/default.html",
				controller: 'AppCtrl'
			})
			.state('app.home', {
				url: "/home",
				views: {
					'mainContent' : {
						templateUrl: "templates/twoButtons.html",
						controller: 'HomeCtrl'
					}
				}
			})
			.state('blinker', {
				url: "/blinker",
				abstract: true,
				templateUrl: "templates/layouts/default.html",
				controller: 'BlinkerCtrl'
			})
				.state('blinker.static', {
					url: "/static",
					views: {
						'mainContent' : {
							templateUrl: "templates/blinker/static/colorList.html",
							controller: 'BlinkerStaticCtrl'
						}
					}
				})
				.state('blinker.shake', {
					url: "/shake",
					views: {
						'mainContent' : {
							templateUrl: "templates/twoButtons.html",
							controller: 'BlinkerShakeCtrl'
						}
					}
				})
				.state('blinker.text', {
					url: "/text",
					views: {
						'mainContent' : {
							templateUrl: "templates/blinker/text.html",
							controller: 'BlinkerTextCtrl'
						}
					}
				})
				.state('blinker.run', {
					url: "/run",
					views: {
						'mainContent' : {
							templateUrl: "templates/blinker/canvas.html",
							controller: 'BlinkerRunCtrl'
						}
					}
				})





			.state('blinker.test', {
				url: "/test",
				views: {
					'mainContent' : {
						templateUrl: "templates/blinker/canvas.html",
						controller: 'testBlinkerCtrl'
					}
				}
			})


			.state('blinker.color', {
				url: "/color",
				views: {
					'mainContent' : {
						templateUrl: "templates/blinker/canvas.html",
						controller: 'ColorBlinkerCtrl'
					}
				}
			})
			.state('test', {
				url: "/test",
				abstract: true,
				templateUrl: "templates/layouts/default.html",
				controller: 'BlinkerCtrl'
			})
			.state('test.accel', {
				url: "/accel",
				views: {
					'mainContent' : {
						templateUrl: "templates/test/accel.html",
						controller: 'TestAccelCtrl'
					}
				}
			});

		$urlRouterProvider.otherwise("/app/home");
	});

