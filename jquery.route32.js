/**
 * Route32  --## Simple Anchor Location Router ##-- 
 * executes callback on location hash change that matches declared routes. 
 * Intenteded to be use as a piece on JavaScript MVC Apps 
 * 
 * @author Rolando Garro <rgarro@gmail.com>
 * @requires jQuery
 */
//BEGIN..
//Requires jQuery
if(typeof jQuery != "undefined"){
/* begin Route32 */
    function Route32(options){
        //Settings
        var settings = $.extend({
                           'automatic':true,
                           'selector':'.nav'
                       },options);
        //array of hashes containing hashsregexpstr,callbackfunc pairs  
        var routes = [];
        
        var activeHash = '';
            
        //methods
        var methods = {
            //initial method
            'init':function(){
                window.onhashchange = function(evt){
                       activeHash = "#" + evt.newURL.split("#")[1];           
                        //activeHash = methods.getHashValue();
                    };
            },
            //verifies is string is a valid location hash
            'isValidHash':function(hashStr){
                                return true;
                            },
            'isValidCallbackfunc':function(callbackfunc){
                                    if(typeof callbackfunc == "function"){
                                        return true;           
                                    }else{
                                        return false;
                                    }
                                  },
            'getHashValue':function(evt){
                                //return window.location.hash;
                                return "#" + evt.newURL.split("#")[1]                
                            },
            'executeCurrent':function(){      
                                $.each(routes,function(index,value){           
                                    if(value.hash == activeHash){
                                        value.callback();
                                    }                                    
                                });
                            }            
                      };        
        //adds routes
        this.add = function(hashRegexpStr,callbackfunc){
            if(methods.isValidHash(hashRegexpStr) && methods.isValidCallbackfunc(callbackfunc)){
                routes.push({hash:hashRegexpStr,callback:callbackfunc});
            }else{
                alert('route should be a valid hash string, callback function pair.');
            }      
        };
        
        //starts driving
        this.drive = function(){
            if(routes.length > 0){
                if(settings.automatic){
                    //start listening location changes
                    window.onhashchange = function(evt){
                        activeHash = methods.getHashValue(evt);                      
                        methods.executeCurrent();
                    };
                }else{
                    //listen selector click
                    $(settings.selector).live('click',function(){
                    	var turn = true;
              			window.onhashchange = function(evt){  				
                        	activeHash = methods.getHashValue(evt);                                    
                        	turn = false;
                        	methods.executeCurrent();
                    	};
                    	if(turn){
                    		methods.executeCurrent();
                    	}
                    });                
                }            
            }else{
                alert('use add method to add routes');                
            }        
        };       
        //executes actual route arbitrarily
        this.again = function(){
            methods.executeCurrent();
        };
        
        methods.init();
        
        return this;
    };
/* end Route32 */
}else{
     alert("jQuery is required to ride Route32.");    
}    
//END..    