const fs = require('fs');
const Jimp = require('jimp');
const robot = require('robotjs');

const fastSpeed = 75;
const slowSpeed = 300;
const inputFolderPath = './images/';
const outputImageSize = 32;

fs.readdir(inputFolderPath, (error, files) => {
  if (error) {
    console.error('Error reading input folder:', error);
    return;
  }

  const imageFileName = files.find(file => /\.(jpe?g|png|gif|bmp)$/i.test(file));
  if (!imageFileName) {
    console.error('No image files found in the input folder.');
    return;
  }


  const inputImagePath = inputFolderPath + imageFileName;

  Jimp.read(inputImagePath)
    .then(image => {
      image.resize(outputImageSize, outputImageSize, Jimp.RESIZE_NEAREST_NEIGHBOR);
      return image;
    })
    .then(image => {
      console.log('Image successfully pixelated!');
      const colors = [];

      for (let y = 0; y < outputImageSize; y++) {
        const row = [];
        for (let x = 0; x < outputImageSize; x++) {
          const color = image.getPixelColor(x, y);
          const rgba = Jimp.intToRGBA(color);
          const hex = rgbToHex(rgba.r, rgba.g, rgba.b);
          row.push(hex);
        }
        colors.push(row);
      }

sleep(5000)
var x = 643; var y = 163;
for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
        robot.moveMouse(1090, 857) //input box
        sleep(fastSpeed)
        robot.mouseClick()
        sleep(fastSpeed)
        robot.moveMouse(1080, 761) //color wheel
        sleep(fastSpeed)
        robot.mouseClick()
        sleep(fastSpeed)
        robot.typeString(colors[i][j])
        sleep(slowSpeed)
        robot.moveMouse(1090, 857) //input box
        sleep(fastSpeed)
        robot.mouseClick()
        sleep(fastSpeed)
        robot.moveMouse(x, y)
        var x = x + 20.4;
        sleep(fastSpeed)
        robot.mouseClick()
      }
      var x = 643;
    var y = y + 20.4;
    robot.moveMouse(x, y)
    sleep(fastSpeed)
  }


    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function rgbToHex(red, green, blue) {
  const r = red.toString(16).padStart(2, '0');
  const g = green.toString(16).padStart(2, '0');
  const b = blue.toString(16).padStart(2, '0');
  return `${r}${g}${b}`;
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}