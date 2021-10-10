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


const slidesContainer = document.querySelector(".slider-container");



const createElementCallback = (data) => {
  return createElement("img", {
    classNames: ["slide"],
    attributes: {
      src: data
    }
  })
}

const slider = new Slider(slidesContainer, images, createElementCallback, 0, true);
