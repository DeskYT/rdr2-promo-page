const images = [
  "./assets/images/screen1.jpg",
  "./assets/images/screen2.jpg",
  "./assets/images/screen3.jpg",
  "./assets/images/screen4.jpg",
  "./assets/images/screen5.jpg",
  "./assets/images/screen6.png",
  "./assets/images/screen7.png",
  "./assets/images/screen8.png",
  "./assets/images/screen9.png",
  "./assets/images/screen10.png",
  "./assets/images/screen11.png",
];

const reviews = [
  {
    portal: "Game Informer",
    author: "Matt Bertz",
    mark: "10/10",
    description: "Rockstar has once again created a game that redefines the open-world experience. Red Dead Redemption II is a triumph that every gamer should experience for themselves"
  },
  {
    portal: "GamesRadar+",
    author: "David Meikleham",
    mark: "10/10",
    description: "One of the top three open-worlds of all time, and the best game Rockstar has ever made. An all-time Old West masterpiece."
  },
  {
    portal: "IGN",
    author: "Luke Reilly",
    mark: "10/10",
    description: "Red Dead Redemption 2 is a game of rare quality; a meticulously polished open world ode to the outlaw era."
  }
];

const reviewSegments = [];

reviews.forEach((item, index) => {
    const segmentIndex = Math.floor(index / 3);
    if (segmentIndex >= reviewSegments.length) {
      reviewSegments[segmentIndex] = [item]
      return;
    }
    reviewSegments[segmentIndex].push(item);
  }
)


const imageSliderContainer = document.querySelector(".images-slider-container");

const createImageSlideCallback = (data) => {
  return createElement("img", {
    classNames: ["slide"],
    attributes: {
      src: data
    }
  })
}

const imageSlider = new Slider(imageSliderContainer, images, createImageSlideCallback, 0, true);

//----------------------------------
const reviewsSliderContainer = document.querySelector(".reviews-container")

const createReviewSlideCallback = (data) => {
  return createElement("div", {classNames: ["d-flex", "justify-content-evenly", "review-segment", "slide"]}, ...data.map(segment => createReviewCard(segment)))
}

const createReviewCard = (data) => {
  return createElement("article", {
      classNames: ["review-card", "col-3"],
    },
    createElement("header",
      {classNames: ["review-card-header"]},
      createElement(
        "h3", {},
        data.portal
      ),
      createElement(
        "p", {},
        `Автор: ${data.author}`
      )
    ),
    createElement("div", {classNames: ["review-card-body"]},
      createElement(
        "h4", {},
        data.mark
      ),
      createElement(
        "q", {},
        data.description
      ),)
  )
}

const reviewsSlider = new Slider(reviewsSliderContainer, reviewSegments, createReviewSlideCallback, 0, false);