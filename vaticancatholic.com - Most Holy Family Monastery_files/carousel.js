'use strict';
jQuery(document).ready(function($) {

var $carouselWrap = $('.carousel-wrap');
var $carousel = $carouselWrap.find('.carousel');

var i, title, img, url;

function item(i) {
	title = '';
	if (arr['slidertitle'][i]) {
		title = arr['slidertitle'][i];
	} else if (arr['title'][i]) {
		title = arr['title'][i];
	}
	if (lang == 'en') {
		img = 'https://vaticancatholic.com/images/' +
			arr['img'][i]+'.jpg"/>';
		url = arr['url'][i] + arr['campaign'][i];
	} else {
		img = arr['img'][i];
		url = arr['url'][i];
	}
	if (title == '') {
		return '<div>' +
		'<a href="">' +
		'<div>' +
		'</div>' +
		'<div></div>' +
		'</a>' +
		'</div>';
	} else {
		return '<div class="item carousel-'+i+'">' +
		'<a target="_blank" rel="noopener" href="'+url+'">' +
		'<div class="img-wrap slide-'+i+'">' +
		'<img src="' + img + '"/>' +
		'</div>' +
		'<div class="title title-' + i + '">' + title + '</div>' +
		'</a>' +
		'</div>';
	}
}

var click = 0;
var currentClick, maxClick;
$carousel.attr('click', '0');
$carouselWrap.find('#next-button').click(function() {
	click = click + 3;
	$carousel.attr('click', click);
	$carousel.css('width', '+=2000px');
	currentClick = parseInt($carousel.attr('click'));

	maxClick = $carousel.find('.item:last').attr('class');
	maxClick = maxClick.split(' ')[1];
	maxClick = maxClick.split('-')[1];
	maxClick = parseInt(maxClick);

	currentClick = parseInt($carousel.attr('click'));
	if (currentClick <= arr['url'].length - 3) {
		$carousel.append(item(maxClick + 1));
		$carousel.append(item(maxClick + 2));
		$carousel.append(item(maxClick + 3));
		$carousel.append(item(maxClick + 4));
		$carousel.animate({
			left: '-=1068px',
		});
	}
	if (currentClick > 0) {
		$carouselWrap.find('#prev-button').attr('class', 'carousel-prev');
	} else {
		$carouselWrap.find('#prev-button').attr('class', 'carousel-prev-disabled');
	}
});
$carouselWrap.find('#prev-button').click(function() {
	currentClick = parseInt($carousel.attr('click'));
	if (currentClick >= 3) {
		click = click - 3;
		$carousel.attr('click', click);
		$carousel.animate({
			left: '+=1068px',
		});
	}
	if (currentClick > 3) {
		$carouselWrap.find('#prev-button').attr('class', 'carousel-prev');
	} else {
		$carouselWrap.find('#prev-button').attr('class', 'carousel-prev-disabled');
	}
});

});
