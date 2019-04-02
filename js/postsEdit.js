var $Manager = {
		buttons 	 			: $('button.saver-btn'),
		btnSaverClass	 	: 'button.saver-btn',
		btnDeleterClass : 'button.btn-deleter',
		btnLoaderClass  : 'button.btn-loader',
		divLoaderClass  : $('.view-results'),
		initLoad   			: initLoad,
		setLoadUrl 			: setLoadUrl,
		setLoadView			: setLoadView,
		save 			 			: save,
		load 						: load,		
		delete 					: destroy
	};
	

	$(function(){
  	$Manager.initLoad();
  	$btnSaverClass   = $Manager.btnSaverClass;
  	$btnDeleterClass = $Manager.btnDeleterClass;
  	$btnLoaderClass  = $Manager.btnLoaderClass;


  	$('body').on('click', $btnSaverClass, function (e) {	    
	    e.preventDefault();	    
	    $Manager.save($(this));
	  });

	  $('body').on('click', $btnDeleterClass, function(e){
  		e.preventDefault();  		
  		$Manager.delete($(this));
  	});

  	$('body').on('click', $btnLoaderClass, function(e){
  		e.preventDefault();  		
  		var $btn = $(this);
  		$Manager.load($btn);
  	});

	 	//SEARCH 	 

	 	$('#myModal').on('show.bs.modal', function (event) {
		  var $btn = $(event.relatedTarget); // Button that triggered the modal

		  	$('body').on('keyup', '.keyword', function(){
			 		var keyword = $('.keyword').val();
			 		//$('.input-keyword').val(keyword);
			 		var data = {keyword:keyword};
					$Manager.load($btn, data);
			 	});
		  
		});


		$('body').on('click', '.pagination li a', function(e){
			e.preventDefault();
			var a = $(this);
			$btn = a.parents('span');
			$btn.attr('data-load-url', a.attr('href'));
			$Manager.load($btn);
		});

  }); //end load  
	
	function initLoad()
	{		
		var $buttons = $Manager.buttons;//$($btnSaver);

  	$.each($buttons, function(k,v){
  		var $btn 	= $(v);
  		var view 	= $($btn.data('view'));
  		if(view != undefined)
  		{
  			$Manager.load($btn);  			
  		}  		
  	});


  	/*--------------------------
		! LOAD CONTENT IN DIV VIEW
  	--------------------------*/

  	$divs = $Manager.divLoaderClass;
  	//console.log($divs);

  	$.each($divs, function(k,v){
  		var $div 	= $(v);
  		var view 	= $($div.data('view'));
  		if(view != undefined)
  		{
  			$Manager.load($div);  			
  		}  		
  	});
	}

	function load($btn, $data = null)
	{		
		var view 	= $Manager.setLoadView($btn);		
		$.ajax({
  		url 		: $Manager.setLoadUrl($btn),
  		dataType: 'HTML',
  		data 		: $data,
  		success	: function(data){
  			view.html(data);
  		},
  		beforeSend:function()
  		{
  			view.html(preloader(view));
  		}
  	});
	}

	function save($btn)
	{
		var $btn 			= $btn.button('loading');    
    getNewToken();
    var $form 		= $btn.parents('form');
    var $url 			= $form.attr('action');
    //var $data 		= $form.serialize();
    var formID 		= $form.attr('id');
    //var keyword   = $form.

    var formElement = document.getElementById(formID);
		var $data 			= new FormData(formElement);

    $.ajax({
    	url     : $url,
    	method	: 'POST',
    	data 		: $data,
    	dataType: 'JSON',
    	contentType: false,
	    processData: false,
    	success : function(data){
    		
    		if(data.success == true)
    		{
    			var $keyword = null;

    			if($btn.data('keyword') != undefined)
    			{
    				if($btn.data('keyword').length > 0)
	    			{
	    				var $keyword = $btn.data('keyword');
	    			}
    			}    			

    			var $keyw = {keyword:$keyword};

    			$Manager.load($btn, $keyw);
    			var $fields = $form.find('input');
    			$fields.val('');	
    			$btn.button('reset');
    			return false;
    		}
    		error();    		
    		
    	},
    	error		: function(){
    		error();
    		//window.location.reload();
    		$btn.button('reset');
    	},
    	beforeSend: function()
    	{    		
    		view = $Manager.setLoadView($btn);
    		preloader(view);	
    	}

    });	
	}

	function preloader(view)
	{
		view.html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Cargando...</span>');
	}

	function setLoadUrl($btn)
	{
		return $btn.data('loadUrl');
	}

	function setLoadView($btn)
	{
		return $($btn.data('view'));
	}

	function destroy($btn)
	{
		var $btn 			= $btn.button('loading');    
  	getNewToken();
    
    var $form 		= $btn.parents('form');
    var $url 			= $form.attr('action');
    var $data 		= $form.serialize();   
    
    $.ajax({
    	url     : $url,
    	method	: 'DELETE',
    	data 		: $data,
    	dataType: 'JSON',
    	success : function(data){
    		
    		if(data.success == true)
    		{
    			$Manager.load($btn);    			
    			$btn.button('reset');
    			return false;
    		}
    		error();
    		
    	},
    	error		: function(){
    		error();    		
    		$btn.button('reset');
    	}

    });
	}
    

  function error()
  {
  	alert('ocurrio un error al guardar');	
  	getNewToken();
  }

  function getNewToken()
  {
  	var $url = $('[data-get-new-token]').data('getNewToken');  	
  	$.ajax({
  		url: $url,
  		dataType:'JSON',
  		success:function(data)
  		{  			
  			var _tokens = $(document).find('[name=_token]');  			
  			_tokens.val(data.new_token);
  		}
  	});
  }