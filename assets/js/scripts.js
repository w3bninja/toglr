// NOTES
// - Steps/Wizard - Would need to include sets within other sets

$.fn.toglr = function(group, closeAll, addBody, direction, full, actionType, push) {
  var setGroup = $(group) || $('body');
  var control = $(this);
  var closeAll = closeAll || false;
  var addBody = addBody || false;
  var direction = direction || false;
  var full = full || false;
  var push = push || false;
  var actionType = actionType || 'click';
 
  $(group).each(function() {
    var set = $(this);
    var controlLinks = set.find(control);
    var controlLinkAll = set.find('.control');
    var contentAll = set.find('[data-content]');
    var setControl = set.data('control'); // Group
    var currentItem = set.find('.control.active').index();
    var allItems = controlLinks.length - 1; // index start from 0

    // CHECK LINK ACTIVE AND SET CONTENT IF ACTIVE
    controlLinks.each(function(){
      var item = $(this);
      var itemLink = item.attr("href");
      var itemValue = itemLink.substr(itemLink.indexOf("#") + 1); // the hash value
      var content = set.find('[data-content="' + itemValue + '"]');
      if($(this).hasClass('active')){
        
        content.addClass('active');
        currentItem = controlLinkAll.index(item);
      }
      if(direction){
        //alert(direction);
        content.addClass(direction);
        if(push){
          $('body').addClass('push-' + direction);
        }
      }
      
    });
    // ON LINK ACTION
    controlLinks.on(actionType, function(e) {
      e.preventDefault();
      var item = $(this);      
      var itemLink = item.attr("href");
      var itemValue = itemLink.substr(itemLink.indexOf("#") + 1); // the hash value
      var content = set.find('[data-content="' + itemValue + '"]');
      var controlLink = set.find('a[href^="' + itemLink + '"]');

      //do things
      if(addBody){
        $('body').add(content).toggleClass('open', 'closed');
      }
      if(direction){
        content.addClass(direction);
      }
      if(full){
        $('body').add(content).addClass('full');
      }
      if(closeAll){
        contentAll.add(controlLinkAll).removeClass('active');
        item.add(content).addClass('active');
        if(item.hasClass('active')){
          item.add(content).addClass('active');
        }
      }else{
        controlLink.add(content).toggleClass('active');
      }
      currentItem = controlLinkAll.index(item);
    });

    // Expand All
    $('[data-nav="' + setControl + '"] .expand').on('click', function(e) {
      e.preventDefault();
      controlLinkAll.add(contentAll).addClass('active');
    });

    // Collpase All
    $('[data-nav="' + setControl + '"] .collapse').on('click', function(e) {
      e.preventDefault();
      controlLinkAll.add(contentAll).removeClass('active');
    });
    
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
}

$('.edge-control').toglr('body',false,true,'bottom',false,'click',false);
$('.control').toglr('.accordion',true);
$('.control').toglr('.tabs',true);
$('.control').toglr('.tray');
$('.control').toglr('.slider',true);
$('.control').toglr('.popover',false,false,false,false);
$('.control').toglr('.drop',false,false,false,false);
$('.control').toglr('.tooltip',false,false,false,false,'mouseover mouseout');
$('.modal-control').toglr('body');
$('.control').toglr('.modal-group');