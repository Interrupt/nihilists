var listKey = "nihilist"
var listItems = getStoredList();
var index = 0;

$('.addItem').keypress(function (e) {
  if (e.which == 13) {
    addNewListItem($('.addItem').val());
    return false;
  }
});

function getStoredList() {
	var list = [];
	var storedList = localStorage[listKey];
	if(storedList != undefined && list != null) list = JSON.parse(storedList);
	return list;
}

function storeList(list) {
	localStorage[listKey] = JSON.stringify(list);
}

function addNewListItem(item) {
	listItems.push(item);
	updateList();
	storeList(listItems);

	$(".addItem").val('');
}

function drawListItem(item) {
	console.log("Adding: " + item);
	$(".list ul").prepend('<li data-index="' + (index++) + '">' + item + '</li>');
}

function removeListItem(item) {
	var l = $(this);
	var index = l.attr("data-index");

	if (index > -1) {
    	listItems.splice(index, 1);
	}

	storeList(listItems);

	updateList();
}

function updateList() {
	index = 0;
	$(".list ul").empty();
	listItems.forEach(drawListItem);
	$(".list ul li").click(removeListItem);
}

updateList();