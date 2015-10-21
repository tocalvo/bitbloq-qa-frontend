/**
 * Spec to makeActionsHelp.spec.js
 * Menu Share of makeActions
 */

'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Modals = require('../../../modals/modals.po.js'),
    SocialNetwork = require('./socialNetwork.po.js'),
    Variables = require('../../../commons/variables.js'),
    Login = require('../../../login/login.po.js');


var globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    make = new Make(),
    modals = new Modals(),
    socialNetwork = new SocialNetwork(),
    vars = new Variables(),
    login = new Login();

globalFunctions.xmlReport('makeActionsShareLocal');
describe('Menu Share of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //TODO test TOAST
    //Solo se puede jugar en un entorno
    xit('bba-151:Publish project in social media (the project has already been published in Explora)', function() {

        //make.saveProjectAndPublishNewUser();
        make.saveProjectAndPublishNewUser().then(function () {
              browser.sleep(vars.timeToWaitMenu);
              var url = browser.getCurrentUrl();
              makeActions.menuShare.click();
              browser.sleep(vars.timeToWaitMenu);
              makeActions.menuShareSocial.click();
              browser.sleep(vars.timeToWaitMenu);
              browser.ignoreSynchronization = true;
              modals.fbButton.click();
              browser.sleep(vars.timeToWaitTab);
              //Facebook
              browser.getAllWindowHandles().then(function(handles) {
                  browser.switchTo().window(handles[1]);
                  browser.sleep(vars.timeToWaitTab);
                  login.facebookUser.sendKeys(vars.emailFb);
                  login.facebookPassword.sendKeys(vars.passwordFb);
                  login.facebookEnter.click().then(function() {
                      browser.sleep(vars.timeToWaitTab);
                      browser.getCurrentUrl().then(function(urlFacebook) {
                          urlFacebook = urlFacebook.split('=');
                          urlFacebook = urlFacebook[urlFacebook.length-2].split('&');
                          urlFacebook = decodeURIComponent(urlFacebook[0]);
                          expect(urlFacebook).toEqual(url);
                      });
                  });
                  // expect(urlFacebook[urlFacebook.length-1]).toEqual(url);
                  browser.close().then(browser.switchTo().window(handles[0]));
              });
              makeActions.menuShare.click();
              browser.sleep(vars.timeToWaitMenu);
              makeActions.menuShareSocial.click();
              browser.sleep(vars.timeToWaitMenu);
              modals.gButton.click();
              browser.sleep(vars.timeToWaitTab);
              //Google+
              browser.getAllWindowHandles().then(function(handles) {
                  browser.switchTo().window(handles[1]);
                  browser.sleep(vars.timeToWaitTab);
                  login.googleUser.sendKeys(vars.userGoogle);
                  browser.sleep(1000);
                  login.googleNext.click();
                  browser.sleep(1000);
                  login.googlePassword.sendKeys(vars.passwordGoogle);
                  browser.sleep(1000);
                  login.googleEnter.click();
                  browser.sleep(5000);
                  // login.googleAprove.click();
                  // browser.sleep(vars.timeToWaitTab);
                  expect(socialNetwork.googleLink.getAttribute('href')).toEqual(url);
                  browser.close().then(browser.switchTo().window(handles[0]));
              });
              makeActions.menuShare.click();
              browser.sleep(vars.timeToWaitMenu);
              makeActions.menuShareSocial.click();
              browser.sleep(vars.timeToWaitMenu);
              modals.twButton.click();
              browser.sleep(vars.timeToWaitTab);
              //Twitter
              browser.getAllWindowHandles().then(function(handles) {
                  browser.switchTo().window(handles[1]);
                  browser.sleep(vars.timeToWaitTab);
                  expect(socialNetwork.twitterLink.getText()).toMatch(url);
                  browser.close().then(browser.switchTo().window(handles[0]));

              });
              makeActions.menuShare.click();
              browser.sleep(vars.timeToWaitMenu);
              makeActions.menuShareSocial.click().then(function() {
                  browser.sleep(vars.timeToWaitMenu);
                  modals.shortButton.getAttribute('value').then(function(text){
                    console.log(text);
                    login.logout();
                    browser.get(text);
                    browser.sleep(vars.timeToWaitTab);
                    expect(browser.getCurrentUrl()).toEqual(url);
                  });
                  browser.ignoreSynchronization =false;
              });
        });

    });

});