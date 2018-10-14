import React from 'react';

const Gif = ({ gif }) => {
    return (
        <div className="gif">
            <img src={gif.images.fixed_height.url} alt="gif failed to load" className="gif-img"></img>
        </div>
    )
}

export default Gif;