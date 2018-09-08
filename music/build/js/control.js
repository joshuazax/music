(function($,root){
	function controls(len){
		this.index = 0;
		this.len = len;
	}
	controls.prototype = {
		prev:function(){
			return this.getIndex(-1);
		},
		next:function(){
			return this.getIndex(1);
		},
		getIndex:function(val){
			var index = this.index;
			var len = this.len;
			var curIndex = (index + len + val)%len;
			this.index = curIndex;
			return curIndex;
		}
	}
	root.controls = controls;	
})(window.Zepto,window.player || {})






