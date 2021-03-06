'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic.js');

protractorConfig.config.multiCapabilities = [{
    browserName: 'chrome',
    name: '[bitbloq-app] Linux-jenkins',
    recordVideo: false,
    recordScreenshots: false,
    //  specs: require('../testsuites/common.js'),
    shardTestFiles: true,
    maxInstances: 10,
    chromeOptions: {
        // How to set browser language (menus & so on)
        //args: ['lang=fr-FR'],
        args: ['--no-sandbox'],
        prefs: {
            // Set other language in navigator
            // intl: {
            //     accept_languages: 'fr-FR'
            // },
            download: {
                'prompt_for_download': false,
                'directory_upgrade': true,
                'default_directory': './target'
            }

        }
    }
}];

// The timeout in milliseconds for each script run on the browser. This should
// be longer than the maximum time your application needs to stabilize between
// tasks.
protractorConfig.config.allScriptsTimeout = 25000;

// How long to wait for a page to load.
protractorConfig.config.getPageTimeout = 25000;

protractorConfig.config.seleniumAddress = 'http://localhost:4444/wd/hub';
protractorConfig.config.directConnect = true;
protractorConfig.config.plugins = [{
    package: 'jasmine2-protractor-utils',
    screenshotOnExpectFailure: true,
    screenshotOnSpecFailure: true,
    screenshotPath: 'target/report/',
    failTestOnErrorLog: {
        failTestOnErrorLogLevel: 90000000000000000000000000
    }
}];

exports.config = protractorConfig.config;
