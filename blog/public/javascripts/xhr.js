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

	$('#user_auth').on('submit', function(event) {
		event.preventDefault();
		$.ajax('/login', {
			type: 'POST',
			data: $('#user_auth').serialize(),
			success: function(result) {
				console.log(result);
				if (result == "success") {
					$('#error').addClass("alert alert-success");
					$('#error').html("You are now logged in!");
				} else {
					$('#error').addClass("alert alert-danger");
					$('#error').html(result);
				}
				
			}

		});
	});

});