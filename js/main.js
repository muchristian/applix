


$(document).ready(function(){
	$(`select.lang > option[value='${Cookies.get("lang")}']`).attr("selected","selected");
});

$(".navbar .navbar-nav a").on("click", function (e) {
  if (this.hash !== "") {
    e.preventDefault();
    const hash = this.hash;
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      800
    );
  }
})

$(".navbar .navbar-nav a").click(function() {
  $('.navbar .navbar-nav a').removeClass("active");
  $(this).addClass("active");
});



$('select.lang').on('change', function() {
  if($(this).val() !== null) {
    fetch(`https://applixweb.herokuapp.com/${$(this).val()}`, {
      method: 'GET'
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data);
      location.reload();
    }).catch(error => console.log(error))
  }
});

