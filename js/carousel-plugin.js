$(function() {
    (function($) {
        $.fn.extend({
            "carousel": function(options) {
                let opts = $.extend({}, defaults, options);
                return this.each(function() {
                    let $this = $(this),
                        $container = $this.children(),
                        $img = $container.children();
                    $this.css({
                        'width': opts.width,
                        'height': opts.height,
                        'overflow': 'hidden',
                        'white-space': 'nowrap',
                        'position': 'relative',
                        'left': opts.left,
                        'top': opts.top
                    });
                    $container.css({
                        'font-size': '0',
                        'position': 'relative'
                    });
                    $img.css({
                        'width': opts.width,
                        'height': opts.height,
                    });
                    $this.append('<img src="img/lbtn.PNG" />');
                    $this.append('<img src="img/rbtn.PNG" />');
                    $this.append('<div></div>');
                    let $lbtn = $($this.children().get(1)),
                        $rbtn = $($this.children().get(2)),
                        $bottom = $($this.children().get(3)),
                        btnWidth = opts.width * 0.04,
                        btnHeight = opts.height * 0.2,
                        btnTop = opts.height * 0.4,
                        bottomHeight = opts.height * 0.08;
                    $lbtn.css({
                        'width': btnWidth,
                        'height': btnHeight,
                        'position': 'absolute',
                        'left': '0',
                        'top': btnTop,
                        'opacity': 0.3,
                        'cursor': 'pointer'
                    });
                    $rbtn.css({
                        'width': btnWidth,
                        'height': btnHeight,
                        'position': 'absolute',
                        'right': '0',
                        'top': btnTop,
                        'opacity': 0.3,
                        'cursor': 'pointer'
                    });
                    $lbtn.hover(function() {
                        $lbtn.css({
                            'opacity': 0.6
                        });
                    }, function() {
                        $lbtn.css({
                            'opacity': 0.3
                        });
                    });
                    $rbtn.hover(function() {
                        $rbtn.css({
                            'opacity': 0.6
                        });
                    }, function() {
                        $rbtn.css({
                            'opacity': 0.3
                        });
                    });
                    $bottom.css({
                        'width': opts.width,
                        'height': bottomHeight,
                        'position': 'absolute',
                        'bottom': '0',
                        'background': 'rgba(0,0,0,0.6)',
                        'cursor': 'default',
                        'text-align': 'right'
                    });
                    for (let i = 0; i < opts.num; i++) {
                        $bottom.append(`<span value="${i}" ></span>`);
                    }
                    let $circle = $bottom.children();
                    $circle.css({
                        'width': bottomHeight * 0.4,
                        'height': bottomHeight * 0.4,
                        'border-radius': bottomHeight * 0.2,
                        'background': '#ffffff',
                        'cursor': 'pointer',
                        'opacity': '0.6',
                        'margin-top': bottomHeight * 0.3,
                        'display': 'inline-block',
                        'margin-left': 8
                    });
                    $($circle.get(opts.num - 1)).css({
                        'margin-right': opts.width * 0.04
                    });
                    $($circle.get(0)).css({
                        'opacity': 1
                    });

                    //轮播实现
                    let timer = null,
                        index = 0;
                    // console.log(index);
                    if (timer) {
                        clearInterval(timer);
                        timer = null;
                    }
                    timer = setInterval(autoplay, 4000);

                    $this.hover(function() {
                        clearInterval(timer);
                    }, function() {
                        timer = setInterval(autoplay, 4000);
                    });

                    //有问题代码？？？-----已解决
                    $circle.each(function() {
                        let $this = $(this);
                        $this.mouseover(function() {
                            // console.log(index + 'circle');
                            index = parseInt($this.attr('value')); //得到的value为字符串
                            // console.log(index);
                            changeWithAnimation(index);
                        });
                    });

                    $lbtn.click(function() {
                        // console.log(index + 'lbtn');
                        index = (index + opts.num - 1) % opts.num;
                        // console.log(index);
                        changeWithAnimation(index);
                    });

                    $rbtn.click(function() {
                        // console.log(index + 'rbtn');
                        index = (index + 1) % opts.num;
                        // console.log(index);
                        changeWithAnimation(index);
                    });

                    function autoplay() {
                        index++;
                        if (index > opts.num - 1) {
                            index = 0;
                        }
                        // console.log(index);
                        changeWithAnimation(index);
                    }

                    function changeWithAnimation(index) {
                        // console.log(index + 'animation');
                        for (let i = 0; i < opts.num; i++) {
                            $($circle.get(i)).css({
                                'opacity': 0.6
                            });
                        }
                        $($circle.get(index)).css({
                            'opacity': 1
                        });
                        $container.stop().animate({
                            'left': -index * opts.width
                        })
                    }
                });
            }
        });
        var defaults = {
            'width': 640,
            'height': 480,
            'num': 5,
            'left': 0,
            'top': 0
        };
    })(jQuery);
});