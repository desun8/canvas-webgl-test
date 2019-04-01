var displacementImage = "clouds.jpg";
var spriteImages = document.querySelectorAll(".slide-item__image");

var spriteImagesSrc = [];
var texts = [];

for (var i = 0; i < spriteImages.length; i++) {
  var img = spriteImages[i];

  spriteImagesSrc.push(img.getAttribute("src"));
}

var renderer = new PIXI.autoDetectRenderer(
  420,
  600,
  { transparent: true }
);
var stage = new PIXI.Container();
var slidesContainer = new PIXI.Container();
var displacementSprite = new PIXI.Sprite.fromImage(displacementImage);
var displacementFilter = new PIXI.filters.DisplacementFilter(
  displacementSprite
);

// Add canvas to the HTML
document.body.appendChild(renderer.view);

// Add child container to the stage
stage.addChild(slidesContainer);

// Set the filter to stage
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

stage.filters = [displacementFilter];

displacementSprite.anchor.set(0.5);
displacementSprite.x = renderer.width / 2;
displacementSprite.y = renderer.height / 2;

displacementSprite.scale.x = 2;
displacementSprite.scale.y = 2;
stage.addChild(displacementSprite);

// We load the sprites to the slides container and position them at the center of the stage
// The sprites array is passed to our component upon its initialization
// If our slide has text, we add it as a child to the image and center it
function loadPixiSprites(sprites) {
  for (var i = 0; i < sprites.length; i++) {
    var texture = new PIXI.Texture.fromImage(sprites[i]);
    var image = new PIXI.Sprite(texture);

    image.anchor.set(0.5);
    image.x = renderer.width / 2;
    image.y = renderer.height / 2;

    slidesContainer.addChild(image);
  }
}

loadPixiSprites(spriteImagesSrc);

var ticker = new PIXI.ticker.Ticker();
ticker.autoStart = true;
ticker.add(function(delta) {
  // Optionally have a default animation
  displacementSprite.x += 2 * delta;
  displacementSprite.y += 0.9 * delta;

  // Render our stage
  renderer.render(stage);
});
