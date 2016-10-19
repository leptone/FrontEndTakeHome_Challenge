let h = require('virtual-dom/h');

module.exports = (station) => {
    return h( 'div', 
        { 
            className: 'thumbnail-container',
            id: station.id
        },
        [
            h( 'img', 
                {
                    className: 'all-image', 
                    src: station.imgUrl
                }
            ),
            h( 'div', 
                { className: 'tag-wrapper' },
                station.tags.map((tag) => h('div', { className: 'tag' }, tag))
            )
        ]
    )
}
