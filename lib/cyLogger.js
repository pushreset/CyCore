var NORMAL_CYLOG = 'normal';
var INFO_CYLOG = 'info';
var WARNING_CYLOG = 'warning';

function cyLogger(){
	var element;
	
	this.buildHtml = function(htmlSize){
	    var html = '<div id="cyLogger"><div class="'+htmlSize+'"><div></div></div></div>';
	    $('body').append(html);
	    this.element = $('#cyLogger > div > div'); 
	 };
	
	
	this.log = function(message, type, callback){
    
	    if (callback && typeof(callback) === "function") {
	        callback();
	    }    
	    
	    if(!this.element && cyLoggerIsActive&& cyLoggerHtmlIsActive){
	        this.buildHtml(cyLoggerHtmlSize);
	    }
	    
	     if(cyLoggerIsActive && cyLoggerConsoleIsActive){
	        console.log(type+': '+message);
	     }
	     
	     if(cyLoggerIsActive && cyLoggerHtmlIsActive){
	        var date = new Date();
	        date = date.getMinutes()+':'+date.getSeconds()+':'+date.getMilliseconds();
	        this.element.append('<div class="'+type+'"><span>'+date+'</span><br/>'+message+'</div>');
	     }
	 
	     return true;
  };
  
}
