/* Resources.js
 * This is a simple img loading tool. Simplefy loading process
 * Also include a cache area when you try to reload a img can use the img in cache
 */
"use strict";

(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* Pulic img loading function 
     * Parameters: One img url or img urls' array
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* if the parameter is img array */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* if the parameter is img url
             */
            _load(urlOrArr);
        }
    }

    /* Private img loading function, will be called in the public load() */
    function _load(url) {
        if(resourceCache[url]) {
            /* If the current URL has been loaded, we can use it from cache array resourceCache[]
             */
            return resourceCache[url];
        } else {
            /* Otherwise, we need to load this new URL
             */
            var img = new Image();
            img.onload = function() {
                /* After loaded, put it in resourceCache[]
                 */
                resourceCache[url] = img;
                /* When all the imgs have been loaded, call the added callback function(s)
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Set the init resourcCache[url] as false, it will be changed at onload's callback funtion
             * Set img's src as parameter URl 。
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* Use this function to get the loaded img's reference
     */
    function get(url) {
        return resourceCache[url];
    }

    /* Use this function to check if all the imgs have been loaded
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* Add a callback function in readyCallbacks[]*/
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* Create a public resource of all functions can be called directly*/
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
