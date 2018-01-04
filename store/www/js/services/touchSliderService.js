/**
 * author wusheng.xu
 * date 16/6/3
 */

angular.module('autozi.services', [])
    //touch滑动服务
    .factory('touchSlider', ['viewerService', function (viewerService) {

        /**
         * 参数(选择器,设置项)
         */
        function slider(selector, options) {
            this.defaultOpt = {
                coordinate: 'x', //坐标(x,y)
                autoFlexible: false, //自动伸缩(当松开手指时是否自动根据距离计算最终位置,适合滑动模态层使用)
                smooth: true, //是否启用平滑效果
                limitL: '',//限制left距离
                limitR: '',//限制right距离
                limitT: '',//限制top距离
                limitB: '',//限制bottom距离
            }

            this.init(selector, options);

        }

        slider.prototype = {
            init: function (selector, options) {
                this.selector = typeof selector === 'string' ? angular.element(document.querySelector(selector)) : selector;
                this.selector.attr('isTouchSlider', true);
                this.defaultOpt = angular.extend({}, this.defaultOpt, options);
                this.selfWidth = this.selector[0].clientWidth;
                this.selfHeight = this.selector[0].clientHeight;
                if (this.defaultOpt.limitL == '')
                    this.defaultOpt.limitL = 0;
                if (this.defaultOpt.limitR == '')
                    this.defaultOpt.limitR = this.selfWidth;
                if (this.defaultOpt.limitT == '')
                    this.defaultOpt.limitT = 0;
                if (this.defaultOpt.limitB == '')
                    this.defaultOpt.limitB = this.selfHeight;

                this.scroll();
            },
            getTranslate: function (style) {
                var exp = /translate3d(.*)[^(\))]\s*scale/,
                    str = style.transform.toString();
                var mc = str.match(exp);
                if (mc)
                    expStr = str.match(exp)[1];
                else
                    return [0, 0, 0];
                return expStr.replace(/(\()|(\))|(px)|(\s*)/g, '').split(',');
            },
            scroll: function () {
                var startX = 0, oldX = 0, oldY = 0, startY, moveX, moveY, distance = 0,
                    _direction = 'L',
                    translate = [], translateX = 0, translateY = 0,
                    that = this;

                that.selector.on('touchstart', function (e) {
                    // e.preventDefault();
                    // //console.log(that.getTranslate(selector[0].style))
                    // startX = oldX = e.targetTouches[0].pageX;
                    // startY = oldY = e.targetTouches[0].pageY;
                    // translate = that.getTranslate(that.selector[0].style);
                    // that.selfWidth = that.selector[0].clientWidth;
                    // that.selfHeight = that.selector[0].clientHeight;
                    // translateX = parseInt(translate[0]);
                    // translateY = parseInt(translate[1]);
                    // viewerService.publisher('start', [translateX, translateY, 0]);
                });
                that.selector.on('touchmove', function (e) {
                    // e.preventDefault();
                    // //x坐标
                    // if (that.defaultOpt.coordinate == 'x') {
                    //     moveX = e.targetTouches[0].pageX;
                    //     distance = moveX - oldX;
                    //     _direction = distance < 0 ? 'L' : 'R';
                    //     if (_direction == 'L' && translateX > that.defaultOpt.limitL) {
                    //         translateX -= Math.abs(distance);
                    //         translateX = Math.max(that.defaultOpt.limitL, translateX);//最小不小于0
                    //     } else if (_direction == 'R' && translateX <= that.defaultOpt.limitR) {
                    //         translateX += Math.abs(distance);
                    //         translateX = Math.min(that.defaultOpt.limitR, translateX);//最大不大于自身宽度
                    //     }
                    //     that.scrollTo(translateX, 0, 0);
                    //     oldX = e.targetTouches[0].pageX;
                    // } else if (that.defaultOpt.coordinate == 'y') {//y坐标
                    //     moveY = e.targetTouches[0].pageY;
                    //     distance = moveY - oldY;
                    //     _direction = distance < 0 ? 'T' : 'B';
                    //     if (_direction == 'T' && translateY > that.defaultOpt.limitT) {
                    //         translateY -= Math.abs(distance);
                    //         translateY = Math.max(that.defaultOpt.limitT, translateY);//最小不小于0
                    //     } else if (_direction == 'B' && translateY <= that.defaultOpt.limitB) {
                    //         translateY += Math.abs(distance);
                    //         translateY = Math.min(that.defaultOpt.limitB, translateY);//最大不大于自身宽度
                    //     }
                    //     that.scrollTo(0, translateY, 0);
                    //     oldY = e.targetTouches[0].pageY;
                    // }
                    // viewerService.publisher('move', [translateX, translateY, 0], _direction);
                });
                that.selector.on('touchend', function (e) {
                    //     var nodeName = e.target.nodeName;
                    //     if (nodeName == 'INPUT' || nodeName == 'BUTTON' || e.target.classList.contains('radio-content'))
                    //         return false;
                    //     e.preventDefault();
                    //     var step = function () { }, speed = 6, _d = 1;
                    //     if (that.defaultOpt.autoFlexible) {
                    //         if (_direction == 'L' || _direction == 'R') {
                    //             _d = translateX > 0 ? 1 : -1;
                    //             //自动伸缩
                    //             if (Math.abs(translateX) > that.selfWidth / 3) {
                    //                 step = function () {
                    //                     translateX = _d == 1 ? translateX + speed : translateX - speed;
                    //                     if (_d == 1 ? translateX < that.selfWidth : translateX > -that.selfWidth) {
                    //                         requestAnimationFrame(step);
                    //                     } else {
                    //                         translateX = _d == 1 ? that.selfWidth : -that.selfWidth;
                    //                         viewerService.publisher('end', [translateX, translateY, 0], _direction);
                    //                     }
                    //                     that.scrollTo(translateX, 0, 0);
                    //                 }
                    //             } else {
                    //                 step = function () {
                    //                     translateX = translateX > 0 ? translateX - speed : translateX + speed;
                    //                     if (_d == 1 ? translateX > 0 : translateX < 0) {
                    //                         requestAnimationFrame(step);
                    //                     } else {
                    //                         translateX = 0;
                    //                         viewerService.publisher('end', [translateX, translateY, 0], _direction);
                    //                     }
                    //                     that.scrollTo(translateX, 0, 0);
                    //                 }

                    //             }
                    //         } else if (_direction == 'T' || _direction == 'B') {
                    //             _d = translateY > 0 ? 1 : -1;
                    //             if (Math.abs(translateY) > that.selfHeight / 3) {
                    //                 step = function () {
                    //                     translateY = _d == 1 ? translateY + speed : translateY - speed;
                    //                     if (_d == 1 ? translateY < that.selfHeight : translateY > -that.selfHeight) {
                    //                         requestAnimationFrame(step);
                    //                     } else {
                    //                         translateY = _d == 1 ? that.selfHeight : -that.selfHeight;
                    //                         viewerService.publisher('end', [translateX, translateY, 0], _direction);
                    //                     }
                    //                     that.scrollTo(0, translateY, 0);
                    //                 }
                    //             } else {
                    //                 step = function () {
                    //                     translateY = _d == 1 ? translateY - speed : translateY + speed;
                    //                     if (_d == 1 ? translateY > 0 : translateY < 0) {
                    //                         requestAnimationFrame(step);
                    //                     } else {
                    //                         translateY = 0;
                    //                         viewerService.publisher('end', [translateX, translateY, 0], _direction);
                    //                     }
                    //                     that.scrollTo(0, translateY, 0);

                    //                 }

                    //             }
                    //         }
                    //     }
                    //     //平滑
                    //     if (that.defaultOpt.smooth && !that.defaultOpt.autoFlexible) {
                    //         var startDate = new Date().getTime(), smoothSpeed = 5, smoothLimit = 20, smoothTime = 2000;
                    //         if (Math.abs(distance) > 5) {
                    //             step = function () {

                    //                 if (_direction == 'L' || _direction == 'R') {
                    //                     translateX = _direction == 'L' ? translateX + smoothSpeed : translateX - smoothSpeed;
                    //                     if (translateX < -smoothLimit) { //x小于设定值
                    //                         smoothTime = 0;
                    //                         translateX = -smoothLimit;
                    //                     } else if (translateX > that.selfWidth + smoothLimit) { //x大于自身宽度+设定值
                    //                         smoothTime = 0;
                    //                         translateX = that.selfWidth + smoothLimit;
                    //                     }
                    //                 }
                    //                 else if (_direction == 'T' || _direction == 'B') {
                    //                     translateY = _direction == 'T' ? translateY + smoothSpeed : translateY - smoothSpeed;
                    //                     if (translateY < -smoothLimit) {
                    //                         smoothTime = 0;
                    //                         translateY = -smoothLimit;
                    //                     } else if (translateY > that.selfHeight + smoothLimit) {
                    //                         smoothTime = 0;
                    //                         translateY = that.selfHeight + smoothLimit;
                    //                     }
                    //                 }
                    //                 if (new Date().getTime() - startDate < smoothTime) {
                    //                     requestAnimationFrame(step);
                    //                 } else {
                    //                     if (translateX == -smoothLimit || translateX == that.selfWidth + smoothLimit) {//当x在设定的值位置
                    //                         startDate = new Date().getTime();
                    //                         smoothTime = 1000;
                    //                         step = function () {
                    //                             translateX = translateX == -smoothLimit ? translateX + smoothSpeed / 2 : translateX - smoothSpeed / 2;
                    //                             if (new Date().getTime() - startDate < smoothTime && (translateX >= 0 || translateX <= that.selfWidth)) {
                    //                                 requestAnimationFrame(step);
                    //                             } else {
                    //                                 translateX = Math.max(0, translateX);
                    //                                 translateX = Math.min(that.selfWidth, translateX);
                    //                                 viewerService.publisher('end', [translateX, translateY, 0], _direction);
                    //                             }
                    //                             that.scrollTo(translateX, 0, 0);
                    //                         }
                    //                     } else if (translateY == -smoothLimit || translateY == that.selfHeight + smoothLimit) {
                    //                         startDate = new Date().getTime();
                    //                         smoothTime = 1000;
                    //                         step = function () {
                    //                             translateY = translateY == -smoothLimit ? translateX + smoothSpeed / 2 : translateY - smoothSpeed / 2;
                    //                             if (new Date().getTime() - startDate < smoothTime && (translateY >= 0 || translateY <= that.selfHeight)) {
                    //                                 requestAnimationFrame(step);
                    //                             } else {
                    //                                 translateY = Math.max(0, translateY);
                    //                                 translateY = Math.min(that.selfHeight, translateY);
                    //                                 viewerService.publisher('end', [translateX, translateY, 0], _direction);
                    //                             }
                    //                             that.scrollTo(0, translateY, 0);
                    //                         }
                    //                     } else {
                    //                         translateX = Math.max(0, translateX);
                    //                         translateX = Math.min(that.selfWidth, translateX);
                    //                         translateY = Math.max(0, translateY);
                    //                         translateY = Math.min(that.selfHeight, translateY);
                    //                         viewerService.publisher('end', [translateX, translateY, 0], _direction);
                    //                     }
                    //                 }
                    //                 if (_direction == 'L' || _direction == 'R')
                    //                     that.scrollTo(translateX, 0, 0);
                    //                 else if (_direction == 'T' || _direction == 'B')
                    //                     that.scrollTo(0, translateY, 0);
                    //             }
                    //         }
                    //     }
                    //     requestAnimationFrame(step);
                });
            },
            scrollTo: function (x, y, z) {
                this.selector.css('transform', 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) scale(1)');
                this.selector.css('-webkit-transform', 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) scale(1)');
                this.selector.css('transition', '100ms ease-out');
                this.selector.css('-webkit-transition', '100ms ease-out');
            },
            setTransformX: function (selecter, x) {
                selecter.css('transform', 'translate3d(' + x + 'px, 0px, 0px) scale(1)');
            },
            setTransformY: function (selecter, y) {
                selecter.css('transform', 'translate3d(0px, ' + y + 'px, 0px) scale(1)');
            },
            /**
             * 绑定事件 支持:start,move,end
             * @param eName 事件名称
             * @param fn 回调
             */
            on: function (eName, fn) {
                viewerService.subscriber(eName, fn);
            }
        }
        return slider;
    }])