class Slider {
  constructor(images, currentIndex = 0) {
    if (!Array.isArray(images)) {
      throw new TypeError();
    }
    this._images = images;
    this.currentIndex = currentIndex;
    this._sliderContainer = utils.createElement("div", {
      classNames: ["slider-container"],
    });
  }

  get images() {
    return this._images;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(v) {
    if (typeof v !== "number") {
      throw new TypeError();
    }
    if (v >= 0 && v < this._images.length) {
      this._currentIndex = v;
    } else {
      this._currentIndex = 0;
    }
  }

  get nextIndex() {
    return (this.currentIndex + 1) % this._images.length;
  }

  get prevIndex() {
    return (this.currentIndex - 1 + this._images.length) % this._images.length;
  }

  get activeSlides() {
    return [
      this.images[this.prevIndex],
      this.images[this.currentIndex],
      this.images[this.nextIndex],
    ];
  }

  next() {
    this.currentIndex = this.nextIndex;
    return this.activeSlides;
  }

  prev() {
    this.currentIndex = this.nextIndex;
    return this.activeSlides;
  }
}
