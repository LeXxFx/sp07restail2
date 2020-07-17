'use strict';
var Main = function () {

	var commonModule = function () {
		$('[data-toggle="tooltip"]').tooltip();

		let modal_lv = 0;
		$('body').on('show.bs.modal', function (e) {
			if (modal_lv > 0)
				$(e.target).css('zIndex', 1051 + modal_lv);
			modal_lv++;
		}).on('hidden.bs.modal', function () {
			if (modal_lv > 0)
				modal_lv--;

			if ($('body').find('.modal.show').length) {
				console.log('ttt');
				$('body').addClass('modal-open');
			}
		});
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

		var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

		var arr = document.getElementsByClassName("autocomplete");
		[].forEach.call(arr, function (el) {
			autocomplete(el.querySelector('.form-control'), countries);
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
			$(this).closest('li').find('>.dropdown, >.catalog-navi').slideToggle('fast');
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


		$('.catalog-navi li.has-child').hover(function () {
			let that = $(this),
				$ddl = that.find('> .dropdown'),
				elementTop = $ddl.offset().top,
				elementBottom = elementTop + $ddl.outerHeight(),
				viewportTop = $(window).scrollTop(),
				viewportBottom = viewportTop + $(window).height(),
				diff = elementBottom - viewportBottom;

			if (diff > 0) {
				$ddl.css({ 'margin-top': -(diff + 10) })
			}
		}, function () {
			let that = $(this),
				$ddl = that.find('> .dropdown');

			$ddl.css({ 'margin-top': '' });
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

			if (scroll > mainHeaderHeight) {
				$('.shop-panel').addClass('shop-panel--shown');
			} else {
				$('.shop-panel').removeClass('shop-panel--shown');
			}

			if (scroll > 500) {
				$('#scroll-top').addClass('shown')
			} else {
				$('#scroll-top').removeClass('shown')
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