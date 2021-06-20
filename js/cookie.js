/*var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

$(function(){
  if( isMobile.Android() ) {
	showModalCookie();
  };
});*/

//en adelante el modal

$(function(){	
	showModalCookie();
});

function showModalCookie()
{
  var C_entries = parseInt(Cookies.get('entries3'));

  if(!isNaN(C_entries))
  {
	if(C_entries > 1)
	{
	  Cookies.set('show_modal1', false);
	  $('#myModal').remove();
	}
	else
	{
	  var C_counter = C_entries + 1;
	  Cookies.set('entries3', C_counter);
	  Cookies.set('show_modal1', true);
	}
  }
  else
  {
		Cookies.set('entries3', 1);
		Cookies.set('show_modal1', true);
  }

  var C_show_modal = Cookies.get('show_modal1');

  if(C_show_modal == "true")
  {
		//$('#myModal').modal('show');

	setTimeout(function(){
      /*$('#myModal').modal('show');*/
      $('#btnmodal').click();
      /*setTimeout(function(){
      	$("#video").attr('src', 'https://www.youtube.com/embed/CZ8a6pVnVT8?autoplay=1');
      }, 300);*/
    }, 10000);

    /*$('#myModal').on('hidden.bs.modal', function (e) {
      
    });*/
  }

  /*$('#myModal').on('hidden.bs.modal', function (e) {
	  $('#myModal').remove();
	  $('#video').attr('src', '');
	});*/
}