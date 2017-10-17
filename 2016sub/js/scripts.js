/// <reference path="jquery.js" />
window.FS = window.FS || {};
window.FS.Portal = window.FS.Portal || {};

(function ($) {
	var pubsub = $({}),
		pubStack = []; // стэк событий опубликованных до инициализации всех виджетов

	$.subscribe = subscribe;
	$.unsubscribe = unsubscribe;
	$.publish = publish;
	$.initWidgets = function ($block) {
		// виджеты могут быть иницилизированны как внутри всего сайт, так и внутри конкретного блока
		var $context = $block || $('html');

		// Если какой-либо виджет публикует событие при инициализации,
		// в момент до того как будет инициализирован виджет который подпишется на это событие
		// то последний не сможет обработать это событие, т.к. оно произойдет раньше подписки.
		// Для это подменяем метод publish, 
		// что все события произошедшие до момента иницилизации всех виджетов попали в массив,
		// из которого мы их вызовем после загрузки всех виджетов
		$.publish = collect;

		$.each($context.find('.js-widget'), function () {
			var $this = $(this),
				config = this.onclick ? this.onclick() : {};

			for (var widget in config) {
				if ($.fn[widget]) {
					$this[widget](config[widget])
						.removeClass('js-widget')
						.addClass('js-widget-inited');
				}
			}
		});

		// возвращаем в исходное состояние
		$.publish = publish;

		// вызываем "скопившиеся" опубликованные события
		$.each(pubStack, function () {
			$.publish(this.eventName, this.data);
		});

		// отчищаем стэк опубликованных событий
		pubStack.length = 0;
	};
	$.destroyWidgets = function ($block) {
		// виджеты могут быть удалены как внутри всего сайт, так и внутри конкретного блока
		var $context = $block || $('html');

		$.each($context.find('.js-widget-inited'), function () {
			var $this = $(this),
				config = this.onclick ? this.onclick() : {};

			for (var widget in config) {
				if ($.fn[widget]) {
					$this[widget]('destroy')
						.removeClass('js-widget-inited')
						.addClass('js-widget');
				}
			}
		});
	};

    	function subscribe() {
		pubsub.on.apply(pubsub, arguments);
	}
	function unsubscribe() {
		pubsub.off.apply(pubsub, arguments);
	};
	function publish() {
		pubsub.trigger.apply(pubsub, arguments);
	};
	function collect(eventName, data) {
		pubStack.push({ eventName: eventName, data: data });
	};
}(jQuery));

$(function () {
    var utils = $.formula.utils(),
		zoomController = $.formula.zoomController(),
        bgVideo;
    var ua = navigator.userAgent.toLowerCase();

    // фоновое видео на главной странице

    if ($('.page').hasClass('_index')) {
        if (Modernizr.touch || !Modernizr.audio || (ua.indexOf('opr') !== -1) || (ua.indexOf('opera') !== -1)) {
            $('.page').addClass('_bg-image');
        } else {
            bgVideo = $.formula.bgVideo();
        }
    }
	$('.ad-action._play').fancybox({
	    maxWidth: 853,
	    maxHeight: 480,
	    fitToView: false,
	    autoSize: false,
	    padding: 20,
	    closeClick: false,
	    openEffect: 'none',
	    closeEffect: 'none',
	    beforeLoad: function () {
	        if (bgVideo) {
	            bgVideo.stop(); // останавливаем фоновое видео
	        }
	    },
	    afterClose: function () {
	        if (bgVideo) {
	            bgVideo.play(); // запускаем фоновое видео
	        }
	    },
	    helpers: {
	        media: {}
	    }
	});



	// фикс особенностей sharepoint...
	if (!$('.page').hasClass('_index')) {
		$('.page__header').css({
			'margin-right': utils.getScrollWidth()
		});
	}
	$('.modal-trigger').fancybox({
	    padding: 0,
	    parent: "form:first",
	    wrapCSS: '_form',
	    afterShow: function () {
	        $.initWidgets($('.fancybox-wrap._form'));
	    },
	    beforeClose: function () {
	        $.destroyWidgets($('.fancybox-wrap._form'));
	    },
	    // helpers: {
	    // 	overlay: {
	    // 		locked: false
	    // 	}
	    // }
	});

	// по-сколько sharepoint вырезает onclick аттрибут в контентной части мы инит плагин руками
	$(window).on('load', function () {
	    $('.slider').fSlider();
	    $('.tumbler').tumbler();
	});

    // поиск и инициализация всех виджетов на сайте
	$.initWidgets();
});
/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function ($) {
	function sc_setScroll(a, b, c) { return "transition" == c.transition && "swing" == b && (b = "ease"), { anims: [], duration: a, orgDuration: a, easing: b, startTime: getTime() } } function sc_startScroll(a, b) { for (var c = 0, d = a.anims.length; d > c; c++) { var e = a.anims[c]; e && e[0][b.transition](e[1], a.duration, a.easing, e[2]) } } function sc_stopScroll(a, b) { is_boolean(b) || (b = !0), is_object(a.pre) && sc_stopScroll(a.pre, b); for (var c = 0, d = a.anims.length; d > c; c++) { var e = a.anims[c]; e[0].stop(!0), b && (e[0].css(e[1]), is_function(e[2]) && e[2]()) } is_object(a.post) && sc_stopScroll(a.post, b) } function sc_afterScroll(a, b, c) { switch (b && b.remove(), c.fx) { case "fade": case "crossfade": case "cover-fade": case "uncover-fade": a.css("opacity", 1), a.css("filter", "") } } function sc_fireCallbacks(a, b, c, d, e) { if (b[c] && b[c].call(a, d), e[c].length) for (var f = 0, g = e[c].length; g > f; f++) e[c][f].call(a, d); return [] } function sc_fireQueue(a, b, c) { return b.length && (a.trigger(cf_e(b[0][0], c), b[0][1]), b.shift()), b } function sc_hideHiddenItems(a) { a.each(function () { var a = $(this); a.data("_cfs_isHidden", a.is(":hidden")).hide() }) } function sc_showHiddenItems(a) { a && a.each(function () { var a = $(this); a.data("_cfs_isHidden") || a.show() }) } function sc_clearTimers(a) { return a.auto && clearTimeout(a.auto), a.progress && clearInterval(a.progress), a } function sc_mapCallbackArguments(a, b, c, d, e, f, g) { return { width: g.width, height: g.height, items: { old: a, skipped: b, visible: c }, scroll: { items: d, direction: e, duration: f } } } function sc_getDuration(a, b, c, d) { var e = a.duration; return "none" == a.fx ? 0 : ("auto" == e ? e = b.scroll.duration / b.scroll.items * c : 10 > e && (e = d / e), 1 > e ? 0 : ("fade" == a.fx && (e /= 2), Math.round(e))) } function nv_showNavi(a, b, c) { var d = is_number(a.items.minimum) ? a.items.minimum : a.items.visible + 1; if ("show" == b || "hide" == b) var e = b; else if (d > b) { debug(c, "Not enough items (" + b + " total, " + d + " needed): Hiding navigation."); var e = "hide" } else var e = "show"; var f = "show" == e ? "removeClass" : "addClass", g = cf_c("hidden", c); a.auto.button && a.auto.button[e]()[f](g), a.prev.button && a.prev.button[e]()[f](g), a.next.button && a.next.button[e]()[f](g), a.pagination.container && a.pagination.container[e]()[f](g) } function nv_enableNavi(a, b, c) { if (!a.circular && !a.infinite) { var d = "removeClass" == b || "addClass" == b ? b : !1, e = cf_c("disabled", c); if (a.auto.button && d && a.auto.button[d](e), a.prev.button) { var f = d || 0 == b ? "addClass" : "removeClass"; a.prev.button[f](e) } if (a.next.button) { var f = d || b == a.items.visible ? "addClass" : "removeClass"; a.next.button[f](e) } } } function go_getObject(a, b) { return is_function(b) ? b = b.call(a) : is_undefined(b) && (b = {}), b } function go_getItemsObject(a, b) { return b = go_getObject(a, b), is_number(b) ? b = { visible: b } : "variable" == b ? b = { visible: b, width: b, height: b } : is_object(b) || (b = {}), b } function go_getScrollObject(a, b) { return b = go_getObject(a, b), is_number(b) ? b = 50 >= b ? { items: b } : { duration: b } : is_string(b) ? b = { easing: b } : is_object(b) || (b = {}), b } function go_getNaviObject(a, b) { if (b = go_getObject(a, b), is_string(b)) { var c = cf_getKeyCode(b); b = -1 == c ? $(b) : c } return b } function go_getAutoObject(a, b) { return b = go_getNaviObject(a, b), is_jquery(b) ? b = { button: b } : is_boolean(b) ? b = { play: b } : is_number(b) && (b = { timeoutDuration: b }), b.progress && (is_string(b.progress) || is_jquery(b.progress)) && (b.progress = { bar: b.progress }), b } function go_complementAutoObject(a, b) { return is_function(b.button) && (b.button = b.button.call(a)), is_string(b.button) && (b.button = $(b.button)), is_boolean(b.play) || (b.play = !0), is_number(b.delay) || (b.delay = 0), is_undefined(b.pauseOnEvent) && (b.pauseOnEvent = !0), is_boolean(b.pauseOnResize) || (b.pauseOnResize = !0), is_number(b.timeoutDuration) || (b.timeoutDuration = 10 > b.duration ? 2500 : 5 * b.duration), b.progress && (is_function(b.progress.bar) && (b.progress.bar = b.progress.bar.call(a)), is_string(b.progress.bar) && (b.progress.bar = $(b.progress.bar)), b.progress.bar ? (is_function(b.progress.updater) || (b.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(b.progress.interval) || (b.progress.interval = 50)) : b.progress = !1), b } function go_getPrevNextObject(a, b) { return b = go_getNaviObject(a, b), is_jquery(b) ? b = { button: b } : is_number(b) && (b = { key: b }), b } function go_complementPrevNextObject(a, b) { return is_function(b.button) && (b.button = b.button.call(a)), is_string(b.button) && (b.button = $(b.button)), is_string(b.key) && (b.key = cf_getKeyCode(b.key)), b } function go_getPaginationObject(a, b) { return b = go_getNaviObject(a, b), is_jquery(b) ? b = { container: b } : is_boolean(b) && (b = { keys: b }), b } function go_complementPaginationObject(a, b) { return is_function(b.container) && (b.container = b.container.call(a)), is_string(b.container) && (b.container = $(b.container)), is_number(b.items) || (b.items = !1), is_boolean(b.keys) || (b.keys = !1), is_function(b.anchorBuilder) || is_false(b.anchorBuilder) || (b.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(b.deviation) || (b.deviation = 0), b } function go_getSwipeObject(a, b) { return is_function(b) && (b = b.call(a)), is_undefined(b) && (b = { onTouch: !1 }), is_true(b) ? b = { onTouch: b } : is_number(b) && (b = { items: b }), b } function go_complementSwipeObject(a, b) { return is_boolean(b.onTouch) || (b.onTouch = !0), is_boolean(b.onMouse) || (b.onMouse = !1), is_object(b.options) || (b.options = {}), is_boolean(b.options.triggerOnTouchEnd) || (b.options.triggerOnTouchEnd = !1), b } function go_getMousewheelObject(a, b) { return is_function(b) && (b = b.call(a)), is_true(b) ? b = {} : is_number(b) ? b = { items: b } : is_undefined(b) && (b = !1), b } function go_complementMousewheelObject(a, b) { return b } function gn_getItemIndex(a, b, c, d, e) { if (is_string(a) && (a = $(a, e)), is_object(a) && (a = $(a, e)), is_jquery(a) ? (a = e.children().index(a), is_boolean(c) || (c = !1)) : is_boolean(c) || (c = !0), is_number(a) || (a = 0), is_number(b) || (b = 0), c && (a += d.first), a += b, d.total > 0) { for (; a >= d.total;) a -= d.total; for (; 0 > a;) a += d.total } return a } function gn_getVisibleItemsPrev(a, b, c) { for (var d = 0, e = 0, f = c; f >= 0; f--) { var g = a.eq(f); if (d += g.is(":visible") ? g[b.d.outerWidth](!0) : 0, d > b.maxDimension) return e; 0 == f && (f = a.length), e++ } } function gn_getVisibleItemsPrevFilter(a, b, c) { return gn_getItemsPrevFilter(a, b.items.filter, b.items.visibleConf.org, c) } function gn_getScrollItemsPrevFilter(a, b, c, d) { return gn_getItemsPrevFilter(a, b.items.filter, d, c) } function gn_getItemsPrevFilter(a, b, c, d) { for (var e = 0, f = 0, g = d, h = a.length; g >= 0; g--) { if (f++, f == h) return f; var i = a.eq(g); if (i.is(b) && (e++, e == c)) return f; 0 == g && (g = h) } } function gn_getVisibleOrg(a, b) { return b.items.visibleConf.org || a.children().slice(0, b.items.visible).filter(b.items.filter).length } function gn_getVisibleItemsNext(a, b, c) { for (var d = 0, e = 0, f = c, g = a.length - 1; g >= f; f++) { var h = a.eq(f); if (d += h.is(":visible") ? h[b.d.outerWidth](!0) : 0, d > b.maxDimension) return e; if (e++, e == g + 1) return e; f == g && (f = -1) } } function gn_getVisibleItemsNextTestCircular(a, b, c, d) { var e = gn_getVisibleItemsNext(a, b, c); return b.circular || c + e > d && (e = d - c), e } function gn_getVisibleItemsNextFilter(a, b, c) { return gn_getItemsNextFilter(a, b.items.filter, b.items.visibleConf.org, c, b.circular) } function gn_getScrollItemsNextFilter(a, b, c, d) { return gn_getItemsNextFilter(a, b.items.filter, d + 1, c, b.circular) - 1 } function gn_getItemsNextFilter(a, b, c, d) { for (var f = 0, g = 0, h = d, i = a.length - 1; i >= h; h++) { if (g++, g >= i) return g; var j = a.eq(h); if (j.is(b) && (f++, f == c)) return g; h == i && (h = -1) } } function gi_getCurrentItems(a, b) { return a.slice(0, b.items.visible) } function gi_getOldItemsPrev(a, b, c) { return a.slice(c, b.items.visibleConf.old + c) } function gi_getNewItemsPrev(a, b) { return a.slice(0, b.items.visible) } function gi_getOldItemsNext(a, b) { return a.slice(0, b.items.visibleConf.old) } function gi_getNewItemsNext(a, b, c) { return a.slice(c, b.items.visible + c) } function sz_storeMargin(a, b, c) { b.usePadding && (is_string(c) || (c = "_cfs_origCssMargin"), a.each(function () { var a = $(this), d = parseInt(a.css(b.d.marginRight), 10); is_number(d) || (d = 0), a.data(c, d) })) } function sz_resetMargin(a, b, c) { if (b.usePadding) { var d = is_boolean(c) ? c : !1; is_number(c) || (c = 0), sz_storeMargin(a, b, "_cfs_tempCssMargin"), a.each(function () { var a = $(this); a.css(b.d.marginRight, d ? a.data("_cfs_tempCssMargin") : c + a.data("_cfs_origCssMargin")) }) } } function sz_storeOrigCss(a) { a.each(function () { var a = $(this); a.data("_cfs_origCss", a.attr("style") || "") }) } function sz_restoreOrigCss(a) { a.each(function () { var a = $(this); a.attr("style", a.data("_cfs_origCss") || "") }) } function sz_setResponsiveSizes(a, b) { var d = (a.items.visible, a.items[a.d.width]), e = a[a.d.height], f = is_percentage(e); b.each(function () { var b = $(this), c = d - ms_getPaddingBorderMargin(b, a, "Width"); b[a.d.width](c), f && b[a.d.height](ms_getPercentage(c, e)) }) } function sz_setSizes(a, b) { var c = a.parent(), d = a.children(), e = gi_getCurrentItems(d, b), f = cf_mapWrapperSizes(ms_getSizes(e, b, !0), b, !1); if (c.css(f), b.usePadding) { var g = b.padding, h = g[b.d[1]]; b.align && 0 > h && (h = 0); var i = e.last(); i.css(b.d.marginRight, i.data("_cfs_origCssMargin") + h), a.css(b.d.top, g[b.d[0]]), a.css(b.d.left, g[b.d[3]]) } return a.css(b.d.width, f[b.d.width] + 2 * ms_getTotalSize(d, b, "width")), a.css(b.d.height, ms_getLargestSize(d, b, "height")), f } function ms_getSizes(a, b, c) { return [ms_getTotalSize(a, b, "width", c), ms_getLargestSize(a, b, "height", c)] } function ms_getLargestSize(a, b, c, d) { return is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d ? b[b.d[c]] : is_number(b.items[b.d[c]]) ? b.items[b.d[c]] : (c = c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", ms_getTrueLargestSize(a, b, c)) } function ms_getTrueLargestSize(a, b, c) { for (var d = 0, e = 0, f = a.length; f > e; e++) { var g = a.eq(e), h = g.is(":visible") ? g[b.d[c]](!0) : 0; h > d && (d = h) } return d } function ms_getTotalSize(a, b, c, d) { if (is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d) return b[b.d[c]]; if (is_number(b.items[b.d[c]])) return b.items[b.d[c]] * a.length; for (var e = c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", f = 0, g = 0, h = a.length; h > g; g++) { var i = a.eq(g); f += i.is(":visible") ? i[b.d[e]](!0) : 0 } return f } function ms_getParentSize(a, b, c) { var d = a.is(":visible"); d && a.hide(); var e = a.parent()[b.d[c]](); return d && a.show(), e } function ms_getMaxDimension(a, b) { return is_number(a[a.d.width]) ? a[a.d.width] : b } function ms_hasVariableSizes(a, b, c) { for (var d = !1, e = !1, f = 0, g = a.length; g > f; f++) { var h = a.eq(f), i = h.is(":visible") ? h[b.d[c]](!0) : 0; d === !1 ? d = i : d != i && (e = !0), 0 == d && (e = !0) } return e } function ms_getPaddingBorderMargin(a, b, c) { return a[b.d["outer" + c]](!0) - a[b.d[c.toLowerCase()]]() } function ms_getPercentage(a, b) { if (is_percentage(b)) { if (b = parseInt(b.slice(0, -1), 10), !is_number(b)) return a; a *= b / 100 } return a } function cf_e(a, b, c, d, e) { return is_boolean(c) || (c = !0), is_boolean(d) || (d = !0), is_boolean(e) || (e = !1), c && (a = b.events.prefix + a), d && (a = a + "." + b.events.namespace), d && e && (a += b.serialNumber), a } function cf_c(a, b) { return is_string(b.classnames[a]) ? b.classnames[a] : a } function cf_mapWrapperSizes(a, b, c) { is_boolean(c) || (c = !0); var d = b.usePadding && c ? b.padding : [0, 0, 0, 0], e = {}; return e[b.d.width] = a[0] + d[1] + d[3], e[b.d.height] = a[1] + d[0] + d[2], e } function cf_sortParams(a, b) { for (var c = [], d = 0, e = a.length; e > d; d++) for (var f = 0, g = b.length; g > f; f++) if (b[f].indexOf(typeof a[d]) > -1 && is_undefined(c[f])) { c[f] = a[d]; break } return c } function cf_getPadding(a) { if (is_undefined(a)) return [0, 0, 0, 0]; if (is_number(a)) return [a, a, a, a]; if (is_string(a) && (a = a.split("px").join("").split("em").join("").split(" ")), !is_array(a)) return [0, 0, 0, 0]; for (var b = 0; 4 > b; b++) a[b] = parseInt(a[b], 10); switch (a.length) { case 0: return [0, 0, 0, 0]; case 1: return [a[0], a[0], a[0], a[0]]; case 2: return [a[0], a[1], a[0], a[1]]; case 3: return [a[0], a[1], a[2], a[1]]; default: return [a[0], a[1], a[2], a[3]] } } function cf_getAlignPadding(a, b) { var c = is_number(b[b.d.width]) ? Math.ceil(b[b.d.width] - ms_getTotalSize(a, b, "width")) : 0; switch (b.align) { case "left": return [0, c]; case "right": return [c, 0]; case "center": default: return [Math.ceil(c / 2), Math.floor(c / 2)] } } function cf_getDimensions(a) { for (var b = [["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3], ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]], c = b[0].length, d = "right" == a.direction || "left" == a.direction ? 0 : 1, e = {}, f = 0; c > f; f++) e[b[0][f]] = b[d][f]; return e } function cf_getAdjust(a, b, c, d) { var e = a; if (is_function(c)) e = c.call(d, e); else if (is_string(c)) { var f = c.split("+"), g = c.split("-"); if (g.length > f.length) var h = !0, i = g[0], j = g[1]; else var h = !1, i = f[0], j = f[1]; switch (i) { case "even": e = 1 == a % 2 ? a - 1 : a; break; case "odd": e = 0 == a % 2 ? a - 1 : a; break; default: e = a } j = parseInt(j, 10), is_number(j) && (h && (j = -j), e += j) } return (!is_number(e) || 1 > e) && (e = 1), e } function cf_getItemsAdjust(a, b, c, d) { return cf_getItemAdjustMinMax(cf_getAdjust(a, b, c, d), b.items.visibleConf) } function cf_getItemAdjustMinMax(a, b) { return is_number(b.min) && b.min > a && (a = b.min), is_number(b.max) && a > b.max && (a = b.max), 1 > a && (a = 1), a } function cf_getSynchArr(a) { is_array(a) || (a = [[a]]), is_array(a[0]) || (a = [a]); for (var b = 0, c = a.length; c > b; b++) is_string(a[b][0]) && (a[b][0] = $(a[b][0])), is_boolean(a[b][1]) || (a[b][1] = !0), is_boolean(a[b][2]) || (a[b][2] = !0), is_number(a[b][3]) || (a[b][3] = 0); return a } function cf_getKeyCode(a) { return "right" == a ? 39 : "left" == a ? 37 : "up" == a ? 38 : "down" == a ? 40 : -1 } function cf_setCookie(a, b, c) { if (a) { var d = b.triggerHandler(cf_e("currentPosition", c)); $.fn.carouFredSel.cookie.set(a, d) } } function cf_getCookie(a) { var b = $.fn.carouFredSel.cookie.get(a); return "" == b ? 0 : b } function in_mapCss(a, b) { for (var c = {}, d = 0, e = b.length; e > d; d++) c[b[d]] = a.css(b[d]); return c } function in_complementItems(a, b, c, d) { return is_object(a.visibleConf) || (a.visibleConf = {}), is_object(a.sizesConf) || (a.sizesConf = {}), 0 == a.start && is_number(d) && (a.start = d), is_object(a.visible) ? (a.visibleConf.min = a.visible.min, a.visibleConf.max = a.visible.max, a.visible = !1) : is_string(a.visible) ? ("variable" == a.visible ? a.visibleConf.variable = !0 : a.visibleConf.adjust = a.visible, a.visible = !1) : is_function(a.visible) && (a.visibleConf.adjust = a.visible, a.visible = !1), is_string(a.filter) || (a.filter = c.filter(":hidden").length > 0 ? ":visible" : "*"), a[b.d.width] || (b.responsive ? (debug(!0, "Set a " + b.d.width + " for the items!"), a[b.d.width] = ms_getTrueLargestSize(c, b, "outerWidth")) : a[b.d.width] = ms_hasVariableSizes(c, b, "outerWidth") ? "variable" : c[b.d.outerWidth](!0)), a[b.d.height] || (a[b.d.height] = ms_hasVariableSizes(c, b, "outerHeight") ? "variable" : c[b.d.outerHeight](!0)), a.sizesConf.width = a.width, a.sizesConf.height = a.height, a } function in_complementVisibleItems(a, b) { return "variable" == a.items[a.d.width] && (a.items.visibleConf.variable = !0), a.items.visibleConf.variable || (is_number(a[a.d.width]) ? a.items.visible = Math.floor(a[a.d.width] / a.items[a.d.width]) : (a.items.visible = Math.floor(b / a.items[a.d.width]), a[a.d.width] = a.items.visible * a.items[a.d.width], a.items.visibleConf.adjust || (a.align = !1)), ("Infinity" == a.items.visible || 1 > a.items.visible) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), a.items.visibleConf.variable = !0)), a } function in_complementPrimarySize(a, b, c) { return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerWidth")), a } function in_complementSecondarySize(a, b, c) { return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerHeight")), a || (a = b.items[b.d.height]), a } function in_getAlignPadding(a, b) { var c = cf_getAlignPadding(gi_getCurrentItems(b, a), a); return a.padding[a.d[1]] = c[1], a.padding[a.d[3]] = c[0], a } function in_getResponsiveValues(a, b) { var d = cf_getItemAdjustMinMax(Math.ceil(a[a.d.width] / a.items[a.d.width]), a.items.visibleConf); d > b.length && (d = b.length); var e = Math.floor(a[a.d.width] / d); return a.items.visible = d, a.items[a.d.width] = e, a[a.d.width] = d * e, a } function bt_pauseOnHoverConfig(a) { if (is_string(a)) var b = a.indexOf("immediate") > -1 ? !0 : !1, c = a.indexOf("resume") > -1 ? !0 : !1; else var b = c = !1; return [b, c] } function bt_mousesheelNumber(a) { return is_number(a) ? a : null } function is_null(a) { return null === a } function is_undefined(a) { return is_null(a) || a === void 0 || "" === a || "undefined" === a } function is_array(a) { return a instanceof Array } function is_jquery(a) { return a instanceof jQuery } function is_object(a) { return (a instanceof Object || "object" == typeof a) && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a) } function is_number(a) { return (a instanceof Number || "number" == typeof a) && !isNaN(a) } function is_string(a) { return (a instanceof String || "string" == typeof a) && !is_undefined(a) && !is_true(a) && !is_false(a) } function is_function(a) { return a instanceof Function || "function" == typeof a } function is_boolean(a) { return a instanceof Boolean || "boolean" == typeof a || is_true(a) || is_false(a) } function is_true(a) { return a === !0 || "true" === a } function is_false(a) { return a === !1 || "false" === a } function is_percentage(a) { return is_string(a) && "%" == a.slice(-1) } function getTime() { return (new Date).getTime() } function deprecated(a, b) { debug(!0, a + " is DEPRECATED, support for it will be removed. Use " + b + " instead.") } function debug(a, b) { if (!is_undefined(window.console) && !is_undefined(window.console.log)) { if (is_object(a)) { var c = " (" + a.selector + ")"; a = a.debug } else var c = ""; if (!a) return !1; b = is_string(b) ? "carouFredSel" + c + ": " + b : ["carouFredSel" + c + ":", b], window.console.log(b) } return !1 } $.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function (options, configs) {
		if (0 == this.length) return debug(!0, 'No element found for "' + this.selector + '".'), this; if (this.length > 1) return this.each(function () { $(this).carouFredSel(options, configs) }); var $cfs = this, $tt0 = this[0], starting_position = !1; $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0])); var FN = {}; FN._init = function (a, b, c) { a = go_getObject($tt0, a), a.items = go_getItemsObject($tt0, a.items), a.scroll = go_getScrollObject($tt0, a.scroll), a.auto = go_getAutoObject($tt0, a.auto), a.prev = go_getPrevNextObject($tt0, a.prev), a.next = go_getPrevNextObject($tt0, a.next), a.pagination = go_getPaginationObject($tt0, a.pagination), a.swipe = go_getSwipeObject($tt0, a.swipe), a.mousewheel = go_getMousewheelObject($tt0, a.mousewheel), b && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, a)), opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, a), opts.d = cf_getDimensions(opts), crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next" : "prev"; var d = $cfs.children(), e = ms_getParentSize($wrp, opts, "width"); if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, e), opts.items = in_complementItems(opts.items, opts, d, c), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, d), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, d), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(e, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, e)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = is_number(opts[opts.d.width]) ? "center" : !1), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(d, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(d, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible), opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, d, e); else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left" : "bottom" == opts.align && (opts.align = "right"), opts.align) { case "center": case "left": case "right": "variable" != opts[opts.d.width] && (opts = in_getAlignPadding(opts, d), opts.usePadding = !0); break; default: opts.align = !1, opts.usePadding = 0 == opts.padding[0] && 0 == opts.padding[1] && 0 == opts.padding[2] && 0 == opts.padding[3] ? !1 : !0 } is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration")) }, FN._build = function () { $cfs.data("_cfs_isCarousel", !0); var a = $cfs.children(), b = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]), c = "relative"; switch (b.position) { case "absolute": case "fixed": c = b.position } "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(b), $wrp.css({ overflow: "hidden", position: c }), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", b.zIndex), $cfs.css({ textAlign: "left", "float": "none", position: "absolute", top: 0, right: "auto", bottom: "auto", left: 0, marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 }), sz_storeMargin(a, opts), sz_storeOrigCss(a), opts.responsive && sz_setResponsiveSizes(opts, a) }, FN._bind_events = function () {
			FN._unbind_events(), $cfs.bind(cf_e("stop", conf), function (a, b) { return a.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), b)), !0 }), $cfs.bind(cf_e("finish", conf), function (a) { return a.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0 }), $cfs.bind(cf_e("pause", conf), function (a, b, c) { if (a.stopPropagation(), tmrs = sc_clearTimers(tmrs), b && crsl.isScrolling) { scrl.isStopped = !0; var d = getTime() - scrl.startTime; scrl.duration -= d, scrl.pre && (scrl.pre.duration -= d), scrl.post && (scrl.post.duration -= d), sc_stopScroll(scrl, !1) } if (crsl.isPaused || crsl.isScrolling || c && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) { var e = opts.auto.timeoutDuration - tmrs.timePassed, f = 100 - Math.ceil(100 * e / opts.auto.timeoutDuration); opts.auto.onTimeoutPause.call($tt0, f, e) } return !0 }), $cfs.bind(cf_e("play", conf), function (a, b, c, d) { a.stopPropagation(), tmrs = sc_clearTimers(tmrs); var e = [b, c, d], f = ["string", "number", "boolean"], g = cf_sortParams(e, f); if (b = g[0], c = g[1], d = g[2], "prev" != b && "next" != b && (b = crsl.direction), is_number(c) || (c = 0), is_boolean(d) || (d = !1), d && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play) return a.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling."); crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime(); var h = opts.auto.timeoutDuration + c; return dur2 = h - tmrs.timePassed, perc = 100 - Math.ceil(100 * dur2 / h), opts.auto.progress && (tmrs.progress = setInterval(function () { var a = getTime() - tmrs.startTime + tmrs.timePassed, b = Math.ceil(100 * a / h); opts.auto.progress.updater.call(opts.auto.progress.bar[0], b) }, opts.auto.progress.interval)), tmrs.auto = setTimeout(function () { opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), b) : $cfs.trigger(cf_e(b, conf), opts.auto) }, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0 }), $cfs.bind(cf_e("resume", conf), function (a) { return a.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0 }), $cfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf), function (a, b, c, d, e) { if (a.stopPropagation(), crsl.isStopped || $cfs.is(":hidden")) return a.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling."); var f = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1; if (f > itms.total) return a.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + f + " needed): Not scrolling."); var g = [b, c, d, e], h = ["object", "number/string", "function", "boolean"], i = cf_sortParams(g, h); b = i[0], c = i[1], d = i[2], e = i[3]; var j = a.type.slice(conf.events.prefix.length); if (is_object(b) || (b = {}), is_function(d) && (b.onAfter = d), is_boolean(e) && (b.queue = e), b = $.extend(!0, {}, opts[j], b), b.conditions && !b.conditions.call($tt0, j)) return a.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.'); if (!is_number(c)) { if ("*" != opts.items.filter) c = "visible"; else for (var k = [c, b.items, opts[j].items], i = 0, l = k.length; l > i; i++) if (is_number(k[i]) || "page" == k[i] || "visible" == k[i]) { c = k[i]; break } switch (c) { case "page": return a.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(j + "Page", conf), [b, d]); case "visible": opts.items.visibleConf.variable || "*" != opts.items.filter || (c = opts.items.visible) } } if (scrl.isStopped) return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]]), a.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling."); if (b.duration > 0 && crsl.isScrolling) return b.queue && ("last" == b.queue && (queu = []), ("first" != b.queue || 0 == queu.length) && $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]])), a.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling."); if (tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + j, conf), [b, c]), opts.synchronise) for (var m = opts.synchronise, n = [b, c], o = 0, l = m.length; l > o; o++) { var p = j; m[o][2] || (p = "prev" == p ? "next" : "prev"), m[o][1] || (n[0] = m[o][0].triggerHandler("_cfs_triggerEvent", ["configuration", p])), n[1] = c + m[o][3], m[o][0].trigger("_cfs_triggerEvent", ["slide_" + p, n]) } return !0 }), $cfs.bind(cf_e("slide_prev", conf), function (a, b, c) {
				a.stopPropagation(); var d = $cfs.children(); if (!opts.circular && 0 == itms.first) return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), a.stopImmediatePropagation(); if (sz_resetMargin(d, opts), !is_number(c)) { if (opts.items.visibleConf.variable) c = gn_getVisibleItemsPrev(d, opts, itms.total - 1); else if ("*" != opts.items.filter) { var e = is_number(b.items) ? b.items : gn_getVisibleOrg($cfs, opts); c = gn_getScrollItemsPrevFilter(d, opts, itms.total - 1, e) } else c = opts.items.visible; c = cf_getAdjust(c, opts, b.items, $tt0) } if (opts.circular || itms.total - c < itms.first && (c = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) { var f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0); f >= opts.items.visible + c && itms.total > c && (c++, f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = f } else if ("*" != opts.items.filter) { var f = gn_getVisibleItemsNextFilter(d, opts, itms.total - c); opts.items.visible = cf_getItemsAdjust(f, opts, opts.items.visibleConf.adjust, $tt0) } if (sz_resetMargin(d, opts, !0), 0 == c) return a.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling."); for (debug(conf, "Scrolling " + c + " items backward."), itms.first += c; itms.first >= itms.total;) itms.first -= itms.total; opts.circular || (0 == itms.first && b.onEnd && b.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - c, itms.total).prependTo($cfs), itms.total < opts.items.visible + c && $cfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo($cfs); var d = $cfs.children(), g = gi_getOldItemsPrev(d, opts, c), h = gi_getNewItemsPrev(d, opts), i = d.eq(c - 1), j = g.last(), k = h.last(); sz_resetMargin(d, opts); var l = 0, m = 0; if (opts.align) { var n = cf_getAlignPadding(h, opts); l = n[0], m = n[1] } var o = 0 > l ? opts.padding[opts.d[3]] : 0, p = !1, q = $(); if (c > opts.items.visible && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) { var r = opts.items[opts.d.width]; p = q, i = k, sc_hideHiddenItems(p), opts.items[opts.d.width] = "variable" } var s = !1, t = ms_getTotalSize(d.slice(0, c), opts, "width"), u = cf_mapWrapperSizes(ms_getSizes(h, opts, !0), opts, !opts.usePadding), v = 0, w = {}, x = {}, y = {}, z = {}, A = {}, B = {}, C = {}, D = sc_getDuration(b, opts, c, t); switch (b.fx) { case "cover": case "cover-fade": v = ms_getTotalSize(d.slice(0, opts.items.visible), opts, "width") } p && (opts.items[opts.d.width] = r), sz_resetMargin(d, opts, !0), m >= 0 && sz_resetMargin(j, opts, opts.padding[opts.d[1]]), l >= 0 && sz_resetMargin(i, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = m, opts.padding[opts.d[3]] = l), B[opts.d.left] = -(t - o), C[opts.d.left] = -(v - o), x[opts.d.left] = u[opts.d.width]; var E = function () { }, F = function () { }, G = function () { }, H = function () { }, I = function () { }, J = function () { }, K = function () { }, L = function () { }, M = function () { }, N = function () { }, O = function () { }; switch (b.fx) { case "crossfade": case "cover": case "cover-fade": case "uncover": case "uncover-fade": s = $cfs.clone(!0).appendTo($wrp) } switch (b.fx) { case "crossfade": case "uncover": case "uncover-fade": s.children().slice(0, c).remove(), s.children().slice(opts.items.visibleConf.old).remove(); break; case "cover": case "cover-fade": s.children().slice(opts.items.visible).remove(), s.css(C) } if ($cfs.css(B), scrl = sc_setScroll(D, b.easing, conf), w[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (E = function () { $wrp.css(u) }, F = function () { scrl.anims.push([$wrp, u]) }), opts.usePadding) { switch (k.not(i).length && (y[opts.d.marginRight] = i.data("_cfs_origCssMargin"), 0 > l ? i.css(y) : (K = function () { i.css(y) }, L = function () { scrl.anims.push([i, y]) })), b.fx) { case "cover": case "cover-fade": s.children().eq(c - 1).css(y) } k.not(j).length && (z[opts.d.marginRight] = j.data("_cfs_origCssMargin"), G = function () { j.css(z) }, H = function () { scrl.anims.push([j, z]) }), m >= 0 && (A[opts.d.marginRight] = k.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], I = function () { k.css(A) }, J = function () { scrl.anims.push([k, A]) }) } O = function () { $cfs.css(w) }; var P = opts.items.visible + c - itms.total; N = function () { if (P > 0 && ($cfs.children().slice(itms.total).remove(), g = $($cfs.children().slice(itms.total - (opts.items.visible - P)).get().concat($cfs.children().slice(0, P).get()))), sc_showHiddenItems(p), opts.usePadding) { var a = $cfs.children().eq(opts.items.visible + c - 1); a.css(opts.d.marginRight, a.data("_cfs_origCssMargin")) } }; var Q = sc_mapCallbackArguments(g, q, h, c, "prev", D, u); switch (M = function () { sc_afterScroll($cfs, s, b), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, b, "onAfter", Q, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf)) }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, b, "onBefore", Q, clbk), b.fx) { case "none": $cfs.css(w), E(), G(), I(), K(), O(), N(), M(); break; case "fade": scrl.anims.push([$cfs, { opacity: 0 }, function () { E(), G(), I(), K(), O(), N(), scrl = sc_setScroll(D, b.easing, conf), scrl.anims.push([$cfs, { opacity: 1 }, M]), sc_startScroll(scrl, conf) }]); break; case "crossfade": $cfs.css({ opacity: 0 }), scrl.anims.push([s, { opacity: 0 }]), scrl.anims.push([$cfs, { opacity: 1 }, M]), F(), G(), I(), K(), O(), N(); break; case "cover": scrl.anims.push([s, w, function () { G(), I(), K(), O(), N(), M() }]), F(); break; case "cover-fade": scrl.anims.push([$cfs, { opacity: 0 }]), scrl.anims.push([s, w, function () { G(), I(), K(), O(), N(), M() }]), F(); break; case "uncover": scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N(); break; case "uncover-fade": $cfs.css({ opacity: 0 }), scrl.anims.push([$cfs, { opacity: 1 }]), scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N(); break; default: scrl.anims.push([$cfs, w, function () { N(), M() }]), F(), H(), J(), L() } return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]), !0
			}), $cfs.bind(cf_e("slide_next", conf), function (a, b, c) { a.stopPropagation(); var d = $cfs.children(); if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), a.stopImmediatePropagation(); if (sz_resetMargin(d, opts), !is_number(c)) { if ("*" != opts.items.filter) { var e = is_number(b.items) ? b.items : gn_getVisibleOrg($cfs, opts); c = gn_getScrollItemsNextFilter(d, opts, 0, e) } else c = opts.items.visible; c = cf_getAdjust(c, opts, b.items, $tt0) } var f = 0 == itms.first ? itms.total : itms.first; if (!opts.circular) { if (opts.items.visibleConf.variable) var g = gn_getVisibleItemsNext(d, opts, c), e = gn_getVisibleItemsPrev(d, opts, f - 1); else var g = opts.items.visible, e = opts.items.visible; c + g > f && (c = f - e) } if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) { for (var g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, $tt0) ; opts.items.visible - c >= g && itms.total > c;) c++, g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, $tt0); opts.items.visible = g } else if ("*" != opts.items.filter) { var g = gn_getVisibleItemsNextFilter(d, opts, c); opts.items.visible = cf_getItemsAdjust(g, opts, opts.items.visibleConf.adjust, $tt0) } if (sz_resetMargin(d, opts, !0), 0 == c) return a.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling."); for (debug(conf, "Scrolling " + c + " items forward."), itms.first -= c; 0 > itms.first;) itms.first += itms.total; opts.circular || (itms.first == opts.items.visible && b.onEnd && b.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + c && $cfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo($cfs); var d = $cfs.children(), h = gi_getOldItemsNext(d, opts), i = gi_getNewItemsNext(d, opts, c), j = d.eq(c - 1), k = h.last(), l = i.last(); sz_resetMargin(d, opts); var m = 0, n = 0; if (opts.align) { var o = cf_getAlignPadding(i, opts); m = o[0], n = o[1] } var p = !1, q = $(); if (c > opts.items.visibleConf.old && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) { var r = opts.items[opts.d.width]; p = q, j = k, sc_hideHiddenItems(p), opts.items[opts.d.width] = "variable" } var s = !1, t = ms_getTotalSize(d.slice(0, c), opts, "width"), u = cf_mapWrapperSizes(ms_getSizes(i, opts, !0), opts, !opts.usePadding), v = 0, w = {}, x = {}, y = {}, z = {}, A = {}, B = sc_getDuration(b, opts, c, t); switch (b.fx) { case "uncover": case "uncover-fade": v = ms_getTotalSize(d.slice(0, opts.items.visibleConf.old), opts, "width") } p && (opts.items[opts.d.width] = r), opts.align && 0 > opts.padding[opts.d[1]] && (opts.padding[opts.d[1]] = 0), sz_resetMargin(d, opts, !0), sz_resetMargin(k, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = n, opts.padding[opts.d[3]] = m), A[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0; var C = function () { }, D = function () { }, E = function () { }, F = function () { }, G = function () { }, H = function () { }, I = function () { }, J = function () { }, K = function () { }; switch (b.fx) { case "crossfade": case "cover": case "cover-fade": case "uncover": case "uncover-fade": s = $cfs.clone(!0).appendTo($wrp), s.children().slice(opts.items.visibleConf.old).remove() } switch (b.fx) { case "crossfade": case "cover": case "cover-fade": $cfs.css("zIndex", 1), s.css("zIndex", 0) } if (scrl = sc_setScroll(B, b.easing, conf), w[opts.d.left] = -t, x[opts.d.left] = -v, 0 > m && (w[opts.d.left] += m), ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (C = function () { $wrp.css(u) }, D = function () { scrl.anims.push([$wrp, u]) }), opts.usePadding) { var L = l.data("_cfs_origCssMargin"); n >= 0 && (L += opts.padding[opts.d[1]]), l.css(opts.d.marginRight, L), j.not(k).length && (z[opts.d.marginRight] = k.data("_cfs_origCssMargin")), E = function () { k.css(z) }, F = function () { scrl.anims.push([k, z]) }; var M = j.data("_cfs_origCssMargin"); m > 0 && (M += opts.padding[opts.d[3]]), y[opts.d.marginRight] = M, G = function () { j.css(y) }, H = function () { scrl.anims.push([j, y]) } } K = function () { $cfs.css(A) }; var N = opts.items.visible + c - itms.total; J = function () { N > 0 && $cfs.children().slice(itms.total).remove(); var a = $cfs.children().slice(0, c).appendTo($cfs).last(); if (N > 0 && (i = gi_getCurrentItems(d, opts)), sc_showHiddenItems(p), opts.usePadding) { if (itms.total < opts.items.visible + c) { var b = $cfs.children().eq(opts.items.visible - 1); b.css(opts.d.marginRight, b.data("_cfs_origCssMargin") + opts.padding[opts.d[1]]) } a.css(opts.d.marginRight, a.data("_cfs_origCssMargin")) } }; var O = sc_mapCallbackArguments(h, q, i, c, "next", B, u); switch (I = function () { $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, s, b), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, b, "onAfter", O, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf)) }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, b, "onBefore", O, clbk), b.fx) { case "none": $cfs.css(w), C(), E(), G(), K(), J(), I(); break; case "fade": scrl.anims.push([$cfs, { opacity: 0 }, function () { C(), E(), G(), K(), J(), scrl = sc_setScroll(B, b.easing, conf), scrl.anims.push([$cfs, { opacity: 1 }, I]), sc_startScroll(scrl, conf) }]); break; case "crossfade": $cfs.css({ opacity: 0 }), scrl.anims.push([s, { opacity: 0 }]), scrl.anims.push([$cfs, { opacity: 1 }, I]), D(), E(), G(), K(), J(); break; case "cover": $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, A, I]), D(), E(), G(), J(); break; case "cover-fade": $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([s, { opacity: 0 }]), scrl.anims.push([$cfs, A, I]), D(), E(), G(), J(); break; case "uncover": scrl.anims.push([s, x, I]), D(), E(), G(), K(), J(); break; case "uncover-fade": $cfs.css({ opacity: 0 }), scrl.anims.push([$cfs, { opacity: 1 }]), scrl.anims.push([s, x, I]), D(), E(), G(), K(), J(); break; default: scrl.anims.push([$cfs, w, function () { K(), J(), I() }]), D(), F(), H() } return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]), !0 }), $cfs.bind(cf_e("slideTo", conf), function (a, b, c, d, e, f, g) { a.stopPropagation(); var h = [b, c, d, e, f, g], i = ["string/number/object", "number", "boolean", "object", "string", "function"], j = cf_sortParams(h, i); return e = j[3], f = j[4], g = j[5], b = gn_getItemIndex(j[0], j[1], j[2], itms, $cfs), 0 == b ? !1 : (is_object(e) || (e = !1), "prev" != f && "next" != f && (f = opts.circular ? itms.total / 2 >= b ? "next" : "prev" : 0 == itms.first || itms.first > b ? "next" : "prev"), "prev" == f && (b = itms.total - b), $cfs.trigger(cf_e(f, conf), [e, b, g]), !0) }), $cfs.bind(cf_e("prevPage", conf), function (a, b, c) { a.stopPropagation(); var d = $cfs.triggerHandler(cf_e("currentPage", conf)); return $cfs.triggerHandler(cf_e("slideToPage", conf), [d - 1, b, "prev", c]) }), $cfs.bind(cf_e("nextPage", conf), function (a, b, c) { a.stopPropagation(); var d = $cfs.triggerHandler(cf_e("currentPage", conf)); return $cfs.triggerHandler(cf_e("slideToPage", conf), [d + 1, b, "next", c]) }), $cfs.bind(cf_e("slideToPage", conf), function (a, b, c, d, e) { a.stopPropagation(), is_number(b) || (b = $cfs.triggerHandler(cf_e("currentPage", conf))); var f = opts.pagination.items || opts.items.visible, g = Math.ceil(itms.total / f) - 1; return 0 > b && (b = g), b > g && (b = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [b * f, 0, !0, c, d, e]) }), $cfs.bind(cf_e("jumpToStart", conf), function (a, b) { if (a.stopPropagation(), b = b ? gn_getItemIndex(b, 0, !0, itms, $cfs) : 0, b += itms.first, 0 != b) { if (itms.total > 0) for (; b > itms.total;) b -= itms.total; $cfs.prepend($cfs.children().slice(b, itms.total)) } return !0 }), $cfs.bind(cf_e("synchronise", conf), function (a, b) { if (a.stopPropagation(), b) b = cf_getSynchArr(b); else { if (!opts.synchronise) return debug(conf, "No carousel to synchronise."); b = opts.synchronise } for (var c = $cfs.triggerHandler(cf_e("currentPosition", conf)), d = !0, e = 0, f = b.length; f > e; e++) b[e][0].triggerHandler(cf_e("slideTo", conf), [c, b[e][3], !0]) || (d = !1); return d }), $cfs.bind(cf_e("queue", conf), function (a, b, c) { return a.stopPropagation(), is_function(b) ? b.call($tt0, queu) : is_array(b) ? queu = b : is_undefined(b) || queu.push([b, c]), queu }), $cfs.bind(cf_e("insertItem", conf), function (a, b, c, d, e) { a.stopPropagation(); var f = [b, c, d, e], g = ["string/object", "string/number/object", "boolean", "number"], h = cf_sortParams(f, g); if (b = h[0], c = h[1], d = h[2], e = h[3], is_object(b) && !is_jquery(b) ? b = $(b) : is_string(b) && (b = $(b)), !is_jquery(b) || 0 == b.length) return debug(conf, "Not a valid object."); is_undefined(c) && (c = "end"), sz_storeMargin(b, opts), sz_storeOrigCss(b); var i = c, j = "before"; "end" == c ? d ? (0 == itms.first ? (c = itms.total - 1, j = "after") : (c = itms.first, itms.first += b.length), 0 > c && (c = 0)) : (c = itms.total - 1, j = "after") : c = gn_getItemIndex(c, e, d, itms, $cfs); var k = $cfs.children().eq(c); return k.length ? k[j](b) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(b)), "end" == i || d || itms.first > c && (itms.first += b.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0 }), $cfs.bind(cf_e("removeItem", conf), function (a, b, c, d) { a.stopPropagation(); var e = [b, c, d], f = ["string/number/object", "boolean", "number"], g = cf_sortParams(e, f); if (b = g[0], c = g[1], d = g[2], b instanceof $ && b.length > 1) return i = $(), b.each(function () { var e = $cfs.trigger(cf_e("removeItem", conf), [$(this), c, d]); e && (i = i.add(e)) }), i; if (is_undefined(b) || "end" == b) i = $cfs.children().last(); else { b = gn_getItemIndex(b, d, c, itms, $cfs); var i = $cfs.children().eq(b); i.length && itms.first > b && (itms.first -= i.length) } return i && i.length && (i.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), i }), $cfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function (a, b) { a.stopPropagation(); var c = a.type.slice(conf.events.prefix.length); return is_array(b) && (clbk[c] = b), is_function(b) && clbk[c].push(b), clbk[c] }), $cfs.bind(cf_e("currentPosition", conf), function (a, b) { if (a.stopPropagation(), 0 == itms.first) var c = 0; else var c = itms.total - itms.first; return is_function(b) && b.call($tt0, c), c }), $cfs.bind(cf_e("currentPage", conf), function (a, b) { a.stopPropagation(); var e, c = opts.pagination.items || opts.items.visible, d = Math.ceil(itms.total / c - 1); return e = 0 == itms.first ? 0 : itms.first < itms.total % c ? 0 : itms.first != c || opts.circular ? Math.round((itms.total - itms.first) / c) : d, 0 > e && (e = 0), e > d && (e = d), is_function(b) && b.call($tt0, e), e }), $cfs.bind(cf_e("currentVisible", conf), function (a, b) { a.stopPropagation(); var c = gi_getCurrentItems($cfs.children(), opts); return is_function(b) && b.call($tt0, c), c }), $cfs.bind(cf_e("slice", conf), function (a, b, c, d) { if (a.stopPropagation(), 0 == itms.total) return !1; var e = [b, c, d], f = ["number", "number", "function"], g = cf_sortParams(e, f); if (b = is_number(g[0]) ? g[0] : 0, c = is_number(g[1]) ? g[1] : itms.total, d = g[2], b += itms.first, c += itms.first, items.total > 0) { for (; b > itms.total;) b -= itms.total; for (; c > itms.total;) c -= itms.total; for (; 0 > b;) b += itms.total; for (; 0 > c;) c += itms.total } var i, h = $cfs.children(); return i = c > b ? h.slice(b, c) : $(h.slice(b, itms.total).get().concat(h.slice(0, c).get())), is_function(d) && d.call($tt0, i), i }), $cfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function (a, b) { a.stopPropagation(); var c = a.type.slice(conf.events.prefix.length), d = crsl[c]; return is_function(b) && b.call($tt0, d), d }), $cfs.bind(cf_e("configuration", conf), function (e, a, b, c) { e.stopPropagation(); var reInit = !1; if (is_function(a)) a.call($tt0, opts); else if (is_object(a)) opts_orig = $.extend(!0, {}, opts_orig, a), b !== !1 ? reInit = !0 : opts = $.extend(!0, {}, opts, a); else if (!is_undefined(a)) if (is_function(b)) { var val = eval("opts." + a); is_undefined(val) && (val = ""), b.call($tt0, val) } else { if (is_undefined(b)) return eval("opts." + a); "boolean" != typeof c && (c = !0), eval("opts_orig." + a + " = b"), c !== !1 ? reInit = !0 : eval("opts." + a + " = b") } if (reInit) { sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons(); var sz = sz_setSizes($cfs, opts); $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz]) } return opts }), $cfs.bind(cf_e("linkAnchors", conf), function (a, b, c) { return a.stopPropagation(), is_undefined(b) ? b = $("body") : is_string(b) && (b = $(b)), is_jquery(b) && 0 != b.length ? (is_string(c) || (c = "a.caroufredsel"), b.find(c).each(function () { var a = this.hash || ""; a.length > 0 && -1 != $cfs.children().index($(a)) && $(this).unbind("click").click(function (b) { b.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), a) }) }), !0) : debug(conf, "Not a valid object.") }), $cfs.bind(cf_e("updatePageStatus", conf), function (a, b) { if (a.stopPropagation(), opts.pagination.container) { var d = opts.pagination.items || opts.items.visible, e = Math.ceil(itms.total / d); b && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function () { for (var a = 0; e > a; a++) { var b = $cfs.children().eq(gn_getItemIndex(a * d, 0, !0, itms, $cfs)); $(this).append(opts.pagination.anchorBuilder.call(b[0], a + 1)) } })), opts.pagination.container.each(function () { $(this).children().unbind(opts.pagination.event).each(function (a) { $(this).bind(opts.pagination.event, function (b) { b.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [a * d, -opts.pagination.deviation, !0, opts.pagination]) }) }) })); var f = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation; return f >= e && (f = 0), 0 > f && (f = e - 1), opts.pagination.container.each(function () { $(this).children().removeClass(cf_c("selected", conf)).eq(f).addClass(cf_c("selected", conf)) }), !0 } }), $cfs.bind(cf_e("updateSizes", conf), function () { var b = opts.items.visible, c = $cfs.children(), d = ms_getParentSize($wrp, opts, "width"); if (itms.total = c.length, crsl.primarySizePercentage ? (opts.maxDimension = d, opts[opts.d.width] = ms_getPercentage(d, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, d), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, c, d), b = opts.items.visible, sz_setResponsiveSizes(opts, c)) : opts.items.visibleConf.variable ? b = gn_getVisibleItemsNext(c, opts, 0) : "*" != opts.items.filter && (b = gn_getVisibleItemsNextFilter(c, opts, 0)), !opts.circular && 0 != itms.first && b > itms.first) { if (opts.items.visibleConf.variable) var e = gn_getVisibleItemsPrev(c, opts, itms.first) - itms.first; else if ("*" != opts.items.filter) var e = gn_getVisibleItemsPrevFilter(c, opts, itms.first) - itms.first; else var e = opts.items.visible - itms.first; debug(conf, "Preventing non-circular: sliding " + e + " items backward."), $cfs.trigger(cf_e("prev", conf), e) } opts.items.visible = cf_getItemsAdjust(b, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, c); var f = sz_setSizes($cfs, opts); return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, f]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), f }), $cfs.bind(cf_e("destroy", conf), function (a, b) { return a.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), b && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), "parent" == conf.wrapper ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0 }), $cfs.bind(cf_e("debug", conf), function () { return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug }), $cfs.bind("_cfs_triggerEvent", function (a, b, c) { return a.stopPropagation(), $cfs.triggerHandler(cf_e(b, conf), c) })
		}, FN._unbind_events = function () { $cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("", conf, !1)), $cfs.unbind("_cfs_triggerEvent") }, FN._bind_buttons = function () { if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) { var a = bt_pauseOnHoverConfig(opts.auto.pauseOnHover); $wrp.bind(cf_e("mouseenter", conf, !1), function () { $cfs.trigger(cf_e("pause", conf), a) }).bind(cf_e("mouseleave", conf, !1), function () { $cfs.trigger(cf_e("resume", conf)) }) } if (opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1), function (a) { a.preventDefault(); var b = !1, c = null; crsl.isPaused ? b = "play" : opts.auto.pauseOnEvent && (b = "pause", c = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), b && $cfs.trigger(cf_e(b, conf), c) }), opts.prev.button && (opts.prev.button.bind(cf_e(opts.prev.event, conf, !1), function (a) { a.preventDefault(), $cfs.trigger(cf_e("prev", conf)) }), opts.prev.pauseOnHover)) { var a = bt_pauseOnHoverConfig(opts.prev.pauseOnHover); opts.prev.button.bind(cf_e("mouseenter", conf, !1), function () { $cfs.trigger(cf_e("pause", conf), a) }).bind(cf_e("mouseleave", conf, !1), function () { $cfs.trigger(cf_e("resume", conf)) }) } if (opts.next.button && (opts.next.button.bind(cf_e(opts.next.event, conf, !1), function (a) { a.preventDefault(), $cfs.trigger(cf_e("next", conf)) }), opts.next.pauseOnHover)) { var a = bt_pauseOnHoverConfig(opts.next.pauseOnHover); opts.next.button.bind(cf_e("mouseenter", conf, !1), function () { $cfs.trigger(cf_e("pause", conf), a) }).bind(cf_e("mouseleave", conf, !1), function () { $cfs.trigger(cf_e("resume", conf)) }) } if (opts.pagination.container && opts.pagination.pauseOnHover) { var a = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover); opts.pagination.container.bind(cf_e("mouseenter", conf, !1), function () { $cfs.trigger(cf_e("pause", conf), a) }).bind(cf_e("mouseleave", conf, !1), function () { $cfs.trigger(cf_e("resume", conf)) }) } if ((opts.prev.key || opts.next.key) && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function (a) { var b = a.keyCode; b == opts.next.key && (a.preventDefault(), $cfs.trigger(cf_e("next", conf))), b == opts.prev.key && (a.preventDefault(), $cfs.trigger(cf_e("prev", conf))) }), opts.pagination.keys && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function (a) { var b = a.keyCode; b >= 49 && 58 > b && (b = (b - 49) * opts.items.visible, itms.total >= b && (a.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [b, 0, !0, opts.pagination]))) }), $.fn.swipe) { var b = "ontouchstart" in window; if (b && opts.swipe.onTouch || !b && opts.swipe.onMouse) { var c = $.extend(!0, {}, opts.prev, opts.swipe), d = $.extend(!0, {}, opts.next, opts.swipe), e = function () { $cfs.trigger(cf_e("prev", conf), [c]) }, f = function () { $cfs.trigger(cf_e("next", conf), [d]) }; switch (opts.direction) { case "up": case "down": opts.swipe.options.swipeUp = f, opts.swipe.options.swipeDown = e; break; default: opts.swipe.options.swipeLeft = f, opts.swipe.options.swipeRight = e } crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), $wrp.css("cursor", "move"), crsl.swipe = !0 } } if ($.fn.mousewheel && opts.mousewheel) { var g = $.extend(!0, {}, opts.prev, opts.mousewheel), h = $.extend(!0, {}, opts.next, opts.mousewheel); crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)), $wrp.bind(cf_e("mousewheel", conf, !1), function (a, b) { a.preventDefault(), b > 0 ? $cfs.trigger(cf_e("prev", conf), [g]) : $cfs.trigger(cf_e("next", conf), [h]) }), crsl.mousewheel = !0 } if (opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) { var i = function () { $cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf)) }, j = $(window), k = null; if ($.debounce && "debounce" == conf.onWindowResize) k = $.debounce(200, i); else if ($.throttle && "throttle" == conf.onWindowResize) k = $.throttle(300, i); else { var l = 0, m = 0; k = function () { var a = j.width(), b = j.height(); (a != l || b != m) && (i(), l = a, m = b) } } j.bind(cf_e("resize", conf, !1, !0, !0), k) } }, FN._unbind_buttons = function () { var b = (cf_e("", conf), cf_e("", conf, !1)); ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(ns3), $(window).unbind(ns3), $wrp.unbind(b), opts.auto.button && opts.auto.button.unbind(b), opts.prev.button && opts.prev.button.unbind(b), opts.next.button && opts.next.button.unbind(b), opts.pagination.container && (opts.pagination.container.unbind(b), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css("cursor", "default"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf) }, is_boolean(configs) && (configs = { debug: configs }); var crsl = { direction: "next", isPaused: !0, isScrolling: !1, isStopped: !1, mousewheel: !1, swipe: !1 }, itms = { total: $cfs.children().length, first: 0 }, tmrs = { auto: null, progress: null, startTime: getTime(), timePassed: 0 }, scrl = { isStopped: !1, duration: 0, startTime: 0, easing: "", anims: [] }, clbk = { onBefore: [], onAfter: [] }, queu = [], conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs), opts = {}, opts_orig = $.extend(!0, {}, options), $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent(); if (conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start)) var start_arr = opts.items.start; else { var start_arr = []; 0 != opts.items.start && start_arr.push(opts.items.start) } if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0) for (var a = 0, l = start_arr.length; l > a; a++) { var s = start_arr[a]; if (0 != s) { if (s === !0) { if (s = window.location.hash, 1 > s.length) continue } else "random" === s && (s = Math.floor(Math.random() * itms.total)); if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, { fx: "none" }])) break } } var siz = sz_setSizes($cfs, opts), itm = gi_getCurrentItems($cfs.children(), opts); return opts.onCreate && opts.onCreate.call($tt0, { width: siz.width, height: siz.height, items: itm }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
	}, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = { synchronise: !1, infinite: !0, circular: !0, responsive: !1, direction: "left", items: { start: 0 }, scroll: { easing: "swing", duration: 500, pauseOnHover: !1, event: "click", queue: !1 } }, $.fn.carouFredSel.configs = { debug: !1, transition: !1, onWindowResize: "throttle", events: { prefix: "", namespace: "cfs" }, wrapper: { element: "div", classname: "caroufredsel_wrapper" }, classnames: {} }, $.fn.carouFredSel.pageAnchorBuilder = function (a) { return '<a href="#"><span>' + a + "</span></a>" }, $.fn.carouFredSel.progressbarUpdater = function (a) { $(this).css("width", a + "%") }, $.fn.carouFredSel.cookie = { get: function (a) { a += "="; for (var b = document.cookie.split(";"), c = 0, d = b.length; d > c; c++) { for (var e = b[c]; " " == e.charAt(0) ;) e = e.slice(1); if (0 == e.indexOf(a)) return e.slice(a.length) } return 0 }, set: function (a, b, c) { var d = ""; if (c) { var e = new Date; e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c), d = "; expires=" + e.toGMTString() } document.cookie = a + "=" + b + d + "; path=/" }, remove: function (a) { $.fn.carouFredSel.cookie.set(a, "", -1) } }, $.extend($.easing, { quadratic: function (a) { var b = a * a; return a * (-b * a + 4 * b - 6 * a + 4) }, cubic: function (a) { return a * (4 * a * a - 9 * a + 6) }, elastic: function (a) { var b = a * a; return a * (33 * b * b - 106 * b * a + 126 * b - 67 * a + 15) } }))
})(jQuery);

/*!
 * Media helper for fancyBox
 * version: 1.0.6 (Fri, 14 Jun 2013)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: true
 *         }
 *     });
 *
 * Set custom URL parameters:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: {
 *                 youtube : {
 *                     params : {
 *                         autoplay : 0
 *                     }
 *                 }
 *             }
 *         }
 *     });
 *
 * Or:
 *     $(".fancybox").fancybox({,
 *         helpers : {
 *             media: true
 *         },
 *         youtube : {
 *             autoplay: 0
 *         }
 *     });
 *
 *  Supports:
 *
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://www.youtube.com/embed/opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/40648169
 *          http://vimeo.com/channels/staffpicks/38843628
 *          http://vimeo.com/groups/surrealism/videos/36516384
 *          http://player.vimeo.com/video/45074303
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
(function ($) {
	"use strict";

	//Shortcut for fancyBox object
	var F = $.fancybox,
		format = function (url, rez, params) {
			params = params || '';

			if ($.type(params) === "object") {
				params = $.param(params, true);
			}

			$.each(rez, function (key, value) {
				url = url.replace('$' + key, value || '');
			});

			if (params.length) {
				url += (url.indexOf('?') > 0 ? '&' : '?') + params;
			}

			return url;
		};

	//Add helper object
	F.helpers.media = {
		defaults: {
			youtube: {
				matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
				params: {
					autoplay: 1,
					autohide: 1,
					fs: 1,
					rel: 0,
					hd: 1,
					wmode: 'opaque',
					enablejsapi: 1
				},
				type: 'iframe',
				url: '//www.youtube.com/embed/$3'
			},
			vimeo: {
				matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
				params: {
					autoplay: 1,
					hd: 1,
					show_title: 1,
					show_byline: 1,
					show_portrait: 0,
					fullscreen: 1
				},
				type: 'iframe',
				url: '//player.vimeo.com/video/$1'
			},
			metacafe: {
				matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
				params: {
					autoPlay: 'yes'
				},
				type: 'swf',
				url: function (rez, params, obj) {
					obj.swf.flashVars = 'playerVars=' + $.param(params, true);

					return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
				}
			},
			dailymotion: {
				matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
				params: {
					additionalInfos: 0,
					autoStart: 1
				},
				type: 'swf',
				url: '//www.dailymotion.com/swf/video/$1'
			},
			twitvid: {
				matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
				params: {
					autoplay: 0
				},
				type: 'iframe',
				url: '//www.twitvid.com/embed.php?guid=$1'
			},
			twitpic: {
				matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
				type: 'image',
				url: '//twitpic.com/show/full/$1/'
			},
			instagram: {
				matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type: 'image',
				url: '//$1/p/$2/media/?size=l'
			},
			google_maps: {
				matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
				type: 'iframe',
				url: function (rez) {
					return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
				}
			}
		},

		beforeLoad: function (opts, obj) {
			var url = obj.href || '',
				type = false,
				what,
				item,
				rez,
				params;

			for (what in opts) {
				if (opts.hasOwnProperty(what)) {
					item = opts[what];
					rez = url.match(item.matcher);

					if (rez) {
						type = item.type;
						params = $.extend(true, {}, item.params, obj[what] || ($.isPlainObject(opts[what]) ? opts[what].params : null));

						url = $.type(item.url) === "function" ? item.url.call(this, rez, params, obj) : format(item.url, rez, params);

						break;
					}
				}
			}

			if (type) {
				obj.href = url;
				obj.type = type;

				obj.autoHeight = false;
			}
		}
	};

}(jQuery));


/*Baron Scroll*/
!function (a, b) { "use strict"; function c(b, c, d) { b._eventHandlers = b._eventHandlers || [{ element: b.scroller, handler: function (a) { b.scroll(a) }, type: "scroll" }, { element: b.scroller, handler: function () { b.update() }, type: "keyup" }, { element: b.bar, handler: function (a) { a.preventDefault(), b.selection(), b.drag.now = 1 }, type: "touchstart mousedown" }, { element: document, handler: function () { b.selection(1), b.drag.now = 0 }, type: "mouseup blur touchend" }, { element: document, handler: function (a) { 2 != a.button && b._pos0(a) }, type: "touchstart mousedown" }, { element: document, handler: function (a) { b.drag.now && b.drag(a) }, type: "mousemove touchmove" }, { element: a, handler: function () { b.update() }, type: "resize" }, { element: b.root, handler: function () { b.update() }, type: "sizeChange" }], l(b._eventHandlers, function (a) { a.element && c(a.element, a.type, a.handler, d) }) } function d(a, b, c) { var d = "data-baron-" + b; if ("on" == c) a.setAttribute(d, "inited"); else { if ("off" != c) return a.getAttribute(d); a.removeAttribute(d) } } function e(a) { if (d(a.root, a.direction)) throw new Error("Second baron initialization"); var b = new n.prototype.constructor(a); return c(b, a.event, "on"), d(b.root, a.direction, "on"), b.update({ initMode: !0 }), b } function f(a) { var b = {}; a = a || {}; for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]); return b } function g(a) { var b = f(a); b.direction = b.direction || "v"; var c = a.event || function (a, c, d, e) { b.$(a)[e || "on"](c, d) }; return b.event = function (a, b, d, e) { l(a, function (a) { c(a, b, d, e) }) }, b } function h(a) { if (this.events && this.events[a]) for (var b = 0; b < this.events[a].length; b++) { var c = Array.prototype.slice.call(arguments, 1); this.events[a][b].apply(this, c) } } if (a) { var i = m, j = ["left", "top", "right", "bottom", "width", "height"], k = { v: { x: "Y", pos: j[1], oppos: j[3], crossPos: j[0], crossOpPos: j[2], size: j[5], crossSize: j[4], client: "clientHeight", crossClient: "clientWidth", crossScroll: "scrollWidth", offset: "offsetHeight", crossOffset: "offsetWidth", offsetPos: "offsetTop", scroll: "scrollTop", scrollSize: "scrollHeight" }, h: { x: "X", pos: j[0], oppos: j[2], crossPos: j[1], crossOpPos: j[3], size: j[4], crossSize: j[5], client: "clientWidth", crossClient: "clientHeight", crossScroll: "scrollHeight", offset: "offsetWidth", crossOffset: "offsetHeight", offsetPos: "offsetLeft", scroll: "scrollLeft", scrollSize: "scrollWidth" } }, l = function (c, d) { var e = 0; for ((c.length === b || c === a) && (c = [c]) ; c[e];) d.call(this, c[e], e), e++ }, m = function (b) { var c, d, e; return b = b || {}, e = b.$ || a.jQuery, c = this instanceof e, c ? b.root = d = this : d = e(b.root || b.scroller), new m.fn.constructor(d, b, e) }; m.fn = { constructor: function (a, b, c) { var d = g(b); d.$ = c, l.call(this, a, function (a, b) { var c = f(d); d.root && d.scroller ? (c.scroller = d.$(d.scroller, a), c.scroller.length || (c.scroller = a)) : c.scroller = a, c.root = a, this[b] = e(c), this.length = b + 1 }), this.params = d }, dispose: function () { var a = this.params; l(this, function (b) { b.dispose(a) }), this.params = null }, update: function () { for (var a = 0; this[a];) this[a].update.apply(this[a], arguments), a++ }, baron: function (a) { return a.root = [], a.scroller = this.params.scroller, l.call(this, this, function (b) { a.root.push(b.root) }), a.direction = "v" == this.params.direction ? "h" : "v", a._chain = !0, m(a) } }; var n = {}; n.prototype = { constructor: function (a) { function c(a, b) { return l(a, b)[0] } function d(a) { var b = this.barMinSize || 20; a > 0 && b > a && (a = b), this.bar && l(this.bar).css(this.origin.size, parseInt(a, 10) + "px") } function e(a) { this.bar && l(this.bar).css(this.origin.pos, +a + "px") } function f() { return o[this.origin.client] - this.barTopLimit - this.bar[this.origin.offset] } function g(a) { return a * f.call(this) + this.barTopLimit } function i(a) { return (a - this.barTopLimit) / f.call(this) } function j() { return !1 } var l, m, n, o, p, q, r, s, t, u, v; return u = t = (new Date).getTime(), l = this.$ = a.$, this.event = a.event, this.events = {}, this.root = a.root, this.scroller = c(a.scroller), this.bar = c(a.bar, this.root), o = this.track = c(a.track, this.root), !this.track && this.bar && (o = this.bar.parentNode), this.clipper = this.scroller.parentNode, this.direction = a.direction, this.origin = k[this.direction], this.barOnCls = a.barOnCls, this.scrollingCls = a.scrollingCls, this.barTopLimit = 0, s = 1e3 * a.pause || 0, this.cursor = function (a) { return a["client" + this.origin.x] || (((a.originalEvent || a).touches || {})[0] || {})["page" + this.origin.x] }, this.pos = function (a) { var c = "page" + this.origin.x + "Offset", d = this.scroller[c] ? c : this.origin.scroll; return a !== b && (this.scroller[d] = a), this.scroller[d] }, this.rpos = function (a) { var b, c = this.scroller[this.origin.scrollSize] - this.scroller[this.origin.client]; return b = a ? this.pos(a * c) : this.pos(), b / (c || 1) }, this.barOn = function (a) { this.barOnCls && (a || this.scroller[this.origin.client] >= this.scroller[this.origin.scrollSize] ? l(this.root).removeClass(this.barOnCls) : l(this.root).addClass(this.barOnCls)) }, this._pos0 = function (a) { n = this.cursor(a) - m }, this.drag = function (a) { this.scroller[this.origin.scroll] = i.call(this, this.cursor(a) - n) * (this.scroller[this.origin.scrollSize] - this.scroller[this.origin.client]) }, this.selection = function (a) { this.event(document, "selectpos selectstart", j, a ? "off" : "on") }, this.resize = function () { function b() { var b, d; c.barOn(), d = c.scroller[c.origin.crossClient], b = c.scroller[c.origin.crossOffset] - d, a.freeze && !c.clipper.style[c.origin.crossSize] && l(c.clipper).css(c.origin.crossSize, c.clipper[c.origin.crossClient] - b + "px"), l(c.scroller).css(c.origin.crossSize, c.clipper[c.origin.crossClient] + b + "px"), Array.prototype.unshift.call(arguments, "resize"), h.apply(c, arguments), u = (new Date).getTime() } var c = this, d = 0; (new Date).getTime() - u < s && (clearTimeout(p), d = s), d ? p = setTimeout(b, d) : b() }, this.updatePositions = function () { var a, b = this; b.bar && (a = (o[b.origin.client] - b.barTopLimit) * b.scroller[b.origin.client] / b.scroller[b.origin.scrollSize], parseInt(v, 10) != parseInt(a, 10) && (d.call(b, a), v = a), m = g.call(b, b.rpos()), e.call(b, m)), Array.prototype.unshift.call(arguments, "scroll"), h.apply(b, arguments), t = (new Date).getTime() }, this.scroll = function () { var a = 0, c = this; (new Date).getTime() - t < s && (clearTimeout(q), a = s), (new Date).getTime() - t < s && (clearTimeout(q), a = s), a ? q = setTimeout(function () { c.updatePositions() }, a) : c.updatePositions(), c.scrollingCls && (r || this.$(this.scroller).addClass(this.scrollingCls), clearTimeout(r), r = setTimeout(function () { c.$(c.scroller).removeClass(c.scrollingCls), r = b }, 300)) }, this }, update: function (a) { return h.call(this, "upd", a), this.resize(1), this.updatePositions(), this }, dispose: function (a) { c(this, this.event, "off"), d(this.root, a.direction, "off"), $(this.scroller).css(this.origin.crossSize, ""), this.barOn(!0), h.call(this, "dispose") }, on: function (a, b, c) { for (var d = a.split(" "), e = 0; e < d.length; e++) "init" == d[e] ? b.call(this, c) : (this.events[d[e]] = this.events[d[e]] || [], this.events[d[e]].push(function (a) { b.call(this, a || c) })) } }, m.fn.constructor.prototype = m.fn, n.prototype.constructor.prototype = n.prototype, m.noConflict = function () { return a.baron = i, m }, m.version = "0.7.7", $ && $.fn && ($.fn.baron = m), a.baron = m, a.module && module.exports && (module.exports = m.noConflict()) } }(window);

/*!
 * Thumbnail helper for fancyBox
 * version: 1.0.7 (Mon, 01 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             thumbs: {
 *                 width  : 50,
 *                 height : 50
 *             }
 *         }
 *     });
 *
 */
(function ($) {
    //Shortcut for fancyBox object
    var F = $.fancybox;

    //Add helper object
    F.helpers.thumbs = {
        defaults: {
            width: 50,       // thumbnail width
            height: 50,       // thumbnail height
            position: 'bottom', // 'top' or 'bottom'
            source: function (item) {  // function to obtain the URL of the thumbnail image
                var href;

                if (item.element) {
                    href = $(item.element).find('img').attr('src');
                }

                if (!href && item.type === 'image' && item.href) {
                    href = item.href;
                }

                return href;
            }
        },

        wrap: null,
        list: null,
        width: 0,

        init: function (opts, obj) {
            var that = this,
				list,
				thumbWidth = opts.width,
				thumbHeight = opts.height,
				thumbSource = opts.source;

            this.isBaronInited = false;

            //Build list structure
            list = '';

            for (var n = 0; n < obj.group.length; n++) {
                list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
            }

            this.wrap = $('<div id="fancybox-thumbs" class="wrapper"></div>').addClass(opts.position).appendTo('body');
            this.scroller = $('<div id="fancybox-thumbs-scroller" class="scroller"></div>').appendTo(this.wrap);
            this.list = $('<ul>' + list + '</ul>').appendTo(this.scroller);
            this.track = $('<div class="scroller__track"><div class="scroller__bar scroller__bar_h"></div></div>').appendTo(this.scroller);

            //Load each thumbnail
            $.each(obj.group, function (i) {
                var href = thumbSource(obj.group[i]);

                if (!href) {
                    return;
                }

                $("<img />").load(function () {
                    var width = this.width,
						height = this.height,
						widthRatio, heightRatio, parent;

                    if (!that.list || !width || !height) {
                        return;
                    }

                    //Calculate thumbnail width/height and center it
                    widthRatio = width / thumbWidth;
                    heightRatio = height / thumbHeight;

                    parent = that.list.children().eq(i).find('a');

                    if (widthRatio >= 1 && heightRatio >= 1) {
                        if (widthRatio > heightRatio) {
                            width = Math.floor(width / heightRatio);
                            height = thumbHeight;

                        } else {
                            width = thumbWidth;
                            height = Math.floor(height / widthRatio);
                        }
                    }

                    $(this).css({
                        width: width,
                        height: height,
                        top: Math.floor(thumbHeight / 2 - height / 2),
                        left: Math.floor(thumbWidth / 2 - width / 2)
                    });

                    parent.width(thumbWidth).height(thumbHeight);

                    $(this).hide().appendTo(parent).fadeIn(300);

                }).attr('src', href);
            });

            //Set initial width
            this.width = this.list.children().eq(0).outerWidth(true);

            this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));

            $(window).resize(function () {
                this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));
            }.bind(this));
        },

        beforeLoad: function (opts, obj) {
            //Remove self if gallery do not have at least two items
            if (obj.group.length < 2) {
                obj.helpers.thumbs = false;

                return;
            }

            //Increase bottom margin to give space for thumbs
            obj.margin[opts.position === 'top' ? 0 : 2] += ((opts.height) + 15);
        },

        afterShow: function (opts, obj) {
            //Check if exists and create or update list
            if (this.list) {
                this.onUpdate(opts, obj);

            } else {
                this.init(opts, obj);
            }

            //Set active element
            this.list.children().removeClass('active').eq(obj.index).addClass('active');

            if (!this.isBaronInited) {
                // кастомный скролл бар
                baron({
                    scroller: '#fancybox-thumbs-scroller',
                    bar: '.scroller__bar_h',
                    barOnCls: 'baron_h',
                    direction: 'h',
                    // freeze: true
                });

                this.isBaronInited = true;
            }
        },

        //Center list
        onUpdate: function (opts, obj) {
            return; // отключаем анимацию
            if (this.list) {
                this.list.stop(true).animate({
                    'left': Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5))
                }, 150);
            }
        },

        beforeClose: function () {
            console.log('beforeClose');
            if (this.wrap) {
                this.wrap.remove();
            }

            this.wrap = null;
            this.list = null;
            this.width = 0;
        }
    }

}(jQuery));
/* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.6.3.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */
(function ($) { function Countdown() { this.regional = []; this.regional[''] = { labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'], labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'], compactLabels: ['y', 'm', 'w', 'd'], whichLabels: null, digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], timeSeparator: ':', isRTL: false }; this._defaults = { until: null, since: null, timezone: null, serverSync: null, format: 'dHMS', layout: '', compact: false, significant: 0, description: '', expiryUrl: '', expiryText: '', alwaysExpire: false, onExpiry: null, onTick: null, tickInterval: 1 }; $.extend(this._defaults, this.regional['']); this._serverSyncs = []; var c = (typeof Date.now == 'function' ? Date.now : function () { return new Date().getTime() }); var d = (window.performance && typeof window.performance.now == 'function'); function timerCallBack(a) { var b = (a < 1e12 ? (d ? (performance.now() + performance.timing.navigationStart) : c()) : a || c()); if (b - f >= 1000) { x._updateTargets(); f = b } e(timerCallBack) } var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null; var f = 0; if (!e || $.noRequestAnimationFrame) { $.noRequestAnimationFrame = null; setInterval(function () { x._updateTargets() }, 980) } else { f = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || c(); e(timerCallBack) } } var Y = 0; var O = 1; var W = 2; var D = 3; var H = 4; var M = 5; var S = 6; $.extend(Countdown.prototype, { markerClassName: 'hasCountdown', propertyName: 'countdown', _rtlClass: 'countdown_rtl', _sectionClass: 'countdown_section', _amountClass: 'countdown_amount', _rowClass: 'countdown_row', _holdingClass: 'countdown_holding', _showClass: 'countdown_show', _descrClass: 'countdown_descr', _timerTargets: [], setDefaults: function (a) { this._resetExtraLabels(this._defaults, a); $.extend(this._defaults, a || {}) }, UTCDate: function (a, b, c, e, f, g, h, i) { if (typeof b == 'object' && b.constructor == Date) { i = b.getMilliseconds(); h = b.getSeconds(); g = b.getMinutes(); f = b.getHours(); e = b.getDate(); c = b.getMonth(); b = b.getFullYear() } var d = new Date(); d.setUTCFullYear(b); d.setUTCDate(1); d.setUTCMonth(c || 0); d.setUTCDate(e || 1); d.setUTCHours(f || 0); d.setUTCMinutes((g || 0) - (Math.abs(a) < 30 ? a * 60 : a)); d.setUTCSeconds(h || 0); d.setUTCMilliseconds(i || 0); return d }, periodsToSeconds: function (a) { return a[0] * 31557600 + a[1] * 2629800 + a[2] * 604800 + a[3] * 86400 + a[4] * 3600 + a[5] * 60 + a[6] }, _attachPlugin: function (a, b) { a = $(a); if (a.hasClass(this.markerClassName)) { return } var c = { options: $.extend({}, this._defaults), _periods: [0, 0, 0, 0, 0, 0, 0] }; a.addClass(this.markerClassName).data(this.propertyName, c); this._optionPlugin(a, b) }, _addTarget: function (a) { if (!this._hasTarget(a)) { this._timerTargets.push(a) } }, _hasTarget: function (a) { return ($.inArray(a, this._timerTargets) > -1) }, _removeTarget: function (b) { this._timerTargets = $.map(this._timerTargets, function (a) { return (a == b ? null : a) }) }, _updateTargets: function () { for (var i = this._timerTargets.length - 1; i >= 0; i--) { this._updateCountdown(this._timerTargets[i]) } }, _optionPlugin: function (a, b, c) { a = $(a); var d = a.data(this.propertyName); if (!b || (typeof b == 'string' && c == null)) { var e = b; b = (d || {}).options; return (b && e ? b[e] : b) } if (!a.hasClass(this.markerClassName)) { return } b = b || {}; if (typeof b == 'string') { var e = b; b = {}; b[e] = c } if (b.layout) { b.layout = b.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>') } this._resetExtraLabels(d.options, b); var f = (d.options.timezone != b.timezone); $.extend(d.options, b); this._adjustSettings(a, d, b.until != null || b.since != null || f); var g = new Date(); if ((d._since && d._since < g) || (d._until && d._until > g)) { this._addTarget(a[0]) } this._updateCountdown(a, d) }, _updateCountdown: function (a, b) { var c = $(a); b = b || c.data(this.propertyName); if (!b) { return } c.html(this._generateHTML(b)).toggleClass(this._rtlClass, b.options.isRTL); if ($.isFunction(b.options.onTick)) { var d = b._hold != 'lap' ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date()); if (b.options.tickInterval == 1 || this.periodsToSeconds(d) % b.options.tickInterval == 0) { b.options.onTick.apply(a, [d]) } } var e = b._hold != 'pause' && (b._since ? b._now.getTime() < b._since.getTime() : b._now.getTime() >= b._until.getTime()); if (e && !b._expiring) { b._expiring = true; if (this._hasTarget(a) || b.options.alwaysExpire) { this._removeTarget(a); if ($.isFunction(b.options.onExpiry)) { b.options.onExpiry.apply(a, []) } if (b.options.expiryText) { var f = b.options.layout; b.options.layout = b.options.expiryText; this._updateCountdown(a, b); b.options.layout = f } if (b.options.expiryUrl) { window.location = b.options.expiryUrl } } b._expiring = false } else if (b._hold == 'pause') { this._removeTarget(a) } c.data(this.propertyName, b) }, _resetExtraLabels: function (a, b) { var c = false; for (var n in b) { if (n != 'whichLabels' && n.match(/[Ll]abels/)) { c = true; break } } if (c) { for (var n in a) { if (n.match(/[Ll]abels[02-9]|compactLabels1/)) { a[n] = null } } } }, _adjustSettings: function (a, b, c) { var d; var e = 0; var f = null; for (var i = 0; i < this._serverSyncs.length; i++) { if (this._serverSyncs[i][0] == b.options.serverSync) { f = this._serverSyncs[i][1]; break } } if (f != null) { e = (b.options.serverSync ? f : 0); d = new Date() } else { var g = ($.isFunction(b.options.serverSync) ? b.options.serverSync.apply(a, []) : null); d = new Date(); e = (g ? d.getTime() - g.getTime() : 0); this._serverSyncs.push([b.options.serverSync, e]) } var h = b.options.timezone; h = (h == null ? -d.getTimezoneOffset() : h); if (c || (!c && b._until == null && b._since == null)) { b._since = b.options.since; if (b._since != null) { b._since = this.UTCDate(h, this._determineTime(b._since, null)); if (b._since && e) { b._since.setMilliseconds(b._since.getMilliseconds() + e) } } b._until = this.UTCDate(h, this._determineTime(b.options.until, d)); if (e) { b._until.setMilliseconds(b._until.getMilliseconds() + e) } } b._show = this._determineShow(b) }, _destroyPlugin: function (a) { a = $(a); if (!a.hasClass(this.markerClassName)) { return } this._removeTarget(a[0]); a.removeClass(this.markerClassName).empty().removeData(this.propertyName) }, _pausePlugin: function (a) { this._hold(a, 'pause') }, _lapPlugin: function (a) { this._hold(a, 'lap') }, _resumePlugin: function (a) { this._hold(a, null) }, _hold: function (a, b) { var c = $.data(a, this.propertyName); if (c) { if (c._hold == 'pause' && !b) { c._periods = c._savePeriods; var d = (c._since ? '-' : '+'); c[c._since ? '_since' : '_until'] = this._determineTime(d + c._periods[0] + 'y' + d + c._periods[1] + 'o' + d + c._periods[2] + 'w' + d + c._periods[3] + 'd' + d + c._periods[4] + 'h' + d + c._periods[5] + 'm' + d + c._periods[6] + 's'); this._addTarget(a) } c._hold = b; c._savePeriods = (b == 'pause' ? c._periods : null); $.data(a, this.propertyName, c); this._updateCountdown(a, c) } }, _getTimesPlugin: function (a) { var b = $.data(a, this.propertyName); return (!b ? null : (b._hold == 'pause' ? b._savePeriods : (!b._hold ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date())))) }, _determineTime: function (k, l) { var m = function (a) { var b = new Date(); b.setTime(b.getTime() + a * 1000); return b }; var n = function (a) { a = a.toLowerCase(); var b = new Date(); var c = b.getFullYear(); var d = b.getMonth(); var e = b.getDate(); var f = b.getHours(); var g = b.getMinutes(); var h = b.getSeconds(); var i = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g; var j = i.exec(a); while (j) { switch (j[2] || 's') { case 's': h += parseInt(j[1], 10); break; case 'm': g += parseInt(j[1], 10); break; case 'h': f += parseInt(j[1], 10); break; case 'd': e += parseInt(j[1], 10); break; case 'w': e += parseInt(j[1], 10) * 7; break; case 'o': d += parseInt(j[1], 10); e = Math.min(e, x._getDaysInMonth(c, d)); break; case 'y': c += parseInt(j[1], 10); e = Math.min(e, x._getDaysInMonth(c, d)); break } j = i.exec(a) } return new Date(c, d, e, f, g, h, 0) }; var o = (k == null ? l : (typeof k == 'string' ? n(k) : (typeof k == 'number' ? m(k) : k))); if (o) o.setMilliseconds(0); return o }, _getDaysInMonth: function (a, b) { return 32 - new Date(a, b, 32).getDate() }, _normalLabels: function (a) { return a }, _generateHTML: function (c) { var d = this; c._periods = (c._hold ? c._periods : this._calculatePeriods(c, c._show, c.options.significant, new Date())); var e = false; var f = 0; var g = c.options.significant; var h = $.extend({}, c._show); for (var i = Y; i <= S; i++) { e |= (c._show[i] == '?' && c._periods[i] > 0); h[i] = (c._show[i] == '?' && !e ? null : c._show[i]); f += (h[i] ? 1 : 0); g -= (c._periods[i] > 0 ? 1 : 0) } var j = [false, false, false, false, false, false, false]; for (var i = S; i >= Y; i--) { if (c._show[i]) { if (c._periods[i]) { j[i] = true } else { j[i] = g > 0; g-- } } } var k = (c.options.compact ? c.options.compactLabels : c.options.labels); var l = c.options.whichLabels || this._normalLabels; var m = function (a) { var b = c.options['compactLabels' + l(c._periods[a])]; return (h[a] ? d._translateDigits(c, c._periods[a]) + (b ? b[a] : k[a]) + ' ' : '') }; var n = function (a) { var b = c.options['labels' + l(c._periods[a])]; return ((!c.options.significant && h[a]) || (c.options.significant && j[a]) ? '<span class="' + x._sectionClass + '">' + '<span class="' + x._amountClass + '">' + d._translateDigits(c, c._periods[a]) + '</span><br/>' + (b ? b[a] : k[a]) + '</span>' : '') }; return (c.options.layout ? this._buildLayout(c, h, c.options.layout, c.options.compact, c.options.significant, j) : ((c.options.compact ? '<span class="' + this._rowClass + ' ' + this._amountClass + (c._hold ? ' ' + this._holdingClass : '') + '">' + m(Y) + m(O) + m(W) + m(D) + (h[H] ? this._minDigits(c, c._periods[H], 2) : '') + (h[M] ? (h[H] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[M], 2) : '') + (h[S] ? (h[H] || h[M] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[S], 2) : '') : '<span class="' + this._rowClass + ' ' + this._showClass + (c.options.significant || f) + (c._hold ? ' ' + this._holdingClass : '') + '">' + n(Y) + n(O) + n(W) + n(D) + n(H) + n(M) + n(S)) + '</span>' + (c.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' + c.options.description + '</span>' : ''))) }, _buildLayout: function (c, d, e, f, g, h) { var j = c.options[f ? 'compactLabels' : 'labels']; var k = c.options.whichLabels || this._normalLabels; var l = function (a) { return (c.options[(f ? 'compactLabels' : 'labels') + k(c._periods[a])] || j)[a] }; var m = function (a, b) { return c.options.digits[Math.floor(a / b) % 10] }; var o = { desc: c.options.description, sep: c.options.timeSeparator, yl: l(Y), yn: this._minDigits(c, c._periods[Y], 1), ynn: this._minDigits(c, c._periods[Y], 2), ynnn: this._minDigits(c, c._periods[Y], 3), y1: m(c._periods[Y], 1), y10: m(c._periods[Y], 10), y100: m(c._periods[Y], 100), y1000: m(c._periods[Y], 1000), ol: l(O), on: this._minDigits(c, c._periods[O], 1), onn: this._minDigits(c, c._periods[O], 2), onnn: this._minDigits(c, c._periods[O], 3), o1: m(c._periods[O], 1), o10: m(c._periods[O], 10), o100: m(c._periods[O], 100), o1000: m(c._periods[O], 1000), wl: l(W), wn: this._minDigits(c, c._periods[W], 1), wnn: this._minDigits(c, c._periods[W], 2), wnnn: this._minDigits(c, c._periods[W], 3), w1: m(c._periods[W], 1), w10: m(c._periods[W], 10), w100: m(c._periods[W], 100), w1000: m(c._periods[W], 1000), dl: l(D), dn: this._minDigits(c, c._periods[D], 1), dnn: this._minDigits(c, c._periods[D], 2), dnnn: this._minDigits(c, c._periods[D], 3), d1: m(c._periods[D], 1), d10: m(c._periods[D], 10), d100: m(c._periods[D], 100), d1000: m(c._periods[D], 1000), hl: l(H), hn: this._minDigits(c, c._periods[H], 1), hnn: this._minDigits(c, c._periods[H], 2), hnnn: this._minDigits(c, c._periods[H], 3), h1: m(c._periods[H], 1), h10: m(c._periods[H], 10), h100: m(c._periods[H], 100), h1000: m(c._periods[H], 1000), ml: l(M), mn: this._minDigits(c, c._periods[M], 1), mnn: this._minDigits(c, c._periods[M], 2), mnnn: this._minDigits(c, c._periods[M], 3), m1: m(c._periods[M], 1), m10: m(c._periods[M], 10), m100: m(c._periods[M], 100), m1000: m(c._periods[M], 1000), sl: l(S), sn: this._minDigits(c, c._periods[S], 1), snn: this._minDigits(c, c._periods[S], 2), snnn: this._minDigits(c, c._periods[S], 3), s1: m(c._periods[S], 1), s10: m(c._periods[S], 10), s100: m(c._periods[S], 100), s1000: m(c._periods[S], 1000) }; var p = e; for (var i = Y; i <= S; i++) { var q = 'yowdhms'.charAt(i); var r = new RegExp('\\{' + q + '<\\}([\\s\\S]*)\\{' + q + '>\\}', 'g'); p = p.replace(r, ((!g && d[i]) || (g && h[i]) ? '$1' : '')) } $.each(o, function (n, v) { var a = new RegExp('\\{' + n + '\\}', 'g'); p = p.replace(a, v) }); return p }, _minDigits: function (a, b, c) { b = '' + b; if (b.length >= c) { return this._translateDigits(a, b) } b = '0000000000' + b; return this._translateDigits(a, b.substr(b.length - c)) }, _translateDigits: function (b, c) { return ('' + c).replace(/[0-9]/g, function (a) { return b.options.digits[a] }) }, _determineShow: function (a) { var b = a.options.format; var c = []; c[Y] = (b.match('y') ? '?' : (b.match('Y') ? '!' : null)); c[O] = (b.match('o') ? '?' : (b.match('O') ? '!' : null)); c[W] = (b.match('w') ? '?' : (b.match('W') ? '!' : null)); c[D] = (b.match('d') ? '?' : (b.match('D') ? '!' : null)); c[H] = (b.match('h') ? '?' : (b.match('H') ? '!' : null)); c[M] = (b.match('m') ? '?' : (b.match('M') ? '!' : null)); c[S] = (b.match('s') ? '?' : (b.match('S') ? '!' : null)); return c }, _calculatePeriods: function (c, d, e, f) { c._now = f; c._now.setMilliseconds(0); var g = new Date(c._now.getTime()); if (c._since) { if (f.getTime() < c._since.getTime()) { c._now = f = g } else { f = c._since } } else { g.setTime(c._until.getTime()); if (f.getTime() > c._until.getTime()) { c._now = f = g } } var h = [0, 0, 0, 0, 0, 0, 0]; if (d[Y] || d[O]) { var i = x._getDaysInMonth(f.getFullYear(), f.getMonth()); var j = x._getDaysInMonth(g.getFullYear(), g.getMonth()); var k = (g.getDate() == f.getDate() || (g.getDate() >= Math.min(i, j) && f.getDate() >= Math.min(i, j))); var l = function (a) { return (a.getHours() * 60 + a.getMinutes()) * 60 + a.getSeconds() }; var m = Math.max(0, (g.getFullYear() - f.getFullYear()) * 12 + g.getMonth() - f.getMonth() + ((g.getDate() < f.getDate() && !k) || (k && l(g) < l(f)) ? -1 : 0)); h[Y] = (d[Y] ? Math.floor(m / 12) : 0); h[O] = (d[O] ? m - h[Y] * 12 : 0); f = new Date(f.getTime()); var n = (f.getDate() == i); var o = x._getDaysInMonth(f.getFullYear() + h[Y], f.getMonth() + h[O]); if (f.getDate() > o) { f.setDate(o) } f.setFullYear(f.getFullYear() + h[Y]); f.setMonth(f.getMonth() + h[O]); if (n) { f.setDate(o) } } var p = Math.floor((g.getTime() - f.getTime()) / 1000); var q = function (a, b) { h[a] = (d[a] ? Math.floor(p / b) : 0); p -= h[a] * b }; q(W, 604800); q(D, 86400); q(H, 3600); q(M, 60); q(S, 1); if (p > 0 && !c._since) { var r = [1, 12, 4.3482, 7, 24, 60, 60]; var s = S; var t = 1; for (var u = S; u >= Y; u--) { if (d[u]) { if (h[s] >= t) { h[s] = 0; p = 1 } if (p > 0) { h[u]++; p = 0; s = u; t = 1 } } t *= r[u] } } if (e) { for (var u = Y; u <= S; u++) { if (e && h[u]) { e-- } else if (!e) { h[u] = 0 } } } return h } }); var w = ['getTimes']; function isNotChained(a, b) { if (a == 'option' && (b.length == 0 || (b.length == 1 && typeof b[0] == 'string'))) { return true } return $.inArray(a, w) > -1 } $.fn.countdown = function (a) { var b = Array.prototype.slice.call(arguments, 1); if (isNotChained(a, b)) { return x['_' + a + 'Plugin'].apply(x, [this[0]].concat(b)) } return this.each(function () { if (typeof a == 'string') { if (!x['_' + a + 'Plugin']) { throw 'Unknown command: ' + a; } x['_' + a + 'Plugin'].apply(x, [this].concat(b)) } else { x._attachPlugin(this, a || {}) } }) }; var x = $.countdown = new Countdown() })(jQuery);

(function ($) {
    if (FS.Portal.Global.lcid == 1049) {
        $.countdown.regional['ru'] = {
            labels: ['Лет', 'Месяцев', 'Недель', 'Дней', 'Часов', 'Минут', 'Секунд'],
            labels1: ['Год', 'Месяц', 'Неделя', 'День', 'Час', 'Минута', 'Секунда'],
            labels2: ['Года', 'Месяца', 'Недели', 'Дня', 'Часа', 'Минуты', 'Секунды'],
            compactLabels: ['л', 'м', 'н', 'д'], compactLabels1: ['г', 'м', 'н', 'д'],
            whichLabels: function (amount) {
                var units = amount % 10;
                var tens = Math.floor((amount % 100) / 10);
                return (amount == 1 ? 1 : (units >= 2 && units <= 4 && tens != 1 ? 2 :
                    (units == 1 && tens != 1 ? 1 : 0)));
            },
            digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            timeSeparator: ':', isRTL: false
        };
        
        $.countdown.setDefaults($.countdown.regional['ru']);
    }
})(jQuery);

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
		toBind = ('onwheel' in document || document.documentMode >= 9) ?
					['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
		slice = Array.prototype.slice,
		nullLowestDeltaTimeout, lowestDelta;

	if ($.event.fixHooks) {
		for (var i = toFix.length; i;) {
			$.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
		}
	}

	var special = $.event.special.mousewheel = {
		version: '3.1.9',

		setup: function () {
			if (this.addEventListener) {
				for (var i = toBind.length; i;) {
					this.addEventListener(toBind[--i], handler, false);
				}
			} else {
				this.onmousewheel = handler;
			}
			// Store the line height and page height for this particular element
			$.data(this, 'mousewheel-line-height', special.getLineHeight(this));
			$.data(this, 'mousewheel-page-height', special.getPageHeight(this));
		},

		teardown: function () {
			if (this.removeEventListener) {
				for (var i = toBind.length; i;) {
					this.removeEventListener(toBind[--i], handler, false);
				}
			} else {
				this.onmousewheel = null;
			}
		},

		getLineHeight: function (elem) {
			return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
		},

		getPageHeight: function (elem) {
			return $(elem).height();
		},

		settings: {
			adjustOldDeltas: true
		}
	};

	$.fn.extend({
		mousewheel: function (fn) {
			return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
		},

		unmousewheel: function (fn) {
			return this.unbind('mousewheel', fn);
		}
	});


	function handler(event) {
		var orgEvent = event || window.event,
			args = slice.call(arguments, 1),
			delta = 0,
			deltaX = 0,
			deltaY = 0,
			absDelta = 0;
		event = $.event.fix(orgEvent);
		event.type = 'mousewheel';

		// Old school scrollwheel delta
		if ('detail' in orgEvent) { deltaY = orgEvent.detail * -1; }
		if ('wheelDelta' in orgEvent) { deltaY = orgEvent.wheelDelta; }
		if ('wheelDeltaY' in orgEvent) { deltaY = orgEvent.wheelDeltaY; }
		if ('wheelDeltaX' in orgEvent) { deltaX = orgEvent.wheelDeltaX * -1; }

		// Firefox < 17 horizontal scrolling related to DOMMouseScroll event
		if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
			deltaX = deltaY * -1;
			deltaY = 0;
		}

		// Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
		delta = deltaY === 0 ? deltaX : deltaY;

		// New school wheel delta (wheel event)
		if ('deltaY' in orgEvent) {
			deltaY = orgEvent.deltaY * -1;
			delta = deltaY;
		}
		if ('deltaX' in orgEvent) {
			deltaX = orgEvent.deltaX;
			if (deltaY === 0) { delta = deltaX * -1; }
		}

		// No change actually happened, no reason to go any further
		if (deltaY === 0 && deltaX === 0) { return; }

		// Need to convert lines and pages to pixels if we aren't already in pixels
		// There are three delta modes:
		//   * deltaMode 0 is by pixels, nothing to do
		//   * deltaMode 1 is by lines
		//   * deltaMode 2 is by pages
		if (orgEvent.deltaMode === 1) {
			var lineHeight = $.data(this, 'mousewheel-line-height');
			delta *= lineHeight;
			deltaY *= lineHeight;
			deltaX *= lineHeight;
		} else if (orgEvent.deltaMode === 2) {
			var pageHeight = $.data(this, 'mousewheel-page-height');
			delta *= pageHeight;
			deltaY *= pageHeight;
			deltaX *= pageHeight;
		}

		// Store lowest absolute delta to normalize the delta values
		absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

		if (!lowestDelta || absDelta < lowestDelta) {
			lowestDelta = absDelta;

			// Adjust older deltas if necessary
			if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
				lowestDelta /= 40;
			}
		}

		// Adjust older deltas if necessary
		if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
			// Divide all the things by 40!
			delta /= 40;
			deltaX /= 40;
			deltaY /= 40;
		}

		// Get a whole, normalized value for the deltas
		delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
		deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
		deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

		// Add information to the event object
		event.deltaX = deltaX;
		event.deltaY = deltaY;
		event.deltaFactor = lowestDelta;
		// Go ahead and set deltaMode to 0 since we converted to pixels
		// Although this is a little odd since we overwrite the deltaX/Y
		// properties with normalized deltas.
		event.deltaMode = 0;

		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		// Clearout lowestDelta after sometime to better
		// handle multiple device types that give different
		// a different lowestDelta
		// Ex: trackpad = 3 and mouse wheel = 120
		if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
		nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

	function nullLowestDelta() {
		lowestDelta = null;
	}

	function shouldAdjustOldDeltas(orgEvent, absDelta) {
		// If this is an older event and the delta is divisable by 120,
		// then we are assuming that the browser is treating this as an
		// older mouse wheel event and that we should divide the deltas
		// by 40 to try and get a more usable deltaFactor.
		// Side note, this actually impacts the reported scroll distance
		// in older browsers and can cause scrolling to be slower than native.
		// Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
		return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	}

}));

/*!
 * Masonry PACKAGED v3.1.3
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

(function (t) { function e() { } function i(t) { function i(e) { e.prototype.option || (e.prototype.option = function (e) { t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e)) }) } function o(e, i) { t.fn[e] = function (o) { if ("string" == typeof o) { for (var s = n.call(arguments, 1), a = 0, h = this.length; h > a; a++) { var p = this[a], u = t.data(p, e); if (u) if (t.isFunction(u[o]) && "_" !== o.charAt(0)) { var f = u[o].apply(u, s); if (void 0 !== f) return f } else r("no such method '" + o + "' for " + e + " instance"); else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + o + "'") } return this } return this.each(function () { var n = t.data(this, e); n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n)) }) } } if (t) { var r = "undefined" == typeof console ? e : function (t) { console.error(t) }; return t.bridget = function (t, e) { i(e), o(t, e) }, t.bridget } } var n = Array.prototype.slice; "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i(t.jQuery) })(window), function (t) { var e = document.documentElement, i = function () { }; e.addEventListener ? i = function (t, e, i) { t.addEventListener(e, i, !1) } : e.attachEvent && (i = function (e, i, n) { e[i + n] = n.handleEvent ? function () { var e = t.event; e.target = e.target || e.srcElement, n.handleEvent.call(n, e) } : function () { var i = t.event; i.target = i.target || i.srcElement, n.call(e, i) }, e.attachEvent("on" + i, e[i + n]) }); var n = function () { }; e.removeEventListener ? n = function (t, e, i) { t.removeEventListener(e, i, !1) } : e.detachEvent && (n = function (t, e, i) { t.detachEvent("on" + e, t[e + i]); try { delete t[e + i] } catch (n) { t[e + i] = void 0 } }); var o = { bind: i, unbind: n }; "function" == typeof define && define.amd ? define("eventie/eventie", o) : t.eventie = o }(this), function (t) { function e(t) { "function" == typeof t && (e.isReady ? t() : r.push(t)) } function i(t) { var i = "readystatechange" === t.type && "complete" !== o.readyState; if (!e.isReady && !i) { e.isReady = !0; for (var n = 0, s = r.length; s > n; n++) { var a = r[n]; a() } } } function n(n) { return n.bind(o, "DOMContentLoaded", i), n.bind(o, "readystatechange", i), n.bind(t, "load", i), e } var o = t.document, r = []; e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], n)) : t.docReady = n(t.eventie) }(this), function () { function t() { } function e(t, e) { for (var i = t.length; i--;) if (t[i].listener === e) return i; return -1 } function i(t) { return function () { return this[t].apply(this, arguments) } } var n = t.prototype; n.getListeners = function (t) { var e, i, n = this._getEvents(); if ("object" == typeof t) { e = {}; for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i]) } else e = n[t] || (n[t] = []); return e }, n.flattenListeners = function (t) { var e, i = []; for (e = 0; t.length > e; e += 1) i.push(t[e].listener); return i }, n.getListenersAsObject = function (t) { var e, i = this.getListeners(t); return i instanceof Array && (e = {}, e[t] = i), e || i }, n.addListener = function (t, i) { var n, o = this.getListenersAsObject(t), r = "object" == typeof i; for (n in o) o.hasOwnProperty(n) && -1 === e(o[n], i) && o[n].push(r ? i : { listener: i, once: !1 }); return this }, n.on = i("addListener"), n.addOnceListener = function (t, e) { return this.addListener(t, { listener: e, once: !0 }) }, n.once = i("addOnceListener"), n.defineEvent = function (t) { return this.getListeners(t), this }, n.defineEvents = function (t) { for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]); return this }, n.removeListener = function (t, i) { var n, o, r = this.getListenersAsObject(t); for (o in r) r.hasOwnProperty(o) && (n = e(r[o], i), -1 !== n && r[o].splice(n, 1)); return this }, n.off = i("removeListener"), n.addListeners = function (t, e) { return this.manipulateListeners(!1, t, e) }, n.removeListeners = function (t, e) { return this.manipulateListeners(!0, t, e) }, n.manipulateListeners = function (t, e, i) { var n, o, r = t ? this.removeListener : this.addListener, s = t ? this.removeListeners : this.addListeners; if ("object" != typeof e || e instanceof RegExp) for (n = i.length; n--;) r.call(this, e, i[n]); else for (n in e) e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? r.call(this, n, o) : s.call(this, n, o)); return this }, n.removeEvent = function (t) { var e, i = typeof t, n = this._getEvents(); if ("string" === i) delete n[t]; else if ("object" === i) for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e]; else delete this._events; return this }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function (t, e) { var i, n, o, r, s = this.getListenersAsObject(t); for (o in s) if (s.hasOwnProperty(o)) for (n = s[o].length; n--;) i = s[o][n], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener); return this }, n.trigger = i("emitEvent"), n.emit = function (t) { var e = Array.prototype.slice.call(arguments, 1); return this.emitEvent(t, e) }, n.setOnceReturnValue = function (t) { return this._onceReturnValue = t, this }, n._getOnceReturnValue = function () { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, n._getEvents = function () { return this._events || (this._events = {}) }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () { return t }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t }.call(this), function (t) { function e(t) { if (t) { if ("string" == typeof n[t]) return t; t = t.charAt(0).toUpperCase() + t.slice(1); for (var e, o = 0, r = i.length; r > o; o++) if (e = i[o] + t, "string" == typeof n[e]) return e } } var i = "Webkit Moz ms Ms O".split(" "), n = document.documentElement.style; "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () { return e }) : t.getStyleProperty = e }(window), function (t) { function e(t) { var e = parseFloat(t), i = -1 === t.indexOf("%") && !isNaN(e); return i && e } function i() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0, i = a.length; i > e; e++) { var n = a[e]; t[n] = 0 } return t } function n(t) { function n(t) { if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) { var n = s(t); if ("none" === n.display) return i(); var r = {}; r.width = t.offsetWidth, r.height = t.offsetHeight; for (var u = r.isBorderBox = !(!p || !n[p] || "border-box" !== n[p]), f = 0, d = a.length; d > f; f++) { var l = a[f], c = n[l]; c = o(t, c); var m = parseFloat(c); r[l] = isNaN(m) ? 0 : m } var y = r.paddingLeft + r.paddingRight, g = r.paddingTop + r.paddingBottom, v = r.marginLeft + r.marginRight, _ = r.marginTop + r.marginBottom, b = r.borderLeftWidth + r.borderRightWidth, E = r.borderTopWidth + r.borderBottomWidth, L = u && h, z = e(n.width); z !== !1 && (r.width = z + (L ? 0 : y + b)); var S = e(n.height); return S !== !1 && (r.height = S + (L ? 0 : g + E)), r.innerWidth = r.width - (y + b), r.innerHeight = r.height - (g + E), r.outerWidth = r.width + v, r.outerHeight = r.height + _, r } } function o(t, e) { if (r || -1 === e.indexOf("%")) return e; var i = t.style, n = i.left, o = t.runtimeStyle, s = o && o.left; return s && (o.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = n, s && (o.left = s), e } var h, p = t("boxSizing"); return function () { if (p) { var t = document.createElement("div"); t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[p] = "border-box"; var i = document.body || document.documentElement; i.appendChild(t); var n = s(t); h = 200 === e(n.width), i.removeChild(t) } }(), n } var o = document.defaultView, r = o && o.getComputedStyle, s = r ? function (t) { return o.getComputedStyle(t, null) } : function (t) { return t.currentStyle }, a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]; "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], n) : t.getSize = n(t.getStyleProperty) }(window), function (t, e) { function i(t, e) { return t[a](e) } function n(t) { if (!t.parentNode) { var e = document.createDocumentFragment(); e.appendChild(t) } } function o(t, e) { n(t); for (var i = t.parentNode.querySelectorAll(e), o = 0, r = i.length; r > o; o++) if (i[o] === t) return !0; return !1 } function r(t, e) { return n(t), i(t, e) } var s, a = function () { if (e.matchesSelector) return "matchesSelector"; for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++) { var o = t[i], r = o + "MatchesSelector"; if (e[r]) return r } }(); if (a) { var h = document.createElement("div"), p = i(h, "div"); s = p ? i : r } else s = o; "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () { return s }) : window.matchesSelector = s }(this, Element.prototype), function (t) { function e(t, e) { for (var i in e) t[i] = e[i]; return t } function i(t) { for (var e in t) return !1; return e = null, !0 } function n(t) { return t.replace(/([A-Z])/g, function (t) { return "-" + t.toLowerCase() }) } function o(t, o, r) { function a(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) } var h = r("transition"), p = r("transform"), u = h && p, f = !!r("perspective"), d = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend" }[h], l = ["transform", "transition", "transitionDuration", "transitionProperty"], c = function () { for (var t = {}, e = 0, i = l.length; i > e; e++) { var n = l[e], o = r(n); o && o !== n && (t[n] = o) } return t }(); e(a.prototype, t.prototype), a.prototype._create = function () { this._transition = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, a.prototype.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, a.prototype.getSize = function () { this.size = o(this.element) }, a.prototype.css = function (t) { var e = this.element.style; for (var i in t) { var n = c[i] || i; e[n] = t[i] } }, a.prototype.getPosition = function () { var t = s(this.element), e = this.layout.options, i = e.isOriginLeft, n = e.isOriginTop, o = parseInt(t[i ? "left" : "right"], 10), r = parseInt(t[n ? "top" : "bottom"], 10); o = isNaN(o) ? 0 : o, r = isNaN(r) ? 0 : r; var a = this.layout.size; o -= i ? a.paddingLeft : a.paddingRight, r -= n ? a.paddingTop : a.paddingBottom, this.position.x = o, this.position.y = r }, a.prototype.layoutPosition = function () { var t = this.layout.size, e = this.layout.options, i = {}; e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this]) }; var m = f ? function (t, e) { return "translate3d(" + t + "px, " + e + "px, 0)" } : function (t, e) { return "translate(" + t + "px, " + e + "px)" }; a.prototype._transitionTo = function (t, e) { this.getPosition(); var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10), s = o === this.position.x && r === this.position.y; if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0; var a = t - i, h = e - n, p = {}, u = this.layout.options; a = u.isOriginLeft ? a : -a, h = u.isOriginTop ? h : -h, p.transform = m(a, h), this.transition({ to: p, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, a.prototype.goTo = function (t, e) { this.setPosition(t, e), this.layoutPosition() }, a.prototype.moveTo = u ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function (t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, a.prototype._nonTransition = function (t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, a.prototype._transition = function (t) { if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0; var e = this._transition; for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]; for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0); if (t.from) { this.css(t.from); var n = this.element.offsetHeight; n = null } this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0 }; var y = p && n(p) + ",opacity"; a.prototype.enableTransition = function () { this.isTransitioning || (this.css({ transitionProperty: y, transitionDuration: this.layout.options.transitionDuration }), this.element.addEventListener(d, this, !1)) }, a.prototype.transition = a.prototype[h ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function (t) { this.ontransitionend(t) }, a.prototype.onotransitionend = function (t) { this.ontransitionend(t) }; var g = { "-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform" }; a.prototype.ontransitionend = function (t) { if (t.target === this.element) { var e = this._transition, n = g[t.propertyName] || t.propertyName; if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) { var o = e.onEnd[n]; o.call(this), delete e.onEnd[n] } this.emitEvent("transitionEnd", [this]) } }, a.prototype.disableTransition = function () { this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1 }, a.prototype._removeStyles = function (t) { var e = {}; for (var i in t) e[i] = ""; this.css(e) }; var v = { transitionProperty: "", transitionDuration: "" }; return a.prototype.removeTransitionStyles = function () { this.css(v) }, a.prototype.removeElem = function () { this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this]) }, a.prototype.remove = function () { if (!h || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0; var t = this; this.on("transitionEnd", function () { return t.removeElem(), !0 }), this.hide() }, a.prototype.reveal = function () { delete this.isHidden, this.css({ display: "" }); var t = this.layout.options; this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0 }) }, a.prototype.hide = function () { this.isHidden = !0, this.css({ display: "" }); var t = this.layout.options; this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: { opacity: function () { this.isHidden && this.css({ display: "none" }) } } }) }, a.prototype.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, a } var r = document.defaultView, s = r && r.getComputedStyle ? function (t) { return r.getComputedStyle(t, null) } : function (t) { return t.currentStyle }; "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], o) : (t.Outlayer = {}, t.Outlayer.Item = o(t.EventEmitter, t.getSize, t.getStyleProperty)) }(window), function (t) { function e(t, e) { for (var i in e) t[i] = e[i]; return t } function i(t) { return "[object Array]" === f.call(t) } function n(t) { var e = []; if (i(t)) e = t; else if (t && "number" == typeof t.length) for (var n = 0, o = t.length; o > n; n++) e.push(t[n]); else e.push(t); return e } function o(t, e) { var i = l(e, t); -1 !== i && e.splice(i, 1) } function r(t) { return t.replace(/(.)([A-Z])/g, function (t, e, i) { return e + "-" + i }).toLowerCase() } function s(i, s, f, l, c, m) { function y(t, i) { if ("string" == typeof t && (t = a.querySelector(t)), !t || !d(t)) return h && h.error("Bad " + this.settings.namespace + " element: " + t), void 0; this.element = t, this.options = e({}, this.options), this.option(i); var n = ++v; this.element.outlayerGUID = n, _[n] = this, this._create(), this.options.isInitLayout && this.layout() } function g(t, i) { t.prototype[i] = e({}, y.prototype[i]) } var v = 0, _ = {}; return y.prototype.settings = { namespace: "outlayer", item: m }, y.prototype.options = { containerStyle: { position: "relative" }, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }, e(y.prototype, f.prototype), y.prototype.option = function (t) { e(this.options, t) }, y.prototype._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize() }, y.prototype.reloadItems = function () { this.items = this._itemize(this.element.children) }, y.prototype._itemize = function (t) { for (var e = this._filterFindItemElements(t), i = this.settings.item, n = [], o = 0, r = e.length; r > o; o++) { var s = e[o], a = new i(s, this); n.push(a) } return n }, y.prototype._filterFindItemElements = function (t) { t = n(t); for (var e = this.options.itemSelector, i = [], o = 0, r = t.length; r > o; o++) { var s = t[o]; if (d(s)) if (e) { c(s, e) && i.push(s); for (var a = s.querySelectorAll(e), h = 0, p = a.length; p > h; h++) i.push(a[h]) } else i.push(s) } return i }, y.prototype.getItemElements = function () { for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element); return t }, y.prototype.layout = function () { this._resetLayout(), this._manageStamps(); var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited; this.layoutItems(this.items, t), this._isLayoutInited = !0 }, y.prototype._init = y.prototype.layout, y.prototype._resetLayout = function () { this.getSize() }, y.prototype.getSize = function () { this.size = l(this.element) }, y.prototype._getMeasurement = function (t, e) { var i, n = this.options[t]; n ? ("string" == typeof n ? i = this.element.querySelector(n) : d(n) && (i = n), this[t] = i ? l(i)[e] : n) : this[t] = 0 }, y.prototype.layoutItems = function (t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, y.prototype._getItemsForLayout = function (t) { for (var e = [], i = 0, n = t.length; n > i; i++) { var o = t[i]; o.isIgnored || e.push(o) } return e }, y.prototype._layoutItems = function (t, e) { if (!t || !t.length) return this.emitEvent("layoutComplete", [this, t]), void 0; this._itemsOn(t, "layout", function () { this.emitEvent("layoutComplete", [this, t]) }); for (var i = [], n = 0, o = t.length; o > n; n++) { var r = t[n], s = this._getItemLayoutPosition(r); s.item = r, s.isInstant = e, i.push(s) } this._processLayoutQueue(i) }, y.prototype._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, y.prototype._processLayoutQueue = function (t) { for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; this._positionItem(n.item, n.x, n.y, n.isInstant) } }, y.prototype._positionItem = function (t, e, i, n) { n ? t.goTo(e, i) : t.moveTo(e, i) }, y.prototype._postLayout = function () { var t = this._getContainerSize(); t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1)) }, y.prototype._getContainerSize = u, y.prototype._setContainerMeasure = function (t, e) { if (void 0 !== t) { var i = this.size; i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px" } }, y.prototype._itemsOn = function (t, e, i) { function n() { return o++, o === r && i.call(s), !0 } for (var o = 0, r = t.length, s = this, a = 0, h = t.length; h > a; a++) { var p = t[a]; p.on(e, n) } }, y.prototype.ignore = function (t) { var e = this.getItem(t); e && (e.isIgnored = !0) }, y.prototype.unignore = function (t) { var e = this.getItem(t); e && delete e.isIgnored }, y.prototype.stamp = function (t) { if (t = this._find(t)) { this.stamps = this.stamps.concat(t); for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; this.ignore(n) } } }, y.prototype.unstamp = function (t) { if (t = this._find(t)) for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; o(n, this.stamps), this.unignore(n) } }, y.prototype._find = function (t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n(t)) : void 0 }, y.prototype._manageStamps = function () { if (this.stamps && this.stamps.length) { this._getBoundingRect(); for (var t = 0, e = this.stamps.length; e > t; t++) { var i = this.stamps[t]; this._manageStamp(i) } } }, y.prototype._getBoundingRect = function () { var t = this.element.getBoundingClientRect(), e = this.size; this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) } }, y.prototype._manageStamp = u, y.prototype._getElementOffset = function (t) { var e = t.getBoundingClientRect(), i = this._boundingRect, n = l(t), o = { left: e.left - i.left - n.marginLeft, top: e.top - i.top - n.marginTop, right: i.right - e.right - n.marginRight, bottom: i.bottom - e.bottom - n.marginBottom }; return o }, y.prototype.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, y.prototype.bindResize = function () { this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0) }, y.prototype.unbindResize = function () { i.unbind(t, "resize", this), this.isResizeBound = !1 }, y.prototype.onresize = function () { function t() { e.resize(), delete e.resizeTimeout } this.resizeTimeout && clearTimeout(this.resizeTimeout); var e = this; this.resizeTimeout = setTimeout(t, 100) }, y.prototype.resize = function () { var t = l(this.element), e = this.size && t; e && t.innerWidth === this.size.innerWidth || this.layout() }, y.prototype.addItems = function (t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, y.prototype.appended = function (t) { var e = this.addItems(t); e.length && (this.layoutItems(e, !0), this.reveal(e)) }, y.prototype.prepended = function (t) { var e = this._itemize(t); if (e.length) { var i = this.items.slice(0); this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i) } }, y.prototype.reveal = function (t) { if (t && t.length) for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; n.reveal() } }, y.prototype.hide = function (t) { if (t && t.length) for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; n.hide() } }, y.prototype.getItem = function (t) { for (var e = 0, i = this.items.length; i > e; e++) { var n = this.items[e]; if (n.element === t) return n } }, y.prototype.getItems = function (t) { if (t && t.length) { for (var e = [], i = 0, n = t.length; n > i; i++) { var o = t[i], r = this.getItem(o); r && e.push(r) } return e } }, y.prototype.remove = function (t) { t = n(t); var e = this.getItems(t); if (e && e.length) { this._itemsOn(e, "remove", function () { this.emitEvent("removeComplete", [this, e]) }); for (var i = 0, r = e.length; r > i; i++) { var s = e[i]; s.remove(), o(s, this.items) } } }, y.prototype.destroy = function () { var t = this.element.style; t.height = "", t.position = "", t.width = ""; for (var e = 0, i = this.items.length; i > e; e++) { var n = this.items[e]; n.destroy() } this.unbindResize(), delete this.element.outlayerGUID, p && p.removeData(this.element, this.settings.namespace) }, y.data = function (t) { var e = t && t.outlayerGUID; return e && _[e] }, y.create = function (t, i) { function n() { y.apply(this, arguments) } return e(n.prototype, y.prototype), g(n, "options"), g(n, "settings"), e(n.prototype.options, i), n.prototype.settings.namespace = t, n.data = y.data, n.Item = function () { m.apply(this, arguments) }, n.Item.prototype = new m, n.prototype.settings.item = n.Item, s(function () { for (var e = r(t), i = a.querySelectorAll(".js-" + e), o = "data-" + e + "-options", s = 0, u = i.length; u > s; s++) { var f, d = i[s], l = d.getAttribute(o); try { f = l && JSON.parse(l) } catch (c) { h && h.error("Error parsing " + o + " on " + d.nodeName.toLowerCase() + (d.id ? "#" + d.id : "") + ": " + c); continue } var m = new n(d, f); p && p.data(d, t, m) } }), p && p.bridget && p.bridget(t, n), n }, y.Item = m, y } var a = t.document, h = t.console, p = t.jQuery, u = function () { }, f = Object.prototype.toString, d = "object" == typeof HTMLElement ? function (t) { return t instanceof HTMLElement } : function (t) { return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName }, l = Array.prototype.indexOf ? function (t, e) { return t.indexOf(e) } : function (t, e) { for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i; return -1 }; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item) }(window), function (t) { function e(t, e) { var n = t.create("masonry"); return n.prototype._resetLayout = function () { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(); var t = this.cols; for (this.colYs = []; t--;) this.colYs.push(0); this.maxY = 0 }, n.prototype.measureColumns = function () { if (this.getContainerWidth(), !this.columnWidth) { var t = this.items[0], i = t && t.element; this.columnWidth = i && e(i).outerWidth || this.containerWidth } this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1) }, n.prototype.getContainerWidth = function () { var t = this.options.isFitWidth ? this.element.parentNode : this.element, i = e(t); this.containerWidth = i && i.innerWidth }, n.prototype._getItemLayoutPosition = function (t) { t.getSize(); var e = t.size.outerWidth % this.columnWidth, n = e && 1 > e ? "round" : "ceil", o = Math[n](t.size.outerWidth / this.columnWidth); o = Math.min(o, this.cols); for (var r = this._getColGroup(o), s = Math.min.apply(Math, r), a = i(r, s), h = { x: this.columnWidth * a, y: s }, p = s + t.size.outerHeight, u = this.cols + 1 - r.length, f = 0; u > f; f++) this.colYs[a + f] = p; return h }, n.prototype._getColGroup = function (t) { if (2 > t) return this.colYs; for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) { var o = this.colYs.slice(n, n + t); e[n] = Math.max.apply(Math, o) } return e }, n.prototype._manageStamp = function (t) { var i = e(t), n = this._getElementOffset(t), o = this.options.isOriginLeft ? n.left : n.right, r = o + i.outerWidth, s = Math.floor(o / this.columnWidth); s = Math.max(0, s); var a = Math.floor(r / this.columnWidth); a = Math.min(this.cols - 1, a); for (var h = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, p = s; a >= p; p++) this.colYs[p] = Math.max(h, this.colYs[p]) }, n.prototype._getContainerSize = function () { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t }, n.prototype._getContainerFitWidth = function () { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++; return (this.cols - t) * this.columnWidth - this.gutter }, n.prototype.resize = function () { var t = this.containerWidth; this.getContainerWidth(), t !== this.containerWidth && this.layout() }, n } var i = Array.prototype.indexOf ? function (t, e) { return t.indexOf(e) } : function (t, e) { for (var i = 0, n = t.length; n > i; i++) { var o = t[i]; if (o === e) return i } return -1 }; "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize) }(window);
/*! Video.js v4.0.4 Copyright 2013 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
(function () {
	var b = void 0, f = !0, h = null, l = !1; function m() { return function () { } } function p(a) { return function () { return this[a] } } function r(a) { return function () { return a } } var t; document.createElement("video"); document.createElement("audio"); function u(a, c, d) { if ("string" === typeof a) { 0 === a.indexOf("#") && (a = a.slice(1)); if (u.La[a]) return u.La[a]; a = u.r(a) } if (!a || !a.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)"); return a.player || new u.ea(a, c, d) } var v = u; window.xd = window.yd = u; u.Ob = "4.0";
	u.xc = "https:" == document.location.protocol ? "https://" : "http://"; u.options = { techOrder: ["html5", "flash"], html5: {}, flash: {}, width: 300, height: 150, defaultVolume: 0, children: { mediaLoader: {}, posterImage: {}, textTrackDisplay: {}, loadingSpinner: {}, bigPlayButton: {}, controlBar: {} } }; "GENERATED_CDN_VSN" !== u.Ob && (v.options.flash.swf = u.xc + "vjs.zencdn.net/" + u.Ob + "/video-js.swf"); u.La = {}; u.ka = u.CoreObject = m();
	u.ka.extend = function (a) { var c, d; a = a || {}; c = a.init || a.g || this.prototype.init || this.prototype.g || m(); d = function () { c.apply(this, arguments) }; d.prototype = u.i.create(this.prototype); d.prototype.constructor = d; d.extend = u.ka.extend; d.create = u.ka.create; for (var e in a) a.hasOwnProperty(e) && (d.prototype[e] = a[e]); return d }; u.ka.create = function () { var a = u.i.create(this.prototype); this.apply(a, arguments); return a };
	u.d = function (a, c, d) { var e = u.getData(a); e.z || (e.z = {}); e.z[c] || (e.z[c] = []); d.u || (d.u = u.u++); e.z[c].push(d); e.S || (e.disabled = l, e.S = function (c) { if (!e.disabled) { c = u.fc(c); var d = e.z[c.type]; if (d) for (var d = d.slice(0), k = 0, q = d.length; k < q && !c.lc() ; k++) d[k].call(a, c) } }); 1 == e.z[c].length && (document.addEventListener ? a.addEventListener(c, e.S, l) : document.attachEvent && a.attachEvent("on" + c, e.S)) };
	u.t = function (a, c, d) { if (u.kc(a)) { var e = u.getData(a); if (e.z) if (c) { var g = e.z[c]; if (g) { if (d) { if (d.u) for (e = 0; e < g.length; e++) g[e].u === d.u && g.splice(e--, 1) } else e.z[c] = []; u.cc(a, c) } } else for (g in e.z) c = g, e.z[c] = [], u.cc(a, c) } }; u.cc = function (a, c) { var d = u.getData(a); 0 === d.z[c].length && (delete d.z[c], document.removeEventListener ? a.removeEventListener(c, d.S, l) : document.detachEvent && a.detachEvent("on" + c, d.S)); u.zb(d.z) && (delete d.z, delete d.S, delete d.disabled); u.zb(d) && u.rc(a) };
	u.fc = function (a) {
		function c() { return f } function d() { return l } if (!a || !a.Ab) {
			var e = a || window.event; a = {}; for (var g in e) "layerX" !== g && "layerY" !== g && (a[g] = e[g]); a.target || (a.target = a.srcElement || document); a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement; a.preventDefault = function () { e.preventDefault && e.preventDefault(); a.returnValue = l; a.yb = c }; a.yb = d; a.stopPropagation = function () { e.stopPropagation && e.stopPropagation(); a.cancelBubble = f; a.Ab = c }; a.Ab = d; a.stopImmediatePropagation = function () {
				e.stopImmediatePropagation &&
				e.stopImmediatePropagation(); a.lc = c; a.stopPropagation()
			}; a.lc = d; if (a.clientX != h) { g = document.documentElement; var j = document.body; a.pageX = a.clientX + (g && g.scrollLeft || j && j.scrollLeft || 0) - (g && g.clientLeft || j && j.clientLeft || 0); a.pageY = a.clientY + (g && g.scrollTop || j && j.scrollTop || 0) - (g && g.clientTop || j && j.clientTop || 0) } a.which = a.charCode || a.keyCode; a.button != h && (a.button = a.button & 1 ? 0 : a.button & 4 ? 1 : a.button & 2 ? 2 : 0)
		} return a
	};
	u.k = function (a, c) { var d = u.kc(a) ? u.getData(a) : {}, e = a.parentNode || a.ownerDocument; "string" === typeof c && (c = { type: c, target: a }); c = u.fc(c); d.S && d.S.call(a, c); if (e && !c.Ab()) u.k(e, c); else if (!e && !c.yb() && (d = u.getData(c.target), c.target[c.type])) { d.disabled = f; if ("function" === typeof c.target[c.type]) c.target[c.type](); d.disabled = l } return !c.yb() }; u.Q = function (a, c, d) { u.d(a, c, function () { u.t(a, c, arguments.callee); d.apply(this, arguments) }) }; var w = Object.prototype.hasOwnProperty;
	u.e = function (a, c) { var d = document.createElement(a || "div"), e; for (e in c) w.call(c, e) && (-1 !== e.indexOf("aria-") || "role" == e ? d.setAttribute(e, c[e]) : d[e] = c[e]); return d }; u.Y = function (a) { return a.charAt(0).toUpperCase() + a.slice(1) }; u.i = {}; u.i.create = Object.create || function (a) { function c() { } c.prototype = a; return new c }; u.i.qa = function (a, c, d) { for (var e in a) w.call(a, e) && c.call(d || this, e, a[e]) }; u.i.B = function (a, c) { if (!c) return a; for (var d in c) w.call(c, d) && (a[d] = c[d]); return a };
	u.i.ec = function (a, c) { var d, e, g; a = u.i.copy(a); for (d in c) w.call(c, d) && (e = a[d], g = c[d], a[d] = u.i.mc(e) && u.i.mc(g) ? u.i.ec(e, g) : c[d]); return a }; u.i.copy = function (a) { return u.i.B({}, a) }; u.i.mc = function (a) { return !!a && "object" === typeof a && "[object Object]" === a.toString() && a.constructor === Object }; u.bind = function (a, c, d) { function e() { return c.apply(a, arguments) } c.u || (c.u = u.u++); e.u = d ? d + "_" + c.u : c.u; return e }; u.oa = {}; u.u = 1; u.expando = "vdata" + (new Date).getTime();
	u.getData = function (a) { var c = a[u.expando]; c || (c = a[u.expando] = u.u++, u.oa[c] = {}); return u.oa[c] }; u.kc = function (a) { a = a[u.expando]; return !(!a || u.zb(u.oa[a])) }; u.rc = function (a) { var c = a[u.expando]; if (c) { delete u.oa[c]; try { delete a[u.expando] } catch (d) { a.removeAttribute ? a.removeAttribute(u.expando) : a[u.expando] = h } } }; u.zb = function (a) { for (var c in a) if (a[c] !== h) return l; return f }; u.p = function (a, c) { -1 == (" " + a.className + " ").indexOf(" " + c + " ") && (a.className = "" === a.className ? c : a.className + " " + c) };
	u.w = function (a, c) { if (-1 != a.className.indexOf(c)) { for (var d = a.className.split(" "), e = d.length - 1; 0 <= e; e--) d[e] === c && d.splice(e, 1); a.className = d.join(" ") } }; u.gb = u.e("video"); u.O = navigator.userAgent; u.Bc = !!u.O.match(/iPhone/i); u.Ac = !!u.O.match(/iPad/i); u.Cc = !!u.O.match(/iPod/i); u.Sb = u.Bc || u.Ac || u.Cc; var x = u, y; var z = u.O.match(/OS (\d+)_/i); y = z && z[1] ? z[1] : b; x.qd = y; u.Za = !!u.O.match(/Android.*AppleWebKit/i); var aa = u, A = u.O.match(/Android (\d+)\./i); aa.yc = A && A[1] ? A[1] : h; u.zc = function () { return !!u.O.match("Firefox") };
	u.vb = function (a) { var c = {}; if (a && a.attributes && 0 < a.attributes.length) for (var d = a.attributes, e, g, j = d.length - 1; 0 <= j; j--) { e = d[j].name; g = d[j].value; if ("boolean" === typeof a[e] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + e + ",")) g = g !== h ? f : l; c[e] = g } return c }; u.td = function (a, c) { var d = ""; document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(c) : a.currentStyle && (d = a["client" + c.substr(0, 1).toUpperCase() + c.substr(1)] + "px"); return d };
	u.xb = function (a, c) { c.firstChild ? c.insertBefore(a, c.firstChild) : c.appendChild(a) }; u.Mb = {}; u.r = function (a) { 0 === a.indexOf("#") && (a = a.slice(1)); return document.getElementById(a) }; u.Ga = function (a, c) { c = c || a; var d = Math.floor(a % 60), e = Math.floor(a / 60 % 60), g = Math.floor(a / 3600), j = Math.floor(c / 60 % 60), k = Math.floor(c / 3600), g = 0 < g || 0 < k ? g + ":" : ""; return g + (((g || 10 <= j) && 10 > e ? "0" + e : e) + ":") + (10 > d ? "0" + d : d) }; u.Gc = function () { document.body.focus(); document.onselectstart = r(l) }; u.ld = function () { document.onselectstart = r(f) };
	u.trim = function (a) { return a.toString().replace(/^\s+/, "").replace(/\s+$/, "") }; u.round = function (a, c) { c || (c = 0); return Math.round(a * Math.pow(10, c)) / Math.pow(10, c) }; u.rb = function (a, c) { return { length: 1, start: function () { return a }, end: function () { return c } } };
	u.get = function (a, c, d) {
		var e = 0 === a.indexOf("file:") || 0 === window.location.href.indexOf("file:") && -1 === a.indexOf("http"); "undefined" === typeof XMLHttpRequest && (window.XMLHttpRequest = function () { try { return new window.ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (a) { } try { return new window.ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (c) { } try { return new window.ActiveXObject("Msxml2.XMLHTTP") } catch (d) { } throw Error("This browser does not support XMLHttpRequest."); }); var g = new XMLHttpRequest; try { g.open("GET", a) } catch (j) { d(j) } g.onreadystatechange =
		function () { 4 === g.readyState && (200 === g.status || e && 0 === g.status ? c(g.responseText) : d && d()) }; try { g.send() } catch (k) { d && d(k) }
	}; u.dd = function (a) { try { var c = window.localStorage || l; c && (c.volume = a) } catch (d) { 22 == d.code || 1014 == d.code ? u.log("LocalStorage Full (VideoJS)", d) : 18 == d.code ? u.log("LocalStorage not allowed (VideoJS)", d) : u.log("LocalStorage Error (VideoJS)", d) } }; u.ic = function (a) { a.match(/^https?:\/\//) || (a = u.e("div", { innerHTML: '<a href="' + a + '">x</a>' }).firstChild.href); return a };
	u.log = function () { u.log.history = u.log.history || []; u.log.history.push(arguments); window.console && window.console.log(Array.prototype.slice.call(arguments)) }; u.Oc = function (a) { var c, d; a.getBoundingClientRect && a.parentNode && (c = a.getBoundingClientRect()); if (!c) return { left: 0, top: 0 }; a = document.documentElement; d = document.body; return { left: c.left + (window.pageXOffset || d.scrollLeft) - (a.clientLeft || d.clientLeft || 0), top: c.top + (window.pageYOffset || d.scrollTop) - (a.clientTop || d.clientTop || 0) } };
	u.c = u.ka.extend({ g: function (a, c, d) { this.a = a; this.f = u.i.copy(this.f); c = this.options(c); this.L = c.id || (c.el && c.el.id ? c.el.id : a.id() + "_component_" + u.u++); this.Tc = c.name || h; this.b = c.el || this.e(); this.D = []; this.pb = {}; this.R = {}; if ((a = this.f) && a.children) { var e = this; u.i.qa(a.children, function (a, c) { c !== l && !c.loadEvent && (e[a] = e.X(a, c)) }) } this.M(d) } }); t = u.c.prototype;
	t.C = function () { if (this.D) for (var a = this.D.length - 1; 0 <= a; a--) this.D[a].C && this.D[a].C(); this.R = this.pb = this.D = h; this.t(); this.b.parentNode && this.b.parentNode.removeChild(this.b); u.rc(this.b); this.b = h }; t.oc = p("a"); t.options = function (a) { return a === b ? this.f : this.f = u.i.ec(this.f, a) }; t.e = function (a, c) { return u.e(a, c) }; t.r = p("b"); t.id = p("L"); t.name = p("Tc"); t.children = p("D");
	t.X = function (a, c) { var d, e; "string" === typeof a ? (e = a, c = c || {}, d = c.componentClass || u.Y(e), c.name = e, d = new window.videojs[d](this.a || this, c)) : d = a; this.D.push(d); "function" === typeof d.id && (this.pb[d.id()] = d); (e = e || d.name && d.name()) && (this.R[e] = d); "function" === typeof d.el && d.el() && (this.pa || this.b).appendChild(d.el()); return d };
	t.removeChild = function (a) { "string" === typeof a && (a = this.R[a]); if (a && this.D) { for (var c = l, d = this.D.length - 1; 0 <= d; d--) if (this.D[d] === a) { c = f; this.D.splice(d, 1); break } c && (this.pb[a.id] = h, this.R[a.name] = h, (c = a.r()) && c.parentNode === (this.pa || this.b) && (this.pa || this.b).removeChild(a.r())) } }; t.P = r(""); t.d = function (a, c) { u.d(this.b, a, u.bind(this, c)); return this }; t.t = function (a, c) { u.t(this.b, a, c); return this }; t.Q = function (a, c) { u.Q(this.b, a, u.bind(this, c)); return this }; t.k = function (a, c) { u.k(this.b, a, c); return this };
	t.M = function (a) { a && (this.Z ? a.call(this) : (this.Oa === b && (this.Oa = []), this.Oa.push(a))); return this }; t.Ra = function () { this.Z = f; var a = this.Oa; if (a && 0 < a.length) { for (var c = 0, d = a.length; c < d; c++) a[c].call(this); this.Oa = []; this.k("ready") } }; t.p = function (a) { u.p(this.b, a); return this }; t.w = function (a) { u.w(this.b, a); return this }; t.show = function () { this.b.style.display = "block"; return this }; t.v = function () { this.b.style.display = "none"; return this }; t.ha = function () { this.w("vjs-fade-out"); this.p("vjs-fade-in"); return this };
	t.Fa = function () { this.w("vjs-fade-in"); this.p("vjs-fade-out"); return this }; t.nc = function () { this.p("vjs-lock-showing"); return this }; t.Sa = function () { this.w("vjs-lock-showing"); return this }; t.disable = function () { this.v(); this.show = m(); this.ha = m() }; t.width = function (a, c) { return B(this, "width", a, c) }; t.height = function (a, c) { return B(this, "height", a, c) }; t.Kc = function (a, c) { return this.width(a, f).height(c) };
	function B(a, c, d, e) { if (d !== b) return a.b.style[c] = -1 !== ("" + d).indexOf("%") || -1 !== ("" + d).indexOf("px") ? d : "auto" === d ? "" : d + "px", e || a.k("resize"), a; if (!a.b) return 0; d = a.b.style[c]; e = d.indexOf("px"); return -1 !== e ? parseInt(d.slice(0, e), 10) : parseInt(a.b["offset" + u.Y(c)], 10) }
	u.o = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); var d = l; this.d("touchstart", function () { d = f }); this.d("touchmove", function () { d = l }); var e = this; this.d("touchend", function (a) { d && e.n(a); a.preventDefault(); a.stopPropagation() }); this.d("click", this.n); this.d("focus", this.Ja); this.d("blur", this.Ia) } }); t = u.o.prototype;
	t.e = function (a, c) { c = u.i.B({ className: this.P(), innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + (this.na || "Need Text") + "</span></div>", ad: "button", "aria-live": "polite", tabIndex: 0 }, c); return u.c.prototype.e.call(this, a, c) }; t.P = function () { return "vjs-control " + u.c.prototype.P.call(this) }; t.n = m(); t.Ja = function () { u.d(document, "keyup", u.bind(this, this.$)) }; t.$ = function (a) { if (32 == a.which || 13 == a.which) a.preventDefault(), this.n() };
	t.Ia = function () { u.t(document, "keyup", u.bind(this, this.$)) }; u.J = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); this.Fc = this.R[this.f.barName]; this.handle = this.R[this.f.handleName]; a.d(this.pc, u.bind(this, this.update)); this.d("mousedown", this.Ka); this.d("touchstart", this.Ka); this.d("focus", this.Ja); this.d("blur", this.Ia); this.d("click", this.n); this.a.d("controlsvisible", u.bind(this, this.update)); a.M(u.bind(this, this.update)); this.K = {} } }); t = u.J.prototype;
	t.e = function (a, c) { c = c || {}; c.className += " vjs-slider"; c = u.i.B({ ad: "slider", "aria-valuenow": 0, "aria-valuemin": 0, "aria-valuemax": 100, tabIndex: 0 }, c); return u.c.prototype.e.call(this, a, c) }; t.Ka = function (a) { a.preventDefault(); u.Gc(); this.K.move = u.bind(this, this.Fb); this.K.end = u.bind(this, this.Gb); u.d(document, "mousemove", this.K.move); u.d(document, "mouseup", this.K.end); u.d(document, "touchmove", this.K.move); u.d(document, "touchend", this.K.end); this.Fb(a) };
	t.Gb = function () { u.ld(); u.t(document, "mousemove", this.K.move, l); u.t(document, "mouseup", this.K.end, l); u.t(document, "touchmove", this.K.move, l); u.t(document, "touchend", this.K.end, l); this.update() }; t.update = function () { if (this.b) { var a, c = this.wb(), d = this.handle, e = this.Fc; isNaN(c) && (c = 0); a = c; if (d) { a = this.b.offsetWidth; var g = d.r().offsetWidth; a = g ? g / a : 0; c *= 1 - a; a = c + a / 2; d.r().style.left = u.round(100 * c, 2) + "%" } e.r().style.width = u.round(100 * a, 2) + "%" } };
	function C(a, c) { var d, e, g, j; d = a.b; e = u.Oc(d); j = g = d.offsetWidth; d = a.handle; if (a.f.md) return j = e.top, e = c.changedTouches ? c.changedTouches[0].pageY : c.pageY, d && (d = d.r().offsetHeight, j += d / 2, g -= d), Math.max(0, Math.min(1, (j - e + g) / g)); g = e.left; e = c.changedTouches ? c.changedTouches[0].pageX : c.pageX; d && (d = d.r().offsetWidth, g += d / 2, j -= d); return Math.max(0, Math.min(1, (e - g) / j)) } t.Ja = function () { u.d(document, "keyup", u.bind(this, this.$)) };
	t.$ = function (a) { 37 == a.which ? (a.preventDefault(), this.uc()) : 39 == a.which && (a.preventDefault(), this.vc()) }; t.Ia = function () { u.t(document, "keyup", u.bind(this, this.$)) }; t.n = function (a) { a.stopImmediatePropagation(); a.preventDefault() }; u.fa = u.c.extend(); u.fa.prototype.defaultValue = 0; u.fa.prototype.e = function (a, c) { c = c || {}; c.className += " vjs-slider-handle"; c = u.i.B({ innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>" }, c); return u.c.prototype.e.call(this, "div", c) }; u.la = u.c.extend();
	function ba(a, c) { a.X(c); c.d("click", u.bind(a, function () { this.Sa() })) } u.la.prototype.e = function () { var a = this.options().Ic || "ul"; this.pa = u.e(a, { className: "vjs-menu-content" }); a = u.c.prototype.e.call(this, "div", { append: this.pa, className: "vjs-menu" }); a.appendChild(this.pa); u.d(a, "click", function (a) { a.preventDefault(); a.stopImmediatePropagation() }); return a }; u.I = u.o.extend({ g: function (a, c) { u.o.call(this, a, c); this.selected(c.selected) } });
	u.I.prototype.e = function (a, c) { return u.o.prototype.e.call(this, "li", u.i.B({ className: "vjs-menu-item", innerHTML: this.f.label }, c)) }; u.I.prototype.n = function () { this.selected(f) }; u.I.prototype.selected = function (a) { a ? (this.p("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.w("vjs-selected"), this.b.setAttribute("aria-selected", l)) };
	u.ca = u.o.extend({ g: function (a, c) { u.o.call(this, a, c); this.sa = this.Ea(); this.X(this.sa); this.G && 0 === this.G.length && this.v(); this.d("keyup", this.$); this.b.setAttribute("aria-haspopup", f); this.b.setAttribute("role", "button") } }); t = u.ca.prototype; t.ma = l; t.Ea = function () { var a = new u.la(this.a); this.options().title && a.r().appendChild(u.e("li", { className: "vjs-menu-title", innerHTML: u.Y(this.A), jd: -1 })); if (this.G = this.qb()) for (var c = 0; c < this.G.length; c++) ba(a, this.G[c]); return a }; t.qb = m();
	t.P = function () { return this.className + " vjs-menu-button " + u.o.prototype.P.call(this) }; t.Ja = m(); t.Ia = m(); t.n = function () { this.Q("mouseout", u.bind(this, function () { this.sa.Sa(); this.b.blur() })); this.ma ? D(this) : E(this) }; t.$ = function (a) { a.preventDefault(); 32 == a.which || 13 == a.which ? this.ma ? D(this) : E(this) : 27 == a.which && this.ma && D(this) }; function E(a) { a.ma = f; a.sa.nc(); a.b.setAttribute("aria-pressed", f); a.G && 0 < a.G.length && a.G[0].r().focus() } function D(a) { a.ma = l; a.sa.Sa(); a.b.setAttribute("aria-pressed", l) }
	u.ea = u.c.extend({
		g: function (a, c, d) {
			this.N = a; c = u.i.B(ca(a), c); this.s = {}; this.qc = c.poster; this.Da = c.controls; c.customControlsOnMobile !== f && (u.Sb || u.Za) ? (a.controls = c.controls, this.Da = l) : a.controls = l; u.c.call(this, this, c, d); this.Q("play", function (a) { u.k(this.b, { type: "firstplay", target: this.b }) || (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation()) }); this.d("ended", this.Vc); this.d("play", this.Ib); this.d("firstplay", this.Wc); this.d("pause", this.Hb); this.d("progress", this.Yc); this.d("durationchange",
			this.Uc); this.d("error", this.Eb); this.d("fullscreenchange", this.Xc); u.La[this.L] = this; c.plugins && u.i.qa(c.plugins, function (a, c) { this[a](c) }, this)
		}
	}); t = u.ea.prototype; t.f = u.options; t.C = function () { u.La[this.L] = h; this.N && this.N.player && (this.N.player = h); this.b && this.b.player && (this.b.player = h); clearInterval(this.Na); this.ta(); this.h && this.h.C(); u.c.prototype.C.call(this) };
	function ca(a) { var c = { sources: [], tracks: [] }; u.i.B(c, u.vb(a)); if (a.hasChildNodes()) for (var d, e = a.childNodes, g = 0, j = e.length; g < j; g++) a = e[g], d = a.nodeName.toLowerCase(), "source" === d ? c.sources.push(u.vb(a)) : "track" === d && c.tracks.push(u.vb(a)); return c }
	t.e = function () {
		var a = this.b = u.c.prototype.e.call(this, "div"), c = this.N; c.removeAttribute("width"); c.removeAttribute("height"); if (c.hasChildNodes()) for (var d = c.childNodes.length, e = 0, g = c.childNodes; e < d; e++) ("source" == g[0].nodeName.toLowerCase() || "track" == g[0].nodeName.toLowerCase()) && c.removeChild(g[0]); c.id = c.id || "vjs_video_" + u.u++; a.id = c.id; a.className = c.className; c.id += "_html5_api"; c.className = "vjs-tech"; c.player = a.player = this; this.p("vjs-paused"); this.width(this.f.width, f); this.height(this.f.height,
		f); c.parentNode && c.parentNode.insertBefore(a, c); u.xb(c, a); return a
	};
	function F(a, c, d) {
		a.h ? (a.Z = l, a.h.C(), a.Cb && (a.Cb = l, clearInterval(a.Na)), a.Db && G(a), a.h = l) : "Html5" !== c && a.N && (a.b.removeChild(a.N), a.N.oc = h, a.N = h); a.ua = c; a.Z = l; var e = u.i.B({ source: d, parentEl: a.b }, a.f[c.toLowerCase()]); d && (d.src == a.s.src && 0 < a.s.currentTime && (e.startTime = a.s.currentTime), a.s.src = d.src); a.h = new window.videojs[c](a, e); a.h.M(function () {
			this.a.Ra(); if (!this.j.Kb) {
				var a = this.a; a.Cb = f; a.Na = setInterval(u.bind(a, function () {
					this.s.lb < this.buffered().end(0) ? this.k("progress") : 1 == H(this) && (clearInterval(this.Na),
					this.k("progress"))
				}), 500); a.h.Q("progress", function () { this.j.Kb = f; var a = this.a; a.Cb = l; clearInterval(a.Na) })
			} this.j.Nb || (a = this.a, a.Db = f, a.d("play", a.wc), a.d("pause", a.ta), a.h.Q("timeupdate", function () { this.j.Nb = f; G(this.a) }))
		})
	} function G(a) { a.Db = l; a.ta(); a.t("play", a.wc); a.t("pause", a.ta) } t.wc = function () { this.dc && this.ta(); this.dc = setInterval(u.bind(this, function () { this.k("timeupdate") }), 250) }; t.ta = function () { clearInterval(this.dc) }; t.Vc = function () { this.f.loop && (this.currentTime(0), this.play()) };
	t.Ib = function () { u.w(this.b, "vjs-paused"); u.p(this.b, "vjs-playing") }; t.Wc = function () { this.f.starttime && this.currentTime(this.f.starttime) }; t.Hb = function () { u.w(this.b, "vjs-playing"); u.p(this.b, "vjs-paused") }; t.Yc = function () { 1 == H(this) && this.k("loadedalldata") }; t.Uc = function () { this.duration(I(this, "duration")) }; t.Eb = function (a) { u.log("Video Error", a) }; t.Xc = function () { this.F ? this.p("vjs-fullscreen") : this.w("vjs-fullscreen") };
	function J(a, c, d) { if (a.h && a.h.Z) a.h.M(function () { this[c](d) }); else try { a.h[c](d) } catch (e) { throw u.log(e), e; } } function I(a, c) { if (a.h.Z) try { return a.h[c]() } catch (d) { throw a.h[c] === b ? u.log("Video.js: " + c + " method not defined for " + a.ua + " playback technology.", d) : "TypeError" == d.name ? (u.log("Video.js: " + c + " unavailable on " + a.ua + " playback technology element.", d), a.h.Z = l) : u.log(d), d; } } t.play = function () { J(this, "play"); return this }; t.pause = function () { J(this, "pause"); return this };
	t.paused = function () { return I(this, "paused") === l ? l : f }; t.currentTime = function (a) { return a !== b ? (this.s.vd = a, J(this, "setCurrentTime", a), this.Db && this.k("timeupdate"), this) : this.s.currentTime = I(this, "currentTime") || 0 }; t.duration = function (a) { return a !== b ? (this.s.duration = parseFloat(a), this) : this.s.duration }; t.buffered = function () { var a = I(this, "buffered"), c = this.s.lb = this.s.lb || 0; a && (0 < a.length && a.end(0) !== c) && (c = a.end(0), this.s.lb = c); return u.rb(0, c) };
	function H(a) { return a.duration() ? a.buffered().end(0) / a.duration() : 0 } t.volume = function (a) { if (a !== b) return a = Math.max(0, Math.min(1, parseFloat(a))), this.s.volume = a, J(this, "setVolume", a), u.dd(a), this; a = parseFloat(I(this, "volume")); return isNaN(a) ? 1 : a }; t.muted = function (a) { return a !== b ? (J(this, "setMuted", a), this) : I(this, "muted") || l }; t.Qa = function () { return I(this, "supportsFullScreen") || l };
	t.Pa = function () { var a = u.Mb.Pa; this.F = f; a ? (u.d(document, a.tb, u.bind(this, function (c) { this.F = document[a.F]; this.F === l && u.t(document, a.tb, arguments.callee); this.k("fullscreenchange") })), this.b[a.sc]()) : this.h.Qa() ? J(this, "enterFullScreen") : (this.Qc = f, this.Lc = document.documentElement.style.overflow, u.d(document, "keydown", u.bind(this, this.gc)), document.documentElement.style.overflow = "hidden", u.p(document.body, "vjs-full-window"), this.k("enterFullWindow"), this.k("fullscreenchange")); return this };
	function K(a) { var c = u.Mb.Pa; a.F = l; if (c) document[c.nb](); else a.h.Qa() ? J(a, "exitFullScreen") : (L(a), a.k("fullscreenchange")) } t.gc = function (a) { 27 === a.keyCode && (this.F === f ? K(this) : L(this)) }; function L(a) { a.Qc = l; u.t(document, "keydown", a.gc); document.documentElement.style.overflow = a.Lc; u.w(document.body, "vjs-full-window"); a.k("exitFullWindow") }
	t.src = function (a) {
		if (a instanceof Array) { var c; a: { c = a; for (var d = 0, e = this.f.techOrder; d < e.length; d++) { var g = u.Y(e[d]), j = window.videojs[g]; if (j.isSupported()) for (var k = 0, q = c; k < q.length; k++) { var n = q[k]; if (j.canPlaySource(n)) { c = { source: n, h: g }; break a } } } c = l } c ? (a = c.source, c = c.h, c == this.ua ? this.src(a) : F(this, c, a)) : this.b.appendChild(u.e("p", { innerHTML: 'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.' })) } else a instanceof
		Object ? window.videojs[this.ua].canPlaySource(a) ? this.src(a.src) : this.src([a]) : (this.s.src = a, this.Z ? (J(this, "src", a), "auto" == this.f.preload && this.load(), this.f.autoplay && this.play()) : this.M(function () { this.src(a) })); return this
	}; t.load = function () { J(this, "load"); return this }; t.currentSrc = function () { return I(this, "currentSrc") || this.s.src || "" }; t.Ma = function (a) { return a !== b ? (J(this, "setPreload", a), this.f.preload = a, this) : I(this, "preload") };
	t.autoplay = function (a) { return a !== b ? (J(this, "setAutoplay", a), this.f.autoplay = a, this) : I(this, "autoplay") }; t.loop = function (a) { return a !== b ? (J(this, "setLoop", a), this.f.loop = a, this) : I(this, "loop") }; t.poster = function (a) { a !== b && (this.qc = a); return this.qc }; t.controls = function (a) { a !== b && this.Da !== a && (this.Da = !!a, this.k("controlschange")); return this.Da }; t.error = function () { return I(this, "error") }; var M, N, O; O = document.createElement("div"); N = {};
	O.rd !== b ? (N.sc = "requestFullscreen", N.nb = "exitFullscreen", N.tb = "fullscreenchange", N.F = "fullScreen") : (document.mozCancelFullScreen ? (M = "moz", N.F = M + "FullScreen") : (M = "webkit", N.F = M + "IsFullScreen"), O[M + "RequestFullScreen"] && (N.sc = M + "RequestFullScreen", N.nb = M + "CancelFullScreen"), N.tb = M + "fullscreenchange"); document[N.nb] && (u.Mb.Pa = N);
	u.ba = u.c.extend({
		g: function (a, c) {
			u.c.call(this, a, c); a.controls() || this.disable(); a.Q("play", u.bind(this, function () {
				var a, c = u.bind(this, this.ha), g = u.bind(this, this.Fa); this.ha(); "ontouchstart" in window || (this.a.d("mouseover", c), this.a.d("mouseout", g), this.a.d("pause", u.bind(this, this.nc)), this.a.d("play", u.bind(this, this.Sa))); a = l; this.a.d("touchstart", function () { a = f }); this.a.d("touchmove", function () { a = l }); this.a.d("touchend", u.bind(this, function (c) {
					var e; a && (e = this.r().className.search("fade-in"),
					-1 !== e ? this.Fa() : this.ha()); a = l; this.a.paused() || c.preventDefault()
				}))
			}))
		}
	}); u.ba.prototype.f = { wd: "play", children: { playToggle: {}, currentTimeDisplay: {}, timeDivider: {}, durationDisplay: {}, remainingTimeDisplay: {}, progressControl: {}, fullscreenToggle: {}, volumeControl: {}, muteToggle: {} } }; u.ba.prototype.e = function () { return u.e("div", { className: "vjs-control-bar" }) }; u.ba.prototype.ha = function () { u.c.prototype.ha.call(this); this.a.k("controlsvisible") };
	u.ba.prototype.Fa = function () { u.c.prototype.Fa.call(this); this.a.k("controlshidden") }; u.Vb = u.o.extend({ g: function (a, c) { u.o.call(this, a, c); a.d("play", u.bind(this, this.Ib)); a.d("pause", u.bind(this, this.Hb)) } }); t = u.Vb.prototype; t.na = "Play"; t.P = function () { return "vjs-play-control " + u.o.prototype.P.call(this) }; t.n = function () { this.a.paused() ? this.a.play() : this.a.pause() }; t.Ib = function () { u.w(this.b, "vjs-paused"); u.p(this.b, "vjs-playing"); this.b.children[0].children[0].innerHTML = "Pause" };
	t.Hb = function () { u.w(this.b, "vjs-playing"); u.p(this.b, "vjs-paused"); this.b.children[0].children[0].innerHTML = "Play" }; u.Wa = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); a.d("timeupdate", u.bind(this, this.xa)) } });
	u.Wa.prototype.e = function () { var a = u.c.prototype.e.call(this, "div", { className: "vjs-current-time vjs-time-controls vjs-control" }); this.content = u.e("div", { className: "vjs-current-time-display", innerHTML: '<span class="vjs-control-text">Current Time </span>0:00', "aria-live": "off" }); a.appendChild(u.e("div").appendChild(this.content)); return a };
	u.Wa.prototype.xa = function () { var a = this.a.Lb ? this.a.s.currentTime : this.a.currentTime(); this.content.innerHTML = '<span class="vjs-control-text">Current Time </span>' + u.Ga(a, this.a.duration()) }; u.Xa = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); a.d("timeupdate", u.bind(this, this.xa)) } });
	u.Xa.prototype.e = function () { var a = u.c.prototype.e.call(this, "div", { className: "vjs-duration vjs-time-controls vjs-control" }); this.content = u.e("div", { className: "vjs-duration-display", innerHTML: '<span class="vjs-control-text">Duration Time </span>0:00', "aria-live": "off" }); a.appendChild(u.e("div").appendChild(this.content)); return a }; u.Xa.prototype.xa = function () { this.a.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + u.Ga(this.a.duration())) };
	u.Zb = u.c.extend({ g: function (a, c) { u.c.call(this, a, c) } }); u.Zb.prototype.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-time-divider", innerHTML: "<div><span>/</span></div>" }) }; u.eb = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); a.d("timeupdate", u.bind(this, this.xa)) } });
	u.eb.prototype.e = function () { var a = u.c.prototype.e.call(this, "div", { className: "vjs-remaining-time vjs-time-controls vjs-control" }); this.content = u.e("div", { className: "vjs-remaining-time-display", innerHTML: '<span class="vjs-control-text">Remaining Time </span>-0:00', "aria-live": "off" }); a.appendChild(u.e("div").appendChild(this.content)); return a };
	u.eb.prototype.xa = function () { this.a.duration() && this.a.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Remaining Time </span>-' + u.Ga(this.a.duration() - this.a.currentTime())) }; u.za = u.o.extend({ g: function (a, c) { u.o.call(this, a, c) } }); u.za.prototype.na = "Fullscreen"; u.za.prototype.P = function () { return "vjs-fullscreen-control " + u.o.prototype.P.call(this) };
	u.za.prototype.n = function () { this.a.F ? (K(this.a), this.b.children[0].children[0].innerHTML = "Fullscreen") : (this.a.Pa(), this.b.children[0].children[0].innerHTML = "Non-Fullscreen") }; u.cb = u.c.extend({ g: function (a, c) { u.c.call(this, a, c) } }); u.cb.prototype.f = { children: { seekBar: {} } }; u.cb.prototype.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-progress-control vjs-control" }) }; u.Wb = u.J.extend({ g: function (a, c) { u.J.call(this, a, c); a.d("timeupdate", u.bind(this, this.wa)); a.M(u.bind(this, this.wa)) } });
	t = u.Wb.prototype; t.f = { children: { loadProgressBar: {}, playProgressBar: {}, seekHandle: {} }, barName: "playProgressBar", handleName: "seekHandle" }; t.pc = "timeupdate"; t.e = function () { return u.J.prototype.e.call(this, "div", { className: "vjs-progress-holder", "aria-label": "video progress bar" }) }; t.wa = function () { var a = this.a.Lb ? this.a.s.currentTime : this.a.currentTime(); this.b.setAttribute("aria-valuenow", u.round(100 * this.wb(), 2)); this.b.setAttribute("aria-valuetext", u.Ga(a, this.a.duration())) };
	t.wb = function () { return this.a.currentTime() / this.a.duration() }; t.Ka = function (a) { u.J.prototype.Ka.call(this, a); this.a.Lb = f; this.nd = !this.a.paused(); this.a.pause() }; t.Fb = function (a) { a = C(this, a) * this.a.duration(); a == this.a.duration() && (a -= 0.1); this.a.currentTime(a) }; t.Gb = function (a) { u.J.prototype.Gb.call(this, a); this.a.Lb = l; this.nd && this.a.play() }; t.vc = function () { this.a.currentTime(this.a.currentTime() + 5) }; t.uc = function () { this.a.currentTime(this.a.currentTime() - 5) };
	u.$a = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); a.d("progress", u.bind(this, this.update)) } }); u.$a.prototype.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-load-progress", innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>' }) }; u.$a.prototype.update = function () { this.b.style && (this.b.style.width = u.round(100 * H(this.a), 2) + "%") }; u.Ub = u.c.extend({ g: function (a, c) { u.c.call(this, a, c) } });
	u.Ub.prototype.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-play-progress", innerHTML: '<span class="vjs-control-text">Progress: 0%</span>' }) }; u.fb = u.fa.extend(); u.fb.prototype.defaultValue = "00:00"; u.fb.prototype.e = function () { return u.fa.prototype.e.call(this, "div", { className: "vjs-seek-handle" }) }; u.ib = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); a.h && (a.h.j && a.h.j.T === l) && this.p("vjs-hidden"); a.d("loadstart", u.bind(this, function () { a.h.j && a.h.j.T === l ? this.p("vjs-hidden") : this.w("vjs-hidden") })) } });
	u.ib.prototype.f = { children: { volumeBar: {} } }; u.ib.prototype.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-volume-control vjs-control" }) }; u.hb = u.J.extend({ g: function (a, c) { u.J.call(this, a, c); a.d("volumechange", u.bind(this, this.wa)); a.M(u.bind(this, this.wa)); setTimeout(u.bind(this, this.update), 0) } }); t = u.hb.prototype; t.wa = function () { this.b.setAttribute("aria-valuenow", u.round(100 * this.a.volume(), 2)); this.b.setAttribute("aria-valuetext", u.round(100 * this.a.volume(), 2) + "%") };
	t.f = { children: { volumeLevel: {}, volumeHandle: {} }, barName: "volumeLevel", handleName: "volumeHandle" }; t.pc = "volumechange"; t.e = function () { return u.J.prototype.e.call(this, "div", { className: "vjs-volume-bar", "aria-label": "volume level" }) }; t.Fb = function (a) { this.a.volume(C(this, a)) }; t.wb = function () { return this.a.muted() ? 0 : this.a.volume() }; t.vc = function () { this.a.volume(this.a.volume() + 0.1) }; t.uc = function () { this.a.volume(this.a.volume() - 0.1) }; u.$b = u.c.extend({ g: function (a, c) { u.c.call(this, a, c) } });
	u.$b.prototype.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-volume-level", innerHTML: '<span class="vjs-control-text"></span>' }) }; u.jb = u.fa.extend(); u.jb.prototype.defaultValue = "00:00"; u.jb.prototype.e = function () { return u.fa.prototype.e.call(this, "div", { className: "vjs-volume-handle" }) };
	u.da = u.o.extend({ g: function (a, c) { u.o.call(this, a, c); a.d("volumechange", u.bind(this, this.update)); a.h && (a.h.j && a.h.j.T === l) && this.p("vjs-hidden"); a.d("loadstart", u.bind(this, function () { a.h.j && a.h.j.T === l ? this.p("vjs-hidden") : this.w("vjs-hidden") })) } }); u.da.prototype.e = function () { return u.o.prototype.e.call(this, "div", { className: "vjs-mute-control vjs-control", innerHTML: '<div><span class="vjs-control-text">Mute</span></div>' }) }; u.da.prototype.n = function () { this.a.muted(this.a.muted() ? l : f) };
	u.da.prototype.update = function () { var a = this.a.volume(), c = 3; 0 === a || this.a.muted() ? c = 0 : 0.33 > a ? c = 1 : 0.67 > a && (c = 2); this.a.muted() ? "Unmute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Unmute") : "Mute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Mute"); for (a = 0; 4 > a; a++) u.w(this.b, "vjs-vol-" + a); u.p(this.b, "vjs-vol-" + c) };
	u.Ba = u.ca.extend({ g: function (a, c) { u.ca.call(this, a, c); a.d("volumechange", u.bind(this, this.update)); a.h && (a.h.j && a.h.j.T === l) && this.p("vjs-hidden"); a.d("loadstart", u.bind(this, function () { a.h.j && a.h.j.T === l ? this.p("vjs-hidden") : this.w("vjs-hidden") })); this.p("vjs-menu-button") } }); u.Ba.prototype.Ea = function () { var a = new u.la(this.a, { Ic: "div" }), c = new u.hb(this.a, u.i.B({ md: f }, this.f.zd)); a.X(c); return a }; u.Ba.prototype.n = function () { u.da.prototype.n.call(this); u.ca.prototype.n.call(this) };
	u.Ba.prototype.e = function () { return u.o.prototype.e.call(this, "div", { className: "vjs-volume-menu-button vjs-menu-button vjs-control", innerHTML: '<div><span class="vjs-control-text">Mute</span></div>' }) }; u.Ba.prototype.update = u.da.prototype.update; u.bb = u.o.extend({ g: function (a, c) { u.o.call(this, a, c); (!a.poster() || !a.controls()) && this.v(); a.d("play", u.bind(this, this.v)) } });
	u.bb.prototype.e = function () { var a = u.e("div", { className: "vjs-poster", tabIndex: -1 }), c = this.a.poster(); c && ("backgroundSize" in a.style ? a.style.backgroundImage = 'url("' + c + '")' : a.appendChild(u.e("img", { src: c }))); return a }; u.bb.prototype.n = function () { this.a.play() };
	u.Tb = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); a.d("canplay", u.bind(this, this.v)); a.d("canplaythrough", u.bind(this, this.v)); a.d("playing", u.bind(this, this.v)); a.d("seeked", u.bind(this, this.v)); a.d("seeking", u.bind(this, this.show)); a.d("seeked", u.bind(this, this.v)); a.d("error", u.bind(this, this.show)); a.d("waiting", u.bind(this, this.show)) } }); u.Tb.prototype.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-loading-spinner" }) };
	u.Ua = u.o.extend({ g: function (a, c) { u.o.call(this, a, c); a.controls() || this.v(); a.d("play", u.bind(this, this.v)) } }); u.Ua.prototype.e = function () { return u.o.prototype.e.call(this, "div", { className: "vjs-big-play-button", innerHTML: "<span></span>", "aria-label": "play video" }) }; u.Ua.prototype.n = function () { this.a.play() }; u.q = u.c.extend({ g: function (a, c, d) { u.c.call(this, a, c, d) } }); u.q.prototype.n = u.Za ? m() : function () { this.a.controls() && (this.a.paused() ? this.a.play() : this.a.pause()) }; u.q.prototype.j = { T: f, hc: l, Kb: l, Nb: l };
	u.media = {}; u.media.Ta = "play pause paused currentTime setCurrentTime duration buffered volume setVolume muted setMuted width height supportsFullScreen enterFullScreen src load currentSrc preload setPreload autoplay setAutoplay loop setLoop error networkState readyState seeking initialTime startOffsetTime played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks defaultPlaybackRate playbackRate mediaGroup controller controls defaultMuted".split(" ");
	function da() { var a = u.media.Ta[i]; return function () { throw Error('The "' + a + "\" method is not available on the playback technology's API"); } } for (var i = u.media.Ta.length - 1; 0 <= i; i--) u.q.prototype[u.media.Ta[i]] = da();
	u.m = u.q.extend({ g: function (a, c, d) { this.j.T = u.m.Hc(); this.j.Sc = !u.Sb; this.j.hc = f; u.q.call(this, a, c, d); (c = c.source) && this.b.currentSrc == c.src ? a.k("loadstart") : c && (this.b.src = c.src); a.M(function () { this.f.autoplay && this.paused() && (this.N.poster = h, this.play()) }); this.d("click", this.n); for (a = u.m.Ya.length - 1; 0 <= a; a--) u.d(this.b, u.m.Ya[a], u.bind(this.a, this.Nc)); this.Ra() } }); t = u.m.prototype; t.C = function () { u.q.prototype.C.call(this) };
	t.e = function () { var a = this.a, c = a.N; if (!c || this.j.Sc === l) c ? (a.r().removeChild(c), c = c.cloneNode(l)) : c = u.e("video", { id: a.id() + "_html5_api", className: "vjs-tech" }), c.player = a, u.xb(c, a.r()); for (var d = ["autoplay", "preload", "loop", "muted"], e = d.length - 1; 0 <= e; e--) { var g = d[e]; a.f[g] !== h && (c[g] = a.f[g]) } return c }; t.Nc = function (a) { this.k(a); a.stopPropagation() }; t.play = function () { this.b.play() }; t.pause = function () { this.b.pause() }; t.paused = function () { return this.b.paused }; t.currentTime = function () { return this.b.currentTime };
	t.cd = function (a) { try { this.b.currentTime = a } catch (c) { u.log(c, "Video is not ready. (Video.js)") } }; t.duration = function () { return this.b.duration || 0 }; t.buffered = function () { return this.b.buffered }; t.volume = function () { return this.b.volume }; t.hd = function (a) { this.b.volume = a }; t.muted = function () { return this.b.muted }; t.fd = function (a) { this.b.muted = a }; t.width = function () { return this.b.offsetWidth }; t.height = function () { return this.b.offsetHeight };
	t.Qa = function () { return "function" == typeof this.b.webkitEnterFullScreen && (/Android/.test(u.O) || !/Chrome|Mac OS X 10.5/.test(u.O)) ? f : l }; t.src = function (a) { this.b.src = a }; t.load = function () { this.b.load() }; t.currentSrc = function () { return this.b.currentSrc }; t.Ma = function () { return this.b.Ma }; t.gd = function (a) { this.b.Ma = a }; t.autoplay = function () { return this.b.autoplay }; t.bd = function (a) { this.b.autoplay = a }; t.loop = function () { return this.b.loop }; t.ed = function (a) { this.b.loop = a }; t.error = function () { return this.b.error };
	u.m.isSupported = function () { return !!document.createElement("video").canPlayType }; u.m.mb = function (a) { return !!document.createElement("video").canPlayType(a.type) }; u.m.Hc = function () { var a = u.gb.volume; u.gb.volume = a / 2 + 0.1; return a !== u.gb.volume }; u.m.Ya = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
	u.Za && 3 > u.yc && (document.createElement("video").constructor.prototype.canPlayType = function (a) { return a && -1 != a.toLowerCase().indexOf("video/mp4") ? "maybe" : "" });
	u.l = u.q.extend({
		g: function (a, c, d) {
			u.q.call(this, a, c, d); d = c.source; var e = c.parentEl, g = this.b = u.e("div", { id: a.id() + "_temp_flash" }), j = a.id() + "_flash_api"; a = a.f; var k = u.i.B({ readyFunction: "videojs.Flash.onReady", eventProxyFunction: "videojs.Flash.onEvent", errorEventProxyFunction: "videojs.Flash.onError", autoplay: a.autoplay, preload: a.Ma, loop: a.loop, muted: a.muted }, c.flashVars), q = u.i.B({ wmode: "opaque", bgcolor: "#000000" }, c.params), n = u.i.B({ id: j, name: j, "class": "vjs-tech" }, c.attributes); d && (k.src = encodeURIComponent(u.ic(d.src)));
			u.xb(g, e); c.startTime && this.M(function () { this.load(); this.play(); this.currentTime(c.startTime) }); if (c.iFrameMode === f && !u.zc) {
				var s = u.e("iframe", { id: j + "_iframe", name: j + "_iframe", className: "vjs-tech", scrolling: "no", marginWidth: 0, marginHeight: 0, frameBorder: 0 }); k.readyFunction = "ready"; k.eventProxyFunction = "events"; k.errorEventProxyFunction = "errors"; u.d(s, "load", u.bind(this, function () {
					var a, d = s.contentWindow; a = s.contentDocument ? s.contentDocument : s.contentWindow.document; a.write(u.l.jc(c.swf, k, q, n)); d.player =
					this.a; d.ready = u.bind(this.a, function (c) { c = a.getElementById(c); var d = this.h; d.b = c; u.d(c, "click", d.bind(d.n)); u.l.ob(d) }); d.events = u.bind(this.a, function (a, c) { this && "flash" === this.ua && this.k(c) }); d.errors = u.bind(this.a, function (a, c) { u.log("Flash Error", c) })
				})); g.parentNode.replaceChild(s, g)
			} else u.l.Mc(c.swf, g, k, q, n)
		}
	}); t = u.l.prototype; t.C = function () { u.q.prototype.C.call(this) }; t.play = function () { this.b.vjs_play() }; t.pause = function () { this.b.vjs_pause() };
	t.src = function (a) { a = u.ic(a); this.b.vjs_src(a); if (this.a.autoplay()) { var c = this; setTimeout(function () { c.play() }, 0) } }; t.load = function () { this.b.vjs_load() }; t.poster = function () { this.b.vjs_getProperty("poster") }; t.buffered = function () { return u.rb(0, this.b.vjs_getProperty("buffered")) }; t.Qa = r(l); var P = u.l.prototype, Q = "preload currentTime defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "), R = "error currentSrc networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" ");
	function ea() { var a = Q[S], c = a.charAt(0).toUpperCase() + a.slice(1); P["set" + c] = function (c) { return this.b.vjs_setProperty(a, c) } } function T(a) { P[a] = function () { return this.b.vjs_getProperty(a) } } var S; for (S = 0; S < Q.length; S++) T(Q[S]), ea(); for (S = 0; S < R.length; S++) T(R[S]); u.l.isSupported = function () { return 10 <= u.l.version()[0] }; u.l.mb = function (a) { if (a.type in u.l.Pc) return "maybe" }; u.l.Pc = { "video/flv": "FLV", "video/x-flv": "FLV", "video/mp4": "MP4", "video/m4v": "MP4" };
	u.l.onReady = function (a) { a = u.r(a); var c = a.player || a.parentNode.player, d = c.h; a.player = c; d.b = a; d.d("click", d.n); u.l.ob(d) }; u.l.ob = function (a) { a.r().vjs_getProperty ? a.Ra() : setTimeout(function () { u.l.ob(a) }, 50) }; u.l.onEvent = function (a, c) { u.r(a).player.k(c) }; u.l.onError = function (a, c) { u.r(a).player.k("error"); u.log("Flash Error", c, a) };
	u.l.version = function () { var a = "0,0,0"; try { a = (new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1] } catch (c) { try { navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (a = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]) } catch (d) { } } return a.split(",") };
	u.l.Mc = function (a, c, d, e, g) { a = u.l.jc(a, d, e, g); a = u.e("div", { innerHTML: a }).childNodes[0]; d = c.parentNode; c.parentNode.replaceChild(a, c); var j = d.childNodes[0]; setTimeout(function () { j.style.display = "block" }, 1E3) };
	u.l.jc = function (a, c, d, e) { var g = "", j = "", k = ""; c && u.i.qa(c, function (a, c) { g += a + "=" + c + "&amp;" }); d = u.i.B({ movie: a, flashvars: g, allowScriptAccess: "always", allowNetworking: "all" }, d); u.i.qa(d, function (a, c) { j += '<param name="' + a + '" value="' + c + '" />' }); e = u.i.B({ data: a, width: "100%", height: "100%" }, e); u.i.qa(e, function (a, c) { k += a + '="' + c + '" ' }); return '<object type="application/x-shockwave-flash"' + k + ">" + j + "</object>" };
	u.Dc = u.c.extend({ g: function (a, c, d) { u.c.call(this, a, c, d); if (!a.f.sources || 0 === a.f.sources.length) { c = 0; for (d = a.f.techOrder; c < d.length; c++) { var e = u.Y(d[c]), g = window.videojs[e]; if (g && g.isSupported()) { F(a, e); break } } } else a.src(a.f.sources) } }); function U(a) { a.va = a.va || []; return a.va } function V(a, c, d) { for (var e = a.va, g = 0, j = e.length, k, q; g < j; g++) k = e[g], k.id() === c ? (k.show(), q = k) : d && (k.H() == d && 0 < k.mode()) && k.disable(); (c = q ? q.H() : d ? d : l) && a.k(c + "trackchange") }
	u.U = u.c.extend({ g: function (a, c) { u.c.call(this, a, c); this.L = c.id || "vjs_" + c.kind + "_" + c.language + "_" + u.u++; this.tc = c.src; this.Jc = c["default"] || c.dflt; this.kd = c.title; this.ud = c.srclang; this.Rc = c.label; this.ga = []; this.ac = []; this.ia = this.ja = 0; this.a.d("fullscreenchange", u.bind(this, this.Ec)) } }); t = u.U.prototype; t.H = p("A"); t.src = p("tc"); t.sb = p("Jc"); t.title = p("kd"); t.label = p("Rc"); t.readyState = p("ja"); t.mode = p("ia"); t.Ec = function () { this.b.style.fontSize = this.a.F ? 140 * (screen.width / this.a.width()) + "%" : "" };
	t.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-" + this.A + " vjs-text-track" }) }; t.show = function () { W(this); this.ia = 2; u.c.prototype.show.call(this) }; t.v = function () { W(this); this.ia = 1; u.c.prototype.v.call(this) }; t.disable = function () { 2 == this.ia && this.v(); this.a.t("timeupdate", u.bind(this, this.update, this.L)); this.a.t("ended", u.bind(this, this.reset, this.L)); this.reset(); this.a.R.textTrackDisplay.removeChild(this); this.ia = 0 };
	function W(a) { 0 === a.ja && a.load(); 0 === a.ia && (a.a.d("timeupdate", u.bind(a, a.update, a.L)), a.a.d("ended", u.bind(a, a.reset, a.L)), ("captions" === a.A || "subtitles" === a.A) && a.a.R.textTrackDisplay.X(a)) } t.load = function () { 0 === this.ja && (this.ja = 1, u.get(this.tc, u.bind(this, this.Zc), u.bind(this, this.Eb))) }; t.Eb = function (a) { this.error = a; this.ja = 3; this.k("error") };
	t.Zc = function (a) { var c, d; a = a.split("\n"); for (var e = "", g = 1, j = a.length; g < j; g++) if (e = u.trim(a[g])) { -1 == e.indexOf("--\x3e") ? (c = e, e = u.trim(a[++g])) : c = this.ga.length; c = { id: c, index: this.ga.length }; d = e.split(" --\x3e "); c.startTime = X(d[0]); c.ra = X(d[1]); for (d = []; a[++g] && (e = u.trim(a[g])) ;) d.push(e); c.text = d.join("<br/>"); this.ga.push(c) } this.ja = 2; this.k("loaded") };
	function X(a) { var c = a.split(":"); a = 0; var d, e, g; 3 == c.length ? (d = c[0], e = c[1], c = c[2]) : (d = 0, e = c[0], c = c[1]); c = c.split(/\s+/); c = c.splice(0, 1)[0]; c = c.split(/\.|,/); g = parseFloat(c[1]); c = c[0]; a += 3600 * parseFloat(d); a += 60 * parseFloat(e); a += parseFloat(c); g && (a += g / 1E3); return a }
	t.update = function () {
		if (0 < this.ga.length) {
			var a = this.a.currentTime(); if (this.Jb === b || a < this.Jb || this.Ha <= a) {
				var c = this.ga, d = this.a.duration(), e = 0, g = l, j = [], k, q, n, s; a >= this.Ha || this.Ha === b ? s = this.ub !== b ? this.ub : 0 : (g = f, s = this.Bb !== b ? this.Bb : c.length - 1); for (; ;) {
					n = c[s]; if (n.ra <= a) e = Math.max(e, n.ra), n.Ca && (n.Ca = l); else if (a < n.startTime) { if (d = Math.min(d, n.startTime), n.Ca && (n.Ca = l), !g) break } else g ? (j.splice(0, 0, n), q === b && (q = s), k = s) : (j.push(n), k === b && (k = s), q = s), d = Math.min(d, n.ra), e = Math.max(e, n.startTime),
					n.Ca = f; if (g) if (0 === s) break; else s--; else if (s === c.length - 1) break; else s++
				} this.ac = j; this.Ha = d; this.Jb = e; this.ub = k; this.Bb = q; a = this.ac; c = ""; d = 0; for (e = a.length; d < e; d++) c += '<span class="vjs-tt-cue">' + a[d].text + "</span>"; this.b.innerHTML = c; this.k("cuechange")
			}
		}
	}; t.reset = function () { this.Ha = 0; this.Jb = this.a.duration(); this.Bb = this.ub = 0 }; u.Pb = u.U.extend(); u.Pb.prototype.A = "captions"; u.Xb = u.U.extend(); u.Xb.prototype.A = "subtitles"; u.Rb = u.U.extend(); u.Rb.prototype.A = "chapters";
	u.Yb = u.c.extend({ g: function (a, c, d) { u.c.call(this, a, c, d); if (a.f.tracks && 0 < a.f.tracks.length) { c = this.a; a = a.f.tracks; var e; for (d = 0; d < a.length; d++) { e = a[d]; var g = c, j = e.kind, k = e.label, q = e.language, n = e; e = g.va = g.va || []; n = n || {}; n.kind = j; n.label = k; n.language = q; j = u.Y(j || "subtitles"); g = new window.videojs[j + "Track"](g, n); e.push(g) } } } }); u.Yb.prototype.e = function () { return u.c.prototype.e.call(this, "div", { className: "vjs-text-track-display" }) };
	u.W = u.I.extend({ g: function (a, c) { var d = this.aa = c.track; c.label = d.label(); c.selected = d.sb(); u.I.call(this, a, c); this.a.d(d.H() + "trackchange", u.bind(this, this.update)) } }); u.W.prototype.n = function () { u.I.prototype.n.call(this); V(this.a, this.aa.L, this.aa.H()) }; u.W.prototype.update = function () { 2 == this.aa.mode() ? this.selected(f) : this.selected(l) }; u.ab = u.W.extend({ g: function (a, c) { c.track = { H: function () { return c.kind }, oc: a, label: function () { return c.kind + " off" }, sb: r(l), mode: r(l) }; u.W.call(this, a, c); this.selected(f) } });
	u.ab.prototype.n = function () { u.W.prototype.n.call(this); V(this.a, this.aa.L, this.aa.H()) }; u.ab.prototype.update = function () { for (var a = U(this.a), c = 0, d = a.length, e, g = f; c < d; c++) e = a[c], e.H() == this.aa.H() && 2 == e.mode() && (g = l); g ? this.selected(f) : this.selected(l) }; u.V = u.ca.extend({ g: function (a, c) { u.ca.call(this, a, c); 1 >= this.G.length && this.v() } });
	u.V.prototype.qb = function () { var a = [], c; a.push(new u.ab(this.a, { kind: this.A })); for (var d = 0; d < U(this.a).length; d++) c = U(this.a)[d], c.H() === this.A && a.push(new u.W(this.a, { track: c })); return a }; u.ya = u.V.extend({ g: function (a, c, d) { u.V.call(this, a, c, d); this.b.setAttribute("aria-label", "Captions Menu") } }); u.ya.prototype.A = "captions"; u.ya.prototype.na = "Captions"; u.ya.prototype.className = "vjs-captions-button"; u.Aa = u.V.extend({ g: function (a, c, d) { u.V.call(this, a, c, d); this.b.setAttribute("aria-label", "Subtitles Menu") } });
	u.Aa.prototype.A = "subtitles"; u.Aa.prototype.na = "Subtitles"; u.Aa.prototype.className = "vjs-subtitles-button"; u.Qb = u.V.extend({ g: function (a, c, d) { u.V.call(this, a, c, d); this.b.setAttribute("aria-label", "Chapters Menu") } }); t = u.Qb.prototype; t.A = "chapters"; t.na = "Chapters"; t.className = "vjs-chapters-button"; t.qb = function () { for (var a = [], c, d = 0; d < U(this.a).length; d++) c = U(this.a)[d], c.H() === this.A && a.push(new u.W(this.a, { track: c })); return a };
	t.Ea = function () { for (var a = U(this.a), c = 0, d = a.length, e, g, j = this.G = []; c < d; c++) if (e = a[c], e.H() == this.A && e.sb()) { if (2 > e.readyState()) { this.sd = e; e.d("loaded", u.bind(this, this.Ea)); return } g = e; break } a = this.sa = new u.la(this.a); a.b.appendChild(u.e("li", { className: "vjs-menu-title", innerHTML: u.Y(this.A), jd: -1 })); if (g) { e = g.ga; for (var k, c = 0, d = e.length; c < d; c++) k = e[c], k = new u.Va(this.a, { track: g, cue: k }), j.push(k), a.X(k) } 0 < this.G.length && this.show(); return a };
	u.Va = u.I.extend({ g: function (a, c) { var d = this.aa = c.track, e = this.cue = c.cue, g = a.currentTime(); c.label = e.text; c.selected = e.startTime <= g && g < e.ra; u.I.call(this, a, c); d.d("cuechange", u.bind(this, this.update)) } }); u.Va.prototype.n = function () { u.I.prototype.n.call(this); this.a.currentTime(this.cue.startTime); this.update(this.cue.startTime) }; u.Va.prototype.update = function () { var a = this.cue, c = this.a.currentTime(); a.startTime <= c && c < a.ra ? this.selected(f) : this.selected(l) };
	u.i.B(u.ba.prototype.f.children, { subtitlesButton: {}, captionsButton: {}, chaptersButton: {} });
	if ("undefined" !== typeof window.JSON && "function" === window.JSON.parse) u.JSON = window.JSON; else {
		u.JSON = {}; var Y = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; u.JSON.parse = function (a, c) {
			function d(a, e) { var k, q, n = a[e]; if (n && "object" === typeof n) for (k in n) Object.prototype.hasOwnProperty.call(n, k) && (q = d(n, k), q !== b ? n[k] = q : delete n[k]); return c.call(a, e, n) } var e; a = String(a); Y.lastIndex = 0; Y.test(a) && (a = a.replace(Y, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }));
			if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" === typeof c ? d({ "": e }, "") : e; throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
		}
	}
	u.bc = function () { var a, c, d = document.getElementsByTagName("video"); if (d && 0 < d.length) for (var e = 0, g = d.length; e < g; e++) if ((c = d[e]) && c.getAttribute) c.player === b && (a = c.getAttribute("data-setup"), a !== h && (a = u.JSON.parse(a || "{}"), v(c, a))); else { u.kb(); break } else u.od || u.kb() }; u.kb = function () { setTimeout(u.bc, 1) }; u.Q(window, "load", function () { u.od = f }); u.kb(); u.$c = function (a, c) { u.ea.prototype[a] = c }; var Z = this; Z.pd = f; function $(a, c) { var d = a.split("."), e = Z; !(d[0] in e) && e.execScript && e.execScript("var " + d[0]); for (var g; d.length && (g = d.shift()) ;) !d.length && c !== b ? e[g] = c : e = e[g] ? e[g] : e[g] = {} }; $("videojs", u); $("_V_", u); $("videojs.options", u.options); $("videojs.cache", u.oa); $("videojs.Component", u.c); u.c.prototype.dispose = u.c.prototype.C; u.c.prototype.createEl = u.c.prototype.e; u.c.prototype.el = u.c.prototype.r; u.c.prototype.addChild = u.c.prototype.X; u.c.prototype.children = u.c.prototype.children; u.c.prototype.on = u.c.prototype.d; u.c.prototype.off = u.c.prototype.t; u.c.prototype.one = u.c.prototype.Q; u.c.prototype.trigger = u.c.prototype.k; u.c.prototype.triggerReady = u.c.prototype.Ra;
	u.c.prototype.show = u.c.prototype.show; u.c.prototype.hide = u.c.prototype.v; u.c.prototype.width = u.c.prototype.width; u.c.prototype.height = u.c.prototype.height; u.c.prototype.dimensions = u.c.prototype.Kc; u.c.prototype.ready = u.c.prototype.M; $("videojs.Player", u.ea); u.ea.prototype.dispose = u.ea.prototype.C; $("videojs.MediaLoader", u.Dc); $("videojs.TextTrackDisplay", u.Yb); $("videojs.ControlBar", u.ba); $("videojs.Button", u.o); $("videojs.PlayToggle", u.Vb); $("videojs.FullscreenToggle", u.za);
	$("videojs.BigPlayButton", u.Ua); $("videojs.LoadingSpinner", u.Tb); $("videojs.CurrentTimeDisplay", u.Wa); $("videojs.DurationDisplay", u.Xa); $("videojs.TimeDivider", u.Zb); $("videojs.RemainingTimeDisplay", u.eb); $("videojs.Slider", u.J); $("videojs.ProgressControl", u.cb); $("videojs.SeekBar", u.Wb); $("videojs.LoadProgressBar", u.$a); $("videojs.PlayProgressBar", u.Ub); $("videojs.SeekHandle", u.fb); $("videojs.VolumeControl", u.ib); $("videojs.VolumeBar", u.hb); $("videojs.VolumeLevel", u.$b);
	$("videojs.VolumeHandle", u.jb); $("videojs.MuteToggle", u.da); $("videojs.PosterImage", u.bb); $("videojs.Menu", u.la); $("videojs.MenuItem", u.I); $("videojs.SubtitlesButton", u.Aa); $("videojs.CaptionsButton", u.ya); $("videojs.ChaptersButton", u.Qb); $("videojs.MediaTechController", u.q); u.q.prototype.features = u.q.prototype.j; u.q.prototype.j.volumeControl = u.q.prototype.j.T; u.q.prototype.j.fullscreenResize = u.q.prototype.j.hc; u.q.prototype.j.progressEvents = u.q.prototype.j.Kb; u.q.prototype.j.timeupdateEvents = u.q.prototype.j.Nb;
	$("videojs.Html5", u.m); u.m.Events = u.m.Ya; u.m.isSupported = u.m.isSupported; u.m.canPlaySource = u.m.mb; u.m.prototype.setCurrentTime = u.m.prototype.cd; u.m.prototype.setVolume = u.m.prototype.hd; u.m.prototype.setMuted = u.m.prototype.fd; u.m.prototype.setPreload = u.m.prototype.gd; u.m.prototype.setAutoplay = u.m.prototype.bd; u.m.prototype.setLoop = u.m.prototype.ed; $("videojs.Flash", u.l); u.l.isSupported = u.l.isSupported; u.l.canPlaySource = u.l.mb; u.l.onReady = u.l.onReady; $("videojs.TextTrack", u.U); u.U.prototype.label = u.U.prototype.label;
	$("videojs.CaptionsTrack", u.Pb); $("videojs.SubtitlesTrack", u.Xb); $("videojs.ChaptersTrack", u.Rb); $("videojs.autoSetup", u.bc); $("videojs.plugin", u.$c); $("videojs.createTimeRange", u.rb);
})();
/*
	BigVideo - The jQuery Plugin for Big Background Video (and Images)
	by John Polacek (@johnpolacek)
	
	Dual licensed under MIT and GPL.

	Dependencies: jQuery, jQuery UI (Slider), Video.js, ImagesLoaded
*/

(function (factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// Register as an anonymous AMD module:
		define([
			'jquery',
			'videojs',
			'imagesloaded',
			'jquery-ui'
		], factory);
	} else {
		factory(jQuery, videojs);
	}
})(function ($, videojs) {

	$.BigVideo = function (options) {

		var defaults = {
			// If you want to use a single mp4 source, set as true
			useFlashForFirefox: true,
			// If you are doing a playlist, the video won't play the first time
			// on a touchscreen unless the play event is attached to a user click
			forceAutoplay: false,
			controls: true,
			doLoop: false,
			container: $('body')
		};

		var BigVideo = this,
			player,
			vidEl = '#big-video-vid',
			wrap = $('<div id="big-video-wrap"></div>'),
			video = $(''),
			mediaAspect = 16 / 9,
			vidDur = 0,
			defaultVolume = 0.8,
			isInitialized = false,
			isSeeking = false,
			isPlaying = false,
			isQueued = false,
			isAmbient = false,
			playlist = [],
			currMediaIndex,
			currMediaType;

		var settings = $.extend({}, defaults, options);

		function updateSize() {
			var windowW = $(window).width();
			var windowH = $(window).height();
			var windowAspect = windowW / windowH;
			if (windowAspect < mediaAspect) {
				// taller
				if (currMediaType === 'video') {
					player
						.width(windowH * mediaAspect)
						.height(windowH);
					$(vidEl)
						.css('top', 0)
						.css('left', -(windowH * mediaAspect - windowW) / 2)
						.css('height', windowH);
					$(vidEl + '_html5_api').css('width', windowH * mediaAspect);
					$(vidEl + '_flash_api')
						.css('width', windowH * mediaAspect)
						.css('height', windowH);
				} else {
					// is image
					$('#big-video-image')
						.css({
							width: 'auto',
							height: windowH,
							top: 0,
							left: -(windowH * mediaAspect - windowW) / 2
						});
				}
			} else {
				// wider
				if (currMediaType === 'video') {
					player
						.width(windowW)
						.height(windowW / mediaAspect);
					$(vidEl)
						.css('top', -(windowW / mediaAspect - windowH) / 2)
						.css('left', 0)
						.css('height', windowW / mediaAspect);
					$(vidEl + '_html5_api').css('width', '100%');
					$(vidEl + '_flash_api')
						.css('width', windowW)
						.css('height', windowW / mediaAspect);
				} else {
					// is image
					$('#big-video-image')
						.css({
							width: windowW,
							height: 'auto',
							top: -(windowW / mediaAspect - windowH) / 2,
							left: 0
						});
				}
			}
		}

		function initPlayControl() {
			// create video controller
			var markup = '<div id="big-video-control-container">';
			markup += '<div id="big-video-control">';
			markup += '<a href="#" id="big-video-control-play"></a>';
			markup += '<div id="big-video-control-middle">';
			markup += '<div id="big-video-control-bar">';
			markup += '<div id="big-video-control-bound-left"></div>';
			markup += '<div id="big-video-control-progress"></div>';
			markup += '<div id="big-video-control-track"></div>';
			markup += '<div id="big-video-control-bound-right"></div>';
			markup += '</div>';
			markup += '</div>';
			markup += '<div id="big-video-control-timer"></div>';
			markup += '</div>';
			markup += '</div>';
			settings.container.append(markup);

			// hide until playVideo
			$('#big-video-control-container').css('display', 'none');

			// add events
			$('#big-video-control-track').slider({
				animate: true,
				step: 0.01,
				slide: function (e, ui) {
					isSeeking = true;
					$('#big-video-control-progress').css('width', (ui.value - 0.16) + '%');
					player.currentTime((ui.value / 100) * player.duration());
				},
				stop: function (e, ui) {
					isSeeking = false;
					player.currentTime((ui.value / 100) * player.duration());
				}
			});
			$('#big-video-control-bar').click(function (e) {
				player.currentTime((e.offsetX / $(this).width()) * player.duration());
			});
			$('#big-video-control-play').click(function (e) {
				e.preventDefault();
				playControl('toggle');
			});
			player.on('timeupdate', function () {
				if (!isSeeking && (player.currentTime() / player.duration())) {
					var currTime = player.currentTime();
					var minutes = Math.floor(currTime / 60);
					var seconds = Math.floor(currTime) - (60 * minutes);
					if (seconds < 10) seconds = '0' + seconds;
					var progress = player.currentTime() / player.duration() * 100;
					$('#big-video-control-track').slider('value', progress);
					$('#big-video-control-progress').css('width', (progress - 0.16) + '%');
					$('#big-video-control-timer').text(minutes + ':' + seconds + '/' + vidDur);
				}
		});
		}

		function playControl(a) {
			var action = a || 'toggle';
			if (action === 'toggle') action = isPlaying ? 'pause' : 'play';
			if (action === 'pause') {
				player.pause();
				$('#big-video-control-play').css('background-position', '-16px');
				isPlaying = false;

			} else if (action === 'play') {
				player.play();
				$('#big-video-control-play').css('background-position', '0');
				isPlaying = true;
			}
		}

		function setUpAutoPlay() {
			player.play();
			settings.container.off('click', setUpAutoPlay);
		}

		function nextMedia() {
			currMediaIndex++;
			if (currMediaIndex === playlist.length) currMediaIndex = 0;
			playVideo(playlist[currMediaIndex]);
		}

		function playVideo(source) {

			// clear image
			$(vidEl).css('display', 'block');
			currMediaType = 'video';
			player.src(source);
			isPlaying = true;
			if (isAmbient) {
				$('#big-video-control-container').css('display', 'none');
				player.ready(function () {
					player.volume(0);
				});
				doLoop = true;
			} else {
				$('#big-video-control-container').css('display', 'block');
				player.ready(function () {
					player.volume(defaultVolume);
		});
				doLoop = false;
			}
			$('#big-video-image').css('display', 'none');
			$(vidEl).css('display', 'block');
		}

		function showPoster(source) {
			// remove old image
			$('#big-video-image').remove();

			// hide video
			player.pause();
			$(vidEl).css('display', 'none');
			$('#big-video-control-container').css('display', 'none');

			// show image
			currMediaType = 'image';
			var bgImage = $('<img id="big-video-image" src=' + source + ' />');
			wrap.append(bgImage);

			$('#big-video-image').imagesLoaded(function () {
				mediaAspect = $('#big-video-image').width() / $('#big-video-image').height();
				updateSize();
		});
		}

		BigVideo.init = function () {
			if (!isInitialized) {
				// create player
				settings.container.prepend(wrap);
				var autoPlayString = settings.forceAutoplay ? 'autoplay' : '';
				player = $('<video id="' + vidEl.substr(1) + '" class="video-js vjs-default-skin" preload="auto" data-setup="{}" ' + autoPlayString + ' webkit-playsinline></video>');
				player.css('position', 'absolute');
				wrap.append(player);

				var videoTechOrder = ['html5', 'flash'];
				// If only using mp4s and on firefox, use flash fallback
				var ua = navigator.userAgent.toLowerCase();
				var isFirefox = ua.indexOf('firefox') != -1;
				if (settings.useFlashForFirefox && (isFirefox)) {
					videoTechOrder = ['flash', 'html5'];
				}
				player = videojs(vidEl.substr(1), {
					controls: false,
					autoplay: true,
					preload: 'auto',
					techOrder: videoTechOrder
	});

				// add controls
				if (settings.controls) initPlayControl();
	
				// set initial state
				updateSize();
				isInitialized = true;
				isPlaying = false;

				if (settings.forceAutoplay) {
					$('body').on('click', setUpAutoPlay);
		}

				$('#big-video-vid_flash_api')
					.attr('scale', 'noborder')
					.attr('width', '100%')
					.attr('height', '100%');

				// set events
				$(window).on('resize.bigvideo', function () {
					updateSize();
				});

				player.on('loadedmetadata', function (data) {
					if (document.getElementById('big-video-vid_flash_api')) {
						// use flash callback to get mediaAspect ratio
						mediaAspect = document.getElementById('big-video-vid_flash_api').vjs_getProperty('videoWidth') / document.getElementById('big-video-vid_flash_api').vjs_getProperty('videoHeight');
					} else {
						// use html5 player to get mediaAspect
						mediaAspect = $('#big-video-vid_html5_api').prop('videoWidth') / $('#big-video-vid_html5_api').prop('videoHeight');
}
					updateSize();
					var dur = Math.round(player.duration());
					var durMinutes = Math.floor(dur / 60);
					var durSeconds = dur - durMinutes * 60;
					if (durSeconds < 10) durSeconds = '0' + durSeconds;
					vidDur = durMinutes + ':' + durSeconds;
				});

				player.on('ended', function () {
					if (settings.doLoop) {
						player.currentTime(0);
						player.play();
					}
					if (isQueued) {
						nextMedia();
					}
				});
			}
		};

		BigVideo.show = function (source, options) {
			if (options === undefined) options = {};
			isAmbient = options.ambient === true;
			if (isAmbient || options.doLoop) settings.doLoop = true;
			if (typeof (source) === 'string') {
				var ext = source.substring(source.lastIndexOf('.') + 1);
				if (ext === 'jpg' || ext === 'gif' || ext === 'png') {
					showPoster(source);
				} else {
					if (options.altSource && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
						source = options.altSource;
					}
					playVideo(source);
					options.onShown && options.onShown();
					isQueued = false;
				}
			} else {
				playlist = source;
				currMediaIndex = 0;
				playVideo(playlist[currMediaIndex]);
				options.onShown && options.onShown();
				isQueued = true;
	}
};

		// Expose Video.js player
		BigVideo.getPlayer = function () {
			return player;
};		// Remove/dispose the player
		BigVideo.remove = BigVideo.dispose = function () {
			isInitialized = false;

			wrap.remove();
			$(window).off('resize.bigvideo');

			if (player) {
				player.off('loadedmetadata');
				player.off('ended');
				player.dispose();
	}
};
		// Expose BigVideoJS player actions (like 'play', 'pause' and so on)
		BigVideo.triggerPlayer = function (action) {
			playControl(action);
		};

	};
});

$.widget('formula.finalCountdown', {
    _create: function () {
        if (!this.options.raceDate) return;

        this.element.countdown({
            until: new Date(this.options.raceDate),
            layout:
				'<span class="countdown__section">' +
					'<span class="countdown__item">{d100}</span>' +
					'<span class="countdown__item">{d10}</span>' +
					'<span class="countdown__item">{d1}</span>' +
					'<span class="countdown__label">{dl}</span>' +
				'</span>' +
				'<span class="countdown__section">' +
					'<span class="countdown__item">{h10}</span>' +
					'<span class="countdown__item">{h1}</span>' +
					'<span class="countdown__label">{hl}</span>' +
				'</span>' +
				'<span class="countdown__separator">:</span>' +
				'<span class="countdown__section">' +
					'<span class="countdown__item">{m10}</span>' +
					'<span class="countdown__item">{m1}</span>' +
					'<span class="countdown__label">{ml}</span>' +
				'</span>' +
				'<span class="countdown__separator">:</span>' +
				'<span class="countdown__section">' +
					'<span class="countdown__item">{s10}</span>' +
					'<span class="countdown__item">{s1}</span>' +
					'<span class="countdown__label">{sl}</span>' +
				'</span>'
        });
	}
});
$.widget('formula.form', {
    _create: function () {
        this.element.parsley();
    }
});
$.widget('formula.gallery', {
    options: {
        resMatchMsg: 'Обои для вашего экрана'
    },
    _create: function () {
        this.aScreenRes = [window.screen.width, window.screen.height];

        this._initPlugins();
    },

    _initPlugins: function () {
        var self = this;

        // lightbox
        $(".gallery__item a").fancybox({
            prevEffect: 'none',
            nextEffect: 'none',
            padding: 0,
            wrapCSS: '_fullscreen _photogallery',
            afterLoad: function (current) { // создаем блок со ссылками на картинки с разными разрешениями
                var oResolitions = current.element.data('res');

                if (!oResolitions) {
                    $('.fancybox-resolutions').empty();
                    return;
                }

                var markup = self._renderScreenResolutions(oResolitions); // для каждой картинки динамически генерим список со ссылками на обои

                $('.fancybox-resolutions > .page__container').html(markup);
            },
            tpl: {
                wrap: [
					'<div class="fancybox-wrap" tabIndex="-1">',
						'<div class="fancybox-skin">',
							'<div class="fancybox-outer">',
								'<div class="fancybox-inner"></div>',
							'</div>',
							'<div class="fancybox-resolutions">',
								'<div class="page__container"></div>',
							'</div>',
						'</div>',
					'</div>'
                ].join('')
            },
            helpers: {
                thumbs: {
                    width: 75,
                    height: 75
                }
            }
        });
    },

    /**
	* @desc   Создает разметку для блока с разрешениями
	* @param  {object} oResolitions - объект хранящий пары разрешение:ссылка на картинку
	* @return {string}
	*/
    _renderScreenResolutions: function (oResolitions) {
        if (!oResolitions) return;

        var aScreenResolutions = ['<div class="screen-resolutions">'];

        for (var resolution in oResolitions) {
            if (oResolitions.hasOwnProperty(resolution)) {
                aScreenResolutions.push(this._renderScreenResolutionItem(resolution, oResolitions[resolution]));
            }
        }

        aScreenResolutions.push('</div>');

        return aScreenResolutions.join('');
    },

    /**
	* @desc   Создает разметку для одного элемента
	* @param  {string} resName   - Разрешение, например "1024x768"
	* @param  {string} linkToImg - Ссылка на фото
	* @return {string}
	*/
    _renderScreenResolutionItem: function (resName, linkToImg) {
        var isResMatch = this._checkScreenResolutionMatch(resName);
        var screenResolutionItem;

        if (isResMatch) {
            screenResolutionItem = [
				'<a href="' + linkToImg + '" class="screen-resolutions__item" target="_blank">',
					'<span>' + resName + '</span>',
					'<span class="screen-resolutions__item-hint">' + this.options.resMatchMsg + '</span>',
				'</a>'
            ].join('');
        } else {
            screenResolutionItem = [
				'<a href="' + linkToImg + '" class="screen-resolutions__item" target="_blank">',
					'<span>' + resName + '</span>',
				'</a>'
            ].join('');
        }

        return screenResolutionItem;
    },

    /**
	* @desc   Проверяет является ли текущее разрешение равным разрешению экрана пользователя
	* @return {boolean}
	*/
    _checkScreenResolutionMatch: function (res) {
        var aRes = res.split('x');

        return ((aRes[0] == this.aScreenRes[0]) && (aRes[1] == this.aScreenRes[1]));
    }
});

$.widget('formula.nav', {
	_create: function () {
		this.$navItems = this.element.find('.nav__item');
		this.$subNavs = $('.sub-nav');
		this.timer;

		this._initEvents();
	},
	_initEvents: function () {
		var self = this;

		this._on({
			'mouseenter .nav__item': this._handleItemMouseEnter,
			'mouseleave .nav__item': this._handleItemMouseLeave
		});

		this.$subNavs.on('mouseenter', $.proxy(this._handleSubNavMouseEnter, this));
		this.$subNavs.on('mouseleave', $.proxy(this._handleSubNavMouseLeave, this));
	},
	_handleItemMouseEnter: function (e) {
		var $navItem = $(e.target),
			$subNav = $('#' + $navItem.attr('data-target'));

		clearTimeout(this.timer);
		this.timer = null;
		this._selectItem($navItem);
		this._showSubNav($subNav);
	},
	_handleItemMouseLeave: function (e) {
		var self = this;

		this.timer = setTimeout(function () {
			self._unselectAllItems();
			self._hideAllSubMenus();
		}, 20);
	},
	_handleSubNavMouseEnter: function () {
		clearTimeout(this.timer);
		this.timer = null;
	},
	_handleSubNavMouseLeave: function () {
		var self = this;

		this.timer = setTimeout(function () {
			self._unselectAllItems();
			self._hideAllSubMenus();
		}, 20);
	},
	_selectItem: function ($navItem) {
		this.$navItems.removeClass('_selected');
		$navItem.addClass('_selected');
	},
	_showSubNav: function ($subNav) {
		this.$subNavs.removeClass('_show');
		$subNav.addClass('_show');
	},
	_unselectAllItems: function () {
		this.$navItems.removeClass('_selected');
	},
	_hideAllSubMenus: function () {
		this.$subNavs.removeClass('_show');
	}
});
$.widget('formula.news', {
	_create: function () {
		this.$infoBlock = this.element.closest('.info-block');
		},	_removeOuterNews: function () {
		var self = this;

		$.each(this.element.find('.news__item'), function () {
			var $news = $(this);

			if ($news.outerHeight() + $news.offset().top > (self.$infoBlock.height() - self.$infoBlock.find('.info-block__title').outerHeight(true)) + self.element.offset().top) {
				$news.hide();
			}
		});
	},
	initPlugins: function () {
		this.element.masonry({
			gutter: 0,
			transitionDuration: 0,
			itemSelector: '.news__item'
		});

		this._removeOuterNews();
		}
});
$.widget('formula.slideScroll', {
    options: {
        animationDuration: 1300
    },

    _create: function () {
        if (Modernizr.touch) return;

        this.$slidesContainer = $('.page__slides'); // блок содержащий в себе слайды и подвал. Именно он будет изменять свое вертикальное положение при скролле
        this.$slides = $('.slide');
        this.$pageHeader = $('.page__header');
        this.$window = $(window);
        this.$document = $(document);
        this.slideHeight = this.$slides.first().outerHeight();
        this.lastTop = this._getLastTop(); // Когда мы прокручиваем сайт до самого низа нам нужно сместить блок this.$slidesContainer так чтобы подвал был прижат к низу экрана.
        this.currentSlide = 0;
        this.windowResizeTimer;

        this._initEvents();
    },

    _initEvents: function () {
        this._on({
            'mousewheel': this._handleScroll,
            'click .slide__pagination_item': this._handlePaginationItemClick,
            'click .slide__prev': this._handlePrevClick,
            'click .slide__next': this._handleNextClick
        });

        this.$document.on('keyup', $.proxy(this._handleDocKeyUp, this));
        this.$window.on('resize.slideScroll', $.proxy(this._handleWindowResize, this));

        $.subscribe('slidePagination.selectItem', $.proxy(function (e, index) {
            this.scrollToSlide(index + 1);
        }, this));
    },

    _handleScroll: function (e) {
        
        var direction = e.deltaY;
        var top;

        // скроллим вниз
        if (direction < 0) {
            this.currentSlide++;
        }
            // скроллим вверх
        else if (direction > 0) {
            this.currentSlide--;
        }



        // не прокручиваем slidesContainer ваше начала сайта
        if (this.currentSlide < 0) {
            this.currentSlide = 0;
            return;
        }
            // не прокручиваем slidesContainer ниже конца сайта
        else if (this.currentSlide > this.$slides.length) {
            this.currentSlide = this.$slides.length;
            return;
        }

        if (this.currentSlide == this.$slides.length) {
            this.currentSlide = this.$slides.length;
            top = -this.lastTop;
        } else {
            top = -this.slideHeight * this.currentSlide
        }

        this._checkHeaderState();
        this._scroll(top);
        $.publish('slideScroll.scrollTo', this.currentSlide);
    },

    _handlePrevClick: function () {
        this.scrollToSlide(this.currentSlide);
    },

    _handleNextClick: function () {
        if (this.currentSlide == this.$slides.length) return;

        this.scrollToSlide(this.currentSlide + 2);
    },

     _handleDocKeyUp: function (e) {
     	var top;

     	if (e.which == 38) {
     		e.preventDefault();
     		this.currentSlide--;
     	} else if (e.which == 40) {
     		e.preventDefault();
     		this.currentSlide++;
     	}

     	// не прокручиваем сайт ваше начала сайта
     	if (this.currentSlide < 0 ) {
     		this.currentSlide = 0;
     		return;
     	}
     	// не прокручиваем сайт ниже конца сайта
     	else if (this.currentSlide > this.$slides.length) {
     		this.currentSlide = this.$slides.length;
     		return;
     	}

     	if (this.currentSlide == this.$slides.length) {
     		this.currentSlide = this.$slides.length;
     		top = -this.lastTop;
     	} else {
     		top = -this.slideHeight*this.currentSlide
     	}

     	this._checkHeaderState();
     	this._scroll(top);
     	$.publish('slideScroll.scrollTo', this.currentSlide);
     },

    _handleWindowResize: function () {
        var self = this;

        clearTimeout(this.windowResizeTimer);
        this._off(this.element, 'mousewheel');

        this.windowResizeTimer = setTimeout(function () {
            // при резайсе страницы прокручиваем слайды к первому
            self._scroll(0, function () {
                self.slideHeight = self.$slides.first().outerHeight();
                self.lastTop = self._getLastTop();
                self.currentSlide = 0;
            });
            $.publish('slideScroll.scrollTo', 0);
        }, 500);
    },

    _handlePaginationItemClick: function (e) {
        var index = $(e.target).index();

        this.currentSlide = index;

        this._checkHeaderState();
        this._scroll(-this.slideHeight * index);
    },

    /**
	* Смещает $slidesContainer на заданное количество пикселей
	*
	* @param {number} top - количество пикселей на которое нужно сместить контейнер со слайдами
	* @param {function} [animationCallback] - функция которая выполнится после завершения анимации
	*/
    _scroll: function (top, animationCallback) {
        var self = this;

        // на время анимации отключаем прослушивание события скролла
        this._off(this.element, 'mousewheel');

        this.$slidesContainer.animate({
            top: top
        }, this.options.animationDuration, function () {
            self._off(self.element, 'mousewheel');
            // снова подписываемся на скролл
            self._on({
                'mousewheel': self._handleScroll
            });

            if ($.isFunction(animationCallback)) {
                animationCallback.call(self);
            }
        });
    },

    /**
	* Изменяет если нужно состояние шапки сайта
	*/
    _checkHeaderState: function () {
        if (this.currentSlide <= 0) {
            this.$pageHeader.removeClass('_collapse');
        } else {
            this.$pageHeader.addClass('_collapse');
        }
    },

    /**
	* Вычисляет количество пикселей на которое надо сместить $slidesContainer, что бы футер оказался внизу экрана.
	*
	* @returns {number}
	*/
    _getLastTop: function () {
        return this.$slides.length * this.slideHeight + $('.page__footer').innerHeight() - this.$window.height();
    },

    /**
	* Смещает $slidesContainer так, что бы вверху экрана оказался слайд с индексом slideNum
	*
	* @param {number} slideNum - номер слайда (начиная с 0)
	*/
    scrollToSlide: function (slideNum) {
        var top = -(this.slideHeight * (slideNum - 1));

        this.currentSlide = slideNum - 1;

        if (this.currentSlide == this.$slides.length) {
            this.currentSlide = this.$slides.length;
            top = -this.lastTop;
        } else {
            top = -this.slideHeight * this.currentSlide
        }

        this._checkHeaderState();
        this._scroll(top);
        $.publish('slideScroll.scrollTo', this.currentSlide);
    }
});
$.widget('formula.switcher', {
	_create: function () {
		this.$activeItem = $('.switcher').first();
		this.$activeContent = $('#' + $('.switcher').first().attr('data-target'));

		this._initEvents();
	},
	_initEvents: function () {
		this._on({
			'click .switcher': this._handleSwitchClick
		});
	},
	_handleSwitchClick: function (e) {
		if (this.$activeItem[0] === e.target) return;

		var $item = $(e.target);

		this._toggleContent($('#' + $item.attr('data-target')));
		this._selectItem($item);
	},
	_toggleContent: function ($targetContent) {
		this.$activeContent.hide();
		$targetContent.show();
		this.$activeContent = $targetContent;
	},
	_selectItem: function ($item) {
		this.$activeItem.removeClass('_active');
		this.$activeItem = $item;
		$item.addClass('_active');
	}
});
$.widget('formula.tabs', {
	options: {
		itemClass: 'tabs__item',
		/*
		onSelect: function ($tabItem, $targetContent) {
		}
		*/
	},
	_create: function () {
		var self = this;

		this.$items = $('.' + this.options.itemClass);
		this.$activeItem = this.$items.first();
		this.$activeContent = $('#' + this.$items.first().attr('data-target'));

		$.each(this.$items.not(':first'), function () {
			var $targetContent = $('#' + $(this).attr('data-target'));

			$targetContent.hide();
		});

		self._selectItem(this.$activeItem);
		self._initEvents();

		setTimeout(function () {
			self._trigger('onSelect', null, {
				$item: self.$activeItem,
				$targetContent: self.$activeContent
			});
		}, 4);

	},
	_initEvents: function () {
		this._on(this.$items, {
			'click': this._handleItemClick
		});
	},
	_handleItemClick: function (e) {
		if (this.$activeItem[0] === e.target) return;

		var $item = $(e.target)
		$targetContent = $('#' + $item.attr('data-target'));

		this._toggleContent($targetContent);
		this._selectItem($item);
		this._trigger('onSelect', null, {
			$item: this.$activeItem,
			$targetContent: this.$activeContent
		});
	},
	_toggleContent: function ($targetContent) {
		this.$activeContent.hide();
		$targetContent.show();
		this.$activeContent = $targetContent;
	},
	_selectItem: function ($item) {
		this.$activeItem.removeClass('_active');
		this.$activeItem = $item;
		$item.addClass('_active');
	}
});
$.widget('formula.scrollHint', {
    _create: function () {
        this._initEvent();
    },
    _initEvent: function () {
        this._on({
            'click .scroll-hint__button': this._handleButtonClick
        });
    },
    _handleButtonClick: function () {
        $('.page__slides').slideScroll('scrollToSlide', 2);
    }
});
$.widget('formula.bgVideo', {
    _create: function () {
        var self = this;

        this.utils = $.formula.utils();
        this.BV = new $.BigVideo({ useFlashForFirefox: false });
        this.visibilityPrefix = this.utils.getVisibilityPrefix();

        this.BV.init();

        setTimeout(function () {
            self.player = self.BV.getPlayer();

            self.BV.show('http://sochiautodrom.blob.core.windows.net/video/Russian_Formula_1_Grand_Prix_Circuit.mp4', {
                altSource: 'http://sochiautodrom.blob.core.windows.net/video/Russian_Formula_1_Grand_Prix_Circuit.ogv',
                ambient: true
            });

            // останавливаем видео когда пользователь переключается на другой таб или минимизирует окно
            if (self.visibilityPrefix !== null) {
                $(document).on(self.visibilityPrefix + 'visibilitychange', $.proxy(self.onvisibilitychange, self));
            }
        }, 1000);
    },
    onvisibilitychange: function () {
        if (document.hidden === false || document[this.visibilityPrefix + 'Hidden'] === false) {
            this.player.play();
        } else {
            this.player.pause();
        }
    },
    stop: function () {
        this.player.pause();
    },
    play: function () {
        this.player.play();
    }
});
$.widget('formula.utils', {
	_create: function () {
	},
	getScrollWidth: function () {
		var $outer = $('<div />'),
			$inner = $('<div />'),
			width;

		$outer.css({
			position: 'fixed',
			bottom: 0,
			left: 0,
			width: 100,
			height: 100,
			overflow: 'auto',
			visibility: 'hidden'
		});
		$inner.css({
			height: 200,
		});

		$inner.appendTo($outer);
		$outer.appendTo('body');

		width = $outer.width() - $inner.width();

		$outer.remove();

		return width;
	},
	getVisibilityPrefix: function () {
		var prefix = null,
			prefixes, i;

		if (document.hidden !== undefined) {
			prefix = '';
		} else {
			prefixes = ['moz', 'webkit'];

			for (i = 0; i < prefixes.length; i++) {
				if (document[prefixes[i] + 'Hidden'] !== undefined) {
					prefix = prefixes[i];
					break;
				}
			}

		}

		return prefix;
	}
});
$.widget('formula.traceInfoSlider', {
    _create: function () {
        this._initPlugins();
        this._initEvents();
    },
    _initEvents: function () {
        $.subscribe('windowResize', $.proxy(this._initPlugins, this));
    },
    _initPlugins: function () {
        this.element.removeClass('_hide');
        this.element.carouFredSel({
            direction: 'up',
            height: '100%',
            auto: {
                // play: false,
                timeoutDuration: 4000,
                pauseOnHover: true
            },
            next: $('.trace-info__next'),
            prev: $('.trace-info__prev'),
            items: {
                visible: 1
            }
        });
    }
});
$.widget('formula.fSlider', {
	_create: function () {
		this.$slider = this.element.find('.slider__slider');

		this._renderControls();
		this._initPlugins();
	},
	_renderControls: function () {
		var $bottom = $('<div class="slider__bottom"></div>');

		$bottom.append($('<span class="slider__prev"></span>'));
		$bottom.append($('<span class="slider__pagination"></span>'));
		$bottom.append($('<span class="slider__next"></span>'));

		this.element.append($bottom);
	},
	_initPlugins: function () {
		this.$slider.carouFredSel({
			auto: {
				play: false
			},
			pagination: {
				container: this.element.find('.slider__pagination'),
				anchorBuilder: function (num, item) {
					return '<a href="#' + num + '" class="slider__pagination_item"></a>';
				}
			},
			next: this.element.find('.slider__next'),
			prev: this.element.find('.slider__prev')
		});
	}
});
$.widget('formula.header', {
	_create: function () {
		this.$wrap = this.element.find('.header__wrap');
		this.$searchField = this.element.find('.search__field');
		this.$searchSubmitBtn = this.element.find('.search__submit-btn');

		this._initEvents();
	},
	_initEvents: function () {
		this._on({
		    'click .search-trigger': this._showSearch,
		    'click .search__close-btn': this._hideSearch,
			'click .search__submit-btn': this._handleSubmitBtnClick,
			'keypress .search__field': this._handleSearchFieldKeypress
		});
	},
	_handleSearchFieldKeypress: function (e) {
	    e.stopPropagation();

		if (e.which == 13) {
			e.preventDefault();

			this._redirectToSearchPage();
		}
	},
	_handleSubmitBtnClick: function (e) {
		e.preventDefault();

		this._redirectToSearchPage();
	},
	_showSearch: function () {
	    this.$wrap.addClass('_top-shifted');
	    setTimeout(function () { $('.search__field').focus() }, 350);
	},
	_hideSearch: function () {
		this.$wrap.removeClass('_top-shifted');
		this.$searchField.val('');
	},
	_redirectToSearchPage: function () {
	    var query = encodeURIComponent(this.$searchField.val());
	    window.location.href = _spPageContextInfo.webAbsoluteUrl + '/search#k=' + query;
	}
});

$.widget('formula.circuit', {
    _create: function () {
        if ($('body').hasClass('ie8')) return;

        var pastTimeRatio = this._getPastTimeRatio(this.options.raceDate);

        if (!pastTimeRatio) return;

        this.$circuit = $('#circuit').css({
            'stroke-dasharray': '0, ' + this.circuitPathTotalLength
        }); // SVG с трассой
        this.$circuitPath = this.$circuit.find('#circuit-path').css({
            'stroke': '#FFFFFF'
        }); // Path трассы которая будет анимироваться
        this.circuitPath = this.$circuitPath[0]; // DOM-элемент path трассы которая будет анимироваться

        this.circuitPathTotalLength = this.circuitPath.getTotalLength(); // общая длинна трассы

        this.currLength = (pastTimeRatio / 100) * this.circuitPathTotalLength; // сколько должна проехать машинка по трассе
        this.duration = ~~(this.currLength * 8);

        this.car = this._createImage({
            href: 'http://cdn.sochiautodrom.ru/layouts/circuit__car.png',
            width: 49,
            height: 49
        });
        this.start = this._createImage({
            href: 'http://cdn.sochiautodrom.ru/layouts/circuit__start.png',
            width: 31,
            height: 33
        });

        this.$circuit
			.append(this.car)
			.append(this.start);

        this._startAnimation();
    },

    /**
	* Высчитывает отношение в процентых прошедшего времени ожидания со всем временем ожидания
	*
	* @returns {number} - число с точностью до сотых
	*/
    _getPastTimeRatio: function (raceDateOpt) {
        if (isNaN(raceDateOpt.year) || isNaN(raceDateOpt.month) || isNaN(raceDateOpt.day) || isNaN(raceDateOpt.hour)) return;

        var startDate = new Date(2014, 0, 0); // время начала ожидания гонок
        var todayDate = new Date();
        //var raceDate = new Date(raceDateOpt.year, raceDateOpt.month - 1, raceDateOpt.day, raceDateOpt.hour); // время начала гонок
        var raceDate = todayDate; // неправильное время начала гонки. всегда равно "сегодня", чтобы машина доезжала до финиша
        var fullWaitingInterval = raceDate - startDate; // весь интервал ожидания в мс
        var currWaitingInterval = todayDate - startDate; // сколько уже ждем гонок в мс

        return (currWaitingInterval / fullWaitingInterval * 100).toFixed(2);
    },

    _pathStartPoint: function (path) {
        var d = path.attr("d");
        var dsplitted = d.split(" ");

        return dsplitted[1].split(",");
    },

    _startAnimation: function () {
        var prev = 0;
        var self = this;

        $({ x: 0 }).animate({
            x: this.currLength
        }, {
            duration: this.duration,
            step: function (now, tween) {
                // анимация движения машины
                var carPosition = self.circuitPath.getPointAtLength(now);
                var pointPrev = self.circuitPath.getPointAtLength(prev); // точка в которой машины находилась на пред этапе
                var pointNow = self.circuitPath.getPointAtLength(now); // точка в которой машина находится сейчас
                var angle = Math.atan2(pointNow.y - pointPrev.y, pointNow.x - pointPrev.x) * 180 / Math.PI;

                prev = now;

                self.car.setAttributeNS(null, 'transform', 'translate(' + (carPosition.x - 25) + ', ' + (carPosition.y - 25) + '), rotate(' + angle + ' , 25 25)');

                // анимация появления трассы
                self.$circuitPath.css({
                    'stroke-dasharray': now + ', ' + self.circuitPathTotalLength
                });
            }
        });
    },

    _createImage: function (options) {
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        var startPosition = this.circuitPath.getPointAtLength(0);

        svgimg.setAttributeNS(null, 'height', options.height);
        svgimg.setAttributeNS(null, 'width', options.width);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.href);
        svgimg.setAttributeNS(null, 'transform', 'translate(' + (startPosition.x - options.width / 2) + ', ' + (startPosition.y - options.height / 2) + ')');
        svgimg.setAttributeNS(null, 'visibility', 'visible');

        return svgimg;
    }
});

$.widget('formula.zoomController', {
    options: {
        delay: 600
    },
    _create: function () {
        this.window = $(window);
        this.html = $('html');
        this.originFontSize = parseInt($('html').css('font-size'), 10);
        this.timer;

        this._initEvents();
    },
    _initEvents: function () {
        this.window.on('resize', $.proxy(this._handleWindowResize, this));
    },
    _handleWindowResize: function () {
        var self = this;

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {
            $.publish('windowResize');
        }, this.options.delay);
    }
});
$.widget('formula.tumbler', {
    _create: function () {
        this.$mainLink = this.element.find('.tumbler__main a');
        this.$mainImg = this.element.find('.tumbler__main img');

        this._initPlugins();
        this._initEvents();
    },
    _initEvents: function () {
        this._on({
            'click .tumbler__thumb a': this._handleTumblerThumbClick
        });
    },
    _initPlugins: function () {

    },
    _initPlugins: function () {
        this.$mainLink.fancybox({
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    },
    _handleTumblerThumbClick: function (e) {
        var $thumb = $(e.currentTarget);
        var $thumbImg = $thumb.find('img');

        this._updateMain($thumb.attr('href'), $thumbImg.attr('src'));

        return false;
    },
    _updateMain: function (href, src) {
        this.$mainLink.attr('href', href);
        this.$mainImg.attr('src', src);
    }
});
$.widget('formula.road', {
    _create: function () {
        this.$objects = this.element.find('.road__object');
        this.$svg = this.element.find('svg');

        this._initEvents();
    },
    _initEvents: function () {
        this._on(this.$svg, {
            'click path': this._handlePathClick,
            'mouseover path': this._handlePathMouseOver,
            'mouseout path': this._handlePathMouseOut
        });

        $.subscribe('roadFilter.select', $.proxy(this._handleRoadFilterSelect, this));
        $.subscribe('roadFilter.unselect', $.proxy(this._handleRoadFilterUnselect, this));
    },
    _handlePathClick: function (e) {
        var $path = $(e.currentTarget);
        var targetName = $path.data('target');
        var $object = $('#' + targetName);
        var groupName = $object.data('group');


        if ($object.hasClass('_active')) {
            $object.removeClass('_active');
            $.publish('road.unselect', groupName);
        } else {
            $object.addClass('_active');
            $.publish('road.select', groupName);
        }
    },
    _handlePathMouseOver: function (e) {
        var $path = $(e.currentTarget);
        var targetName = $path.data('target');
        var $object = $('#' + targetName);

        $object.addClass('_hover');
    },
    _handlePathMouseOut: function (e) {
        var $path = $(e.currentTarget);
        var targetName = $path.data('target');
        var $object = $('#' + targetName);

        $object.removeClass('_hover');
    },
    _handleRoadFilterSelect: function (e, groupName) {
        this.$objects
			.filter('[data-group="' + groupName + '"]')
			.addClass('_active');
    },
    _handleRoadFilterUnselect: function (e, groupName) {
        this.$objects
			.filter('[data-group="' + groupName + '"]')
			.removeClass('_active');
    }
});
$.widget('formula.roadFilter', {
    _create: function () {
        this.$items = this.element.find('.road-filter__item');

        this._initEvents();
    },
    _initEvents: function () {
        this._on(this.$items, {
            'click span': this._handleItemClick
        });

        $.subscribe('road.select', $.proxy(this._handleRoadSelect, this));
        $.subscribe('road.unselect', $.proxy(this._handleRoadUnselect, this));
    },
    _handleRoadSelect: function (e, targetName) {
        var $item = this.$items.filter('[data-target="' + targetName + '"]');

        this._select($item);
    },
    _handleRoadUnselect: function (e, targetName) {
        var $item = this.$items.filter('[data-target="' + targetName + '"]');

        this._unselect($item);
    },
    _handleItemClick: function (e) {
        var $span = $(e.currentTarget);
        var $item = $span.parent();

        if ($item.hasClass('_selected')) {
            this._unselect($item);
        } else {
            this._select($item);
        }
    },
    _select: function ($item) {
        $item.addClass('_selected');
        $.publish('roadFilter.select', $item.data('target'));
    },
    _unselect: function ($item) {
        $item.removeClass('_selected');
        $.publish('roadFilter.unselect', $item.data('target'));
    }
});
$.widget('formula.slidePagination', {
    _create: function () {
        this.$items = this.element.find('.slide-pagination__item');
        this.$in = this.element.find('.slide-pagination__in');
        this.pageFooterHeight = $('.page__footer').outerHeight();
        this.isNeedUnfix = false;

        this._selectItem(0);
        this._initEvents();
    },

    _initEvents: function () {
        this._on(this.$items, {
            'click': this._handleItemClick
        });
        this._on($(window), {
            'resize': function () {
                this.pageFooterHeight = $('.page__footer').outerHeight();
            }
        });

        $.subscribe('slideScroll.scrollTo', $.proxy(this._handleScrollTo, this));
    },

    _handleItemClick: function (e) {
        var index = $(e.currentTarget).index();

        this._unselectAllItems();
        $.publish('slidePagination.selectItem', index);
    },

    _handleScrollTo: function (e, index) {
        if (index >= this.$items.length) {
            this.isNeedUnfix = true;

            this._fix();
            this._unselectAllItems();
        } else {
            if (this.isNeedUnfix) {
                this._unfix();
                this.isNeedUnfix = false;
            }
            this._unselectAllItems();
            this._selectItem(index);
        }
    },
    _unselectAllItems: function () {
        this.$items.removeClass('_active');
    },

    _selectItem: function (index) {
        this.$items.eq(index).addClass('_active');
    },

    _fix: function () {
        this.$in.animate({
            'top': -this.pageFooterHeight
        });
    },

    _unfix: function () {
        this.$in.animate({
            top: 0
        });
    }
});