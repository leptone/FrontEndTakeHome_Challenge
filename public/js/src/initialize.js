// This module initializes the application state


// handles AJAX request
let xhr = require('xhr'),
    // module for adding DOM to our HTML
    appendRoot = require('./append-root'),
    // module contains info about the API address
    url = require('./url'),
    // an object for storing our DOM state
    DOM = {};

// make an AJAX to the API and get the stations data
xhr.get(url.all, (err, resp, body) => {
    // parse request body
    let stations = JSON.parse(body).data;

    // add stations data to the DOM
    let res = appendRoot(stations);

    // we need to keep track to the DOM inorder to update it with virtual-dom
    DOM.tree = res.tree;
    DOM.root = res.root;

    // switch-dom will handle all DOM manipulation
    // it will need the DOM object to manage this DOM manipulation
    require('./switch-DOM')(DOM);
});

