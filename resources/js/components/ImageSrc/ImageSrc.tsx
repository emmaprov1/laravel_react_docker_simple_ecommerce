import React, { useState } from 'react'

import thumbnail from "./../../../asset/img/thumbnail.jpeg"

const ImageSrc = ({ src, alt, width, title }:{src:string, alt:string, title:any, width:string}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
      <>
      {isLoading
        ? null
        : <img
            src={thumbnail}
            className={width}
            title={title}
            alt={alt}
          />
        }
        <img
            style={isLoading ? {} : { display: 'none' }}
            src={src}
            alt={alt}
            onLoad={() => setIsLoading(true)}
            className={width}
            title={title}
        ></img>
        </>
  )
}

export default ImageSrc
