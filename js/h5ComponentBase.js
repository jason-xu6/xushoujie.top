//基本图文组件对象

var h5ComponentBase=function(name,cfg)
{
	var cfg=cfg||{};
	var id=("h5_"+Math.random()).replace(".","_");
	var cls="h5Component"+cfg.type;
	var nan=" h5ComponentName"+name;
	var component=$("<div class='h5Component "+cls+" "+nan+"' id='"+id+"'>");

	cfg.text&&component.text(cfg.text);
	cfg.width&&component.width(cfg.width/2);
	cfg.height&&component.height(cfg.height/2);
	cfg.css&&component.css(cfg.css);
	cfg.bg&&component.css('backgroundImage', 'url('+cfg.bg+')');
	if (cfg.center===true) {
		component.css({
			marginLeft:(cfg.width/4*-1)+"px",
			left:"50%"

		});
	}
	if (typeof cfg.onlick=="function") {
		component.on("click",cfg.onlick);
	}


	//afterload和onleave
	            component.on("onLeave",function()
    				{
    						component.addClass(cls+"_leave").removeClass(cls+"_load");
    					    cfg.animateOut&&$(component).animate(cfg.animateOut,500);
    					
    					return false;
    				});
    			component.on("afterLoad",function()
    				{
    					setTimeout(function()
    						{
    							component.addClass(cls+"_load").removeClass(cls+"_leave");
    					        cfg.animateIn&&$(component).animate(cfg.animateIn,500);
    						},cfg.delay||0);
    					
    					return false;
    				});
	return component;
};