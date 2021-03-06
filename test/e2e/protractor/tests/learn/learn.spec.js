'use strict';

var Login = require('../login/login.po.js'),
    Learn = require('./learn.po.js'),
    Header = require('../header/header.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js');

var login = new Login(),
    learn = new Learn(),
    header = new Header(),
    make = new Make(),
    modals = new Modals(),
    vars = new Variables(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('learn');

describe('Learn ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-198:learn:Appears the tutorial with a registered user', function() {
        login.loginWithRandomUser();
        header.navLearn.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/learn');
        expect(learn.basicTutorialTable.isPresent());
        login.logout();
    });

    it('bbb-200:learn:Appears the tutorial with an unregistered user', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navLearn.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/learn');
        expect(learn.basicTutorialTable.isPresent());
    });

    it('bbb-201:learn:Verify that you can click on tutorial (registered user)', function() {
        login.loginWithRandomUser();
        header.navLearn.click();
        var elemTutorial = learn.firstElementTutorial();
        elemTutorial.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).toMatch('http://diwo.bq.com/');
            browser.close().then(browser.switchTo().window(handles[0]));
            browser.sleep(vars.timeToWaitTab);
            browser.ignoreSynchronization = false;
            login.logout();
        });

    });

    it('bbb-202:learn:Verify that you can click on tutorial (unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navLearn.click();
        var elemTutorial = learn.firstElementTutorial();
        elemTutorial.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).toMatch('http://diwo.bq.com/');
            browser.close().then(browser.switchTo().window(handles[0]));
            browser.ignoreSynchronization = false;
        });
    });

    it('bbb-349:learn:Verify that you can click on "Show more tutorials in DIWO" (registered user)', function() {
        login.loginWithRandomUser();
        header.navLearn.click();
        learn.goToDIWOButton.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).toBe('http://diwo.bq.com/');
            browser.close().then(browser.switchTo().window(handles[0]));
            browser.sleep(vars.timeToWaitTab);
            browser.ignoreSynchronization = false;
            login.logout();
        });
    });

    it('bbb-350:learn:Verify that you can click on "Show more tutorials in DIWO" (unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        header.navLearn.click();
        learn.goToDIWOButton.click();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.ignoreSynchronization = true;
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            expect(browser.getCurrentUrl()).toBe('http://diwo.bq.com/');
            browser.close().then(browser.switchTo().window(handles[0]));
            browser.ignoreSynchronization = false;
        });
    });

    it('bbb-199:learn:Verify suggest a tutorial action (registered user)', function() {
        login.loginWithRandomUser();
        header.navLearn.click();
        learn.contactUsTutorials.click();
        browser.sleep(vars.timeToWaitFadeModals);
        globalFunctions.navigatorLanguage().then(function(language) {
            if (language === 'es') {
                expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteral);
            } else {
                expect(modals.modalTitle.getText()).toEqual(vars.sendCommentsLiteralEN);
            }
            modals.bladeClose.click();
            browser.sleep(vars.timeToWaitFadeModals);
            login.logout();
        });
    });

    it('bbb-351:learn:Verify suggest a tutorial action (unregistered user)', function() {
        learn.get();
        browser.sleep(vars.timeToWaitFadeModals);
        globalFunctions.navigatorLanguage().then(function(language) {
            expect(learn.contactUsTutorials.getAttribute('href')).toEqual(vars.supportEmail(language));
        });
    });

});
