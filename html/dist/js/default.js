'use strict';
var Main = function () {

	var commonModule = function () {
		$('[data-toggle="tooltip"]').tooltip();
	};

	var formSettings = function () {
		$('.masked-phone').mask('+7 (999)-999-99-99');
		$('.form-date-range').daterangepicker({
			"locale": {
				"format": "MM/DD/YYYY",
				"separator": " - ",
				"applyLabel": "Применить",
				"cancelLabel": "Отмена",
				"fromLabel": "От",
				"toLabel": "До",
				"customRangeLabel": "Свой",
				"daysOfWeek": [
					"Вс",
					"Пн",
					"Вт",
					"Ср",
					"Чт",
					"Пт",
					"Сб"
				],
				"monthNames": [
					"Январь",
					"Февраль",
					"Март",
					"Апрель",
					"Май",
					"Июнь",
					"Июль",
					"Август",
					"Сентябрь",
					"Октябрь",
					"Ноябрь",
					"Декабрь"
				],
				"firstDay": 1
			}
		});
	};

	var handleNotify = function () {
		Noty.overrideDefaults({
			theme: 'bootstrap-v4',
			timeout: 3000,
			animation: {
				open: 'animated bounceInRight', // Animate.css class names
				close: 'animated bounceOutRight' // Animate.css class names
			}
		});
	}

	var initNavi = function () {
		$('.navi').on('click', '.navi-toggle', function (e) {
			e.preventDefault();

			$("body").addClass('menu-opened');
		});

		$(document).on('click', '.menu-opened .has-child > a', function (e) {
			e.preventDefault();

			$(this).closest('li').toggleClass('opened');
			$(this).closest('li').find('>.dropdown').slideToggle('fast');
		});

		$('.body-overlay').on('click', function (e) {
			e.preventDefault();

			$("body").removeClass('menu-opened');
		});

		$(document).keyup(function (e) {
			if (e.keyCode == 27) {
				$("body").removeClass('menu-opened');
			}
		});

	};

	var searchBox = function () {
		$('.header-search .search-input .form-control').on("keyup", function (e) {
			var that = $(this),
				currentVal = that.val();

			if (that.val().length > 0) {
				/*	$.ajax({
						type: "POST",
						url: "/ajax/searchRow.php",
						data: { q: $(this).val() }
					}).done(function (msg) {
						$(".search-menu").html(msg);
					});*/

				if (that.attr('data-val') != currentVal) {
					that.attr('data-val', currentVal);
					that.closest('.header-search').addClass('header-search--open');
				}
				else {
					that.closest('.header-search').removeClass('header-search--open');
				}
			}


			else {
				that.closest('.header-search').removeClass('header-search--open');
			}
		});
		$(document).mouseup(function (e) {
			var container = $('.header-search--open');
			if (!container.is(e.target)
				&& container.has(e.target).length === 0) {
				$(".header-search").removeClass('header-search--open')
			}
		});
		$(document).keyup(function (e) {
			if (e.keyCode == 27) {
				$(".header-search").removeClass('header-search--open, header-search--shown')
			}
		});

		$('.search-toggle').on('click', function (e) {
			e.preventDefault();
			$('.header-search').toggleClass('header-search--shown');
		});
	};

	var scrolling = function () {
		$(window).on('scroll', function () {
			var scroll = $(window).scrollTop(),
				mainHeader = $('#header'),
				mainHeaderHeight = mainHeader.innerHeight();

			if (scroll > 1) {
				mainHeader.addClass("sticky");
			} else {
				mainHeader.removeClass("sticky");
			}

			if (scroll > 500) {
				$('#scroll-top').fadeIn()
			} else {
				$('#scroll-top').fadeOut()
			}
		});
		$('#scroll-top').on('click', function (e) {
			e.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, 250);
		});

	};
	return {
		init: function () {
			handleNotify();
			commonModule();
			initNavi();
			searchBox();
			scrolling();
			formSettings();
		}
	};
}();

$(document).ready(function ($) {
	Main.init();
});

function loadStart(target) {
	$(target).addClass('waiting');
}
function loadEnd(target) {
	$(target).removeClass('waiting');
}

function resetForm($form) {
	$form.find('input, textarea').val('');
	$form.find('select').prop('selectedIndex', 0);
	$form.find('input:radio, input:checkbox')
		.removeAttr('checked').removeAttr('selected');
}


function handleErrorAjax(xhr, textStatus, errorThrown) {
	var status = xhr.status;
	var responseText = xhr.responseText;
	var statusText = xhr.statusText;

	new Noty({
		type: 'error',
		text: 'Error' + status + " - " + decodeURIComponent(statusText.replace(/\+/g, '%20')),
	}).show();
}

function HandleMsgAjax(_text, _title, _type) {
	if (_type == null) _type = 'success';
	new Noty({
		type: _type,
		text: _text
	}).show();
}

function showError(xhr, status, p3) {
	var err = "Error " + " " + status + " " + p3;
	if (xhr.responseText && xhr.responseText[0] === "{")
		err = JSON.parse(xhr.responseText).Message;
	console.log(err);

	handleErrorAjax(xhr, status, p3);
};