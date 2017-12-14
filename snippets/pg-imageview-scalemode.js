const {ImageView, Picker, TextView, app, Button, ui} = require('tabris');

const MARGIN = 16;
const MARGIN_LARGE = 32;
const GITHUB_URL = 'https://github.com/eclipsesource/tabris-js/blob/master/snippets/imageview-scalemode.js';

// you must have a Tabris account, and change this to your playground URL
const MY_TABRIS_PLAYGROUND_URL = 'https://tabrisjs.com/mrmccormack/playground/';

const IMAGES = [
  {name: 'Large', src: 'https://raw.githubusercontent.com/eclipsesource/tabris-js/master/snippets/resources/salad.jpg', scale: 3},
  {name: 'Small', src: 'https://raw.githubusercontent.com/eclipsesource/tabris-js/master/snippets/resources/landscape.jpg', scale: 3}
];
const SCALE_MODES = ['auto', 'fit', 'fill', 'stretch', 'none'];

let imageView = new ImageView({
  top: MARGIN, width: 200, height: 200, centerX: 0,
  image: IMAGES[0],
  background: 'rgb(220, 220, 220)'
}).appendTo(ui.contentView);

let imageSizeLabel = new TextView({
  left: MARGIN, top: [imageView, MARGIN_LARGE], width: 96,
  text: 'Image'
}).appendTo(ui.contentView);

new Picker({
  right: MARGIN, left: [imageSizeLabel, 0], baseline: imageSizeLabel,
  itemCount: IMAGES.length,
  itemText: index => IMAGES[index].name
}).on({
  select: ({index}) => imageView.image = IMAGES[index]
}).appendTo(ui.contentView);

let scaleModeTextView = new TextView({
  left: MARGIN, top: [imageSizeLabel, MARGIN_LARGE], width: 96,
  text: 'Scale mode'
}).appendTo(ui.contentView);

new Picker({
  right: MARGIN, left: scaleModeTextView, baseline: scaleModeTextView,
  itemCount: SCALE_MODES.length,
  itemText: index => SCALE_MODES[index]
}).on({
  select: ({index}) => imageView.scaleMode = SCALE_MODES[index]
}).appendTo(ui.contentView);


new Button({
  alignment: 'center', centerX: 0,  top: 400, image:'https://cdn3.iconfinder.com/data/icons/free-social-icons/67/github_circle_black-48.png',
  text: 'See source code on Github'
}).on({
  select: () => app.launch(GITHUB_URL)
    .then(() => textView.text = 'Url has been launched')
    .catch((e) => textView.text = e)
}).appendTo(ui.contentView);

new Button({
  alignment: 'center', centerX: 0,  top: 450, image:'https://cdn3.iconfinder.com/data/icons/free-social-icons/67/github_circle_black-48.png',
  text: 'Edit on Tabris.js playground'
}).on({
  select: () => app.launch(MY_TABRIS_PLAYGROUND_URL)
    .then(() => textView.text = 'Url has been launched')
    .catch((e) => textView.text = e)
}).appendTo(ui.contentView);
