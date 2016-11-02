var key = "&api_key=dc6zaTOxFJmzC";
var limit = "&limit=10";
var setter = 0;
var offset = "&offset="+setter;
var rootURL = "https://api.giphy.com/v1/gifs/search?q="
var players = ["Blake Griffin", "Lebron James", "Steph Curry", "Kevin Durant", "Russell Westbrook", "Chris Paul", "Paul George","Dwyane Wade", "Damian Lillard", "James Harden"]
var currentData = [];
var currVal = "";

function buttonizer () {
	for (var i = 0; i < players.length; i++) {
		var b = $("<button>");
		b.addClass("player btn btn-primary btn-group center-block");
		b.attr("data-player", players[i]);
		b.attr("data-clicks", 0);
		b.text(players[i]);
		$("#button-zone").append(b);
	} 

}
buttonizer();

$("#submit").on("click", function newButton(event){
	event.preventDefault();
	var info = $("input").val();
	if (info.length < 5){
		alert("*Mutombo finger wag*");
		$("form").trigger("reset");
		return false;
	}else if ($.inArray(info, players) !== -1){
		alert("Wouldn't it be nice if we could clone people? YOU CAN'T!");
		$("form").trigger("reset");
		return false;
	}
	else {
	var b = $("<button>");
		b.addClass("player btn btn-primary btn-group center-block");
		b.attr("data-player", info);
		b.attr("data-clicks", 0);
		b.text(info);
		$("#button-zone").append(b);
		$("form").trigger("reset");
		return false;
	}
	return false;
})

$("body").on("click", ".player", function(){

	if($(".active").length >= 1){
		$("button").removeClass("active");
		$(this).addClass("active");
	}else{
		$(this).addClass("active");
	}

	currentData = [];

	var term = $(this).data("player").split(" ").join("+");
	// setter = (0 += (10 * $(this).data("clicks")));
	var giphyLube = rootURL + term + key + limit + offset;
	$.ajax({url: giphyLube, method: "GET"}).done(function (response) {

		var giphy = response.data;
		$("#gif-zone").empty();
		for (var i = 0; i < giphy.length; i++) {

			currentData.push(giphy[i]);

			var imgDiv = $("<div>");
			imgDiv.attr("class", "pull-left col-sm-3 h3 text-center")

			var img = $("<img>");
			img.attr({
				src : giphy[i].images.fixed_width_still.url,
				class : "still pic",
				"data-value" : [i]
			});

			var p = $("<p>");
			p.text(giphy[i].rating);

			imgDiv.append(p, img)
			$("#gif-zone").append(imgDiv);


		}
		$(this).data("clicks") += 1;
	})
});

$("body").on("click", "img", function(){

	if ($(this).hasClass("still")){
	currVal = $(this).data("value");
		$(this).attr({
			src : currentData[currVal].images.fixed_width.url,
		})
		.addClass("animate").removeClass("still");
	}else if ($(this).hasClass("animate")){
		$(this).attr({
			src : currentData[currVal].images.fixed_width_still.url,
		})
		.removeClass("animate").addClass("still");
	}
});