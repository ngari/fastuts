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
	var elementNumbered 		= new Array();
	var elementAttrCounter		= 0;
	var elementSelector 		= this.selector;
	var elementSize 			= 0;
	var elementZIndex			= 0;
	var holderIndex 			= 1;
	var textButtonClose 		= (options && options.buttons && options.buttons.close) ? options.buttons.close.text 	: "X";
	var textButtonNext 			= (options && options.buttons && options.buttons.next) 	? options.buttons.next.text 	: "&#10095;";
	var textButtonPrev 			= (options && options.buttons && options.buttons.prev) 	? options.buttons.prev.text 	: "&#10094;";
	var mainHolder				= "#fastuts-main-holder";

	var fn =
	{
		init: function()
		{
			$(element).each(function()
			{
				if ($(this).hasClass('fastuts') && $(this).attr('data-fastuts-tip'))
					elementSize++;
				if ($(this).attr('data-fastuts-order'))
					elementAttrCounter++;
			});
			if (elementAttrCounter && elementSize)
			{
				var currentNumber = 0;
				$(element).each(function()
				{
					currentNumber = (parseInt($(this).attr('data-fastuts-order')) - 1);
					elementNumbered[currentNumber] = this;
				});
				element = elementNumbered;
			}

			$(mainHolder).remove();

			$('body').append('<div id="' + mainHolder.replace('#', '') + '" class="' + mainHolder.replace('#', '') + '" style="display: none;"><div class="fastuts-overlay"></div><div class="fastuts-holder"><div class="' + classTooltip.replace('.', '') + '"><div class="fastuts-text"></div><div class="fastuts-buttons"><a href="#" class="' + classButtonClose.replace('.', '') + '">' + textButtonClose + '</a><a href="#" class="' + classButtonPrev.replace('.', '') + '">' + textButtonPrev + '</a><a href="#" class="' + classButtonNext.replace('.', '') + '">' + textButtonNext + '</a></div></div></div></div>');

			if (elementSize)
			{

				if ($(element[(holderIndex - 1)]).attr('data-fastuts-tip') && $(element[(holderIndex - 1)]).hasClass('fastuts'))
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

					$(mainHolder).fadeIn(200);

				}

			}

		},

		hide: function ()
		{
			$('.fastuts-main-holder').fadeOut(100, function()
			{
				holderIndex = 1;
				currentIndex = 0;
			});
			$(element).css('z-index', elementZIndex);
		},

		displayButtons: function (currentIndexNum, blocksNum)
		{

			if (currentIndexNum == 1 && element.length > 1)
			{
				$(classButtonPrev).hide();
				$(classButtonNext).show();
			}
			else if (currentIndexNum == 1 && element.length <= 1)
			{
				$(classButtonPrev).hide();
				$(classButtonNext).hide();	
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
			if ($(block).html() && $(block).hasClass('fastuts') && $(block).attr('data-fastuts-tip'))
			{
				var elementLocatiom  	= $(block).offset();
				var elementPosition 	= $(block).css('position');
				var elementMargin 		= (options && options.settings && options.settings.spacing && options.settings.spacing.indexOf() == -1) ? parseInt(options.settings.spacing.replace('px', '')) : 40;
				var elementWidth 		= parseInt($(block).css('width').replace('px', '')) + (elementMargin);
				var elementHeight 		= parseInt($(block).css('height').replace('px', '')) + (elementMargin);
				var elementTop 			= (elementLocatiom.top - (elementMargin / 2));
				var elementLeft 		= (elementLocatiom.left - (elementMargin / 2));
				var elementWindowTop 	= (elementTop + elementHeight);
				var elementWindowRight 	= (elementLeft + elementWidth);
				var elementWindowLeft 	= elementLeft;
				var alignTimer;

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

				$(classTooltip).children('.fastuts-text').html($(block).attr('data-fastuts-tip'));

				$(element).each(function()
				{
					if ($(this).attr('data-fastuts-previous-zindex'))
					{
						$(this).css('z-index', $(this).attr('data-fastuts-previous-zindex'));
					}
				});

				elementZIndex = $(block).css('z-index');

				$(block).attr('data-fastuts-previous-zindex', elementZIndex);

				$(block).css
				({
					zIndex: '2147483637',
					position: ($(block).css('position') == 'static') ? 'relative' : $(block).css('position')

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
					bottom: '0px'
				});

				if (elementWindowTop >= ($(window).height() - 200))
				{
					$(classTooltip).removeClass('fastuts-tooltip-arrow-top').addClass('fastuts-tooltip-arrow-bottom').css
					({
						top: '-' + ($(classTooltip).height() + 20) + 'px'
					});
					if (options.settings.autoScroll)
					{
						$("html, body").animate({ scrollTop: (elementTop - ($(classTooltip).height() + 40)) }, 500);
					}
				}
				else
				{
					$(classTooltip).removeClass('fastuts-tooltip-arrow-bottom').addClass('fastuts-tooltip-arrow-top').css
					({
						top: (elementHeight + 20) + 'px'
					});
					if (options.settings.autoScroll)
					{
						$("html, body").animate({ scrollTop: (elementTop - 20) }, 500);
					}
				}

				if (elementWindowLeft <= 100)
				{
					$(classTooltip).removeClass('fastuts-tooltip-arrow-right').addClass('fastuts-tooltip-arrow-left').css
					({
						left: '0px',
						right: 'auto',
						marginLeft: 'inherit'
					});
				}
				else if (elementWindowRight >= ($(window).width() - 100))
				{
					$(classTooltip).removeClass('fastuts-tooltip-arrow-left').addClass('fastuts-tooltip-arrow-right').css
					({
						left: 'auto',
						right: '0px',
						marginRight: 'inherit'
					});
				}
				else
				{
					$(classTooltip).removeClass('fastuts-tooltip-arrow-left').removeClass('fastuts-tooltip-arrow-right').css
					({
						left: '50%',
						right: 'auto',
						marginLeft: '-' + ($(classTooltip).width() / 2) + 'px',
						marginRight: 'auto'
					});
				}

				$('.fastuts-holder').css(holderCSS);

				$(window).bind('resize', function() 
				{

					if (alignTimer)
						clearTimeout(alignTimer);

					alignTimer = setTimeout(function()
					{

						elementLocatiom 	= $(block).offset();
						elementTop = (elementLocatiom.top - (elementMargin / 2));
						elementLeft = (elementLocatiom.left - (elementMargin / 2));
						elementWindowTop = (elementTop + elementHeight);

						$('.fastuts-holder').css
						({
							position: 			'absolute',
							width: 				elementWidth + 'px',
							height: 			elementHeight + 'px',
							top: 				elementTop + 'px',
							left: 				elementLeft + 'px',
							webkitTransition: 	(options && options.settings.time) ? 'all ' + options.settings.time + 's' : 'all 0.4s',
							transition: 		(options && options.settings.time) ? 'all ' + options.settings.time + 's' : 'all 0.4s',
							backgroundColor: 	($('body').css('backgroundColor')) ? $('body').css('backgroundColor') : '#FFFFFF'
						});

					}, 300);

				});

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