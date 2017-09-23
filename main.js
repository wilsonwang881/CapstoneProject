var link =  "https://sheets.googleapis.com/v4/spreadsheets/";
const spreadsheetID = "1EX_QfOxLd6JM12nuSwlaJ4vJo4cESEf8wAXaHmFQfcg";
const API_KEY = "?key=AIzaSyDQkiv-Fe56n9mcjFZ0BEZpJI5c-RhmyvE";
var range = "/values/" + "A" + ":" + "A";
var dataSheets = {};
/*
//find range of data
$.get(link + spreadsheetID + range + API_KEY, function(data, status){
	console.log("Length:", data.values.length, "Status :", status);
	range = "/values/" + "A2:" + "I" + (data.values.length).toString();

})
//new get request for all the data
	         	$.get(link + spreadsheetID + range + API_KEY, function(data, status){
					console.log("Data:", data, "Status :", status);
					dataSheets = data;
				})
*/

$.ajax({
	type: "GET",
	url: link + spreadsheetID + range + API_KEY,
	async: false,
	success: function(data, status){
	         	console.log("Length:", data.values.length, "Status :", status);
	         	range = "/values/" + "A2:" + "K" + (data.values.length).toString();
	     	}

})

//new get request for all the data
$.ajax({
	type: "GET",
	url: link + spreadsheetID + range + API_KEY,
	async: false,
	success: function(data, status){
		dataSheets = data;
			}


})
console.log(dataSheets);

input = dataSheets.values.reverse();
console.log(input);
var numberofposts = dataSheets.values.length
var poststart = 0, postNum = 5, postend = postNum
render()

// Load next when btn clicked
$("#loadnext").click(function(){
    $("#mainposts").empty();
    if (postend+postNum <numberofposts){
        poststart+=postNum;
        postend+=postNum;
				$("#loadprev").removeClass('disabled');
				$("#loadnext").removeClass('disabled');
        render();
    } else {
        poststart=numberofposts-postNum;
        postend=numberofposts;
        $("#loadnext").addClass('disabled');
        $("#loadprev").removeClass('disabled');
				render();
    }
    console.log('A', poststart, 'B', postend);
});

// Load previous when btn clicked
$("#loadprev").click(function(){
    $("#mainposts").empty();
    if (poststart-postNum > 0){
        poststart -= postNum
        postend -= postNum
				$("#loadprev").removeClass('disabled');
				$("#loadnext").removeClass('disabled');
        render()
    } else {
        poststart=0
        postend=postNum
        render()
        $("#loadprev").addClass('disabled')
        $("#loadnext").removeClass('disabled')
    }
    console.log('A', poststart, 'B', postend);
});



// Function to render posts from int poststart to intpostend
function render(){
	console.log('render', poststart, postend)
	for (var i = poststart; i < postend; i++){
		var id = i.toString()
		var article = $("<article class = 'post' id = art" + id + ">" +
							"<header id = hd" + id + ">" +
								"<div class = 'title'>" +
									 "<h2 id = h" + id + "></h2>" +
										"<p id = sub" + id + "></p>" +
								"</div>" +
								"<div class = 'meta'>" +
									"<time class = 'published' id = t" + id + "></time>" +
									"<a href='#' class='author' id = a1" + id + ">" +
										"<span class='name' id=name" + id + ">" + "</span>" +
										 "<img src='images/avatar.jpg' alt='' id = img1" + id + "/>" +
									"</a>" +
								"</div>" +
							"</header>" +
							"<a href='#' class='image featured' id = a2" + id + ">" +
							"</a>" +
							"<p id = p" + id + "></p>" +
							"<footer id = f" + id + ">" +
								"<ul class='actions'>" +
									"<li><a href='#'' class='button big'>Continue Reading</a></li>" +
								"</ul>" +
								"<ul class='stats'>" +
									"<li><a href='#' id = topic" + id + "></a></li>" +
									"<li><a href='#' class='icon fa-heart'>28</a></li>" +
									"<li><a href='#' class='icon fa-comment'>128</a></li>" +
								"</ul>" +
							"</footer>" +
						"</article>");
		$("#mainposts").append(article); //article
		$("#name"+id).append(input[i][2]); //author name
		$("#t"+id).append(input[i][3]); //title
		$("#h"+id).append(input[i][4]); //heading
		$("#sub"+id).append(input[i][5]); //subheading
		$("#p"+id).append(input[i][6]); //paragraph
		$("#topic"+id).append(input[i][7]); //topic

		//inserting image or video
		console.log(input[i][10])
		if (input[i][10] == "IMAGE"){
			$("#a2"+id).append("<img src='"+input[i][8]+"' alt='' />")
		}
		else if (input[i][10] == "VIDEO") {
			//	swap watch?v= with embed/ in input[i][8]
			input[i][8]=input[i][8].replace("watch?v=", "embed/");
			console.log(input[i][8])
				$("#a2"+id).append("<iframe width='840' height='500' src='"+input[i][8]+"'></iframe>")
		}
	}
}
