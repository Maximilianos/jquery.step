jquery.step
===========

jQuery.step is a ridiculously simple script that enables you to step or stagger through an array of jQuery DOM Elements.
It is essentially like jQuery's native `$().each()` function but with the added option to define the timeout or delay between
each iteration.

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


Details
======

jQuery.step takes two parameters:

- the `stepcallback` parameter is the function that gets called at each iteration of the loop.  `this` in the stepcallback function refers to the currently evaluating element. The function gets passed the followung variables
  - `index`: the current index of the iteration
  - `elements`: the selected elements that we are stepping through
  - `delay`: the delay until the *next* iteration of the loop
- the `timeout` parameter can either be a simple number that represents the delay in **milliseconds** between each iteration of the `stepcallback`, or a function that returns that number. The function version gets passed the following variables:
  - `index`: the current index of the iteration
  - `elements`: the selected elements that we are stepping through
  
A full example of the step function would start from the following:

```javascript
$('[data-to-step]').step(
  function (index, elements, delay) {
    var me = $(this);
    // ... do something with {me}
  }, function (index, elements) {
    // ... do something to calculate delay
    return delay; // some number in milliseconds
  }
);
```