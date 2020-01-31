'use strict';
var Shop = function () {

	var shopCatalog = function () {
		var $itemsGallery = $('.product-item__images');
		if ($itemsGallery.length) {
			$.each($itemsGallery, function () {
				var that = $(this),
					$images = that.find('.item-image');

				if ($images.length > 0) {
					that.slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						autoplay: false,
						arrows: false,
						dots: true,
						prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left"></i></a>',
						nextArrow: '<a class="slick-next"><i class="fa fa-angle-right"></i></a>',
						adaptiveHeight: true
					});
				}
			});
		}
		$('.modal-preview').modal('show');
		$('.product-list').on('click', '.btn-quick-show', function (e) {
			e.preventDefault();

			$('.modal-preview').modal('show');
		});
	};

	return {
		init: function () {
			shopCatalog();
		}
	};
}();

$(document).ready(function ($) {
	Shop.init();
});