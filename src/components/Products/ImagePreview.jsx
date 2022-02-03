import React from 'react';

const ImagePreview = props => {
  return (
    <div className='p-media__thumb'>
      <img alt='preview image' src={props.path} />
    </div>
  );
};

export default ImagePreview;
