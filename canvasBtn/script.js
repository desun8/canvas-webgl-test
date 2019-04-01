let app = new PIXI.Application({
  width: 160,
  height: 60,
  forceCanvas: true,
  transparent: true
});

const wrap = document.querySelector(".wrap");
const buttom = document.querySelector('#btn');

buttom.addEventListener('mouseover', () => {
  doWhenHover()
})

wrap.appendChild(app.view);

let count = 0;
let countSlow = 0;
let length = 140;
let height = 40;
let pointsTop = [];
let pointsBottom = [];

for (var i = 0; i < 25; i++) {
  pointsTop.push(new PIXI.Point(i * length, 0));
  pointsBottom.push(new PIXI.Point(i * height, 0));
}

let roundBox = new PIXI.Graphics();

roundBox.x = 10;
roundBox.y = 10;

app.stage.addChild(roundBox);

const doWhenHover = () => {
  app.ticker.add(function() {
    if (count < 5.8 * 1.55) {
      count += 0.04;
    }
    
    if (countSlow <= 0.2) {
      countSlow += 0.001;
    }
  
    // make the snake
    for (var i = 0; i < pointsTop.length; i++) {
      pointsTop[i].y = Math.sin(i * 0.5 + count) * 10;
      pointsTop[i].x = (i * length) / 2 + Math.cos(i * 0.2 + count) * 20;
    }
  
    for (var i = 0; i < pointsBottom.length; i++) {
      pointsBottom[i].y = Math.sin(i * 0.5 + count) * -10 + height;
      pointsBottom[i].x = (i * length) / 2 + Math.cos(i * 0.2 + count) * 20;
    }
  
    drawRoundButton(roundBox, 0, 0, length, height, 15, countSlow);
  });
}


function drawRoundButton(ctx, x, y, width, height, arcsize, count) {
  ctx.clear();
  ctx.beginFill(0x63a4ff, count);

  ctx.moveTo(x + arcsize, y);

  for (var i = 1; i < pointsTop.length; i++) {
    ctx.quadraticCurveTo(
      pointsTop[i].x,
      pointsTop[i].y,
      x + width - arcsize,
      y
    );
  }

  ctx.arcTo(x + width, y, x + width, y + arcsize, arcsize);
  ctx.lineTo(x + width, y + height - arcsize);
  ctx.arcTo(x + width, y + height, x + width - arcsize, y + height, arcsize);

  for (var i = 1; i < pointsBottom.length; i++) {
    roundBox.quadraticCurveTo(
      pointsBottom[i].x,
      pointsBottom[i].y,
      x + arcsize,
      y + height
    );
  }

  ctx.arcTo(x, y + height, x, y - arcsize, arcsize);
  ctx.lineTo(x, y + arcsize);
  ctx.arcTo(x, y, x + arcsize, y, arcsize);
  ctx.lineTo(x + arcsize, y);

  ctx.endFill();
}
