const doc = document,
    body = doc.body;

const dropClickHandlers = body.querySelectorAll('.js-drop-click');

dropClickHandlers.forEach( (item, index) => {
  item.addEventListener('click', dropItem);

  function dropItem(e) {
    const target = e.target,
      dataDropOwner = closest('data-drop-parent'),
      dropOwner = target.closest(`.${dataDropOwner}`);
    let dataDropTarget, dropTarget;

    if(!dropOwner) {
      return;
    }

    dataDropTarget = dropOwner.dataset.dropTarget;
    dropTarget = dropOwner.querySelector(`.${dataDropTarget}`);

    dropTarget.style.display = '';
  }

} )
