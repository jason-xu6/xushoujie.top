//折线图组件
var h5ComponentPolyline=function(name,cfg)
{
	var component=new h5ComponentBase(name,cfg);
    var w=cfg.width;
    var h=cfg.height;

    /*绘制里面的网格线*/
    var canvas=document.createElement("canvas");
    var context=canvas.getContext("2d");
    
    canvas.width=w;
    canvas.height=h;
    component.append(canvas);

    
          window.context=context;
          /*水平网格线*/
          for (var i = 0; i < 11; i++) {
            var y=(h/10)*i;
            context.moveTo(0,y);
            context.lineTo(w,y);
          }


          /*垂直网格线*/
          for (var i = 0; i < cfg.data.length+2; i++) {
            var ph=cfg.data.length+1;
            var x10=w/(cfg.data.length+6)*i;
            var x=(w/ph)*i;
            context.moveTo(x,0);
            context.lineTo(x,h);
          }
          context.lineWidth=3
          context.strokeStyle="#666";
          context.stroke();
 
    
    
    

    /*项目名称*/
    for (var i = 0; i < cfg.data.length+2; i++) {
    	var ph=cfg.data.length+1;
    	var x10=w/(cfg.data.length+6)*i;
    	var x=(w/ph)*i;
    	context.moveTo(x,0);
    	context.lineTo(x,h);
    	if (cfg.data[i]) {
    		var xx=$("<div class='text'>");
    		xx.text(cfg.data[i][0]);
    		xx.css({"top":h/2+5,"left":x10});
    		component.append(xx);
    	}
    }
    context.stroke();
   
    //another  canvas closePath
    
    var canvas=document.createElement("canvas");
    var context=canvas.getContext("2d");
    canvas.width=w;
    canvas.height=h;
    component.append(canvas);

    
    /*函数*/
    var draw=function(pre){
    context.clearRect(0,0,w,h);
	    context.beginPath();
	    context.lineWidth=3;
	    context.strokeStyle="#FF8B7B";

	    /*画那几个点，画成小圆圈*/
	    for(i in cfg.data)
	    {
	    	var el=cfg.data[i];
	    		var x1=(w/(cfg.data.length+1))*i+w/(cfg.data.length+1);
	    		var y1=(1-el[1]*pre)*h;
	    		context.moveTo(x1,y1);
	    		context.arc(x1,y1,5,0,2*Math.PI);
	    	context.stroke();
	    }

	    /*画布上面的%*/
	    for(i in cfg.data)
	    {
	    	var el=cfg.data[i];
	    		var x1=(w/(cfg.data.length+1))*i+w/(cfg.data.length)-30;
	    		var y1=(0.95-el[1]*pre)*h;
	    		var txt=(el[1]*100)+"%";
	    		context.font="20px Arial";
	    		context.moveTo(x1,y1);
	    		context.fillStyle="red";
	    		context.fillText(txt,x1,y1);
	    	
	    }

	    /*那几个项目点的连线*/
	    context.moveTo(w/(cfg.data.length+1),(1-cfg.data[0][1]*pre)*h);
	    for(i in cfg.data)
	    {
	    	var it=cfg.data[i];
	        var x2=(w/(cfg.data.length+1))*i+w/(cfg.data.length+1);
	        var y2=(1-it[1]*pre)*h;	
	        context.lineTo(x2,y2);
	    }
	context.stroke();

	    /*把线全都连起来,以便fill*/
	    context.strokeStyle="rgba(255,136,120,0.2)";
	    context.lineWidth=3;
	        var le=cfg.data.length-1;
	        var x3=(w/(cfg.data.length+1))*5;
	        var y3=(1-cfg.data[le][1]*pre)*h;
	        context.moveTo(x3,y3);
	        context.lineTo(x3,h);
	        context.lineTo(w/(cfg.data.length+1),h);
	        context.lineTo(w/(cfg.data.length+1),(1-cfg.data[0][1]*pre)*h);
	        context.fillStyle="rgba(255,136,120,0.2)";
	        context.fill();
	        context.stroke();
};
    component.on('afterLoad',function(){
    //  折线图生长动画
      var s = 0;
      for( i=0;i<100;i++){
        setTimeout(function(){
            s+=.01;
            draw(s);
        },i*10+1000);
      }
  });
   component.on('onLeave',function(){
    //  折线图退场动画
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