import React from 'react'

const Preview = props => {
  const imageList = props.files.map((item, i) => {
    return <li key={i}>{item.name}<br/><img alt='alt' src={`data:image/jpeg;base64,${item.hex_img}`} className='img_preview'/></li>;
    });
  return imageList ? imageList : 'No Images has been found!'
    };

export default Preview;
