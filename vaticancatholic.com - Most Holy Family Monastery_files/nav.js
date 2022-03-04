'use strict';
jQuery(document).ready(function($) {
	var isInside;
    $('.mobile-nav .button').hover(function(){
        isInside = true;
    }, function(){
        isInside = false;
    });
	$('body').click(function() {
		var y = $('#mobile-container').css('display');
		if (isInside && y == 'none') {
			$('#mobile-container').css('display', 'block');
		} else {
			$('#mobile-container').css('display', 'none');
		}
	});
});
