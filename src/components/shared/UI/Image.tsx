import React from "react";
import LazyLoad from "react-lazyload";

interface ImageProps {
  src: string;
  alt: string;
  imageClassName?: string;
  imageWrapperHeight?: number;
}

export const Image: React.FC<ImageProps> = (props) => {
  const isLazyLoadingSupported = "loading" in HTMLImageElement.prototype;

  const imageWrapperHeight = props.imageWrapperHeight
    ? props.imageWrapperHeight
    : 200;

  return (
    <div>
      {isLazyLoadingSupported && (
        <LazyLoad height={imageWrapperHeight} offset={100}>
          <img
            src={props.src}
            alt={props.alt}
            className={props.imageClassName}
          />
        </LazyLoad>
      )}
      {!isLazyLoadingSupported && (
        <img src={props.src} alt={props.alt} className={props.imageClassName} />
      )}
    </div>
  );
};
