function collapseNavbar() {
  //console.log('hola');
  //$(".navbar").removeClass(".bg-transparent");
    //console.log($(".navbar").offset().top)
    if ($(".navbar").offset().top > 50) {
        console.log('1');
        $(".navbar").removeClass("bg-transparent");
        $(".navbar").addClass("not_transparent");
      console.log('2');
    } else {
        $(".navbar").addClass("bg-transparent");
        $(".navbar").removeClass("not_transparent");
    }
}

//function scrollAlert(collapseNavbar){
  //alert('scroll');


$(window).scroll(collapseNavbar);
$(document).ready();