//注状图组件

var h5ComponentBar=function(name,cfg)
{
	var component=new h5ComponentBase(name,cfg);

    $.each(cfg.data,function(index,el)
    	{
    		var bgStyle="";
    		var cor="";
            if (el[2]) {
            	bgStyle="style='background-color:"+el[2]+"'";
            	cor="style='color:"+el[2]+"'";
            }
            var line=$("<div class='bar_line'>");
        	var bar_name=$("<div class='bar_name'>");
            var rate=$("<div class='bar_rate'>");
            var per=$("<div class='bar_per' "+cor+">");

            var w=(el[1]*100)+"%";
            var h=(el[1]*100)+"%";
    		bar_name.text(el[0]);
    		if (cfg.image==="horizontal") {
    			rate.css('width',w);
    		}else if(cfg.image==="vertical"){
    			rate.css('height',h);
                per.css('bottom',h);
                per.css('marginBottom', 32);
    		}
            
            
            rate.html("<div class='bg' "+bgStyle+"></div>");
            per.text(h);
            line.append(bar_name).append(rate).append(per);
    		component.append(line);
    	});

    

	return component;
};