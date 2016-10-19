// these modules handle the updating of the virtual-dom and the real DOM
let diff = require('virtual-dom/diff'),
    patch = require('virtual-dom/patch');

    // these functions return virtual-dom trees 
    // when given all-stations and single-station data respectivly
    allStations = require('./components/all-stations'),
    detailedStation = require('./components/detailed-station-view'),

    // module for handling AJAX requests
    xhr = require('xhr'),

    // returns object containing API address information
    url = require('./url');

module.exports = (DOM) => {
    // user initially sees the all-stations-component view
    let thumbnails = document.querySelectorAll('.thumbnail-container')
    // loop over all the station thumbnails in the all stations view
    for(let i = 0; i < thumbnails.length; i++){ 
        // add click event listener to each thumbnail
        // assign toDetailed event handler to each 
        thumbnails[i].addEventListener('click', toDetailed);
    }

    // changes app to detailedStation view
    function toDetailed(e) { 
        // stop other event handlers from firing
        e.stopImmediatePropagation()
        // make AJAX to API to get single/detailed station data
        xhr.get(url.detailed + e.currentTarget.id, (err, resp, body) => {
            if (err) throw err;
            
            // parse response body
            let station = JSON.parse(body),
                // convert response data to virtual-dom tree
                // assign virtual-dom response to newTree
                newTree = detailedStation(station),
                // determine differences between newTree and the current DOM tree (DOM.tree)
                patches = diff(DOM.tree, newTree);

            // update root node to reflect changes
            DOM.root = patch(DOM.root, patches);
            // assign newTree to DOM.tree
            DOM.tree = newTree;

            let returnBtn = document.querySelector('.all-stations-btn');
            // add toAll event handler to .all-stations-btn
            returnBtn.addEventListener('click', toAll);
        });
    }
    // changes app to all-stations-view
    function toAll(e) {
        // stop other event handlers from firing
        e.stopImmediatePropagation()
        // make AJAX to API to get all stations data
        xhr.get(url.all, (err, resp, body) => {
            if (err) throw err;

            // parse response body
            let stations = JSON.parse(body).data,
                // convert response data to virtual-dom tree
                // assign virtual-dom response to newTree
                newTree = allStations(stations),
                // determine differences between newTree and the current DOM tree (DOM.tree)
                patches = diff(DOM.tree, newTree);

            // update root node to reflect changes
            DOM.root = patch(DOM.root, patches);
            // assign newTree to DOM.tree
            DOM.tree = newTree;

            let thumbnails = document.querySelectorAll('.thumbnail-container')

            // loop over station thumbnails
            for(let i = 0; i < thumbnails.length; i++){ 
                // add toDetailed event handler to each station thumbnail
                thumbnails[i].addEventListener('click', toDetailed);
            }
        });
    }
}

