# Using `postMessage()` to enable communication between an `<iframe>` and its parent

## About the project

This project intends to test cross window communication (between a `window` and an `<iframe>`) where the `window` is using a different version of an AngularJS script than its `<iframe>`.

Each directory is its own project.

- The `iframe-content` is a page that is intended to run as content for the `iframe-container`. This runs a script built with AngularJS v.1.3.0.
- The `iframe-container` is the page that contains an `<iframe>` which loads the `iframe-content`. This runs a script built with AngularJS v.1.2.26.
- The `post-office` project is a common functionality used by both projects.

## Installation and setup

### 1. Hosts file

Add this entry to your hosts file:

```
127.0.0.1 container.iframe-test.com content.iframe-test.com
```

### 2. Node and Bower components

Make sure you have `node` and `bower` installed.

#### a) The `iframe-container` and the `iframe-content` projects

Go in each of these directories and type this command in the Terminal:

```
npm install && bower install
```

#### b) The `post-office` project

Go in this directories and type this command in the Terminal:

```
npm install
```

Note: there are no bower components for this project currently.


## The `post-office` project

### Building the project

Edit the JavaScript in the `src/` directory. Then, you may run the default `gulp` command:

```
gulp
```

The other projects take care of grabbing the distribution files from this prohect.

## The `iframe-content` and the `iframe-container` projects

### Building the project

Whenever you need the projects' scripts (JS) and styles (LESS), do it in the `src/` directory of each project.

Then, in each directory, you can run this command:

```
gulp build
```

### Running the project

Since one project need to load another, we suggest that you first go to the `iframe-content` directory to run this command:

```
gulp dev
```

Unless you want to test this part as a standalone, you can dismiss and close the browser window that is then opened.

Then, head to the `iframe-container` directory and here also, run this command:

```
gulp dev
```

This will open a browser page with the project.

## Known issues

### The recipient `window` of both the container and the content are empty

Each of these projects need to target a `window` object to be able to call `window.postMessage`.

In the case of the container, running this code

```
var childWindow = document.getElementById('iframeContent').contentWindow
console.log('childWindow: ', childWindow);
```

does not result in an error, but the `window` object returned has no property whatsoever.

Similarly, doing this in the `<iframe>` content

```
var parentWindow = $window.parent;
console.log('parentWindow: ', parentWindow);
```

does the same as explained concerning the container.

In both cases, calling the `postMessage()` function returns no error, but actually fails.