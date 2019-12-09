'use strict';
var Home = function () {

	var showcaseSlider = function () {
		var sl = $('.sl');
		if (sl.length) {
			sl.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				arrows: true,
				dota: true,
				prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left"></i></a>',
				nextArrow: '<a class="slick-next"><i class="fa fa-angle-right"></i></a>',
				adaptiveHeight: true
			});
		}
	};

	var bbSlider = function () {
		var sl = $('.bb-list');
		if (sl.length) {
			sl.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				arrows: true,
				prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left"></i></a>',
				nextArrow: '<a class="slick-next"><i class="fa fa-angle-right"></i></a>',
				adaptiveHeight: true
			});
		}
	};

	return {
		init: function () {
			showcaseSlider();
			bbSlider();
		}
	};
}();

$(document).ready(function ($) {
	Home.init();
});