/*这里就是传说中的雷达图*/

var h5ComponentRadar=function(name,cfg)
{
	var component=new h5ComponentBase(name,cfg);
	//canvas的背景层
	var w=cfg.width;
	var h=cfg.height;

	//第一个
	var cns=document.createElement("canvas");
	var ctx=cns.getContext("2d");
	window.ctx=ctx;
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
    component.append(cns);
    //画圆先
    
    var r=h/2;
    var step=cfg.data.length;

    

    //  计算一个圆周上的坐标（计算多边形的顶点坐标）
    //  已知：圆心坐标(a,b)、半径 r；角度deg。
    //  rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i
    //  x = a + Math.sin( rad ) * r;
    //  y = b + Math.cos( rad ) * r;
    //绘制十份
    var isBlue=false;
    for(var s=10;s>0;s--)
    {
    	ctx.beginPath();
	    for (var i = 0; i < step; i++) {
	    var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;
	    var x = r + Math.sin( rad ) * r*(s/10);
	    var y = r + Math.cos( rad ) * r*(s/10);


    	/*中间的点和各个点连起来*/
    	// ctx.moveTo(r,r);
   		ctx.lineTo(x,y);
        
    	}
      ctx.closePath();
      ctx.fillStyle=(isBlue= !isBlue) ? "#99c0ff":"#f1f9ff";
      ctx.fill();
    }
    //绘制传说中的散骨图
    for(var t=0;t<step;t++)
    {
    	var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * t;
	    var x = r + Math.sin( rad ) * r;
	    var y = r + Math.cos( rad ) * r;
	    ctx.moveTo(r,r);
	    ctx.lineTo(x,y);
	    ctx.strokeStyle="#e0e0e0";
	    ctx.stroke();
	    var ttt=t*.2+1.5;
        var tStyle="style='transition :all .5s "+ttt+"s'";
	    var text=$("<div class='text1' "+tStyle+">");
	    text.text(cfg.data[t][0]);
	    text.css('transition', 'all .5s '+ttt+'s');
	    if (x>w/2) {
	    	text.css({"left":x/2-30});
	    }else{
	    	text.css({"right":(w-x)/2-30});
	    }
	    if (y>h/2) {
	    	text.css({"top":y/2});
	    }else{
	    	text.css({"bottom":(h-y)/2});
	    }
	    if (cfg.data[t][2]) {
	    	text.css('color', cfg.data[t][2]);
	    }


	    component.append(text);

    }

    //这里就要开始绘制数据层了
    var cns=document.createElement("canvas");
	var ctx=cns.getContext("2d");
	window.ctx=ctx;
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
    component.append(cns);
    


     ctx.strokeStyle="#f00";
    var draw=function(per)
    {  ctx.clearRect(0,0,w,h);

       //绘制数据的点
       for(var i=0;i<step;i++)
       {
       	  var rata=cfg.data[i][1]*per;
       	  var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;
	      var x = r + Math.sin( rad ) * r*rata;
	      var y = r + Math.cos( rad ) * r*rata;
          ctx.lineTo(x,y);
       }

	      ctx.closePath();
	      ctx.stroke();
	       for(var i=0;i<step;i++)
       {
       	  var rata=cfg.data[i][1]*per;
       	  var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;
	      var x = r + Math.sin( rad ) * r*rata;
	      var y = r + Math.cos( rad ) * r*rata;
	      ctx.beginPath();
	      ctx.arc(x,y,5,0,2*Math.PI);
	      ctx.closePath();
	      ctx.fillStyle="#f00";
	      ctx.fill();
       }
    };
    component.on('afterLoad',function(){
    //  传说中的雷达图生长动画
      var s = 0;
      for( i=0;i<100;i++){
        setTimeout(function(){
            s+=.01;
            draw(s);
        },i*10+1000);
      }
  });
   component.on('onLeave',function(){
    //  传说中的雷达图退场动画
      var s = 1;
      for( i=0;i<100;i++){
        setTimeout(function(){
            s-=.01;
            draw(s);
        },i*10);
      }
  });
	return component;
};