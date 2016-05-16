
//(function(){

"use strict";
//var audio =document.querySelector("audio");

initAudio();
sourdine.onclick = initAudio;
/*var contexte={
    projets:[
	        {nom:"Langues",
             dir:"../langues/index.html",
             description:"Pratique de l'utilisation des sélecteurs et de la mise en page avec CSS3.",
             sujets:["CSS3","HTML5","Sélecteurs"]}, 
            {nom:"Pens",
             dir:"../pens/index.html",
             description:"Exercices que j'ai faits surCodePen."},
            {nom:"YouTube",
             dir:"../youtube/index.html"},
            {nom:"TutorielJS",
             dir:"../tutorielJS/index.html"},
            {nom:"Todo",
             dir:"../todo/index.html",
             description:"Pratique intéressente."},
            {nom:"Todo(<span style='color:red'>Classique</span>)",
             dir:"../todo/index.html?skin=",
             description:"Pratique intéressente."},
            {nom:"Todo(<span style='color:Azure'>Azure</span>)",
             dir:"../todo/index.html?skin=Lime-on-azure",
             description:"Pratique intéressente."},
            {nom:"Todo(<span style='color:Orange'>Orange</span>)",
             dir:"../todo/index.html?skin=blue-on-orange",
             description:"Pratique intéressente."}
		]     
};*/
//JSON.stringify(contexte,null,4)
//initMenu(); 
    
/*function initMenu(){
    
for(var i = 0; i < Liste.length; i++) 
{
	var li = document.createElement('li');
    li.innerHTML = "<a href='../"+Liste[i].dir+"/index.html'>"+Liste[i].nom+"</a>";   
	document.getElementById('ulMenu').appendChild(li);     
}}*/
  var contexte={};
     jQuery.getJSON("projets.json").done(function(jsonData){
         console.log(JSON.stringify(jsonData,null,4));
         initialiserMenu(jsonData);
        })
    .fail(function(){
         console.log("Impossible de charger le JSON");
    });  

 function initialiserMenu(jsonData) {
     contexte=jsonData;
  // Grab the template script
  var theTemplateScript = $("#templateScript").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);
     
     // Pass our data to the template
  var theCompiledHtml = theTemplate(contexte);
     
  // Add the compiled html to the page
  $(document.getElementById('ulMenu')).append(theCompiledHtml);
  
};   
         
function initAudio(){
   localStorage.checked = sourdine.checked;
    if(sourdine.checked)
    {
        audio.load();
        document.getElementById("labelChekbox").title ="Desactiver la sourdine";  
    }
    else
    {
        audio.play();
        document.getElementById("labelChekbox").title = "Activer la sourdine";
    }  
}
    
//})();
