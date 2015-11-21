// Loading saved schedules
var mydata = JSON.parse(localStorage.getItem("mydata"));
if(!mydata) {
	mydata = data;
}

$(function() {
	$(".page").css({
		"height": $(window).height() + "px"
	});

	// Binding click event to menu items
	$(".drawer nav a").each(function(key, val) {
		$(this).on("click", function() {
			mySwiper.slideTo(key);
			$('.mdl-layout__obfuscator').trigger('click', function() {
				
			});
		});
	});

	// Loading templates
	var speakerTemplate = _.template( $("#speaker-template").html() );
	var topicTemplate = _.template( $("#topic-template").html() );
	var sessionTemplate = _.template( $("#session-template").html() );
	var mySessionTemplate = _.template( $("#my-session-template").html() );
	var popupTemplate = _.template( $("#popup-template").html() );

	// Binding click event to list items,
	// to show popup page with selected data
	$("body").on("click", ".speaker-list li, .topic-list li, .schedule-list .session-info", function() {
		var id = $(this).data("id");
		var pageData = {};
		_.each(mydata, function(val, key) {
			if(val.id == id) {
				pageData = val;
				return;
			}
		});

		$(".popup").html( popupTemplate(pageData) );
		$(".popup").fadeIn(300);
	});

	// Close popup page
	$("body").on("click", ".popup .back", function() {
		$(".popup").fadeOut(300);
	});

	// Render data using loaded templates
	_.each(mydata, function(val, key) {
		if(val.id != 0 && val.id != 24 && val.id != 25 && val.id != 26)
			$(".speaker-list").append( speakerTemplate(val) );
		
		$(".topic-list").append( topicTemplate(val) );

		$("#day1 .schedule-list li").each(function() {
			if($(this).data("time") == val.time && val.day === 1) {
				$(this).append( sessionTemplate(val) );
			}
		});
		
		$("#day2 .schedule-list li").each(function() {
			if($(this).data("time") == val.time && val.day === 2) {
				$(this).append( sessionTemplate(val) );
			}
		});

		$("#myday1 .schedule-list li").each(function() {
			if($(this).data("time") == val.time && val.day === 1 && val.favorite) {
				$(this).append( mySessionTemplate(val) );
			}
		});
		
		$("#myday2 .schedule-list li").each(function() {
			if($(this).data("time") == val.time && val.day === 2 && val.favorite) {
				$(this).append( mySessionTemplate(val) );
			}
		});
	});

	// Bind search/filter function to search inputs
	$('#speaker-filter').liveFilterOf('.speaker-list > li');
	$('#topic-filter').liveFilterOf('.topic-list > li');

	// Save session as favorite on click
	$("body").on("click", ".set-favorite", function() {
		var id = $(this).data("id");
		var checked = $(this).is(":checked");

		$("#myday1 .session").remove();
		$("#myday2 .session").remove();
		$("#day1 .session").remove();
		$("#day2 .session").remove();

		// Re-render data
		_.each(mydata, function(val, key) {
			if(val.id == id) {
				mydata[key].favorite = checked;
			}

			$("#day1 .schedule-list li").each(function() {
				if($(this).data("time") == val.time && val.day === 1) {
					$(this).append( sessionTemplate(val) );
				}
			});
			
			$("#day2 .schedule-list li").each(function() {
				if($(this).data("time") == val.time && val.day === 2) {
					$(this).append( sessionTemplate(val) );
				}
			});

			$("#myday1 .schedule-list li").each(function() {
				if($(this).data("time") == val.time && val.day === 1 && val.favorite) {
					$(this).append( mySessionTemplate(val) );
				}
			});
			
			$("#myday2 .schedule-list li").each(function() {
				if($(this).data("time") == val.time && val.day === 2 && val.favorite) {
					$(this).append( mySessionTemplate(val) );
				}
			});


			// Required by MDL to refresh MDL JS on DOM
			componentHandler.upgradeDom();
		});

		$(this).data("value", checked);
		$(this).attr("data-value", checked);

		localStorage.setItem("mydata", JSON.stringify(mydata));
	});
	
	// Bind touch swipe effect on pages
	var mySwiper = new Swiper('.swiper-container', {
	    //
	});
});