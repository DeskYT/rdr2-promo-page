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

const slider = new Slider(slidesContainer, images, 0, true);
const [prevButton, nextButton] = document.querySelectorAll(
  ".slider-container > button"
);

/*
updateView(slider.currentSlide);

const createButtonHandler = (action = "next") => () => {
  const newImages = slider[action]();
  updateView(newImages);
};

prevButton.addEventListener("click", createButtonHandler("prev"));
nextButton.addEventListener("click", createButtonHandler("next"));


function updateView([prevSlideLink, curSlideLink, nextSlideLink]) {
  prevSlideImage.setAttribute("src", prevSlideLink);
  cur
}
*/