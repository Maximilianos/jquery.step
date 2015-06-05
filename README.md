# jquery.step

jQuery.step enables you to step or stagger through an array of jQuery DOM Elements.
It is essentially like jQuery's native `$().each()` function, but with the added option to define the timeout or delay between
each iteration.
  
# Examples

Let's say you had a bunch of `li`s, like these:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

and you wanted to apply a transition to each item, one after the other.
Then using jQuery.step you could use code very similar to the following:

```javascript
$('li').step(function () {
  $(this).addClass('stepped');
}, 500);
```

This would consecutively add the `stepped` class to each `li` in the list with a 500ms delay between each addition.
You can then style the transition states for both the unstepped and stepped `li`s in your stylesheet.

A full implementation of the step function could look like the following:

```javascript
function doEveryStep(index, elements, delay) {
	// ... do something with $(this)
	// on every step
}

function calculateTimeout(index, elements) {
  // ... optional, you can also pass in
  // exact milliseconds instead

	var timeout = 0;
	
  return timeout; // must return number
}

function done(index, elements) {
	// ... do something right after
  // the loop has finished
}

var options = {
	startAt: 0, // index to start from
	endAt: false, // index to end at (false === end of array)
	timeout: calculateTimeout,
	onEnd: done
};


$('li').step(doEveryStep, options);
```

You can check out the [jquery.step mini demo page](http://maximilianos.github.io/jquery.step/) for a simple working
example.

# Usage

You can include the minified script into your project directly or you 
can install this script via [npm](https://www.npmjs.com/package/jquery.step) or [bower](http://bower.io/search/?q=jquery.step).

```
npm install jquery.step --save
```

or

```
bower install jquery.step --save
```

and then include in your project using any [UMD](https://github.com/umdjs/umd) compatible method you like

# Properties & Config

jQuery.step takes two parameters:

- the `stepcallback` parameter is the function that gets called at each iteration of the loop. `this` in the stepcallback function refers to the currently evaluating element. The function gets passed the following variables
    - `index`: the current index of the iteration
    - `elements`: the selected elements that we are stepping through
    - `delay`: the delay until the *next* iteration of the loop

- the `custom` parameter is *optional* and can be one of three things:
    - a simple *number* that represents the delay in **milliseconds** between each iteration of the *stepcallback*,
    - a *function* that returns that number for every individual iteration. This function gets passed the following variables:
        - `index`: the current index of the iteration
        - `elements`: the selected elements that we are stepping through
    - or an *object* containing custom options for the step function. This object can contain any of the following:
        - `timeout` - accepts either a *number* or a *function* to return the delay between each iteration. 
        *(Default:&nbsp;`300`)*
        - `startAt`: a *number* indicating the index of the array of elements to begin from. 
        *(Default:&nbsp;`0`)*
        - `endAt`: a *number* indicating the index of the array of elements to stop at. *(`false`&nbsp;indicates ending at the end of the array)* 
        *(Default:&nbsp;`false`)*
        - `onEnd`: a *function* that runs once after the step function has run for the last time. This function takes the following variables:
        *(Default:&nbsp;`false`)*
            - `index`: the current index of the iteration
            - `elements`: the selected elements that we are stepping through
