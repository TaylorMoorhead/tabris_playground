const {ImageView, ScrollView, ui} = require('tabris');

//  this is now public at: https://tabrisjs.com/api/v1/pins/5a32c9adb364b0e4f14166bd

const IMAGES = [
  "heic0305a.jpg",
  "IRS46_nasa.jpg",
  "catseye.jpg",
  "heic0405a.jpg",
  "heic0414a.jpg",
  "heic0514a.jpg",
  "heic0515a.jpg",
  "ngc4414.jpg",
  "opo0110a.jpg",
  "orion-nebula.jpg"
];






const IMAGE_SIZE = 96;

class FilmStrip extends ScrollView {

  constructor(properties) {
    super(properties);
    this.resetHideTimeout();
  }

  isShowing() {
    return this.transform.translationY === 0;
  }

  show() {
    this.animate({transform: {translationY: 0}}, {easing: 'ease-out'});
  }

  hide() {
    this.animate({transform: {translationY: this.bounds.height}}, {easing: 'ease-out'});
  }

  toggleShowing() {
    if (this.isShowing()) {
      this.hide();
    } else {
      this.show();
      this.resetHideTimeout();
    }
  }

  resetHideTimeout() {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => this.hide(), 4000);
  }
}

ui.contentView.background = 'black';
ui.statusBar.set({
  displayMode: 'float',
  theme: 'dark',
  background: '#00000044'
});

let fullImage = new ImageView({
  top: 0, bottom: 0, left: 0, right: 0,
  image: `https://raw.githubusercontent.com/eclipsesource/tabris-js/master/examples/gallery/images/${IMAGES[0]}`,
  scaleMode: 'fill'
}).on('tap', () => filmStrip.toggleShowing())
  .appendTo(ui.contentView);

let filmStrip = new FilmStrip({
  left: 0, right: 0, bottom: 0, height: 112,
  direction: 'horizontal',
  background: '#00000044'
}).on('scrollX', () => filmStrip.resetHideTimeout())
  .appendTo(ui.contentView);

// https://raw.githubusercontent.com/eclipsesource/tabris-js/master/examples/gallery/images/IRS46_nasa.jpg

IMAGES.forEach((image) => {
  new ImageView({
    top: 8, left: 'prev() 8', width: IMAGE_SIZE, height: IMAGE_SIZE,
    image: {src: `https://raw.githubusercontent.com/eclipsesource/tabris-js/master/examples/gallery/images/${image}`, width: IMAGE_SIZE, height: IMAGE_SIZE},
    scaleMode: 'fill',
    highlightOnTouch: true
  }).on('tap', () => {
    fullImage.image = `https://raw.githubusercontent.com/eclipsesource/tabris-js/master/examples/gallery/images/${image}`;
    filmStrip.resetHideTimeout();
  }).appendTo(filmStrip);
});
