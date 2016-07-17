var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })

nightmare
  .goto('https://h1-showcase.twhosted.com/bahmni/home/index.html#/login')
  .wait('form[name="loginForm"]')
  .wait(2000)
  .type('input[id="username"]', 'saiful')
  .type('input[id="password"]', 'Saiful123')
  .select('select[id="location"]', document.querySelector('#location option[label="IPD"]').value)
  .click('form[name="loginForm"] [type=submit]')
  .wait('#view-content .apps ul')
  .wait(2000)
  .click('#view-content .apps ul li:first-child a')
  .wait('#view-content .content ul')
  .evaluate(function(){
    // return document.querySelector('#view-content .apps ul li:first-child a').text;
    // var allApps = Array.prototype.slice.call(document.querySelector('#view-content .apps ul').children);
    // return allApps.map(function(app){
    //   return app.getElementsByTagName('a')[0].text;
    // });
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
  
