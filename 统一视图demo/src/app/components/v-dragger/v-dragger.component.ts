import { Component, OnInit ,ViewChild} from '@angular/core';
import * as Dom from '../../common/ts/commonDomFun';

@Component({
  selector: 'v-dragger',
  templateUrl: './v-dragger.component.html',
  styleUrls: ['./v-dragger.component.css']
})
export class VDraggerComponent implements OnInit {
@ViewChild('dragger') dragger;
  constructor() { }

  ngOnInit() {
		
		var timeout;
		var time_touchstart = 0;
		var moving = false;
		var itemHiding = false;
    var touchstart_scaling = true;
    var dragger = this.dragger.nativeElement;
    var innerWrapper = dragger.querySelector(".inner-wrapper")
    console.log(dragger);
    
		//响应排列顺序
		var seqConfig = {
			1: "item1",
			2: "item2",
			3: "item3",
			4: "item4",
			5: "item5",
			6: "item6"
		};

		var cacheSeq = localStorage.getItem("cacheSeq");
		if (cacheSeq) {
			var seqArr = cacheSeq.split(",");
			for (var i = 0; i < seqArr.length; i++) {
				Dom._el(".inner-wrapper",dragger)
					.appendChild(Dom._el("."+seqConfig[seqArr[i]]),dragger);
			}
		} else {
			for (var i = 0; i < 6; i++) {
				document.getElementsByClassName("wrapper")[0]
					.appendChild(document.getElementsByClassName("temp-wrapper")[0].getElementsByClassName(seqConfig[i + 1])[0]);
			}
		}


//移动事件
		innerWrapper.addEventListener("touchstart", function(ev) {
			time_touchstart = new Date().getMilliseconds();
			var _this = this;
			if (!Dom._hasClass(ev.target, "title")) {
				return;
			}
			var item = ev.target["parentNode"];

			if (Dom._els(".turnSmall",dragger).length > 0) {
				return;
			} else {
				var touch = ev.targetTouches[0];
				timeout = setTimeout(() =>{
					moving = true;
					//防止，缩小时误隐藏
					touchstart_scaling = true;

					Dom._addClass(Dom._el(".outer-wrapper",dragger), "active");
					Dom._addClass(Dom._el(".inner-wrapper",dragger), "hide");
					Dom._addClass(item, "turnSmall");

					Dom._el(".turnSmall",dragger).style.left = "100%";
					//防止缩小动画过程中，位置计算错误
					var clientY = touch.clientY;
					var clientX = touch.clientX;
					setTimeout(()=>{
						touchstart_scaling = false;

						var windowScroll = window.scrollY || window.pageYOffset;
						var wrapperOffsetY = Dom._el(".inner-wrapper",dragger).offsetTop;
						var wrapperPffsetX = Dom._el(".inner-wrapper",dragger).offsetLeft;
						if (windowScroll < wrapperOffsetY) {
							Dom._el(".turnSmall",dragger).style.top = clientY - (wrapperOffsetY - windowScroll);
							Dom._el(".turnSmall",dragger).style.left = clientX - wrapperPffsetX;
						} else {
							Dom._el(".turnSmall",dragger).style.top = clientY + (wrapperOffsetY - windowScroll) + "px";
							Dom._el(".turnSmall",dragger).style.left = clientX - wrapperPffsetX + "px";
						}
            //放到最后，防止位置不对
            Dom._removeClass(Dom._el(".blueline",dragger), "hide");
						Dom._el(".inner-wrapper",dragger).appendChild(Dom._el(".blueline",dragger));
						
					}, 1000);
				}, 1000);
			}
		});
		innerWrapper.addEventListener("touchmove", function(ev) {
			if (!Dom._hasClass(ev.target, "title")) {
				return;
      }
			//没有移动前初始化就移动，不算
			var now = new Date().getMilliseconds();
			if (now - time_touchstart < 1000) {
				clearTimeout(timeout);
			}

			if (moving && !touchstart_scaling) {
				ev.preventDefault();
				ev.stopPropagation();
				var touch = ev.targetTouches[0];
				var item_move = Dom._el(".turnSmall",dragger);
				item_move.style.top = touch.pageY - Dom._el(".inner-wrapper",dragger).offsetTop + "px";
				item_move.style.left = touch.pageX - Dom._el(".inner-wrapper",dragger).offsetLeft + "px";

				locateSplit(touch);
			}
		});

		innerWrapper.addEventListener("touchend", function(ev) {
			var now = new Date().getMilliseconds();
			if (now - time_touchstart < 1000) {
				clearTimeout(timeout);
			}

			if (!moving) {
				return;
			}
			var _this = this; //wrapper

			Dom._addClass(Dom._el(".blueline",dragger), "hide");
			this.insertBefore(Dom._el(".turnSmall",dragger), Dom._el(".blueline",dragger));
			Dom._removeClass(Dom._els(".turnSmall",dragger), "turnSmall");
			Dom._removeClass(this, "hide");
			Dom._removeClass(Dom._els(".item",dragger), "hide");

			moving = false;

			Dom._removeClass(Dom._el(".outer-wrapper",dragger), "active");

			//存储顺序
			//枚举比较好
			var items = Dom._els(".item",dragger);
			var seq = "";
			for (var i = 0; i < items.length; i++) {
				seq += items[i].getAttribute("data-seq") + ",";
			}
			localStorage.setItem("cacheSeq", seq.substring(0, seq.lastIndexOf(',')));
		});

		function locateSplit(touch) {
			//不动的item
			var static_items = Dom._els(".item:not(.turnSmall):not(.hide)",dragger);
			var clientH = static_items[0].clientHeight;
			var top = touch.pageY - Dom._el(".inner-wrapper",dragger).offsetTop;
			//超后
			if (top > static_items[static_items.length - 1].offsetTop - Dom._el(".inner-wrapper",dragger).offsetTop + clientH) {
				Dom._el(".inner-wrapper",dragger)
					.appendChild(Dom._el(".blueline",dragger));
			}
			//超前
			else if (top < Dom._el(".inner-wrapper",dragger).offsetTop - Dom._el(".item",dragger).offsetTop) {
				Dom._el(".inner-wrapper",dragger)
					.insertBefore(Dom._el(".blueline",dragger), static_items[0]);
			} else {
				for (var i = 0; i < static_items.length; i++) {
					var item_s_top = static_items[i].offsetTop;
					if (top > item_s_top && top < item_s_top + clientH) {
						if (top > item_s_top + clientH / 2) {
							if (i === static_items.length - 1) {
								Dom._el(".inner-wrapper",dragger).appendChild(Dom._el(".blueline",dragger));
							} else {
								Dom._el(".inner-wrapper",dragger)
									.insertBefore(Dom._el(".blueline",dragger), static_items[i + 1]);
							}
						} else {
							Dom._el(".inner-wrapper",dragger)
								.insertBefore(Dom._el(".blueline",dragger), static_items[i]);
						}
					}
				}
			}
			//标线在可视区
			var hrOffsetY = Dom._el(".blueline",dragger).offsetTop;
			var hrHeight = Dom._el(".blueline",dragger).offsetHeight;
			var windowScroll = window.scrollY || window.pageYOffset;

			if (!touchstart_scaling && !itemHiding) {
				if (hrOffsetY < Dom._el(".item:not(.turnSmall):not(.hide)",dragger).offsetTop) {
					Dom._removeClass(Dom._els(".item.hide",dragger)[Dom._els(".item.hide",dragger).length - 1], "hide");

					itemHiding = true;
					setTimeout(function() {
						itemHiding = false;
					}, 1500);
				} else if (((windowScroll + window.innerHeight - hrOffsetY - hrHeight < clientH) && (static_items[static_items.length - 1].offsetTop + clientH > windowScroll + window.innerHeight)) ||
					windowScroll + window.innerHeight < hrOffsetY + hrHeight) {
					Dom._addClass(Dom._els(".item:not(.turnSmall):not(.hide)",dragger)[0], "hide");
					itemHiding = true;
					setTimeout(function() {
						itemHiding = false;
					}, 1500);
				}
			}
		}
  }

}
