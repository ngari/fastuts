#fastuts.js

### What is it?

A faster way to display quick tutorials for your application or website

  - It's tiny! Just 5KB;
  - Easy to customize;
  - Allows callback functions;
  - jQuery required.

---

[View the demo](https://guimadaleno.github.io/demos/fastuts.js)

---

### Installation

- Install via [Bower](http://bower.io) ```bower install --save fastuts```
- Download via [GitHub](https://github.com/guimadaleno/fastuts/archive/master.zip)

---

### How to use?

##### Fast way

Don't have time? Do it.

- First off, add the class `fastuts` to all the elements you want to introduce to people, as the example below. Also, it's required to add the attribute `data-fastuts-tip`. Optionally, you can add a sequence number to your presentation using the attribute `data-fastuts-order`.
```html
<div class="fastuts" data-fastuts-tip="Put a short tip right here" data-fastuts-order="2">
	<h4>Some random content one</h4>
	<p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
</div>
<div class="fastuts" data-fastuts-tip="Another tip" data-fastuts-order="1">
	<h4>Some random content two</h4>
	<p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
</div>
```

- Now, add this script below to any event or function you wish:
```javascript
$('.fastuts').fastuts();
```
And that's all! Enjoy your content in your table.

---

##### Complete mode
Would you like to fully customize **fastuts.js**? Here's all the options:

```javascript
$('.fastuts').fastuts
({
	settings:
	{
		spacing: '40px',
		time: 0.2,
		autoScroll: true,
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

---

### Help?
Tweet me: [@guimadaleno](http://twitter.com/guimadaleno)

---

### License
GNU GPL

Peace!
