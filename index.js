#!/usr/bin/env node
let shell = require('shelljs')
let colors = require('colors')
let fs = require('fs') 
const path = require('path');
const os = require('os');

let appName = process.argv[2]

const packageJson = {
    name: appName,
    private: true,
    version: "0.2.0",
    description: "An opinionated framework built on top of Next.js.",
    main: "index.js",
    scripts: {
        dev: "node src/server.js",
        build: "next build src",
        start: "NODE_ENV=production node src/server.js",
        analyze: "BUNDLE_ANALYZE=browser npm run build",
        export: "next export src",
        api: "node ./api/server.js",
        doctoc: "npx doctoc README.md --github"
    },
    repository: {
        type: "git",
        url: "git+https://github.com/suranartnc/nextweb.git"
    },
    keywords: [
        "react",
        "next.js",
        "javascript",
        "framework"
    ],
    author: "Suranart Niamcome",
    license: "MIT",
    bugs: {
        url: "https://github.com/suranartnc/nextweb/issues"
    },
    homepage: "https://github.com/suranartnc/nextweb#readme",
    dependencies: {
        "@babel/plugin-proposal-decorators": "^7.4.0",
        "@babel/polyfill": "^7.4.0",
        "@emotion/babel-preset-css-prop": "^10.0.9",
        "@emotion/core": "^10.0.10",
        "@emotion/styled": "^10.0.10",
        "@fortawesome/fontawesome-svg-core": "^1.2.17",
        "@fortawesome/free-solid-svg-icons": "^5.8.1",
        "@fortawesome/react-fontawesome": "^0.1.4",
        "@rebass/grid": "^6.0.0",
        "@zeit/next-bundle-analyzer": "^0.1.2",
        "axios": "^0.18.1",
        "babel-plugin-lodash": "^3.3.4",
        "babel-plugin-module-resolver": "^3.2.0",
        "circular-dependency-plugin": "^5.0.2",
        "compress": "^0.99.0",
        "dotenv": "^7.0.0",
        "dotenv-webpack": "^1.7.0",
        "emotion-theming": "^10.0.10",
        "express": "^4.16.4",
        "express-useragent": "^1.0.12",
        "jsonwebtoken": "^8.5.1",
        "lodash": "^4.17.15",
        "mobx": "^5.15.0",
        "mobx-react": "^6.1.4",
        "next": "^9.1.1",
        "next-offline": "^3.3.8",
        "next-routes": "^1.4.2",
        "react": "^16.11.0",
        "react-async": "^8.0.0",
        "react-cookie": "^4.0.1",
        "react-dom": "^16.11.0",
        "react-helmet": "^5.2.1",
        "react-waypoint": "^9.0.2",
        "serve-favicon": "^2.5.0",
        "webfontloader": "^1.6.28",
        "webpack-pwa-manifest": "^4.0.0"
    },
    devDependencies: {
        "babel-eslint": "^10.0.1",
        "eslint": "^5.16.0",
        "eslint-config-prettier": "^4.1.0",
        "eslint-config-standard": "^12.0.0",
        "eslint-plugin-import": "^2.16.0",
        "eslint-plugin-node": "^8.0.1",
        "eslint-plugin-prettier": "^3.0.1",
        "eslint-plugin-promise": "^4.0.1",
        "eslint-plugin-react": "^7.12.4",
        "eslint-plugin-react-hooks": "^1.6.0",
        "eslint-plugin-standard": "^4.0.0",
        "faker": "^4.1.0",
        "json-server": "^0.14.2",
        "prettier": "^1.16.4"
    }
};

function main() {
    if (appName) {        
        console.log(`Creating a new React app in ${__dirname}/${appName}.`);
        console.log(`Installing package. This might take a couple of minutes.`);
        shell.exec(`cp -r ${__dirname}/nextweb ${appName}`)
        console.log(`Installing nextWeb.......`);
        shell.cd(appName)
        console.log(`Installing template dependencies.......`);
        shell.exec('npm install')
        fs.writeFileSync(
            path.join(`${process.cwd()}`, 'package.json'),
            JSON.stringify(packageJson, null, 2) + os.EOL
        );
        console.log(`Success! Create ${appName} at ${__dirname}/${appName}`);
        console.log(`We suggest that you begin by typing:`);
        console.log(`cd ${appName}`);
        console.log(`npm run dev`);
    } else {
        console.log('AppName Not found!');
    }

}

main()