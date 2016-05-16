
(function(){

"use strict";
var main =document.querySelector('main');  
var maTemplate=main.firstElementChild; 
main.innerHTML = ""; 
initialiser();
      
function initialiser(){
    var Liste=[
            {p:"vGVbbX",a:"vGVbbX",c:"Template in-situ"},
            {p:"jqYyLp",a:"jqYyLp",c:"JS Objets Passifs"},
            {p:"zqpYxb",a:"zqpYxb",c:"JS DOM innerHTML"},
            {p:"NNXKXd",a:"NNXKXd",c:"JS innerHTML"},
	        {p:"XdaWVp",a:"XdaWVp",c:"XdaWVp"}, 
            {p:"EKvEoZ",a:"EKvEoZ",c:"Image Responsive 1"}            
         ];  
    for(var i = 0; i < Liste.length; i++)
        {
            var clone = maTemplate.cloneNode(true);
            clone.querySelector("p").setAttribute("data-slug-hash",Liste[i].p); clone.querySelector("a").setAttribute("href","http://codepen.io/abachra/pen/"+Liste[i].a+"/");
            clone.querySelector("a").textContent = Liste[i].c;
            
            main.appendChild(clone); 
       }
}

})();