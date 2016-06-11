$(document).ready(function(){
	$('input[type=submit]').click(function(){
		var searchTerm = $('input[type=text]').val();
	
		getVideos(searchTerm);
	});
		function getVideos(searchTerm) {
			$('div.results').html("");
			var parameters = {
				part: 'snippet',
				key: 'AIzaSyB08sY8XmfONlj7FAPPtzR9sVbMUMt5bwg',
				q: searchTerm.toString(),
				maxResults: 50,
				r: 'json'
			}
				pageToken = "";
			$.getJSON('https://www.googleapis.com/youtube/v3/search', parameters, function(data){
				pageToken = data.nextPageToken;
				console.log(pageToken);
				$.each(data.items.slice(0,7), function(){
					console.log(this);
					var imgUrl = this.snippet.thumbnails.medium.url;
					var imgId = this.id.videoId;
					var title = this.snippet.title;
					var videoType = this.id.kind;
					console.log(imgUrl);
					if (videoType == "youtube#video"){
						$('div.results').append("<div class='thumbWrap'><a href='https://www.youtube.com/watch?v="+ imgId +"'><img class='thumb' src='"+ imgUrl + "' ><p class='caption'>"+ title +"</p></a></div>");
					};
				});
				$('button.next').click(function() {
				var parameters = {
					part: 'snippet',
					key: 'AIzaSyB08sY8XmfONlj7FAPPtzR9sVbMUMt5bwg',
					q: searchTerm.toString(),
					maxResults: 50,
					pageToken: "CBQQAA",
					r: 'json'
				}

				$.getJSON('https://www.googleapis.com/youtube/v3/search', parameters, function(data){
					$.each(data.items.slice(8,20), function(){
					console.log(this);
					var imgUrl = this.snippet.thumbnails.medium.url;
					var imgId = this.id.videoId;
					var title = this.snippet.title;
					var videoType = this.id.kind;
					$('div.results').html("");
					console.log(imgUrl);
					if (videoType == "youtube#video"){
						$('div.results').append("<div class='thumbWrap'><a href='https://www.youtube.com/watch?v="+ imgId +"'><img class='thumb' src='"+ imgUrl + "' ><p class='caption'>"+ title +"</p></a></div>");
					};
				});
				});
			}); //button.next.click
			});
			

		};
});

// fancy box?

// line up properly
// forwards and backwards buttons
