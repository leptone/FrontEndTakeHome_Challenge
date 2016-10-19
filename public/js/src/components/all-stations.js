var thumbnail = require('./station-thumbnail');
let h = require('virtual-dom/h');

module.exports = (stations) => {
    return h( 'div', 
        { className: 'all-stations-container' },
        // list of virtual DOM nodes
        stations.map(thumbnail)
    )
};


