var firstRow = document.querySelector("#firstRow");
var secondRow = document.querySelector("#secondRow");
var image = document.querySelector("#image");
var img = new Image();
var fr = new FileReader();
image.addEventListener("change", () => {
  fr.onload = () => {
    img.src = fr.result;
  };
  fr.readAsDataURL(image.files[0]);
});

var renderButton = document.querySelector("#render");
renderButton.addEventListener("click", render);

var scalingSlider = document.querySelector("#scaling");
var scalingSliderP = document.querySelector("#scalingP");
scalingSlider.addEventListener("input", () => {
  scaling = scalingSlider.value;
  scalingSliderP.innerHTML = scalingSlider.value;
});

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var scaling = 1;

function render() {
	var imgSW = img.width;
	var imgSH = img.height;
    if(imgSW / imgSH <= 1) {
		if ((imgSH / imgSW * 400 + 104) <= 800) {
			canvas.width = 400 * scaling;
			canvas.height = (imgSH / imgSW * 400 + 104) * scaling;
		} else {
			canvas.width = (imgSW / imgSH * 800) * scaling;
			canvas.height = 800 * scaling;
		}
    } else {
		if ((imgSW / imgSH) * 400 <= 800) {
			canvas.width = (imgSW / imgSH) * 400 * scaling;
			canvas.height = (400 + 104) * scaling;
		} else {
			canvas.width = 800 * scaling;
			canvas.height = ((imgSH / imgSW * 800) + 104) * scaling;
		}
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2 * scaling;
    ctx.strokeStyle = "white";
    ctx.strokeRect(
    	10 * scaling,
    	10 * scaling,
    	canvas.width - 20 * scaling,
    	canvas.height - 100 * scaling
    );
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = `${36 * scaling}px serif`;
    ctx.fillText(firstRow.value, canvas.width / 2, canvas.height - 70 * scaling);
    ctx.font = `${14 * scaling}px sans-serif`;
    ctx.fillText(secondRow.value, canvas.width / 2, canvas.height - 30 * scaling);
    ctx.drawImage(
    	img,
    	14 * scaling,
    	14 * scaling,
    	canvas.width - 28 * scaling,
    	canvas.height - 108 * scaling
    );
    document.querySelector("#output").src = canvas.toDataURL();
}
