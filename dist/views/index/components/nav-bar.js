System.register(["aurelia-framework"],function(e){"use strict";function r(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function t(e,r,t){var i=t[r];if(i){var n={};for(var o in i)n[o]=i[o];n.value=n.initializer?n.initializer.call(e):void 0,Object.defineProperty(e,r,n)}}var i,n,o=function(){function e(e,r,t){for(var i=0;i<r.length;i++){var n=r[i],o=n.decorators,a=n.key;if(delete n.key,delete n.decorators,n.enumerable=n.enumerable||!1,n.configurable=!0,("value"in n||n.initializer)&&(n.writable=!0),o){for(var u=0;u<o.length;u++){var f=o[u];if("function"!=typeof f)throw new TypeError("The decorator for method "+n.key+" is of the invalid type "+typeof f);n=f(e,a,n)||n}if(void 0!==n.initializer){t[a]=n;continue}}Object.defineProperty(e,a,n)}}return function(r,t,i,n,o){return t&&e(r.prototype,t,n),i&&e(r,i,o),r}}();return{setters:[function(e){i=e.bindable}],execute:function(){n=function(){function e(){r(this,e),t(this,"router",n)}var n={};return o(e,[{key:"router",decorators:[i],initializer:function(){return{}},enumerable:!0}],null,n),e}(),e("NavBar",n)}}});