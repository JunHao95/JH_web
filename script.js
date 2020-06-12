/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');

// Instruction from https://materializecss.com/auto-init.html to initialize
M.AutoInit();

// Instruction from https://materializecss.com/navbar.html
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});
