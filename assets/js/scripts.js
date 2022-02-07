// NOTES
// - Sync Next/Previous with click

$.fn.showhide = function(group, closeAll, addBody, direction, full) {
  var setGroup = $(group) || $('body');
  var control = $(this);
  var closeAll = closeAll || false;
  var addBody = addBody || false;
  var direction = direction || false;
  var full = full || false;
  
  
  if(group){
    $(group).each(function() {
      var set = $(this);
      var controlLinks = set.find(control);
      var controlLinkAll = set.find('.control');
      var contentAll = set.find('[data-content]');
      var setControl = set.data('control'); // Group
      var currentItem = set.find('.control.active').index();
      var allItems = controlLinks.length - 1; // index start from 0
      
      // ON LINK LOAD SET CONTENT TO ACTIVE
      controlLinks.each(function(){
        if($(this).hasClass('active')){
          var item = $(this);
          var itemLink = item.attr("href");
          var itemValue = itemLink.substr(itemLink.indexOf("#") + 1); // the hash value
          var content = set.find('[data-content="' + itemValue + '"]');
          content.addClass('active');
        }
      });
      // ON LINK CLICK
      controlLinks.on('click', function(e) {
        e.preventDefault();
        var item = $(this);      
        var itemLink = item.attr("href");
        var itemValue = itemLink.substr(itemLink.indexOf("#") + 1); // the hash value
        var content = set.find('[data-content="' + itemValue + '"]');
        var controlLink = set.find('a[href^="' + itemLink + '"]');
				
        //do things
        if(addBody){
          $('body').toggleClass('sh-open');
        }
        if(direction){
          $('body').addClass(direction);
        }
        if(full){
          $('body').addClass('full');
        }
        if(closeAll){
          contentAll.removeClass('active');
          controlLinkAll.removeClass('active');
          item.addClass('active');
          content.addClass('active');
          
          if(item.hasClass('active')){
            item.addClass('active');
            content.addClass('active');
          }
        }else{
          controlLink.toggleClass('active');
          content.toggleClass('active');
        }
        	currentItem = controlLinkAll.index(item);
      });
      
       // Expand All
      $('[data-nav="' + setControl + '"] .expand').on('click', function(e) {
        e.preventDefault();
        controlLinkAll.addClass('active');
        contentAll.addClass('active');
      });

      // Collpase All
      $('[data-nav="' + setControl + '"] .collapse').on('click', function(e) {
        e.preventDefault();
        controlLinkAll.removeClass('active');
        contentAll.removeClass('active');
      });
      
      // NEXT PREVIOUS CONTROLS
      
      // Next
      function nextSlide(e){
      	e.stopImmediatePropagation();
      	e.preventDefault();
         	controlLinks.removeClass('active');
        	contentAll.removeClass('active');
        if(currentItem >= allItems){
          if(currentItem == allItems){
            controlLinks.eq(currentItem - allItems).addClass('active');
            contentAll.eq(currentItem - allItems).addClass('active');
            currentItem -= allItems;
          } else {
            controlLinks.eq(currentItem + 1).addClass('active');
            contentAll.eq(currentItem + 1).addClass('active');
            currentItem += 1;
          }
        } else {
          controlLinks.eq(currentItem + 1).addClass('active');
          contentAll.eq(currentItem + 1).addClass('active');
          currentItem += 1;
        }
      }
      
      // Previous
      function prevSlide(e){
      	e.stopImmediatePropagation();
      	e.preventDefault();
         	controlLinks.removeClass('active');
        	contentAll.removeClass('active');
        if(currentItem >= 0){
          if(currentItem == 0){
            controlLinks.eq(currentItem + allItems).addClass('active');
            contentAll.eq(currentItem + allItems).addClass('active');
            currentItem += allItems;
          } else {
            controlLinks.eq(currentItem - 1).addClass('active');
            contentAll.eq(currentItem - 1).addClass('active');
            currentItem -= 1;
          }
        } else {
          controlLinks.eq(currentItem - 1).addClass('active');
          contentAll.eq(currentItem - 1).addClass('active');
          currentItem -= 1;
        }
      }
      
      $('[data-nav="' + setControl + '"] .next').on('click', nextSlide);
      $('[data-nav="' + setControl + '"] .prev').on('click', prevSlide);
      
    
  });
  }else{
    control.on('click', function(e) {
      var item = $(this);      
      var itemLink = item.attr("href");
      var itemValue = itemLink.substr(itemLink.indexOf("#") + 1); // the hash value
      var content = $('body').find('[data-content="' + itemValue + '"]');
      item.toggleClass('active');
      content.toggleClass('active');
    });
  }
}

$('.edge-control').showhide('body',false,true,'left',true);
$('.control').showhide('.accordion',true);
$('.control').showhide('.tabs',true);
$('.control').showhide('.tray');
$('.control').showhide('.slider',true);