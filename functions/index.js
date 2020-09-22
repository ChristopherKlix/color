/* Firebase dependencies */
const functions = require('firebase-functions');
// const firebase = requrie('firebase-admin');

/* Express.js & templating engine */
const express = require('express');
const combynExpress = require("combynexpress");
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});

/* JS file system */
const fs = require('fs');

/* initialize express app */
const app = express();

/* initialize templating engine */
// change html to combyne to use .combyne file extension
app.engine("html", combynExpress());
app.set("view engine", "html");

// set views directory
app.set('views', '.');

/* routes */
app.get('/', (request, response) => {
    // get path to markdown file
    const path = ''.concat(__dirname, '/template.md');
    // get markdown file
    const file = fs.readFileSync(path, 'utf8');
    // render markdown file into HTML
    const template = md.render(file.toString())
    // render page
    // 'format' links to format.html
    response.render('format', { template: template });
});

/* process HTTP requests */
exports.app = functions.https.onRequest(app);
