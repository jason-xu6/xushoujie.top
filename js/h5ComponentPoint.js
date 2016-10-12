//散点图组件

//基本图文组件对象

var h5ComponentPoint=function(name,cfg)
{
	var component=new h5ComponentBase(name,cfg);
	
	var base=cfg.data[0][1];
	
    
    $.each(cfg.data,function(index,el)
    	{
    		var per=(el[1]/base*100)+"%";
            var point=$("<div class='point point-"+index+"'>");
            
            var name=$("<div class='name'>"+el[0]+"</div>");
            var rate=$("<div class='pre'>"+(el[1]*100)+'%'+"</div>");
            name.append(rate);
            point.append(name);

            
            
            point.css('background', el[2]);
            var tt=(index+1)*.5;
            point.css('transition', 'all 1s '+tt+'s');
            if (el[3]!==undefined&&el[4]!==undefined) {
            	point.css({"left":el[3],"top":el[4]});
            }
            component.on("afterLoad",function()
                {
                    point.width(per).height(per);
                });
            component.on("onLeave",function()
                {
                    point.width(0).height(0);
                });
            
            component.append(point);
    	});


  
	return component;
};