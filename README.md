# Getting Started with DevTools App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  The UI library is [MUI](https://mui.com) (formerly Material UI) version 5.0.3 which uses [React](https://reactjs.org) version 17.x.  

### **NodeJS**
The minumum NodeJS version is 16.13.0.  A .nvmrc file has been included if you need more than one node version on your system.  We recommend using [NVM](https://github.com/nvm-sh/nvm) to manage node versions on your system.

To check your node version:  
> `node --version`

### **NVM CheatSheet**
**Installation**

Visit [https://github.com/nvm-sh/nvm]() for installation instructions.  If you use cygwin on windows, just follow the standard script using either cURL or Wget.  The installation should not need administrative rights as it installs in your windows home directory.

**Usage**

Whenever you open a new terminal window, the version of node will be set to the last used version regardless of the window.  You can check the active node version, type 
> `node --verson`

To switch versions (if you're in a directory with a .nvmrc):
> `nvm use`

To switch versions (if a .nvmrc doesn't exist)
> `nvm use 8`
- Uses the latest version of 8.x that is installed

To see all installed versions of node: 
> `nvm ls`

To install a specific version of node using NVM:
> `nvm install 12`
- Installs the latest version of 12, for example 12.22.6
> `nvm install 16.9.1`
- Installs the exact version of 16.9.1

# Running the application

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Client Library
The client javascipt library is not built using the scripts above.  This library is a pure JS library with no external dependencies.  It is intended to extend key browser api's in order to capture and forward relevent information to the DevTools application without altering the host applications usablity.

To edit the client library, edit the file at /src/client/devtools.js

This file will have to be manually "installed" in any host application that wants to make use of the DevTools application.  
To install:
- copy the devtools.js file to a location where the host application can use it. For example, copy it the root directory where the applications `index.html` gets served from.
- add the following script tag to your index.html.
```
<!--devtools plugin-->
<script src="./devtools.js"></script>
```

# Additional Resources

## Adding sass to create-react-app
Link [https://www.better.dev/adding-sass-to-create-react-app]

## Mozilla postMessage
https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

## Resource Performance Timing
https://siusin.github.io/perf-timing-primer/