[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

# IZA [MVP]
## **Installation**
IZA is built to run on **[Docker](https://www.google.com.mx/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwisgvjWuOTUAhVFQiYKHUTRB84QFggmMAA&url=https://www.docker.com/&usg=AFQjCNHuzQZ0w4cpXaM93txh2HBVWjeFaA)**. However you can run it locally as long as you have **[NodeJS](https://nodejs.org)** as well as **[npm](https://www.google.com.mx/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwju9_rV3-XUAhXHSyYKHWW0CvwQFggmMAA&url=https%3A%2F%2Fwww.npmjs.com%2F&usg=AFQjCNHcRudvKKNX4eMuQBtERCMyaPp85w)** or **[yarn](https://www.google.com.mx/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiB-L-tuuTUAhXEyyYKHfXWASsQFggiMAA&url=https://yarnpkg.com/&usg=AFQjCNFroCU9gpWAHS2N0ZdHNYurDzRu_w)** (preferred!) in your system.

#### **Development**
To install and run in your computer just run the following commands in your terminal. You'll need to have Docker installed (See below for instructions without docker):

 1.  Clone this repo:  `git clone https://github.com/pabloassisborges/iza-mvp.git`
 2. Navigate into directory: `cd iza-mvp` 
 3. Install dependencies: `docker-compose run --rm alpha yarn install`
 4. Then you can lift the server: `docker-compose up alpha`

**That's it!** you should see the demo bot up and running in your browser if you open **[localhost:3000](http://localhost:3000/)*** in your browser.

A couple of important points when running on development mode:

 - The bot app will have **[Hot Reloading](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack)** enabled, so that you can experience the benefits of Webpack + React.
 - **[Redux DevTools](https://www.google.com.mx/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwjm7K-HueTUAhWG4yYKHbzKBRYQFggwMAI&url=https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en&usg=AFQjCNFg4ldS78uapjCGBaNjL9NvIwZGhg)** are enabled by default so that you can inspect the app's actions/state chages in real time.
 - *The time between each bot message **is set to 0***. This is to minimize developers' frustration when they go over the conversation flow again and again, however you can change this behavior if you wish at `app/containers/BotContainer/sagas.js`.

#### **Production**

 - **Heroku:**
	 Just run `git push heroku master`. This bot is Heroku-ready!

 - **Local with Docker:**
  If you can to compile the image to see how it will behave on
production, we put a build together as well. Just run:

  ```
    docker-compose up release
  ```

It will build the image and lift the production server.

#### **Without Docker**
If you wish to install and run without Docker you'll have to install all the dependencies directly in your directory:

**For Development:**
 1. Clone this repo:  `git clone https://github.com/pabloassisborges/iza-mvp.git`
 2. Navigate into directory: `cd iza-mvp` 
 3. Run either `npm install` or `yarn install` to install the dependencies
 4. Run `npm start` to fire up the server
 5. Visit **[localhost:3000](http://localhost:3000/)** in your browser

**For Production:**

 - This repo is Heroku ready, just do `git push heroku master`
 - If for some reason you alter your `package.json`'s scripts, be sure to consider [these steps](https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/deployment.md) before deploying to a production server.
 - For AWS you can follow the same steps listed [here](https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/deployment.md#aws-s3)
 - For Azure/Softlayer/other servers you'll have to ssh to the server, pull the repo, install the dependencies using `yarn` and then do `npm run build` in order to create the `./build` folder. Finally you can start the server using `start:prod`. Alternatively just run `start:production` and it'll run these steps together in sequence, plus tests. 
 