 $(document).ready(function(){
	 $('.owl-carousel').owlCarousel({
		 loop:true,
		 margin:10,
		 nav:true,
		 dots: false,
		 navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		 autoHeight : true,
		 responsive:{
			 0:{
				 items:1
			 },
			 600:{
				 items:1
			 },
			 1000:{
				 items:2
			 }
		 }
	 })
 });

 $(document).ready(function(){
	 $('.eventnav-tabs a').bind('click', function() { 
	 
		$('.event-tab-bottom').removeClass('active-bottom');
		$('.event-tab-top').removeClass('active-top');
	 
		var tabId = $(this).attr('tabId');
		
		$('.event-tab-bottom a[tabId="' + tabId + '"]').parent().addClass('active-bottom');
		$('.event-tab-top a[tabId="' + tabId + '"]').parent().addClass('active-top');

		$('.eventscontent-wrapper .eventnav-tabpanel').hide();
		$('#tab-' + tabId).fadeIn('medium');
	 });
	$('.eventnav-tabs a').first().trigger('click');
});


  $(document).ready(function(){
	var options = {
	  useEasing : true, 
	  useGrouping : true, 
	  separator : '.', 
	  decimal : '.' 
	}

	if($('#myTargetElement1').length)
	{
		var demo = new countUp("myTargetElement1", 0, 160000, 0, 2, options);
		demo.start();
		var demo = new countUp("myTargetElement2", 0, 1000000000, 0, 2, options);
		demo.start();
		var demo = new countUp("myTargetElement3", 0, 1700, 0, 2, options);
		demo.start();
		var demo = new countUp("myTargetElement4", 0, 114, 0, 2, options);
		demo.start();
	}

});

jQuery(function() {
	jQuery('#allinone_carousel_sweet').allinone_carousel({
		width: 1000,
		height: 400,
		responsive:true,
		autoPlay: 0,
		elementsHorizontalSpacing:250,
		elementsVerticalSpacing:100,
		animationTime:0.5,
		showCircleTimer: false,
		showBottomNav: false,
		autoHideBottomNav:false,
		autoHideNavArrows: false,
		nextPrevMarginTop:-170,
	});		
});


