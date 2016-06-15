$(document).ready(function(){
	orginalSearch = '';
	$('input[type=submit]').click(function(){
		var searchTerm = $('input[type=text]').val();
		originalSearch = searchTerm;
		getVideos(searchTerm);
		$('.nextWrapper').show();
	});

		function getVideos(searchTerm) {
			$('div.results').html("");
			var parameters = {
				part: 'snippet',
				key: 'AIzaSyB08sY8XmfONlj7FAPPtzR9sVbMUMt5bwg',
				q: searchTerm.toString(),
				maxResults: 30,
				r: 'json'
			}
				pageToken = "";
			$.getJSON('https://www.googleapis.com/youtube/v3/search', parameters, function(data){
				pageToken = data.nextPageToken;
				console.log(pageToken);
				$.each(data.items.slice(0,7), function(){
					var imgUrl = this.snippet.thumbnails.medium.url;
					var imgId = this.id.videoId;
					var title = this.snippet.title;
					var videoType = this.id.kind;
					if (videoType == "youtube#video"){
						$('div.results').append("<div class='thumbWrap'><a href='https://www.youtube.com/watch?v="+ imgId +"'><img class='thumb' src='"+ imgUrl + "' ><p class='caption'>"+ title +"</p></a></div>");
					};
				});
				


			});
			

		};

		function nextButton(originalSearch, pageToken) {
			console.log(pageToken);
			var parameters = {
					part: 'snippet',
					key: 'AIzaSyB08sY8XmfONlj7FAPPtzR9sVbMUMt5bwg',
					q: originalSearch,
					maxResults: 30,
					order: 'relevance',
					pageToken: pageToken,
					r: 'json'
				}

				$.getJSON('https://www.googleapis.com/youtube/v3/search', parameters, function(data){
					pageToken = data.nextPageToken;
					$('div.results').html("");
					$('div.nextWrapper').html("<button class='next' id='"+ pageToken +"'> next page</button>");

					$('button.next').click(function() {
					console.log('next');
							nextButton(originalSearch, pageToken);
						}); //button.next.click
					$.each(data.items.slice(0,7), function(){
					var imgUrl = this.snippet.thumbnails.medium.url;
					var imgId = this.id.videoId;
					var title = this.snippet.title;
					var videoType = this.id.kind;
					
					if (videoType == "youtube#video"){
						$('div.results').append("<div class='thumbWrap'><a href='https://www.youtube.com/watch?v="+ imgId +"'><img class='thumb' src='"+ imgUrl + "' ><p class='caption'>"+ title +"</p></a></div>");
					};
				});
				});
		};

		$('button.next').click(function() {
			console.log('next');
					nextButton(originalSearch, pageToken);
				}); //button.next.click

});


// fancy box?
