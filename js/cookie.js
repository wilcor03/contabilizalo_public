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
  var C_entries = parseInt(Cookies.get('entries1'));

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
	  Cookies.set('entries1', C_counter);
	  Cookies.set('show_modal1', true);
	}
  }
  else
  {
		Cookies.set('entries1', 1);
		Cookies.set('show_modal1', true);
  }

  var C_show_modal = Cookies.get('show_modal1');

  if(C_show_modal == "true")
  {
		$('#myModal').modal('show');
  }

  $('#myModal').on('hidden.bs.modal', function (e) {
	  $('#myModal').remove();
	})
}