//when onready, run this code
$(function() {

	console.log('loaded');

	var nav = $('#sidebar-wrapper .sidebar-nav');
	var mainContentArea = $('#page-content-wrapper');	

	var links = nav.find('a');

	var currentActivePage = nav.find('.active').attr('href').replace('#', '');

	function updateNavigation(selectedNavItem) {
		links.removeClass('active');
		selectedNavItem.addClass('active');
		if (mainContentArea.width() < 768) {
			$("#wrapper").toggleClass("toggled");
		}
	}

	function onclick_link (e) {
		e.preventDefault();
		var element = $(this);
		var href = element.attr('href').replace('#', '');
		
		console.log(href);
		getPage(href);
		updateNavigation(element);

	}

	function getPage(pageName) {

		//call the server
		if (!pageName) {return;}

		var route = '/pages/';

		$.ajax({
			url: route + pageName + '.html',
			type: 'GET',
			dataType: 'html',
			success: function (response) {
				mainContentArea.html(response);
			},
			error: function (response) {
				console.log('ERROR:', response);
			}
		});

	}

	$.each(links, function(i, link) {
		link = $(link);
		link.on('click', onclick_link);
	});

	getPage(currentActivePage);

});