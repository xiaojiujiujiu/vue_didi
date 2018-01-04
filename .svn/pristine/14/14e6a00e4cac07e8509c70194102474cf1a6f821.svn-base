/**
 * author wusheng.xu
 * date 16/5/25
 */

angular.module('autozi.services', [])

    .factory('smModal', ['$timeout', '$compile', 'touchSlider', function ($timeout, $compile, touchSlider) {

        return {
            init: function (selector, scope) {
                var selectors = typeof selector === 'string' ? [selector] : selector;
                for (var i = 0; i < selectors.length; i++) {
                    var element = document.querySelectorAll(selectors[i]);
                    if (element.length > 1) {
                        document.body.removeChild(element[element.length - 1]);
                        element = element[0];
                    } else
                        element = element[0];
                    var comEle = $compile(element.innerHTML)(scope);
                    comEle[0].setAttribute('init', 'true');
                    document.body.appendChild(comEle[0]);
                }
            },
            show: function (selector, callBack) {
                var element = document.querySelectorAll(selector);
                element = element.length > 1 ? angular.element(element[element.length - 1]) : angular.element(element[0]);
                var content = angular.element(element[0].querySelector('.sm-modal-content'));
                var typeSet = element.attr('type-set');

                element.addClass('sm-modal-animation-fadeIn');
                var step, limit = 0, that = this, speed = 10, aniTime = 600;
                switch (typeSet) {
                    case 'top':
                        this.setTransformY(content, -content[0].clientHeight, 0, function () {
                            that.setTransformY(content, 0, aniTime, function () {
                                if (callBack instanceof Function)
                                    callBack();
                                if (content.attr('isTouchSlider'))
                                    return;
                                var sidesLip = new touchSlider(content, {
                                    coordinate: 'y',
                                    autoFlexible: true,
                                    limitT: -content[0].clientHeight,
                                    limitB: -1
                                });
                                sidesLip.on('end', function (translate, direction) {
                                    if (translate[1] == -content[0].clientHeight)
                                        element.removeClass('sm-modal-animation-fadeIn');
                                })
                            });
                        });
                        break;
                    case 'bottom':
                        this.setTransformY(content, content[0].clientHeight, 0, function () {
                            that.setTransformY(content, 0, aniTime, function () {
                                if (callBack instanceof Function)
                                    callBack();
                                if (content.attr('isTouchSlider'))
                                    return;
                                var sidesLip = new touchSlider(content, {coordinate: 'y', autoFlexible: true});
                                sidesLip.on('end', function (translate, direction) {
                                    if (translate[1] == content[0].clientHeight)
                                        element.removeClass('sm-modal-animation-fadeIn');
                                })
                            });
                        });
                        break;
                    case 'left':
                        this.setTransformX(content, -content[0].clientWidth, 0, function () {
                            that.setTransformX(content, 0, aniTime, function () {
                                if (callBack instanceof Function)
                                    callBack();
                                if (content.attr('isTouchSlider'))
                                    return;
                                var sidesLip = new touchSlider(content, {
                                    coordinate: 'x',
                                    autoFlexible: true,
                                    limitL: -content[0].clientWidth,
                                    limitR: -1
                                });
                                sidesLip.on('end', function (translate, direction) {
                                    if (translate[0] == -content[0].clientWidth)
                                        element.removeClass('sm-modal-animation-fadeIn');
                                })
                            });
                        });
                        break;
                    case 'right':
                        this.setTransformX(content, content[0].clientWidth, 0, function () {
                            that.setTransformX(content, 0, aniTime, function () {
                                if (callBack instanceof Function)
                                    callBack();
                                if (content.attr('isTouchSlider'))
                                    return;
                                //绑定侧滑
                                var sidesLip = new touchSlider(content, {coordinate: 'x', autoFlexible: true});
                                sidesLip.on('end', function (translate, direction) {
                                    if (translate[0] == content[0].clientWidth)
                                        element.removeClass('sm-modal-animation-fadeIn');
                                })
                            });
                        });

                        break;
                }
                //requestAnimationFrame(step);
            },
            hide: function (selector, callBack) {
                var element = document.querySelectorAll(selector);
                element = element.length > 1 ? angular.element(element[element.length - 1]) : angular.element(element[0]);
                var content = angular.element(element[0].querySelector('.sm-modal-content'));
                var typeSet = element.attr('type-set');
                var step, limit = 0, that = this, speed = 15,aniTime = 500;
                switch (typeSet) {
                    case 'top':
                        that.setTransformY(content, -content[0].clientHeight,aniTime, function () {
                            element.removeClass('sm-modal-animation-fadeIn');
                            if (callBack instanceof Function)
                                callBack();
                        });

                        break;
                    case 'bottom':
                        that.setTransformY(content, content[0].clientHeight,aniTime, function () {
                            element.removeClass('sm-modal-animation-fadeIn');
                            if (callBack instanceof Function)
                                callBack();
                        });
                        break;
                    case 'left':
                        that.setTransformX(content, -content[0].clientWidth,aniTime, function () {
                            element.removeClass('sm-modal-animation-fadeIn');
                            if (callBack instanceof Function)
                                callBack();
                        });
                        break;
                    case 'right':
                        that.setTransformX(content,content[0].clientWidth,aniTime, function () {
                            element.removeClass('sm-modal-animation-fadeIn');
                            if (callBack instanceof Function)
                                callBack();
                        });
                        break;
                }
            },
            setTransformY: function (ele, limit, time, call) {
                ele.css('transform', 'translate3d(0px, ' + limit + 'px, 0px)');
                ele.css('-webkit-transform', 'translate3d(0px, ' + limit + 'px, 0px)');
                ele.css('transition', time + 'ms ease-out');
                ele.css('-webkit-transition', time + 'ms ease-out');
                $timeout(function () {
                    if (call instanceof Function)
                        call();
                }, time);
            },
            setTransformX: function (ele, limit, time, call) {
                ele.css('transform', 'translate3d(' + limit + 'px, 0px, 0px)');
                ele.css('-webkit-transform', 'translate3d(' + limit + 'px, 0px, 0px)');
                ele.css('transition', time + 'ms ease-out');
                ele.css('-webkit-transition', time + 'ms ease-out');
                $timeout(function () {
                    if (call instanceof Function)
                        call();
                }, time);
            }
        }
        /*var fn = function (selector, scope) {
         var element = angular.element(document.querySelector(selector));
         var comEle = $compile(element.html())(scope);
         angular.element(document.body).append(comEle);
         element.remove();
         var content = null, typeSet = null;
         var sidesLip;//touch滑动组件
         this.show = function () {
         if (!content) {
         element = angular.element(document.querySelector(selector));
         content = angular.element(element[0].querySelector('.sm-modal-content'));
         typeSet = element.attr('type-set');
         }

         element.addClass('sm-modal-animation-fadeIn');
         var step, limit = 0, that = this, speed = 10;
         switch (typeSet) {
         case 'top':
         this.setTransformY(content, -content[0].clientHeight);
         limit = -content[0].clientHeight;
         step = function () {
         limit += speed;
         if (limit <= 0) {
         that.setTransformY(content, limit);
         requestAnimationFrame(step);
         } else {
         that.setTransformY(content, 0);
         }
         }
         break;
         case 'bottom':
         this.setTransformY(content, content[0].clientHeight);
         limit = content[0].clientHeight;
         step = function () {
         limit -= speed;
         if (limit >= 0) {
         that.setTransformY(content, limit);
         requestAnimationFrame(step);
         } else {
         that.setTransformY(content, 0);
         sidesLip = new touchSlider(content, {coordinate: 'y', autoFlexible: true});
         sidesLip.on('end', function (translate, direction) {
         if (translate[1] == content[0].clientHeight)
         element.removeClass('sm-modal-animation-fadeIn');
         })
         }
         }
         break;
         case 'left':
         this.setTransformX(content, -content[0].clientWidth);
         limit = -content[0].clientWidth;
         step = function () {
         limit += speed;
         if (limit <= 0) {
         that.setTransformX(content, limit);
         requestAnimationFrame(step);
         } else {
         that.setTransformX(content, 0);
         }
         }
         break;
         case 'right':
         this.setTransformX(content, content[0].clientWidth);
         limit = content[0].clientWidth;
         step = function () {
         limit -= speed;
         if (limit >= 0) {
         that.setTransformX(content, limit);
         requestAnimationFrame(step);
         } else {
         that.setTransformX(content, 0);
         //绑定侧滑
         sidesLip = new touchSlider(content, {coordinate: 'x', autoFlexible: true});
         sidesLip.on('end', function (translate, direction) {
         if (translate[0] == content[0].clientWidth)
         element.removeClass('sm-modal-animation-fadeIn');
         })
         }
         };

         break;
         }
         requestAnimationFrame(step);
         }
         this.hide = function () {
         var step, limit = 0, that = this, speed = 15;
         switch (typeSet) {
         case 'top':
         limit = 0;
         step = function () {
         limit -= speed;
         if (limit >= -content[0].clientHeight) {
         that.setTransformY(content, limit);
         requestAnimationFrame(step);
         } else {
         element.removeClass('sm-modal-animation-fadeIn');
         }
         }
         break;
         case 'bottom':
         limit = 0;
         step = function () {
         limit += speed;
         if (limit <= content[0].clientHeight) {
         that.setTransformY(content, limit);
         requestAnimationFrame(step);
         } else {
         element.removeClass('sm-modal-animation-fadeIn');
         }
         }
         break;
         case 'left':
         limit = 0;
         step = function () {
         limit -= speed;
         if (limit >= -content[0].clientWidth) {
         that.setTransformX(content, limit);
         requestAnimationFrame(step);
         } else {
         element.removeClass('sm-modal-animation-fadeIn');
         }
         }
         break;
         case 'right':
         limit = 0;
         step = function () {
         limit += speed;
         if (limit <= content[0].clientWidth) {
         that.setTransformX(content, limit);
         requestAnimationFrame(step);
         } else {
         element.removeClass('sm-modal-animation-fadeIn');
         }
         }
         break;
         }
         requestAnimationFrame(step);
         }
         }
         fn.prototype = {
         setTransformY: function (ele, limit) {
         ele.css('transform', 'translate3d(0px, ' + limit + 'px, 0px) scale(1)');
         },
         setTransformX: function (ele, limit) {
         ele.css('transform', 'translate3d(' + limit + 'px, 0px, 0px) scale(1)');
         }
         }
         return fn;*/

    }]);
