function generate() {
    alert("Test");

    imageArr = new Array(100);
    for (var i = 0; i < 100; i++) imageArr[i] = (i%3 == 0) ? 0 : 1;

    drawPixels(createConstantPatterns(), 41);
}

function createConstantPatterns() {
    qrArr = new Array(41*41).fill(1);

    for (var i = 0; i < 41; i++) {
        qrArr[6+41*i] = (i%2 == 0) ? 0 : 1;
        qrArr[6*41+i] = (i%2 == 0) ? 0 : 1;
    }

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            qrArr[x+41*y] = 1;
            qrArr[x+41*y+41-8] = 1;
            qrArr[x+41*y+(41-8)*41] = 1;
        }
    }

    for (var x = 2; x < 5; x++) {
        for (var y = 2; y < 5; y++) {
            qrArr[x+41*y] = 0;
            qrArr[x+41*y+41-7] = 0;
            qrArr[x+41*y+(41-7)*41] = 0;
        }
    }

    for (var i = 0; i < 7; i++) {
        qrArr[i] = 0;
        qrArr[i*41] = 0;
        qrArr[6*41+i] = 0;
        qrArr[6+41*i] = 0;

        qrArr[i+41-7] = 0;
        qrArr[i*41+41-7] = 0;
        qrArr[6*41+i+41-7] = 0;
        qrArr[6+41*i+41-7] = 0;

        qrArr[i+(41-7)*41] = 0;
        qrArr[i*41+(41-7)*41] = 0;
        qrArr[6*41+i+(41-7)*41] = 0;
        qrArr[6+41*i+(41-7)*41] = 0;
    }

    qrArr[41*(41-6)-7] = 0;

    for (var i = 0; i < 5; i++) {
        qrArr[41*(41-9)+41+i-9] = 0;
        qrArr[41*(41-5)+41+i-9] = 0;


        qrArr[41*(41-9+i)+41-9] = 0;
        qrArr[41*(41-9+i)+41-5] = 0;
    }

    qrArr[41*(41-8)+8] = 0;

    return qrArr;
}

// function formatText(text) {
//     bytes = new TextEncoder().encode(text);
//     console.log(bytes);
// }

function drawPixels(pixels, width) {
    height = Math.ceil(pixels.length / width);

    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    imgData = context.createImageData(width, height);

    canvas.height = height;
    canvas.width = width;

    for (var i = 0; i < pixels.length; i++) {
        imgData.data[4*i] = pixels[i]*255;
        imgData.data[4*i+1] = pixels[i]*255;
        imgData.data[4*i+2] = pixels[i]*255;
        imgData.data[4*i+3] = 255;
    }

    console.log(imgData)

    context.putImageData(imgData, 0, 0);

    var img = new Image();

    img.src = canvas.toDataURL('image/png');
    document.body.appendChild(img);
}