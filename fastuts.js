/*
	fastuts.js

	Developed by Guilherme Augusto Madaleno <guimadaleno@me.com>
	www.guimadaleno.com
	(C) 2014 All rights reserved
	Licensed under GNU GPL
*/

$.fn.fastuts = function (options)
{

	var classButtonClose 		= (options && options.buttons && options.buttons.close) ? options.buttons.close.class 	: ".fastuts-buttons-close";
	var classButtonNext 		= (options && options.buttons && options.buttons.next) 	? options.buttons.next.class 	: ".fastuts-buttons-next";
	var classButtonPrev 		= (options && options.buttons && options.buttons.prev) 	? options.buttons.prev.class 	: ".fastuts-buttons-prev";
	var classTooltip 			= ".fastuts-tooltip";
	var currentIndex 			= 0;
	var element 				= this;
	var elementSelector 		= this.selector;
	var elementSize 			= $(element).size();
	var holderIndex 			= 1;
	var textButtonClose 		= (options && options.buttons && options.buttons.close) ? options.buttons.close.text 	: "X";
	var textButtonNext 			= (options && options.buttons && options.buttons.next) 	? options.buttons.next.text 	: "&#10095;";
	var textButtonPrev 			= (options && options.buttons && options.buttons.prev) 	? options.buttons.prev.text 	: "&#10094;";

	var fn =
	{
		init: function()
		{

			$('body').append('<div id="fastuts-main-holder" class="fastuts-main-holder" style="display: none;"><div class="fastuts-overlay"></div><div class="fastuts-holder"><div class="' + classTooltip.replace('.', '') + '"><div class="fastuts-text"></div><div class="fastuts-buttons"><a href="#" class="' + classButtonClose.replace('.', '') + '">' + textButtonClose + '</a><a href="#" class="' + classButtonPrev.replace('.', '') + '">' + textButtonPrev + '</a><a href="#" class="' + classButtonNext.replace('.', '') + '">' + textButtonNext + '</a></div></div></div></div>');

			if (elementSize)
			{
				fn.displayBlock (element[(holderIndex - 1)]);
				fn.displayButtons (1, elementSize);

				if (options && options.onReady && $.type(options.onReady) === 'function')
					options.onReady();

				$(classButtonPrev).off('click').on('click', function()
				{
					fn.prevBlock(function()
					{
						if (options && options.buttons && options.buttons.prev && options.buttons.prev.callback && $.type(options.buttons.prev.callback) === 'function')
							options.buttons.prev.callback (currentIndex, element);
						return false;
					});
				});

				$(classButtonNext).off('click').on('click', function()
				{
					fn.nextBlock(function()
					{
						if (options && options.buttons && options.buttons.next && options.buttons.next.callback && $.type(options.buttons.next.callback) === 'function')
							options.buttons.next.callback (currentIndex, element);
						return false;
					});
				});

				if (options && options.settings && options.settings.allowKeys == true)
				{
					$(document).keyup(function(e)
					{
						if (e.keyCode == 37)
						{
							fn.prevBlock(function()
							{
								if (options && options.buttons && options.buttons.prev && options.buttons.prev.callback && $.type(options.buttons.prev.callback) === 'function')
									options.buttons.prev.callback (currentIndex, element);
								return false;
							});
						}
						else if (e.keyCode == 39)
						{
							fn.nextBlock(function()
							{
								if (options && options.buttons && options.buttons.next && options.buttons.next.callback && $.type(options.buttons.next.callback) === 'function')
									options.buttons.next.callback (currentIndex, element);
								return false;
							});
						}
					});
				}

				$(classButtonClose).off('click').on('click', function()
				{
					fn.hide();
					if (options && options.buttons && options.buttons.close && options.buttons.close.callback && $.type(options.buttons.close.callback) === 'function')
						options.buttons.close.callback ();
					return false;
				});

				if (options && options.overlay && options.overlay.allowEscapeKey == true)
				{
					$(document).keyup(function(e)
					{
						if (e.keyCode == 27)
						{
							if (options && options.overlay && options.overlay.onClose && $.type(options.overlay.onClose) === 'function')
								options.overlay.onClose ();

							fn.hide();
						}
					});
				}

				$('.fastuts-overlay').off('click').on('click', function()
				{
					if (options && options.overlay && options.overlay.onClose && $.type(options.overlay.onClose) === 'function')
						options.overlay.onClose ();
					fn.hide();
					return false;
				});

				$('#fastuts-main-holder').fadeIn(200);

			}

		},

		hide: function ()
		{
			$('.fastuts-main-holder').fadeOut(100, function()
			{
				holderIndex = 1;
				currentIndex = 0;
			});
		},

		displayButtons: function (currentIndexNum, blocksNum)
		{
			if (currentIndexNum == 1)
			{
				$(classButtonPrev).hide();
				$(classButtonNext).show();
			}
			else if (currentIndexNum == blocksNum)
			{
				$(classButtonPrev).show();
				$(classButtonNext).hide();
			}
			else
			{
				$(classButtonPrev).show();
				$(classButtonNext).show();
			}
		},

		displayBlock: function (block)
		{
			if ($(block).html())
			{
				var elementLocatiom 	= $(block).position();
				var elementPosition 	= $(block).css('position');
				var elementMargin 		= (options && options.settings && options.settings.spacing && options.settings.spacing.indexOf() == -1) ? parseInt(options.settings.spacing.replace('px', '')) : 40;
				var elementWidth		= parseInt($(block).css('width').replace('px', '')) + (elementMargin);
				var elementHeight		= parseInt($(block).css('height').replace('px', '')) + (elementMargin);
				var elementTop 			= ($.isNumeric(elementLocatiom.top)) ? (elementLocatiom.top - (elementMargin / 2)) : (elementMargin / 2);
				var elementLeft 		= ($.isNumeric(elementLocatiom.left))	? (elementLocatiom.left - (elementMargin / 2)) : (elementMargin / 2);
				var elementWindowTop	= (elementTop + elementHeight);

				var holderCSS =
				{
					position: 			'absolute',
					width: 				elementWidth + 'px',
					height: 			elementHeight + 'px',
					top: 				elementTop + 'px',
					left: 				elementLeft + 'px',
					webkitTransition: 	(options && options.settings.time) ? 'all ' + options.settings.time + 's' : 'all 0.4s',
					transition: 		(options && options.settings.time) ? 'all ' + options.settings.time + 's' : 'all 0.4s',
					backgroundColor: 	($('body').css('backgroundColor')) ? $('body').css('backgroundColor') : '#FFFFFF'
				};

				if (elementWindowTop >= ($(window).height() - 200))
				{
					$(classTooltip).removeClass('fastuts-tooltip-arrow-top').addClass('fastuts-tooltip-arrow-bottom').css
					({
						top: '-' + ($(classTooltip).height() + 20) + 'px',
						left: '50%',
						marginLeft: '-' + ($(classTooltip).width() / 2) + 'px'
					});
				}
				else
				{
					$(classTooltip).removeClass('fastuts-tooltip-arrow-bottom').addClass('fastuts-tooltip-arrow-top').css
					({
						top: (elementHeight + 20) + 'px',
						left: '50%',
						marginLeft: '-' + ($(classTooltip).width() / 2) + 'px'
					});
				}

				$(classTooltip).children('.fastuts-text').html($(block).attr('data-fastuts-tip'));

				$(element).css
				({
					zIndex: 'auto',
					position: elementPosition
				});

				$(block).css
				({
					zIndex: '2147483647',
					position: 'relative'
				});

				$('.fastuts-overlay').css
				({
					position: 'fixed',
					left: '0px',
					top: '0px',
					right: '0px',
					bottom: '0px',
					backgroundColor: (options && options.overlay && options.overlay.color) ? options.overlay.color : 'rgba(0,0,0,0.8)'
				});

				$('.fastuts-main-holder').css
				({
					position: 'absolute',
					left: '0px',
					top: '0px',
					right: '0px',
					bottom: '0px',
					zIndex: '2147483637'
				});

				$('.fastuts-holder').css(holderCSS);
			}

		},

		nextBlock: function (callback)
		{
			if (holderIndex < elementSize)
			{
				currentIndex = holderIndex = (holderIndex + 1);
				fn.displayBlock(element[(holderIndex - 1)]);
				fn.displayButtons(currentIndex, elementSize);
				callback();
			}
		},

		prevBlock: function (callback)
		{
			if (holderIndex > 1)
			{
				currentIndex = holderIndex = (holderIndex - 1);
				fn.displayBlock(element[(holderIndex - 1)]);
				fn.displayButtons(currentIndex, elementSize);
				callback();
			}
		}

	};

	fn.init();

};