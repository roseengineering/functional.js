/* Copyright 2015 George Magiros
 * Licensed under the MIT License
 */
(function(exports, undefined){
    'use strict'
    var unbind = function(fn, bool){
            return function(ob){
                var ret = fn.apply(ob, [].slice.call(arguments, 1));
                return bool ? ob : ret;
            }
        },
        isArray = Array.isArray,
        keys = Object.keys,
        slice = unbind([].slice),
        extend2 = function(memo, ob) {
            for (var key in ob) {
                if (ob[key] !== undefined) memo[key] = ob[key];
            }
            return memo;
        },
        _ = {
            extend: function() {
                return slice(arguments).reduce(extend2);
            },
            clone: function() {
                return slice(arguments).reduce(extend2, {});
            },
            call: function(fn){
                return fn.apply(undefined, slice(arguments, 1)); 
            },
            size: function(ob) { 
                return ob.length === +ob.length ? ob.length : keys(ob).length; 
            },
            toArray: function(ob) {
                if (isArray(ob)) return ob;
                return ob.length === +ob.length ? slice(ob) : keys(ob);  
            },
            each: function(ob) {
                [].forEach.apply(this.toArray(ob), slice(arguments, 1));
                return ob;
            },
            isArray: isArray,
            has: unbind({}.hasOwnProperty),
            bind: unbind(Function.prototype.bind)
        };

    ['concat', 'every', 'filter', 'forEach', 'indexOf', 'join', 
     'lastIndexOf', 'map', 'pop', 'reduce', 'reduceRight', 
     'reverse', 'shift', 'some', 'sort', 'slice'].forEach(function(name){
        _[name] = unbind([][name]);
    });
    
    ['splice', 'push', 'unshift'].forEach(function(name){
        _[name] = unbind([][name], true);
    });
    
    ['create', 'is', 'keys'].forEach(function(name){
        _[name] = Object[name];
    });

    exports._ = _;
})(this);
