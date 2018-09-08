(function($,root){
    var $scope = $(document.body);
    let control;
    var $playList = $("<div class = 'list'>"+
        "<div class='header'>播放列表</div>" + 
        "<ul class = 'play-list'></ul>" +
        "<div class='close'>关闭</div>"+
    "</div>") 
    //渲染我们的播放列表dom
    function listRender(songList){
        var html = '';
        // for(var i = 0;i < songList.length;i++){
        //     html += "<li><h3 >"+songList[i].song+"-<span>"+songList[i].singer+"</span></h3></li>"
        // }
        songList.forEach(function(ele,index){
        	html += "<li><h3 >"+ele.song+"-<span>"+ele.singer+"</span></h3></li>"
        })
        $playList.find("ul").html(html);
        $scope.append($playList);
        bindEvent();
    }  
    function show(controls){
        control = controls;
        $playList.addClass("show");
        signSong(control.index);
    }
    function bindEvent(){
        $playList.on("click",".close",function(){

            $playList.removeClass("show")
        })
        $playList.find("li").on("click",function(){
            var index = $(this).index();
            signSong(index);
            control.index = index;
            $scope.trigger("play:change",[index,true]);
            $scope.find(".play-btn").addClass("pause");
            setTimeout(function(){
                $playList.removeClass("show")
            }, 200);
        })
    }
    function signSong(index){
        $playList.find(".sign").removeClass("sign");
        $playList.find("ul li").eq(index).addClass("sign");
    }
    root.playList = {
        listRender : listRender,
        show : show
    }
})(window.Zepto,window.player || (window.player = {}))