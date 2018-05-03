$(document).ready(function(){
    $("img").click(function(){
        if($("div").hasClass( "post" )){
          $("div").removeClass("post");
        }
        else{
          $("div").addClass("post")
        };
        
        //alert("hola")
    });
});