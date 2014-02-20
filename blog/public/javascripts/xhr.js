$(document).ready(function(){
	console.log("testing");
	//listener to create new link
	$('#create').on('submit', function(event) {
		//prevents from pre-refreshing
		console.log("test");
		event.preventDefault();
		//perform ajax request
		$.ajax('/blogs', {
			type: 'POST',
			data: $('#create').serialize(),
			success: function(result) {
				console.log("in your ajax");
				$('#result').append("<h2>Post created! Preview below:</h2>");
				$('#result').append(result).fadeIn();
				$('#result').append("<a href='/blogs'><button>Return to Posts List</button></a>")
			}
		});

	});

	// $('#update').on('submit', function(event) {
	// 	event.preventDefault(); 
	// 	console.log("test");
	// 	$.ajax('/links/#{link._id}', {
	// 		type: 'PUT',
	// 		data: $('#update').serialize(),
	// 		success: function(result) {
	// 			console.log("in your ajax");
	// 			$("#update").remove();
	// 			$("#updateResult").html(result).fadeIn();
	// 		}
	// 	});
	// });


});