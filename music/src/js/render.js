(function($,root){

	var $scope = $(document.body);
	function renderInfo(data){
		var str = '<div class="song-name">' + data.song + '</div>'+
			'<div class="singer-name">' + data.singer + '</div>'+
			'<div class="album-name">' + data.album + '</div>';
		$scope.find(".song-info").html(str);		
	}
	function renderImg(src){
		var img = new Image();
		img.src = src;
		img.onload = function(){
			root.blurImg(img,$scope);
			$scope.find(".img-wrap img").attr("src",src);
		}
	}
	function isLike(isLike){
		if(isLike){
			$scope.find(".like-btn").addClass("liking");
		}else{
			$scope.find(".like-btn").removeClass("liking");
		}
	}
	root.render = function (data){
		renderInfo(data);
		renderImg(data.image);
		isLike(data.isLike);
	}
})(window.Zepto,window.player || (window.player={}))





















