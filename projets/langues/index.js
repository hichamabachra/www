//(function(){
   "use strict"
   
   var iframe = document.querySelector("iframe"); 
   iframe.onload= ajusterEcran;
    window.onresize = ajusterEcran;
function ajusterEcran(){
                        iframe.style.height = 'initial';
                        iframe.style.height = iframe.contentDocument.body.scrollHeight + 200 +'px';
                        }

$("#btnBasculerIframe").click(function() {
    $( "iframe" ).fadeToggle( "slow", "linear" );
});
 
$(iframe).on('load', function(){
    var iframeRoot = iframe.contentDocument;
    var $p=$('p',iframeRoot);

    $("#btnBasculerPara").click(function() {
        $p.slideToggle( "slow", "linear" );
    });
     var $article=$('article',iframeRoot);
    var $button=$('<button>Basculer affichage</button>').css({
        position: "absolute",
        top:10,
        right:10,
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5,
        opacity:0.5,
        width:80,
        //fontWeight:"bold"
    });
      
    $button.hover( 
        function() {
        $( this ).css("color","red");
        $(this).css('cursor','pointer');
        $(this).animate({opacity: 1},800);     
       },function() {
            $(this).animate({opacity: 0.5},800,function(){
            $(this).css("color","black"); 
            });
            }
        );
     $article.prepend($button).css({position:"relative"});
    var $buttons=$('button',iframeRoot);
    $buttons.hide();
    

    $("#btnBasculerBouttons").click(function() {
    $buttons.fadeToggle( "fast", "linear" );   
    });

    $buttons.click(function() {
    //$buttons.fadeToggle( "slow", "linear" );
    var $ol=$('ol',$(this).parent());
    var $p=$('p',$(this).parent());
    $ol.fadeToggle( "slow", "linear" );
    $p.fadeToggle( "slow", "linear" );
    }); 
});


    

   
//})();
  