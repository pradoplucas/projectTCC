var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

var popoverTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	return new bootstrap.Popover(popoverTriggerEl);
});

// let numImage = Math.floor(Math.random() * 18) + 1;

// document.body.style.backgroundImage =
// 	'radial-gradient(circle, #0000009e 0%, #000000d2 100%), url("/assets/images/background/' +
// 	numImage +
// 	'.jpg")';
