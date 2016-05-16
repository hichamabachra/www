(function(){

"use strict";

var maTemplate=document.querySelector('template').content.firstElementChild;   
var todolist= document.getElementById('todolist'); 
var donelist= document.getElementById('donelist');
ajouterButton();    
charger();
    
 document.getElementById('input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      if (this.value){
        
        ajouterTodo(this.value);
        this.value="";
        }
    }
  }
 function ajouterFocus(e){
     
    if (e.keyCode === 13){
        this.click();
    }
  }
    
 function ajouterFocusDiv(e){
     
    if (e.keyCode === 13){
        //console.log("Return");
       e.preventDefault(); document.getElementById("input").focus();
    }
     
  }
  function myBlurFunction() {
    dataUpdate();
}  
  function ajouterTodo(todoTexte){
      var cloneTemplate=maTemplate.cloneNode(true);
      cloneTemplate.querySelector('div').textContent=todoTexte;
    
      var article=cloneTemplate;
      
      if(todolist.firstElementChild){  
          todolist.insertBefore(article,todolist.firstElementChild);
      }
      else{
          todolist.appendChild(article);
      }
      var article =todolist.firstElementChild; 
      article.querySelector("img").addEventListener("click", deleteTodo);
      article.querySelector("img").addEventListener("keypress", deleteTodoKeyEnter);
	  article.querySelector("input").addEventListener("change", ajouterDone);
      article.querySelector("input").addEventListener("keypress", ajouterFocus);
      article.querySelector("div").addEventListener("keypress", ajouterFocusDiv);
      article.querySelector("div").addEventListener("blur", myBlurFunction,true);
      document.getElementById('btnAjouter').disabled = false;
      dataUpdate();
   }
    
    function deleteTodo(){
     this.parentNode.outerHTML="";
        //dataUpdate();
        
   }
   function deleteTodoKeyEnter(e){
     
    if (e.keyCode === 13 || e.keyCode === 32){
        this.parentNode.outerHTML=""        ;
    }
  }
   function ajouterDone(){
       
	if(this.checked){
        donelist.insertBefore(this.parentNode,donelist.firstElementChild);
        this.focus();
        }
    else{
        todolist.appendChild(this.parentNode);
        this.focus();
        } 
    dataUpdate();
    if(todolist.firstChild){
         document.getElementById('btnAjouter').disabled = false;  
       }
    else{
          document.getElementById('btnAjouter').disabled = true; 
       }
    if(donelist.firstChild){
         document.getElementById('btnEnlever').disabled = false;  
       }
    else{
          document.getElementById('btnEnlever').disabled = true; 
       } 
   }
    
  function ajouterButton(){
	var div = document.createElement("div");
        document.querySelector("body").appendChild(div);
          div.outerHTML =`<div class="buttonPane">
        <button id="btnAjouter"><img src="cheked.png" alt="Icone du bouton">Marquer toutes les tâches comme complétées</button>
        <button id="btnEnlever"><img src='delete.png' alt='delete'>Effacer les tâches complétées</button>
         </div>`
        document.getElementById('btnAjouter').disabled = true;
        document.getElementById('btnEnlever').disabled = true;
      document.getElementById('btnAjouter').addEventListener("click", cocheTout);
      document.getElementById('btnEnlever').addEventListener("click", supprimeTout);
   }  
   function supprimeTout(){
       if(donelist.firstChild){
            while(donelist.firstChild){
            donelist.firstChild.outerHTML="";
            }
       }
       document.getElementById('btnEnlever').disabled = true;
       dataUpdate();
   }
    function cocheTout(){
     
    var checkboxes = document.getElementsByName('checkbox');
        /*for (var i of checkboxes){
            checkboxes[i].click();
            }*/
        while(todolist.firstChild){
            todolist.firstChild.querySelector("input").click();
            }
        dataUpdate();
        document.getElementById('btnAjouter').disabled = true;
  }
     
   function dataUpdate(){
     if (typeof (Storage) !== "undefined") {
         var todoData = [];
         var doneData = [];
          for (let i = 0; i < todolist.children.length; i++)
           {
               todoData.unshift(todolist.children[i].querySelector("div").textContent);  
           }
            for (let i = 0; i < donelist.children.length; i++)
           {
               doneData.unshift(donelist.children[i].querySelector("div").textContent);  
           }
        localStorage.setItem('todoData', JSON.stringify(todoData));
        localStorage.setItem('doneData', JSON.stringify(doneData));
     }
    else {
    alert("Sorry, your browser does not support web storage...");
    }     
 }
  
 function charger(){
   if (typeof (Storage) !== "undefined") {
        
    var todoData = JSON.parse(localStorage.getItem('todoData'));
    var doneData = JSON.parse(localStorage.getItem('doneData'));
        for (var i in todoData)
           {
               ajouterTodo(todoData[i]);
               //alert(typeof(todoData[i]));
           }
        for (var i in doneData)
           {
            ajouterTodo(doneData[i]);
            todolist.firstChild.querySelector("input").click();   
           }
       if(localStorage.getItem('skin')){
           document.documentElement.className = localStorage.getItem('skin');
            selectSkin.value = localStorage.getItem('skin');
       }
       
       
   }
    else {
    alert("Sorry, your browser does not support web storage...");
    }
}
    
selectSkin.addEventListener("click", changerSkin); 
    
function changerSkin(e){
    document.documentElement.className = selectSkin.value;
    localStorage.setItem('skin',selectSkin.value);
}

function parseQueryString(qstr){
    var query={};
    var parameters = qstr.substr(1).split('&');
    for(var i=0 ; i < parameters.length ; i++){
         var keyAndValue=parameters[i].split('=');
         var key= decodeURIComponent(keyAndValue[0]);
        var value = decodeURIComponent(keyAndValue[1] || '');
        query[key]=value;
    }
        return query;
}

 if(location.search)
    {
        var skin = parseQueryString(location.search)['skin'];
        var root = document.documentElement;
        
        if(skin || skin==="") {
            root.className = skin;
            localStorage.skin = skin;
            selectSkin.value = skin;
        }
        
        if(!selectSkin.value) selectSkin.value = "";
    }

    
})();