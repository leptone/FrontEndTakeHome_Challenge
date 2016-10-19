
// createElement module converts virtual-dom nodes into real DOM elements 
let createElement = require('virtual-dom/create-element');

// given a data input this module turns it into DOM node and appends it to the HTMl body element 
// the module also returns an object to facilitate DOM manipulations in the future
module.exports = (data) => {
    // given a data input this module return a virtual-dom tree for the all stations view
    let allStationsVirtual = require('./components/all-stations')(data),
    // create a real DOM node from the virtual-dom tree
    allStationsRoot = createElement(allStationsVirtual);

    // append the newly created root DOM nood to the body element in out index.html
    document.body.appendChild(allStationsRoot);

    // return an object for further DOM manipulations
    return {
        tree: allStationsVirtual,
        root: allStationsRoot
    };
};
