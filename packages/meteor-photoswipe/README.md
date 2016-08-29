# PhotoSwipe
[PhotoSwipe](http://photoswipe.com/) v4.1.1 packaged for meteor

## How to use
Add the pswp template to your body or layout
```
{{> pswp}}
```

Example which initializes a gallery with just a single element and minimal controls.
```
Template.myTemplate.events({
    "click img.photoswipe": function(e) {
        var gallery = new PhotoSwipe($('.pswp')[0], PhotoSwipeUI_Default, [
            {
                src: e.target.dataset.src, // assumes the high-res source is in data-src attribute of the image element
                msrc: e.target.src,
                w: e.target.dataset.width, // PhotoSwipe requires you to know the dimensions
                h: e.target.dataset.height // More information: http://photoswipe.com/documentation/faq.html
            }
        ], {
            index: 0,
            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = e.target,
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            barsSize: {top:0,bottom:0},
            captionEl: false,
            fullscreenEl: false,
            shareEl: false,
            tapToClose: true,
            tapToToggleControls: false
        });
        gallery.init();
    }
});
```

More information in their [getting started](http://photoswipe.com/documentation/getting-started.html) and [options](http://photoswipe.com/documentation/options.html).