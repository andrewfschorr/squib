/*
* Squib - The worst templating engine you've ever seen
*
* Global factory function to cover all of our bases since
* this motivation for this was just a simple templating
* engine to use in browser, but node too in testing/NPM
*
* Inspiration from:
* https://github.com/addyosmani/memoize.js/blob/master/memoize.js
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([root], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.squib = factory(root);
    }
}(this, function(root) {
    'use strict';
    // taken from: https://johnresig.com/blog/javascript-micro-templating/
    var cache = {};

    const squib = function(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = str instanceof HTMLElement ?
            cache[str] = cache[str] ||
            squib(str.innerHTML) :
            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
            + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };

    return squib;
}));