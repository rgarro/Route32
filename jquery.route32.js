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
        					//true executes routes from location hash changes, false from clicks
                           'automatic':true,
                           //selector from which we listen clicks when automatic false allow re-execution of same route
                           'selector':'.nav',
                           //manual drive is click based so needs an intentional delay to proper update latest hash
                           'manualShiftChangeTime':100
                       },options);
        //array of hashes containing hashsregexpstr,callbackfunc pairs  
        var routes = [];
        
        var activeHash = '';
        
        var lastHash = '';    

        
        //methods
        var methods = {
            //initial method
            'init':function(){
               
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
                            },
             'updateHashExecute':function(){
             	 window.onhashchange = function(evt){
                        activeHash = methods.getHashValue(evt);                      
                        methods.executeCurrent();
                    };
             },
             'manualDrive':function(){
             	 $(settings.selector).live('click',function(){                   	
                    	setTimeout(function(){
                    		activeHash = window.location.hash;
                    		methods.executeCurrent();
                    	},settings.manualShiftChangeTime);
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
                   methods.updateHashExecute();
                }else{
                    //listen selector click
                    methods.manualDrive();            
                }
                activeHash = window.location.hash;
                if(activeHash.length > 1){//initial verification 
                	methods.executeCurrent();
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