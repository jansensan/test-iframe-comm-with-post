# Using `postMessage()` to enable communication between an `<iframe>` and its parent

## About the project

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

Then, go to in each directory (`iframe-container` and `iframe-content`) and type this command in the Terminal:

```
npm install && bower install
```

## The `post-office` project

### Building the project

Edit the JavaScript in the `src/` directory. Then, you may run the default `gulp` command:

```
gulp
```

The other projects take care of getting the distribution files.

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

### Neither the `<counter>` nor the `<iframecontent>` features work

There are simple features built in each project to test if each self contained directive can work normally in this context. They are not working currently, whereas they are working in the [test-iframe-with-diff-angular-versions](https://github.com/jansensan/test-iframe-with-diff-angular-versions) repo.

### Messages are sent but do not seem to be received

Messages are sent from the current window to the recipient window without an error. However, these messages do not seem to reach their target, as the event listeners do not handle anything currently.