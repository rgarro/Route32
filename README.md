Route32
=======

Simple Javascript jQuery Anchor Location Router, executes callback on location hash change that matches declared routes. Intenteded to be use as a piece on javascript mvvm mvc apps


Buy Me a Beer, Starbucks Expresso or send a cheese burguer ... [Paypal](https://www.paypal.me/gospelOfLuke/25).

```html

<ul>
   <li><a class="nav" href="#/caribean/">Caribean</a></li>
   <li><a class="nav" href="#/centralvalley/">Central Valley</a></li>  
</ul>
<script type="text/javascript">
			$(document).ready(function(){
				 
				var router = new Route32({
					'automatic':true
                });
                    
				router.add('#/caribean/',function(){
			      // your navigation silently driving to your callback
				});    
						
				router.drive();    
			});
</script>		

```



[![Maneje Despacio](http://www.prensalibre.cr/files/noticias/images/detail/721578111_ruta32.jpg)]

