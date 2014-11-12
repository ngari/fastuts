$.fn.fastuts = function (options)
{

	var element 				= this;
	var elementSelector 		= this.selector;
	var elementSize 			= $(element).size();

	var classButtonNext 		= (options && options.buttons && options.buttons.next) ? options.buttons.next.class : ".fastuts-buttons-next";
	var classButtonPrev 		= (options && options.buttons && options.buttons.prev) ? options.buttons.prev.class : ".fastuts-buttons-prev";
	var classButtonClose 		= (options && options.buttons && options.buttons.close) ? options.buttons.close.class : ".fastuts-buttons-close";

	var textButtonNext 			= (options && options.buttons && options.buttons.next) ? options.buttons.next.text : "&#10095;";
	var textButtonPrev 			= (options && options.buttons && options.buttons.prev) ? options.buttons.prev.text : "&#10094;";
	var textButtonClose 		= (options && options.buttons && options.buttons.close) ? options.buttons.close.text : "X";

	var classTooltip 			= (options && options.buttons && options.tooltip.class) ? options.tooltip.class : ".fastuts-tooltip";

	var holderIndex 			= 1;
	var currentIndex 			= 0;

	var fastuts =
	{

		/* Where everything starts */

		init: function()
		{

			/* Wait til all elements are rendered */

			$(window).load(function ()
			{

				/* Add fastuts elements to body */

				$('body').append('<div class="fastuts-main-holder"><div class="fastuts-holder"><div class="' + classTooltip.replace('.', '') + '"><div class="fastuts-text"></div><div class="fastuts-buttons"><a href="#" class="' + classButtonClose.replace('.', '') + '">' + textButtonClose + '</a><a href="#" class="' + classButtonPrev.replace('.', '') + '">' + textButtonPrev + '</a><a href="#" class="' + classButtonNext.replace('.', '') + '">' + textButtonNext + '</a></div></div></div></div>');

				/* If there are elements found */

				if (elementSize)
				{

					/* Displays fastuts */

					fastuts.displayBlock (element[(holderIndex - 1)]);
					fastuts.displayButtons (1, elementSize);

					/* Callback onReady */

					if (options && options.onReady && $.type(options.onReady) === 'function')
						options.onReady();

					/* Events on click button back */

					$(classButtonPrev).off('click').on('click', function()
					{

						fastuts.prevBlock();

						if (options && options.buttons && options.buttons.prev && options.buttons.prev.callback && $.type(options.buttons.prev.callback) === 'function')
							options.buttons.prev.callback (currentIndex, element);

						return false;

					});

					/* Events on click button next */

					$(classButtonNext).off('click').on('click', function()
					{

						fastuts.nextBlock();

						if (options && options.buttons && options.buttons.next && options.buttons.next.callback && $.type(options.buttons.next.callback) === 'function')
							options.buttons.next.callback (currentIndex, element);

						return false;

					});

					/* Events on click button close */

					$(classButtonClose).off('click').on('click', function()
					{

						fastuts.hide();

						if (options && options.buttons && options.buttons.close && options.buttons.close.callback && $.type(options.buttons.close.callback) === 'function')
							options.buttons.close.callback (currentIndex, element);

						return false;

					});

				}

			});

		},

		/* Hide Fastuts */

		hide: function ()
		{
			$('.fastuts-main-holder').fadeOut(200, function()
			{
				holderIndex = 1;
				currentIndex = 0;
				$(classTooltip).children('.fastuts-text').html(" ");
			});
		},

		/* Displays next/previous buttons depending of slide state */

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

		/* Displays blocks */

		displayBlock: function (block)
		{

			if ($(block).html())
			{

				var elementLocatiom 	= $(block).position();
				var elementPosition 	= $(block).css('position');
				var elementMargin 		= (options && options.settings && options.settings.spacing && options.settings.spacing.indexOf() == -1) ? parseInt(options.settings.spacing.replace('px', '')) : 0;
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

				$('.fastuts-main-holder').css
				({
					position: 'fixed',
					left: '0px',
					top: '0px',
					right: '0px',
					bottom: '0px',
					zIndex: '2147483637'
				});

				$('.fastuts-holder').css(holderCSS);
			}

		},

		nextBlock: function ()
		{
			if (holderIndex < elementSize)
			{
				currentIndex = holderIndex = (holderIndex + 1);
				fastuts.displayBlock(element[(holderIndex - 1)]);
				fastuts.displayButtons(currentIndex, elementSize);
			}
		},

		prevBlock: function ()
		{
			if (holderIndex > 1)
			{
				currentIndex = holderIndex = (holderIndex - 1);
				fastuts.displayBlock(element[(holderIndex - 1)]);
				fastuts.displayButtons(currentIndex, elementSize);
			}
		}

	};

	fastuts.init();

};