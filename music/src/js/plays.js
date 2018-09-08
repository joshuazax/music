(function($,root){
    var $scope = $(document.body);
	function audioCtrol(){
		this.audio = new Audio();
		this.status = "pause";
	}
	audioCtrol.prototype = {
		//绑定监听歌曲是否播放完成事件
        bindEvent:function(){
            $(this.audio).on("ended",function(){
                $scope.find(".next-btn").trigger("click");
            }) 
        },
		play:function(){
			this.audio.play();
			this.status = "play";
		},
		pause:function(){
			this.audio.pause();
			this.status = "pause";
		},
		getSource:function(src){
			this.audio.src = src;
			this.audio.load();
		},
        jumpToplay : function(time){
            this.audio.currentTime = time;
            this.play();
        } 
	}
	root.audioCtrol = audioCtrol;
})(window.Zepto,window.player || (window.player = {}))