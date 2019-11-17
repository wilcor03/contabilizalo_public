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


$(function(){
	showModalCookie();
});

function showModalCookie()
{
  var C_entries = parseInt(Cookies.get('entries'));

  if(!isNaN(C_entries))
  {
	if(C_entries > 1)
	{
	  Cookies.set('show_modal', false);
	}
	else
	{
	  var C_counter = C_entries + 1;
	  Cookies.set('entries', C_counter);
	  Cookies.set('show_modal', true);
	}
  }
  else
  {
	Cookies.set('entries', 1);
	Cookies.set('show_modal', true);
  }

  var C_show_modal = Cookies.get('show_modal');

  if(C_show_modal == "true")
  {
	$('#myModal').modal('show');
  }
}