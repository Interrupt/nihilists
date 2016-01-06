
function isChrome() {
	var isChromium = window.chrome,
    vendorName = window.navigator.vendor,
    isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
    isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;

	return isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function() {
	var picked_index = getRandomIntInclusive(0, backgrounds.length - 1);
	var bg = backgrounds[picked_index];

	$(".attribution a").text("Photo by " + bg.author);
	$(".attribution a").attr('href', bg.url);

	if(isChrome()) {
		$(".cta-button").text("+ NihiList tabs to Chrome");
	}
	else {
		$(".greeting").text("NihiList runs on Google Chrome");
		$(".cta-button").text("+ Download Chrome");
		$(".cta-button").attr("href", "http://www.google.com/chrome/browser/desktop/index.html");
	}

	  var url = 'assets/images/' + bg.image;
	  var img = new Image();

	  img.onload = function() {
	  	$(".background").css("background-image", "url('assets/images/" + bg.image + "')");
	    $(".background").addClass("fade-in");
	  }

	  img.src = url;
});

var backgrounds =
	[
		{
			"image": "background_7.jpg",
			"author": "Blake Ricahrd Verdoorn",
			"url": "https://unsplash.com/photos/SbcqUQ4iEcI"
		},
		{
			"image": "background_16.jpg",
			"author": "hdwallphotos.com",
			"url": "https://s-media-cache-ak0.pinimg.com/originals/f4/04/9b/f4049b7a944091fc318174430821b6c8.jpg"
		},
		{
			"image": "background_28.jpg",
			"author": "Ryan Lum",
			"url": "https://unsplash.com/photos/1ak3Z7ZmtQA"
		},
		{
			"image": "background_55.jpg",
			"author": "Viktor Jakovlev",
			"url": "https://unsplash.com/photos/mtNweauBsMQ"
		},
		{
			"image": "background_56.jpg",
			"author": "Thomas Shellberg",
			"url": "https://unsplash.com/photos/Ki0dpxd3LGc"
		},
		{
			"image": "background_62.jpg",
			"author": "Negative Space",
			"url": "https://unsplash.com/photos/1e_lm46j76Q"
		}
	];