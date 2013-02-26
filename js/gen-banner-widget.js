$(document).ready(function () {

	var banner_slideshow = function(num){

		if(!num){
			if($('#home-banner-all').attr('name')){num=parseInt($('#home-banner-all').attr('name'));}
			else{num=0;}
			if(num===5){num=1;}
			else{num++;}
		}
		var offset=-$('#banner-'+num).width()*(num-1);		
		$('#home-banner-all').animate({left:offset},500);
		$('#home-banner-all').attr('name',num);
		$('#home-banner-mover a').removeClass('active');
		$('#home-banner-mover a[href=#'+num+']').addClass('active');
	};

	gen_banner_widget = function(){
		var ic=0;
		
		$.ajax({
			type: "GET",
			url: "json/banner.json",
			dataType: "json",
			async: "true",
			success: function (data) {
				var temp = $('<div></div>');
				$(temp).attr('id','home-banner-all');
				for(var i in data['banners']){
					var div=$('<div></div>');
					$(div).attr('id',i);
					$(div).width($('#home-banner').width());
					$(div).height($('#home-banner').height());
					
					var img = $('<img/>'),
						desc=$('<div></div>'),
						title=$('<p></p>'),
						lin=$('<a></a>'),
						det=$('<p></p>'),
						mover=$('<a></a>');

					$(img).attr('src',data['banners'][i]['image']);
					$(title).text(data['banners'][i]['title']);
					$(lin).attr('href',data['banners'][i]['link']);
					$(lin).text('View Details');
					$(det).text(data['banners'][i]['description']);
					$(mover).text(ic+1);
					$(mover).attr('href','#'+(ic+1));
					
					$(title).addClass('title');
					$(desc).addClass('desc');

					$(title).append(lin);
					$(desc).append(title);
					$(desc).append(det);

					$(div).append(img);
					$(div).append(desc);
					$(temp).append(div);
					$('#home-banner-mover').append(mover);
					ic++;
				}
				$('#home-banner').append(temp);
				$('#home-banner').css('background','none');
				$(temp).css('width',($('#home-banner').width()*ic));
				
				$(temp).attr('name','1');

				var banner_timer = setInterval(banner_slideshow,4000);
				$('#home-banner-mover a').on('click',function(e){
					e.preventDefault();
					var num=$(this).attr('href').split('#')[1];
					banner_slideshow(num);
				});
				$('#home-banner-mover a').first().trigger('click');
			},
			error: function (xhr, textStatus, errorThrown) {
				$('#home-testimonial-testi').html('<p>' + textStatus + ':  ' + errorThrown + '</p>');
			}
		});
	};
});