#GM's fastuts.js

### What is it?

A fast way to display quick tutorials for your application or website

  - It's tiny! Just 5KB;
  - Easy to customize;
  - Allows callback functions;
  - jQuery required.

### How to use?

##### One-line-to-go

Don't have time? Do it.

- First off, include the `fastuts.js` and `fastuts.css` to your project, then, add the class `fastuts` to all the elements you want to introduce to people, as the example below:
```
<div class="fastuts" data-fastuts-tip="Put a short tip right here">
	<h4>Some random content one</h4>
	<p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
</div>
<div class="fastuts" data-fastuts-tip="Another tip">
	<h4>Some random content two</h4>
	<p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
</div>
```

- Now, add this script below to any event or function you wish:
```
$('.fastuts').fastuts();
```
And that's all! Enjoy your content in your table.

##### Complete mode
Would you like to fully customize **fastuts.js**? Here's all the options:

```
$('.fastuts').fastuts
({
	settings:
	{
		spacing: '40px',
		time: 0.2,
		allowKeys: true
	},
	buttons:
	{
		close:
		{
			class: '.fastuts-button-close',
			text: 'Close',
			callback: function ()
			{
				console.log('Clicked close button');
			}
		},
		prev:
		{
			class: '.fastuts-button-prev',
			text: '&#10094;',
			callback: function (index, element)
			{
				console.log('Clicked back button and moving to element ' + index);
			}
		},
		next:
		{
			class: '.fastuts-button-next',
			text: '&#10095;',
			callback: function (index, element)
			{
				console.log('Clicked next button and moving to element ' + index);
			}
		}
	},
	overlay:
	{
		color: 'rgba(0,0,0,0.8)',
		allowEscapeKey: true,
		onClose: function ()
		{
			console.log('Clicked on overlay to close');
		}
	},
	onReady: function ()
	{
		console.log('Fastuts ready!');
	},
});
```

### Help?
Tweet me: **@guimadaleno**

License
----
GNU

Peace!
