function makeDailySeed() {
	return getSeed();
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var now = new Date();
var today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
var lastDate = getSeedDate();

if(lastDate == undefined || lastDate == null) {
	resetSeed();
}
else {
	if(today - lastDate != 0) {
		resetSeed();
	}
}

function getSeedDate() {
	return new Date(localStorage["saved-seed-date"]);
}

function getSeed() {
	return localStorage["saved-seed"];
}

function resetSeed() {
	localStorage["saved-seed-date"] = today.toString();
	localStorage["saved-seed"] = Math.random();
}

// set a random seed for today
Math.seedrandom(makeDailySeed());

//Math.seedrandom();

function loadBackgroundImage() {
	$.get("http://www.nihi-lists.com/extension/data/backgrounds.json", function(data) { 
		var backgrounds = data.backgrounds;
		var picked_index = getRandomIntInclusive(0, backgrounds.length - 1);
		var bg = backgrounds[picked_index];

		$("body").css("background-image", "url('http://www.nihi-lists.com/extension/images/" + bg.image + "')");
		$(".attribution a").text("Photo by " + bg.author);
		$(".attribution a").attr('href', bg.url);
	}).fail(function() {
		console.log("Loading backgrounds failed, falling back to local.");
		loadLocalBackupBackground();
	});
}

function loadLocalBackupBackground() {
	$.get("js/data/backgrounds.json", function(data) { 
		var backgrounds = JSON.parse(data).backgrounds;
		var picked_index = getRandomIntInclusive(0, backgrounds.length - 1);
		var bg = backgrounds[picked_index];

		$("body").css("background-image", "url('images/" + bg.image + "')");
		$(".attribution a").text("Photo by " + bg.author);
		$(".attribution a").attr('href', bg.url);
	} );
}

loadBackgroundImage();

function twitterShare() {
	var twitterText="What do you aspire to do? Something or Nothing, not that it matters. www.Nihi-Lists.com";
	var twitterUrl="https://twitter.com/intent/tweet?text=" + escape(twitterText);

	var w = 500;
    var h = 250;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2); 

	chrome.windows.create({url: twitterUrl, type: 'popup', width: w, height: h, left: left, top: top});

	return false;
}

$(function() {
	$(".twitter-share-button").click(twitterShare);
});