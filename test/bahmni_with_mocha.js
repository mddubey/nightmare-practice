var Nightmare = require('nightmare');
var expect = require('chai').expect();
var config = require('./config.json')

describe('Bahmni Test', function() {
	var envName = config[process.env.env_name];
	var nightmare = new Nightmare(envName.init);
	this.timeout(60000); // Set timeout to 60 seconds, instead of the original 2 seconds
	var url = 'https://h1-showcase.twhosted.com/bahmni/home/index.html#/login';

	describe('User with all priviledge', function() {
		it('should have access to all the apps', function(done) {
			var allAppsExpected = ['Registration', 'Clinical', 'Admission and Discharge',
				'Orders', 'Reports', 'National Registry', 'Admin'
			];

			nightmare
				.goto(url)
				.wait('form[name="loginForm"]')
				.wait(envName.waitTime)
				.evaluate(fillLocation, process.env.location)
				.type('input[id="username"]', process.env.username)
				.type('input[id="password"]', process.env.password)
				.click('form[name="loginForm"] [type=submit]')
				.wait('#view-content .apps ul')
				.wait(envName.waitTime)
				.evaluate(function() {
					var allAppsNodes = document.querySelector('#view-content .apps ul').children;
					var allApps = Array.prototype.slice.call(allAppsNodes);
					return allApps.map(function(app) {
						return app.getElementsByTagName('a')[0].text;
					});
				}, function(result) {
					expect(result).to.be.instanceof(Array);
					expect(result).to.be.equal.to(allAppsExpected);
				})
				.run(done);
		});
	});

	describe('User', function() {
		it('should be able to create patient', function(done) {

			nightmare
				.goto(url)
				.wait('form[name="loginForm"]')
				.wait(envName.waitTime)
				.evaluate(fillLocation, process.env.location)
				.type('input[id="username"]', process.env.username)
				.type('input[id="password"]', process.env.password)
				.click('form[name="loginForm"] [type=submit]')
				.wait('#view-content .apps ul')
				.click('#view-content .apps ul li a[href*="registration"]')
				.wait('#view-content .reg-search-wrapper')
				.wait(envName.waitTime)
				.click('#view-content .reg-header-wrapper .reg-header ul li:nth-of-type(2) a')
				.wait('#view-content .new-patient')
				.wait(envName.waitTime)
				.evaluate(function() {
					// return document.querySelector('#view-content .reg-search-wrapper .reg-search').children;
				}, function(result) {
					// expect(result).to.be.instanceof(Array);
					// var searchByIdForm = result[0].getElementsByTagName('form')[0];
					// expect(searchByIdForm.name).to.be.equal.to('searchByIdForm');
				})
				.run(done);
		});
	});
});


var fillLocation = function(location) {
	var locationSelector = '#location option[label="' + location + '"]';
	var locationValue = document.querySelector(locationSelector).value;
	document.querySelector('#location').value = locationValue;
}