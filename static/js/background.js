let numImage = Math.floor(Math.random() * 18) + 1;

document.body.style.backgroundImage =
	'radial-gradient(circle, #0000009e 0%, #000000d2 100%), url("/assets/images/background/' +
	numImage +
	'.jpg")';
