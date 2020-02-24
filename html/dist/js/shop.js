'use strict';
var Shop = function () {
	const isMobile = false;

	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

	var inputCounter = function () {
		$('body').on('click', '.btn-number', function (e) {
			e.preventDefault();

			var self = $(this),
				fieldName = self.attr('data-field'),
				type = self.attr('data-type'),
				input = $("input[name='" + fieldName + "']"),
				currentVal = parseInt(input.val().split(" ")[0]);

			if (!isNaN(currentVal)) {
				var unit = '';
				if (input.data('unit')) unit = input.data('unit');
				if (type === 'minus') {
					self.closest('.input-counter').find('.btn-plus').attr('disabled', false);
					if (currentVal > input.attr('data-min')) {
						input.val(currentVal - input.data('step') + "" + unit).change();
					}
				} else if (type === 'plus') {
					self.closest('.input-counter').find('.btn-minus').attr('disabled', false);
					if (currentVal < input.attr('data-max')) {
						input.val(currentVal + input.data('step') + "" + unit).change();
					}
				}
				CheckMaxQuantity(input);

			} else {
				input.val(0);
			}
		});
	};

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

		$('.link-load').on('click', function (e) {
			e.preventDefault();

			$(this).toggleClass('link-load--loading');
		});

		$('.viewed__list').slick({
			slidesToShow: 7,
			slidesToScroll: 7,
			autoplay: false,
			arrows: true,
			dots: false,
			prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left"></i></a>',
			nextArrow: '<a class="slick-next"><i class="fa fa-angle-right"></i></a>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6,
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
					}
				},
				{
					breakpoint: 478,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}
			]
		});
	};

	var productQuickBuy = function () {
		$('#modal_quickbuy').modal('show');
		$('.quick-buy').on('click', function (e) {
			e.preventDefault();
			$('#modal_quickbuy').modal('show');
		});
	}

	var productPreview = function () {
		$('body').on('click', '.product-item .btn-quick-show', function (e) {
			e.preventDefault();
			$('.modal-preview').modal('show');
		});

		$('.modal-preview').on('shown.bs.modal', function (e) {
			var gallery = $(this).find('.image-list:not(.slick-slider)');
			if (gallery.length) {
				productGallery(gallery);
			}
		});
	};

	var productGallery = function (gallery) {
		var isVertical = true,
			imageItem = $('body').find('.image-list .item a');

		imageItem.on("click", function (e) {
			e.preventDefault();
			var that = $(this),
				zoom_size = that.parent('.item').data('zoom-size');

			if (!that.closest('.item').hasClass('current'))
				switchImage(that, zoom_size);
		});


		if (gallery === undefined) {
			gallery = $('#product-gallery').find('.image-list');
		}

		if (gallery.data('direction') === "row")
			isVertical = false;

		if (gallery.length > 0) {
			gallery.slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: false,
				prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left"></i></a>',
				nextArrow: '<a class="slick-next"><i class="fa fa-angle-right"></i></a>',
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 478,
						settings: {
							slidesToShow: 3
						}
					}
				]
			});
			gallery.on('afterChange', function (event, slick, currentSlide) {
				var slide = slick.$slides.get(currentSlide),
					item = $(slide).find('.item'),
					zoom_size = $(item).data('zoom-size');

				switchImage(item.find('a'), zoom_size);
			});
		};
	};

	function CheckMaxQuantity(el) {
		if (+(el.val().trim()) > el.attr('data-max')) {
			el.val(el.attr('data-max'));
		}
		if (+(el.val().trim()) < el.attr('data-min')) {
			el.val(el.attr('data-min'));
		}

		if (parseInt(el.val()) >= el.attr('data-max')) {
			el.parent().find('.btn-plus').attr('disabled', true);
		} else {
			el.parent().find('.btn-plus').removeAttr('disabled');
		}

		if (parseInt(el.val()) <= el.attr('data-min')) {
			el.parent().find('.btn-minus').attr('disabled', true);
		} else {
			el.parent().find('.btn-minus').removeAttr('disabled');
		}
	};

	function switchImage(image, zoom_size) {
		var that = image,
			target = that.closest('.product-images').find('.image-preview'),
			newSrc = that.attr('href'),
			$zoom = 450;

		if (zoom_size !== undefined) {
			$zoom = zoom_size;
		}

		that.closest('.image-list').find('.item').removeClass("current");
		that.parent().addClass("current");

		target.removeClass('image-preview--init').addClass('image-preview--loading');
		target.html('');

		if (that.data('source') == 'image') {
			target.html('<a class="MagicZoomPlus" rel="preload-selectors-small:false;preload-selectors-big:false;initialize-on:mouseover;smoothing-speed:70;fps:40;selectors-effect:false;show-title:false;loading-msg:Загрузка...;background-opacity:10;zoom-width:' + $zoom + ';zoom-height:' + $zoom + ';zoom-distance:5;hint-text:;selectors-class:current;buttons:hide;caption-source:span;" ' +
				'href="' + newSrc + '"><img src="' + newSrc + '"/></a>').promise().done(function () {
					target.removeClass('image-preview--loading');
					target.find('img').fadeIn('fast');
				});

			// MagicZoomPlus.start('gallery');
		};
	}

	return {
		init: function () {
			inputCounter();
			shopCatalog();
			productQuickBuy();
			productPreview();
			productGallery();
		}
	};
}();

$(document).ready(function ($) {
	Shop.init();
});