[![Build Status](https://img.shields.io/travis/thomaschampagne/stravistix/develop.svg?label=unitTests@develop)](https://travis-ci.org/thomaschampagne/stravistix/branches)  [![AppVeyor branch](https://img.shields.io/appveyor/ci/thomaschampagne/stravistix/develop.svg?label=zip@develop)](https://ci.appveyor.com/project/thomaschampagne/stravistix/branch/develop/artifacts)

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/dhiaggccakkgdfcadnklkbljcgicpckn.svg)](https://chrome.google.com/webstore/detail/stravistix-for-strava/dhiaggccakkgdfcadnklkbljcgicpckn) [![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/dhiaggccakkgdfcadnklkbljcgicpckn.svg)](https://chrome.google.com/webstore/detail/stravistix-for-strava/dhiaggccakkgdfcadnklkbljcgicpckn/reviews) [![Chrome Web Store](https://img.shields.io/chrome-web-store/rating-count/dhiaggccakkgdfcadnklkbljcgicpckn.svg)](https://chrome.google.com/webstore/detail/stravistix-for-strava/dhiaggccakkgdfcadnklkbljcgicpckn/reviews)

# Table of Content

<!-- toc -->

- [1/ Install StravistiX](#1-install-stravistix)
    + [1.1/ From Chrome / Opera Store](#11-from-chrome--opera-store)
    + [1.2/ From continuous integration](#12-from-continuous-integration)
- [2/ Install from sources](#2-install-from-sources)
    + [2.0/ Infos](#20-infos)
    + [2.1/ Install NodeJS with node package manager](#21-install-nodejs-with-node-package-manager)
    + [2.2/ Install Gulp task runner and TypeScript via node package manager](#22-install-gulp-task-runner-and-typescript-via-node-package-manager)
    + [2.3/ Install gulp plugins dependencies](#23-install-gulp-plugins-dependencies)
    + [2.4/ Build the project](#24-build-the-project)
    + [2.5/ Loading the extension](#25-loading-the-extension)
- [3/ How to develop in ?](#3-how-to-develop-in-)
    + [3.1/ Making changes and view them](#31-making-changes-and-view-them)
    + [3.2/ Create a package archive](#32-create-a-package-archive)
    + [3.3/ Clean the project](#33-clean-the-project)
- [4/ Git repository structure and GitFlow](#4-git-repository-structure-and-gitflow)
- [5/ Code Editor and Indentation plugin used](#5-code-editor-and-indentation-plugin-used)

<!-- tocstop -->

1/ Install StravistiX
=====================================================
### 1.1/ From Chrome / Opera Store
Go to [http://thomaschampagne.github.io/stravistix/](http://thomaschampagne.github.io/stravistix/)

### 1.2/ From continuous integration
Latest **develop** build: https://ci.appveyor.com/project/thomaschampagne/stravistix/branch/develop/artifacts

Install steps to follow: https://github.com/thomaschampagne/stravistix/wiki/How-to-install-stravistix-build-archive

2/ Install from sources
==========

### 2.0/ Infos
StravistiX is using bellow frameworks/libs/tools:

* Node package manager (npm) provided by [nodejs.org](https://nodejs.org) to fetch modules from [npmjs.com](https://www.npmjs.com/).
* [Gulp](http://gulpjs.com/) task runner.
* [Chart.js](http://www.chartjs.org/) Simple yet flexible JavaScript charting.
* [Lodash](https://lodash.com) that provides a whole mess of useful functional programming helpers.
* [AngularJS 1.*](https://angularjs.org/) for options page.
* [Angular Material](https://material.angularjs.org) design 1.* for options page.
* [TypeScript](https://www.typescriptlang.org) that adds typing & class-based syntax over javascript then compile back to JavaScript (ES5/ES2015/ES6).

**[Learn TypeScript in 5 minutes](https://learnxinyminutes.com/docs/typescript/). Try it and buy it !**.

### 2.1/ Install NodeJS with node package manager
You must run **npm** cli command via [nodejs.org](https://nodejs.org) to fetch JS dependencies.

### 2.2/ Install Gulp task runner and TypeScript via node package manager
```
npm install --global gulp-cli typescript
```

### 2.3/ Install gulp plugins dependencies
```
npm install
```
This will install required gulp plugins in order to run project tasks. Gulp plugins are specified into **./package.json** file as **devDependencies**

### 2.4/ Build the project
```
gulp build
```
First, this will download others JS dependencies (lodash, angular, chart.js, ...) specified in **plugin/package.json** file if not already downloaded.

Next, all the needed files from **plugin/** will be copied to **dist/** folder.

### 2.5/ Loading the extension

You can now load extension from **chrome://extensions** chrome tab:

* In chrome, open new tab and type **chrome://extensions** then enter
* Tick **Developer Mode** checkbox
* Click **Load Unpacked Extension** button, then choose **dist/** folder (this is where you have **manifest.json** file)
* Done !

3/ How to develop in ?
==========

### 3.1/ Making changes and view them

Development must be done inside **plugin/** folder. You can code using TypeScript OR Javascript. But i strongly recommend you to use TypeScript.

>_Remember: [Here you can learn TypeScript in 5 minutes](https://learnxinyminutes.com/docs/typescript/)_
>_Most IDE support TypeScript through plugins (Atom, Sublime, WebStorm, VisualStudio code, ...) @see https://www.typescriptlang.org/_

Angular webapp (**plugin/options** folder) must be coded ideally with TypeScript @see [angular.io/guide/ts-to-js](https://angular.io/guide/ts-to-js)

In chrome, use **plugin/** folder as Unpacked Extension for development

To compile typescript project and listen for changes run:
```
npm run dev
```

To build the app, simply run the following command:
```
gulp build
```
Needed files will be copied from **plugin/** to **dist/** folder. 

To test the build in chrome, use now **dist/** folder as Unpacked Extension for development.

You can automatically execute the _"gulp build"_ task on a file change with command:
```
gulp watch
```
_Note: Make sure to declare your new resources in **gulpfile.js** to see them copied to **dist/** folder_ 

Run unit testing suite:
```
gulp specs
```
### 3.2/ Create a package archive
```
gulp package
```
This will create zip archive of **dist/** folder in **package/StravistiX\_vX.X.X\_[date].zip**

### 3.3/ Clean the project
```
gulp clean
```
This will clean **dist/**, **package/** & **plugin/node_modules/** folders & *.js *.map compiled sources

4/ Git repository structure and GitFlow
==========
This project repository is fitted for **GitFlow** branches management workflow. Learn more @  http://nvie.com/posts/a-successful-git-branching-model/

5/ Code Editor
==========
I used [**Visual Studio Code**](https://code.visualstudio.com/) editor.

