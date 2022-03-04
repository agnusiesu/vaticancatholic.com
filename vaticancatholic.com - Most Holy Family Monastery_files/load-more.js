'use strict';
jQuery(document).ready(function($) {

	// $(window).height() gets you an unit-less pixel value of 
	// the height of the (browser) window aka viewport. 
	// With respect to the web browsers the viewport here is visible 
	// portion of the canvas(which often is smaller than the document 
	// being rendered).

	// $(document).height() returns an unit-less pixel value of the 
	// height of the document being rendered. However, if the actual
	// document’s body height is less than the viewport height then it 
	// will return the viewport height instead.

	var countBox = 1;
	var countSidebar = 1;
	var hHeader = 0;
	var hHomeTitle = 0;
	var hHomeNews = 0;
	var sidebarHidden = 0;
	var toScroll = 0;
	var busyBox = false;
	var busySidebar = false;

    $(window).scroll(function (e) {
		e.stopImmediatePropagation();
        e.preventDefault();

		// is sidebar hidden
		if ($('#sidebar').css("display") == 'none') {
			sidebarHidden = 1;
		}

		// amount scrolled
        var s = $(window).scrollTop();

		// enabling top page button
		if (s > 2000) {
            $('.wrapper-top-page').fadeIn();
        }
		$('.wrapper-top-page').click(function() {
        	window.scrollTo(0, 0);
   		});

		var hHeader = $('#main-header').height();
		var hWin = $(window).height();

		// loading more boxes
		if ((isHome || isRecent || isCategory || isArchive && busyBox == false)) {

			// amount of scroll before loading more items,
			// which is the entire height of the document
			// rendered up until the point where more items 
			// are loaded, minus the height of the viewport.

			var hHomeTitle = $('.home-title').height(); 
			var hHomeNews = $('.home-content-wrap').height(); 
			var hRecentContent = $('.recent-content-items').height(); 

			if (!hHeader) {
				hHeader = 0;
			}
			if (!hHomeTitle) {
				hHomeTitle = 0;
			}
			if (!hHomeNews) {
				hHomeNews = 0;
			}
			if (!hRecentContent) {
				hRecentContent = 0;
			}
			/*
			console.log('hHeader: '+hHeader);
			console.log('hHomeTitle: '+hHomeTitle);
			console.log('hHomeNews: '+hHomeNews);
			console.log('hRecentContent: '+hRecentContent);
			*/

			toScroll = 	hHeader +	
						hHomeTitle +
						hHomeTitle +
						hRecentContent +
						hHomeNews -
						hWin;

			/*
			console.log('win: '+$(window).height());
			console.log('toScroll: '+toScroll);
			console.log('s: '+s);
			*/

			if (s > toScroll) {
				if (lang == 'en' && (isHome || isRecent)) {
            		ajaxCallEnHome(countBox);
				} else {
            		ajaxCall(countBox);
				}
           		countBox++;
        	}
		} 

		// sidebar
		if (sidebarHidden == 0 && busySidebar == 0) {

			toScroll = 	hHeader +
						$('.sidebar-content').height() -
						hWin;

			/*
			console.log('toScroll: '+toScroll);
			console.log('s: '+s);
			*/

			if (s > toScroll) {
        		ajaxCallSidebar(countSidebar);
           		countSidebar++;
			}
		}
    });

	// clicking on the "load more" button
    $('.loading').click(function(e){
		e.stopImmediatePropagation();
        e.preventDefault();
		if (lang == 'en' && (isHome || isRecent)) {
        	ajaxCallEnHome(countBox);
		} else {
        	ajaxCall(countBox);
		}
        countBox++;
    });

	// Default ajax call for boxes
	function ajaxCall(countBox) {
		if ($('.mhfm-category').length) {
			var cat = $('.mhfm-category').attr('id');
		} else if ($('.mhfm-tag').length) {
			var tag = $('.mhfm-tag').attr('id');
		} else if ($('.mhfm-archive').length) {
			var monthnum = $('.mhfm-archive').attr('id').split('-')[1];
			var year = $('.mhfm-archive').attr('id').split('-')[0];
		}
		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'post',
			data: {
				action: 'loadmore',
				countBox: countBox,
				cat: cat,
				tag: tag,
				monthnum: monthnum,
				year: year
			},
			dataType: 'html',
			cache: false,
			beforeSend: function() {
				console.log('loading boxes...');
				$('.loading').text(loading+'...');
				busyBox = true;
			},
			success: function(data)	{
				$('.loading').text(more);
				$('.home-content:last').after(data);
				busyBox = false;
			}
		});
	}

	// ajax call for EN homepage
	function ajaxCallEnHome(countBox) {
		var cat = '';
		if (isRecent) {
			cat = 'recent';
		}
		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'post',
			data: {
				action: 'loadmore_en',
				countBox: countBox,
				cat: cat,
				tag: '',
				monthnum: '',
				year: '' 
			},
			dataType: 'html',
			cache: false,
			beforeSend: function() {
				console.log('loading EN homepage...');
				$('.loading').text(loading+'...');
				busyBox = true;
			},
			success: function(data)	{
				$('.loading').text(more);
				$('.home-content:last').after(data);
				busyBox = false;
			}
		});
	}

	// Ajax call for sidebar
	function ajaxCallSidebar(countSidebar) {
		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'post',
			data: {
				action: 'sidebar',
				countSidebar: countSidebar,
				cat: '',
				tag: '',
				monthnum: '',
				year: '' 
			},
			dataType: 'html',
			cache: false,
			beforeSend: function() {
				console.log('loading sidebar...');
				busySidebar = true;
			},
			success: function(data)	{
				$('.sidebar-resp').html(data);
				busySidebar = false;
			}
		});
	}

});
