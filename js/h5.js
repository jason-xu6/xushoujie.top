/*内容管理内容*/

var H5=function()
{
 
	this.id=("h5_"+Math.random()).replace(".","_");
    this.el=$("<div class='h5' id='"+this.id+"'>");
    var ell=this.el;
    this.page=[];
    $("body").append(this.el);


    this.addPage=function(name,bg)
    {
      var page=$('<div class="h5_page">');
      bg&&page.css('backgroundImage', 'url('+bg+')');
      page.addClass('section');
       if (name !=undefined) {
       	   page.addClass('h5_page_'+name);

       }
       this.el.append(page);
       this.page.push(page);
       return this;
    };
    this.addComponent=function(name,cfg)
    {
        var cfg=cfg||{};
        cfg=$.extend(
        	{
        		type:"base"
        	},cfg
        	);

        var component;
        var page=this.page.slice(-1)[0];
        switch(cfg.type) {
        	case "base":
        		component=new h5ComponentBase(name,cfg);
        		break;
        		default:
        }
        
         page.append(component);
         return this;
    };

    return this;
};