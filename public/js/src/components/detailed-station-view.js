let h = require('virtual-dom/h');

module.exports = (station) => {
    return h('div', { className: 'detailed-view' }, [
        h( 'div', 
        { className: 'detailed-station-container' }, 
        [
            h( 'img', 
                { src: station.imgUrl }
            ),
            h('div', { className: 'text-container' }, [
                h( 'h2', 
                    { className: 'station-title' },
                    station.name
                ),
                // list of virtual DOM nodes
                h( 'div', 
                    { className: 'tag-wrapper' },
                    station.tags.map((tag) => h('div', { className: 'tag' }, tag))
                ),
                // details-container
                h( 'div',
                    { className: 'details-container' },
                    [
                        // popularity-container
                        h( 'div', 
                            { className: 'popularity-container' }, 
                            [
                                h( 'div', 
                                    { className: 'value' }, 
                                    station.popularity
                                ),
                                h( 'div', 
                                    { className: 'label' }, 
                                    'Popularity'
                                )
                            ]
                        ),
                        // reliability-container
                        h( 'div', 
                            { className: 'reliability-container' }, 
                            [
                                h( 'div', 
                                    { className: 'value' }, 
                                    station.reliability
                                ),
                                h( 'div', 
                                    { className: 'label' }, 
                                    'Reliability'
                                )
                            ]
                        )
                    ]
                )
            ]),
            h('audio', {
                src: station.streamUrl,
                autoplay: true
            })
        ]),
        h('button', { className: 'all-stations-btn' }, 'All Stations')
    ])
};


