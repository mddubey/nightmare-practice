var Nightmare = require('nightmare');
var should = require('chai').should();
var config = require('./config.json')

describe('Bahmni Test', function() {
	var nightmare = new Nightmare(config[process.env.env_name]);
	this.timeout(60000); // Set timeout to 60 seconds, instead of the original 2 seconds
	var url = 'https://h1-showcase.twhosted.com/bahmni/home/index.html#/login';

	describe('User with all priviledge', function() {
		it('should have access to all the apps', function(done) {
			var allAppsExpected = ['Registration', 'Clinical', 'Admission and Discharge',
				'Orders', 'Reports', 'National Registry', 'Admin'];

			nightmare
				.goto(url)
				.wait('form[name="loginForm"]')
				.evaluate(function(location){
					var locationValue = document.querySelector('#location option[label="'+location+'"]').value;
					document.querySelector('#location').value = locationValue;
				}, process.env.location)
				.type('input[id="username"]', process.env.username)
				.type('input[id="password"]', process.env.password)
				.click('form[name="loginForm"] [type=submit]')
				.wait('#view-content .apps ul')
				.evaluate(function() {
					var allAppsNodes = document.querySelector('#view-content .apps ul').children;
					var allApps = Array.prototype.slice.call(allAppsNodes);
					return allApps.map(function(app) {
						return app.getElementsByTagName('a')[0].text;
					});
				}, function(result) {
					result.should.equal(allAppsExpected);
				})
			.run(done);
		});
	});
});