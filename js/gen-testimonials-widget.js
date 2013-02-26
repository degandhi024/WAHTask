$(document).ready(function () {

	var testimonial_slideshow = function(num){

		if(!num){
			if($('#home-testimonial-all').attr('name')){num=parseInt($('#home-testimonial-all').attr('name'));}
			else{num=0;}
			if(num===3){num=1;}
			else{num++;}
		}
		var offset=-$('#testi-'+num).width()*(num-1);
		$('#home-testimonial-all').animate({left:offset-60*(num-1)},500);
		$('#home-testimonial-all').attr('name',num);

		$('#home-testimonial > a.left').attr('href','#'+(num-1));
		$('#home-testimonial > a.right').attr('href','#'+(num+1));
	};

	gen_testimonial_widget = function(){
		var ic=0;
		
		$.ajax({
			type: "GET",
			url: "json/testimonials.json",
			dataType: "json",
			async: "true",
			success: function (data) {
				var temp = $('<div></div>');
				$(temp).attr('id','home-testimonial-all');
				for(var i in data['testimonials']){
					var div=$('<div></div>');

					$(div).attr('id',i);
					$(div).width($('#home-testimonial').width()*0.90);

					var img_E=$('<img />'),
						say_E=$('<a></a>'),
						name_E=$('<span></span>'),
						rate_E=$('<span></span>'),
						where_E=$('<span></span>');

					$(img_E).attr('src',data['testimonials'][i]['image']);
					$(img_E).attr('alt',data['testimonials'][i]['name']);
					$(say_E).text(data['testimonials'][i]['say'].substr(0,150)+' ...');
					$(say_E).attr('href',data['testimonials'][i]['link']);
					$(name_E).text(data['testimonials'][i]['name']+', '+data['testimonials'][i]['city']);
					$(name_E).addClass('name');
					$(where_E).text('Travelled to '+data['testimonials'][i]['where']+' in '+data['testimonials'][i]['when']);
					$(where_E).addClass('where');
					//alert($(where_E).html());

					$(div).append(img_E);
					$(div).append(say_E);
					$(div).append(name_E);
					$(div).append(where_E);

					//alert($(div).html());//$('#home-testimonial-testi').html());
					$(temp).append(div);
					ic++;
				}
				$('#home-testimonial').append(temp);
				$('#home-testimonial').css('background','#f9f9f9');
				$(temp).css('width',($('#home-testimonial').width()*ic)+100);
				
				$('#home-testimonial > a.left').attr('href','#0');
				$('#home-testimonial > a.right').attr('href','#2');

				
				$('#home-testimonial > a.move').click(function(e){
					e.preventDefault();
					var num=parseInt($(this).attr('href').split('#')[1]);
					if(num>=1 && num <=3) { testimonial_slideshow(num);}
				});
			},
			error: function (xhr, textStatus, errorThrown) {
				$('#home-testimonial-testi').html('<p>' + textStatus + ':  ' + errorThrown + '</p>');
			}
		});
	}
});