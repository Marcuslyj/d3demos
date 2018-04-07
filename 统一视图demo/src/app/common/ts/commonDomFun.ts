//获取单元素
//#XX,.XX,XX
export function _els(selector,parentNode?) {
	selector = selector.trim();
	if(parentNode){
		return parentNode.querySelectorAll(selector);
	}
	return document.querySelectorAll(selector);
}
//获取多元素
//#XX,.XX,XX
export function _el(selector,parentNode?) {
	selector = selector.trim();
	if(parentNode){
		return parentNode.querySelector(selector);
	}
	return document.querySelector(selector);
}

//getClass//单元素
export function _getClass(el) {
	var className = el.getAttribute("class");
	return className ? " " + className.trim() + " " : "";
}
//hasClass//单元素
export function _hasClass(el, name) {
	if (name === undefined || name === null) {
		return false;
	}
	return new RegExp("\\s" + name.trim() + "\\s", "g").test(_getClass(el));
}
//addClass //多元素
export function _addClass(els, name) {
	if(null == els){
		return;
	}
	name = name ? name.trim() : "";
	if (els.length === undefined || els.length === null) {
		els = [els];
	}
	if (els) {
		for (var i = 0; i < els.length; i++) {
			if (!_hasClass(els[i], name)) {
				els[i].setAttribute("class", _getClass(els[i]) + " " + name)
			}
		}
	}
}
//removeClass //多元素
export function _removeClass(els, name) {
	if(null == els){
		return;
	}
	//htmlDom集是活的，操作时会改变
	var _els = [];
	if(null == els.length){
		_els.push(els);
	}else{
		for (var i = 0; i < els.length; i++) {
		_els.push(els[i]);
	}
	}
	name = name ? name.trim() : "";
	if (_els.length === undefined || _els.length === null) {
		_els = [_els];
	}
	if (_els) {
		for (var i = 0; i < _els.length; i++) {
			if (_hasClass(_els[i], name)) {
				var reg = new RegExp("\\s" + name + "\\s", "g");
				_els[i].setAttribute("class", _getClass(_els[i]).replace(reg, " "));
			}
		}
	}
}


