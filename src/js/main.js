$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 0,
      center: true,
      autoWidth: true,
      responsive: {
          0: {
                loop: true,
              items: 1,
              margin: 25,
              stagePadding: 25
          },
          660: {
            loop: true,
              items: 2,
              margin: 25,
              stagePadding: 30
          },
          1000: {
            loop: true,
              item: 3,
              margin: 25,
              stagePadding: 30
          },
          1440: {
            loop: true,
              items: 4,
              margin: 25,
              stagePadding: 100
          }
      }
  });
});
$(".slider__controls-arrow-right").on("click", ()=>{
    $(".owl-carousel").trigger("next.owl.carousel");
  });
$(".slider__controls-arrow-left").on("click", ()=>{
    $(".owl-carousel").trigger("prev.owl.carousel");
});
