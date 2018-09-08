var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var index = 0,
	songList;

var audio = new root.audioCtrol();
function bindEvent(){
	$scope.on("play:change",function(event,index,flag){
		audio.getSource(songList[index].audio);
		if(audio.status == "play" || flag){
			audio.play();
			root.process.start();
		}
		root.process.renderTime(songList[index].duration);
		root.render(songList[index]);
		root.process.update(0);
	})

	$scope.on("click",".prev-btn",function(){
		var index = controls.prev();
		$scope.trigger("play:change",index);
	})
	$scope.on("click",".next-btn",function(){
		var index = controls.next();
		$scope.trigger("play:change",index);
	})

	$scope.on("click",".play-btn",function(){
		if(audio.status == "play"){
			audio.pause();
			root.process.stop();
		}else{
			root.process.start();
			audio.play();
		}
		$(this).toggleClass("pause");
	})
	$scope.on("click",".list-btn",function(){
		 root.playList.show(controls);
	})
}
function bindTouch(){
    var $slidePoint = $scope.find(".slider-pointer");
    var offset = $scope.find(".pro-wrap").offset();
    var left = offset.left;
    var width = offset.width;
    //绑定拖拽事件 开始拖拽 ： 取消进度条渲染
    $slidePoint.on("touchstart",function(){
        root.process.stop();
    }).on("touchmove",function(e){
        //计算拖拽的百分比 更新我们的当前时间和进度条
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        root.process.update(percent)
    }).on("touchend",function(e){
        //计算百分百 跳转播放 重新开始进度条渲染 
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        var curDuration = songList[controls.index].duration;
        var curTime = curDuration * percent;
        audio.jumpToplay(curTime);
        root.process.start(percent);
        $scope.find(".play-btn").addClass("pause");
    })
}


function getData(url){
	$.ajax({
		type:"GET",
		url:url,
		success:function(data){
			songList = data;
			bindEvent();
			bindTouch();
			root.playList.listRender(data);
			controls = new root.controls(data.length);
			$scope.trigger("play:change",0);
		},
		error:function(){
			console.log("error");
		}
	})	
}
getData("../mock/data.json");