$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 0,
      center: true,
      autoWidth: true,
      responsive: {
        0: {
            items: 1,
            margin: 25,
            stagePadding: 25,
            loop: true
        },
        660: {
            items: 1,
            margin: 25,
            stagePadding: 30,
            loop:true
        },
        1000: {
            item: 3,
            margin: 25,
            stagePadding: 30
        },
        1440: {
            items: 4,
            margin: 25,
            stagePadding: 100
        }
      }
  });
});
$(".slider__controls-arrow-right").on("click", function(){
    $(".owl-carousel").trigger("next.owl.carousel");
  });
$(".slider__controls-arrow-left").on("click", function(){
    $(".owl-carousel").trigger("prev.owl.carousel");
});