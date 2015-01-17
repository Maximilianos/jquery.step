jquery.step
===========

jQuery.step enables you to step or stagger through an array of jQuery DOM Elements.
It is essentially like jQuery's native `$().each()` function, but with the added option to define the timeout or delay between
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

Download the repo and check out the files in the *demo* folder for the above example in working form.


Details
=======

jQuery.step takes two parameters:

- the `stepcallback` parameter is the function that gets called at each iteration of the loop. `this` in the stepcallback function refers to the currently evaluating element. The function gets passed the following variables
    - `index`: the current index of the iteration
    - `elements`: the selected elements that we are stepping through
    - `delay`: the delay until the *next* iteration of the loop
- the `custom` parameter is *optional* and can be one of three things:
    - a simple `number` that represents the delay in **milliseconds** between each iteration of the `stepcallback`,
    - a `function` that returns that number for every individual iteration. This function gets passed the following variables:
        - `index`: the current index of the iteration
        - `elements`: the selected elements that we are stepping through
    - or an object containing custom options for the step function. This object can contain any of the following:
        - `timeout` - accepts either a `number` or a `function` to return the delay between each iteration. **(Default: `300`)**
        - `startAt` - a `number` indicating the index of the array of elements to begin from. **(Default: `0`)**
        - `endAt`   - a `number` indicating the index of the array of elements to stop at. *(`false` indicates ending at the end of the array)* **(Default: `false`)**
        - `onEnd`   - a `function` that runs once after the step function has run for the last time. This function takes the following variables:
            - `index`: the current index of the iteration
            - `elements`: the selected elements that we are stepping through
  
A full example of the step function would start from the following:

```javascript
$('[data-to-step]').step(
  function (index, elements, delay) {
    var me = $(this);
    // ... do something with $(this)
  }, {
    startAt: 0, // or 4, or whatever you want
    endAt: false, // or 6, or whatever *greater than startAt*
    timeout: function (index, elements) {
      var delay = 0;
      // ... do something to calculate delay
      return delay; // some number in milliseconds
    },
    onEnd: function (index, elements) {
      // ... do something right after the loop has finished
    }
  }
);
```