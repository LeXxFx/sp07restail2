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
				dots: true,
				prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left"></i></a>',
				nextArrow: '<a class="slick-next"><i class="fa fa-angle-right"></i></a>',
				adaptiveHeight: true
			});
		}
	};

	var brandsCarousel = function () {
		var brands = $(".brands__list");

		if (brands.length > 0) {
			if (brands.find('.item').length > 3) {
				brands.slick({
					slidesToShow: 5,
					slidesToScroll: 5,
					prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left"></i></a>',
					nextArrow: '<a class="slick-next"><i class="fa fa-angle-right"></i></a>',
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3
							}
						},
						{
							breakpoint: 478,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
			}
		}
	};

	return {
		init: function () {
			showcaseSlider();
			brandsCarousel();
		}
	};
}();

$(document).ready(function ($) {
	Home.init();
});