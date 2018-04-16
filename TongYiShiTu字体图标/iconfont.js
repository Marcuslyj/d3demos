(function(window){var svgSprite='<svg><symbol id="icon-gou" viewBox="0 0 1024 1024"><path d="M933.568 211.008c-27.072-28.096-71.232-28.096-98.304 0.128l-474.816 492.096L213.12 550.656c-27.2-28.16-71.232-28.16-98.432-0.064-27.008 28.096-27.008 73.664 0 101.952l196.864 203.904c27.008 28.096 71.104 28.096 98.304 0.128 0.512-0.576 0.704-1.344 1.216-1.92l522.56-541.632C960.64 284.8 960.64 239.232 933.568 211.008z"  ></path></symbol><symbol id="icon-wenhaofill" viewBox="0 0 1024 1024"><path d="M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"  ></path></symbol><symbol id="icon-daohangnavigate6" viewBox="0 0 1024 1024"><path d="M549.84704 309.80096l328.69376 328.704c20.91008 20.91008 20.91008 54.80448 0 75.70432-20.89984 20.89984-54.80448 20.89984-75.70432 0L512 423.36256 221.16352 714.19904c-20.91008 20.89984-54.80448 20.89984-75.70432 0-20.91008-20.89984-20.91008-54.79424 0-75.70432l328.69376-328.704c10.45504-10.4448 24.14592-15.6672 37.84704-15.6672S539.40224 299.35616 549.84704 309.80096z"  ></path></symbol><symbol id="icon-jiantouarrow483" viewBox="0 0 1024 1024"><path d="M512 729.86624c-13.70112 0-27.40224-5.23264-37.84704-15.6672l-328.69376-328.704c-20.91008-20.91008-20.91008-54.80448 0-75.70432 20.89984-20.89984 54.79424-20.89984 75.70432 0L512 600.63744l290.83648-290.83648c20.91008-20.89984 54.80448-20.89984 75.70432 0 20.91008 20.89984 20.91008 54.79424 0 75.70432l-328.69376 328.704C539.40224 724.64384 525.70112 729.86624 512 729.86624z"  ></path></symbol><symbol id="icon-jiantouarrow487" viewBox="0 0 1024 1024"><path d="M714.19904 549.84704l-328.704 328.69376c-20.91008 20.91008-54.80448 20.91008-75.70432 0-20.89984-20.89984-20.89984-54.80448 0-75.70432L600.63744 512 309.80096 221.16352c-20.89984-20.91008-20.89984-54.80448 0-75.70432 20.89984-20.91008 54.79424-20.91008 75.70432 0l328.704 328.69376c10.4448 10.45504 15.6672 24.14592 15.6672 37.84704S724.64384 539.40224 714.19904 549.84704z"  ></path></symbol><symbol id="icon-jiantouarrowhead7" viewBox="0 0 1024 1024"><path d="M294.13376 512c0-13.70112 5.23264-27.40224 15.6672-37.84704l328.704-328.69376c20.91008-20.91008 54.80448-20.91008 75.70432 0 20.89984 20.89984 20.89984 54.79424 0 75.70432L423.36256 512l290.83648 290.83648c20.89984 20.89984 20.89984 54.80448 0 75.70432-20.89984 20.91008-54.79424 20.91008-75.70432 0l-328.704-328.69376C299.35616 539.40224 294.13376 525.70112 294.13376 512z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)
