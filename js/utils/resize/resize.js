const resize = (frame, image) => {
  const {width: frameWidth, height: frameHeight} = frame;
  const {width: imageWidth, height: imageHeight} = image;

  const newHeight = frameWidth * imageHeight / imageWidth;
  const newWidth = frameHeight * imageWidth / imageHeight;

  // проверяем соотношение сторон, если при вписании по высоте или ширине, вторая вычисленная сторона не влезает в рамку, делаем наоборот(вписываем по другой стороне)
  if (imageWidth > imageHeight) {
    return (newHeight <= frameHeight) ? {
      width: frameWidth,
      height: newHeight
    } : {
      width: newWidth,
      height: frameHeight
    };
  }

  if (imageWidth < imageHeight) {
    return (newWidth <= frameWidth) ? {
      width: newWidth,
      height: frameHeight
    } : {
      width: frameWidth,
      height: newHeight
    };
  }

  // если картинка квадратная, но рамка нет
  if (frameWidth < frameHeight) {
    return {
      width: frameWidth,
      height: frameWidth
    };
  }

  if ((frameWidth > frameHeight)) {
    return {
      width: frameHeight,
      height: frameHeight
    };
  }

  // картинка и рамка квадратные, возвращаем рамку
  return frame;
};

export default resize;
