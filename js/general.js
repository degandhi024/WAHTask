$(document).ready(function(e) {

	var em=$('body').css('font-size').split('p')[0],
		fn_resp_design = function(){

			var win_wdt=window.innerWidth || document.documentElement.clientWidth, /* IE 8 or lower */
				win_hgt=window.innerHeight || document.documentElement.clientHeight, /* IE 8 or lower */
				div_wdt=0, div_marg=0;

			div_wdt=$('#section').width();

			if(win_wdt>=div_wdt) {
				div_marg=(win_wdt-div_wdt)/2;
			}
			$('body > div').css({ marginLeft:div_marg });
		};
	window.onresize = fn_resp_design;
	fn_resp_design();

	$('input').on({
		'focus': function(e){
			if($(this).attr('placeholder')){
				if($(this).val()===$(this).attr('placeholder')){
					$(this).val('');
					$(this).css('color','#199ec0');
				}
			}
		},
		'blur':function(e){
			if($(this).attr('placeholder')){
				if($(this).val()===''){
					$(this).val($(this).attr('placeholder'));
					$(this).css('color','#999');
				}
			}
		}
	});
	
	$('#home-search > ul li').click(function(e){
		e.preventDefault();
		if(!$(this).hasClass('disabled') && !$(this).hasClass('active')){
			var id=$(this).children('a').first().attr('href').split('#')[1];
			$('#home-search > ul li').removeClass('active');
			$(this).addClass('active');
			$('#home-search > div').css('display','none');
			$('#'+id).css('display','block');
		}
	});
	$('#home-search > ul li').first().trigger('click');

	$('#home-testimonial').ready(function(){
		gen_testimonial_widget();
	});

	$('#home-banner').ready(function(){
		gen_banner_widget();
	});
});