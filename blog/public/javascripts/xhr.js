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
			success: function(data, textStatus, jqXHR) {
				if (typeof data.redirect == 'string') {
					window.location = data.redirect;
				}
			}
		});
	});

	$('#user_auth').on('submit', function(event) {
		event.preventDefault();
		$.ajax('/login', {
			type: 'POST',
			data: $('#user_auth').serialize(),
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				if (typeof data.redirect == 'string') {
					window.location = data.redirect;
				}
			},
			error: function(result) {
				console.log(result);
				$('#error').addClass("alert alert-danger");
				$('#error').html(result.responseText);
			}
				
			

		});
	});

	$('#logoutButton').click(function(event) {
		event.preventDefault();
		$.ajax('/logout', {
			type: 'GET',
			data: $('#logoutButton').serialize(),
			success: function(data, textStatus, jqXHR) {
				if (typeof data.redirect == 'string') {
					window.location = data.redirect;
				}
			},
		});
	});

	// $('p.body').html($('p.body').text().replace(\n?/g, '<br />'));

});