var h5ComponentBase=function(c,b){var b=b||{};var f=("h5_"+Math.random()).replace(".","_");var a="h5Component"+b.type;var e=" h5ComponentName"+c;var d=$("<div class='h5Component "+a+" "+e+"' id='"+f+"'>");b.text&&d.text(b.text);b.width&&d.width(b.width/2);b.height&&d.height(b.height/2);b.css&&d.css(b.css);b.bg&&d.css("backgroundImage","url("+b.bg+")");if(b.center===true){d.css({marginLeft:(b.width/4*-1)+"px",left:"50%"})}if(typeof b.onlick=="function"){d.on("click",b.onlick)}d.on("onLeave",function(){d.addClass(a+"_leave").removeClass(a+"_load");b.animateOut&&$(d).animate(b.animateOut,500);return false});d.on("afterLoad",function(){setTimeout(function(){d.addClass(a+"_load").removeClass(a+"_leave");b.animateIn&&$(d).animate(b.animateIn,500)},b.delay||0);return false});return d};