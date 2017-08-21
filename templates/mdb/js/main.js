/*******************************************
Javascript
-
*******************************************/

/*
Mobile Menu
Inicalização de variáveis
*/
var $mobile_min_width = 0;
var $mobile_max_width = 526;
var $mobile_menu_id = '';
var $mobile_menu_hidden_class = 'mdb-mobile--hidden';
var $mobile_menu_burger_id = 'mdb-burger--icon'
var $mobile_menu_close_button_id = 'mdb-mobile-close';
var $mobile_menu_classes = 'mdb--dark';
var $mobile_menu_initial_position = 0;
var $easing_out = 'easeOutCirc';
var $easing_in = 'easeOutCirc';
var $click_top_offset = 50;
var $click_left_offset = 50;
var $click_right_offset = 50;
var $click_bottom_offset = 50;
var $mobile_menu_y_inclination = 3;


function show_mobile_menu(id){
  /*
  Verifica se as dimens\oes ad janela correspondem às dimensões mobile
  */
  var $window_width = $(window).width();
  if($window_width >= $mobile_min_width && $window_width <= $mobile_max_width){
    /*
    Cria o menu
    */
    create_mobile_menu('mobile-menu');
  }else{
    /*
    Remove o menu
    */
    destroy_mobile_menu('mobile-menu');
  }
}
/*
Cria o menu
*/
function create_mobile_menu(id){
  $mobile_menu_id = '#'+id;
  if(!$('#'+id).length){
    $('body').append('<nav><ul id="'+id+'" class="'+$mobile_menu_classes+'">'+$('header nav ul').html()+'</ul></nav>');
    set_mobile_menu_initial_position();
    show_hide_mobile_menu_close_button();
    bind_events_mobile_menu();
  }
}
/*
Aplica a posição inicial do mobile menu
*/
function set_mobile_menu_initial_position(){
  $($mobile_menu_id).css('left',get_initial_left_mobile_menu_position()+'px');
}
/*
Mostra ou esconde o icon para fechar o menu
É apenas para display e referência do utilizador
*/
function show_hide_mobile_menu_close_button(){
  $($mobile_menu_id + ' > li#'+$mobile_menu_close_button_id).toggleClass($mobile_menu_hidden_class);
}
/*
Adiciona os eventos do mobile menu
*/
function bind_events_mobile_menu(){
  bind_mobile_menu_click_events();
  bind_mobile_menu_scroll_events();
  bind_mobile_menu_device_motion_events();
}
/*
Destroi o mobile menu
*/
function destroy_mobile_menu(id){
  $mobile_menu_id = '#'+id;
  if($($mobile_menu_id).length){
    unbind_events_mobile_menu();
    $($mobile_menu_id).remove()
  }
}
/*
Remove os eventos do mobile menu
*/
function unbind_events_mobile_menu(){
  unbind_mobile_menu_click_events();
  unbind_mobile_menu_scroll_events();
  unbind_mobile_menu_device_motion_events();
}
/*
Adiciona os eventos de interacção com menu
*/
function bind_mobile_menu_click_events(){
  bind_burguer_click_event();
  bind_burguer_body_mousedown_event();
}
/*
Remove os eventos de interecção com menu
*/
function unbind_mobile_menu_click_events(){
  unbind_burguer_click_event();
  unbind_burguer_body_mousedown_event();
}
/*
Adiciona os eventos de device motion do menu
*/
function bind_mobile_menu_device_motion_events(){
  bind_mobile_menu_device_motion_event();
}
/*
Remove os eventos de device motion do menu
*/
function unbind_mobile_menu_device_motion_events(){
  unbind_mobile_menu_device_motion_event();
}
/*
Devolve a posição inicial do menu
*/
function get_initial_left_mobile_menu_position(){
  return -Math.abs($($mobile_menu_id).width());
}
/*
Proxima posição left do menu
*/
function get_next_left_mobile_menu_position(){
  if($($mobile_menu_id).position().left == 0){
    return -Math.abs($($mobile_menu_id).width());
  }else{
    return 0;
  }
}
/*
Proxima função easing da animação do menu
*/
function get_next_mobile_menu_easing(){
  if($($mobile_menu_id).position().left == 0){
    return $easing_out;
  }else{
    return $easing_in;
  }
}
/*
Aplica os eventos do icon burguer para mostrar/esconder o menu
*/
function bind_burguer_click_event(){
  $('#'+$mobile_menu_burger_id).bind('click',function(event){
    /*event.stopPropagation();*/
    event.preventDefault();
    $($mobile_menu_id).animate({
      left: get_next_left_mobile_menu_position()+'px',
    },
    { duration:500,queue: false,easing: get_next_mobile_menu_easing(),complete: function() {
        // No fim da animação
        $($mobile_menu_id).toggleClass('mobile-menu--visible');
      }
    });
  });
}
/*
Remove os eventos do icon burguer
*/
function unbind_burguer_click_event(){
  $($mobile_menu_id).unbind( "click" );
}
/*
Feature test
Aplica os eventos ao body no caso de mousedown
- define os offsets em que utilizador pode clicar para aceder ao menu
mesmo que não tenha o burguer visivel
*/
function bind_burguer_body_mousedown_event(){
  /*
  Trigger menu
  - top, bottom, left, right offset
  - fora dos offsets esconde o menu
  */
  $('body').bind('mousedown',function(event){
    console.log('mousedown');
    var $doc_width = $(document).width();
    var $doc_height = $(document).height();

    // top offset
    if(event.pageY >= 0 && event.pageY <= $click_top_offset){
      $('#'+$mobile_menu_burger_id).trigger('click');
    }
    // right offset
    else if(event.pageX <= $doc_width && event.pageX >= $doc_width - $click_right_offset){
      $('#'+$mobile_menu_burger_id).trigger('click');
    }
    // left offset
    else if(event.pageX >= 0 && event.pageX <= $click_left_offset){
      $('#'+$mobile_menu_burger_id).trigger('click');
    }
    // bottom offset
    else if(event.pageY <= $doc_height && event.pageY >= $doc_height - $click_bottom_offset){
      $('#'+$mobile_menu_burger_id).trigger('click');
    }
    else{
      console.log('mousedown: ' + $mobile_menu_id+' has class: '+$($mobile_menu_id).hasClass('mobile-menu--visible'));
      if($($mobile_menu_id).position().left == 0){
        $('#'+$mobile_menu_burger_id).trigger('click');
      }
    }
  });
}
/*
Remove os eventos mousedown do body
*/
function unbind_burguer_body_mousedown_event(){
  $('body').unbind( "mousedown" );
}
/*
Eventos do menu mobile quando a página faz scroll
*/
function bind_mobile_menu_scroll_events(){
  $( $mobile_menu_id ).bind('scrollstart', function() {
    $(this).css('height','100%');
  });
}
/*
ERemove eventos do menu mobile quando a página faz scroll
*/
function unbind_mobile_menu_scroll_events(){
  $( $mobile_menu_id ).unbind('scrollstart');
}

function bind_mobile_menu_device_motion_event(){
  if(window.DeviceMotionEvent)
	{
		window.addEventListener("devicemotion", mobile_menu_device_motion_handler, false);
	}
}

function unbind_mobile_menu_device_motion_event(){
  if(window.DeviceMotionEvent)
	{
		window.removeEventListener("devicemotion", mobile_menu_device_motion_handler);
	}
}
/*
Handler do device motion para o menu
*/
function mobile_menu_device_motion_handler(event){
	var left_right = event.accelerationIncludingGravity.x;
	//var top_bottom = event.accelerationIncludingGravity.y;

	event.stopPropagation();

	if(Math.floor(left_right) <= -$mobile_menu_y_inclination){ // inclinação -y (direita)
			$('#'+$mobile_menu_burger_id).animate({
				'left': $(window).width() - $('#'+$mobile_menu_burger_id).outerWidth()},
				700,
				'easeInOutExpo',
				function(){
					$('#'+$mobile_menu_burger_id).finish();
					$('#'+$mobile_menu_burger_id).stop( true, false );
				}
			);
	}
  else if(Math.floor(left_right) >= $mobile_menu_y_inclination){ // inclinação +y (esquerd)
			$('#'+$mobile_menu_burger_id).animate({'left': '0px'},
				700,
				'easeInOutExpo',
				function(){
					$('#'+$mobile_menu_burger_id).finish();
					$('#'+$mobile_menu_burger_id).stop( true, false );
				}
			);
	}
}

/*
Quando o documento está pronto
*/
$(document).ready(function(){
  /*
  Mostra o menu ao entrar na página
  */
  show_mobile_menu('mobile-menu');
});
/*
Ao redimensionar a janela
*/
$(window).resize(function() {
  /*
  Mostra o menu quando a página redimensiona
  */
  show_mobile_menu('mobile-menu');
});
