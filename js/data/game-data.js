export const INITIAL_GAME = {
  level: 0,
  lives: 3,
  time: 30,
  answers: []
};

export const levelTypes = {
  'images-1': {
    imageSize: {
      width: 705,
      height: 455
    }
  },
  'images-2': {
    imageSize: {
      width: 468,
      height: 458
    }
  },
  'images-3': {
    imageSize: {
      width: 304,
      height: 455
    }
  }
};

const paintings = [
  // People
  {
    url: `https://k42.kn3.net/CF42609C8.jpg`,
    isImage: true,
    size: {
      width: 600,
      height: 831
    }
  },
  // Animals
  {
    url: `https://k42.kn3.net/D2F0370D6.jpg`,
    isImage: true,
    size: {
      width: 468,
      height: 354
    }
  },
  // Nature
  {
    url: `https://k32.kn3.net/5C7060EC5.jpg`,
    isImage: true,
    size: {
      width: 1200,
      height: 900
    }
  }
];

const photos = [
  // People
  {
    url: `http://i.imgur.com/1KegWPz.jpg`,
    isImage: false,
    size: {
      width: 1080,
      height: 720
    }
  },
  // Animals
  {
    url: `https://i.imgur.com/DiHM5Zb.jpg`,
    isImage: false,
    size: {
      width: 1264,
      height: 1864
    }
  },
  // Nature
  {
    url: `http://i.imgur.com/DKR1HtB.jpg`,
    isImage: false,
    size: {
      width: 1120,
      height: 2965
    }
  }
];

export const levels = [
  {
    type: `images-2`,
    text: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      paintings[0],
      photos[0]
    ]
  },
  {
    type: `images-1`,
    text: `Угадай, фото или рисунок?`,
    images: [
      paintings[1]
    ]
  },
  {
    type: `images-3`,
    text: `Найдите рисунок среди изображений`,
    images: [
      paintings[2],
      photos[0],
      photos[0]
    ]
  },
  {
    type: `images-2`,
    text: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      paintings[2],
      photos[2]
    ]
  },
  {
    type: `images-2`,
    text: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      paintings[2],
      photos[0]
    ]
  },
  {
    type: `images-1`,
    text: `Угадай, фото или рисунок?`,
    images: [
      paintings[1],
    ]
  },
  {
    type: `images-3`,
    text: `Найдите рисунок среди изображений`,
    images: [
      paintings[2],
      photos[0],
      photos[0]
    ]
  },
  {
    type: `images-2`,
    text: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      paintings[1],
      photos[1],
    ]
  },
  {
    type: `images-3`,
    text: `Найдите рисунок среди изображений`,
    images: [
      paintings[0],
      photos[0],
      photos[0]
    ]
  },
  {
    type: `images-2`,
    text: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      paintings[2],
      photos[0]
    ]
  }
];
