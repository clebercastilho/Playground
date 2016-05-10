var dropPermission = false;

/* The dragging code for '.draggable' from the demo above
   * applies to this demo as well so it doesn't have to be repeated. */
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // call this function on every dragmove event
    onmove: function (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    // call this function on every dragend event
    onend: function (event) {
      console.log('fim do movimento');
      var target = event.target;
      if(!dropPermission){
        target.style.webkitTransform =
        target.style.transform =
          'translate(0px, 0px)';

        // update the posiion attributes
        target.setAttribute('data-x', 0);
        target.setAttribute('data-y', 0);
      }
    }
  });

  // this is used later in the resizing and gesture demos
  //window.dragMoveListener = dragMoveListener;
  
  // enable draggables to be dropped into this
  interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.draggable',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function(event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active');
    },
    ondragenter: function(event) {
      var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');
      draggableElement.textContent = 'Dragged in';
    },
    ondragleave: function(event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target');
      event.relatedTarget.classList.remove('can-drop');
      event.relatedTarget.textContent = 'Dragged out';
      dropPermission = false;
    },
    ondrop: function(event) {
      event.relatedTarget.textContent = 'Dropped';
      dropPermission = true;
    },
    ondropdeactivate: function(event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });