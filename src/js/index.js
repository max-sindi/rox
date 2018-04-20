window.onload = main;

function main() {
  const doc = document,
    body = doc.body,
    smPoint = 576,
    mdPoint = 768,
    lgPoint = 992,
    xlPoint = 1242,
    pageWidth = parseInt( getComputedStyle(body).width ),
    nav = doc.getElementById('header__nav-wrap'),
    menu = doc.getElementById('header__menu-button-wrap');

  let lastWidth = null;

  hideNavIfNeed();
  window.addEventListener('resize', hideNavIfNeed);

  function hideNavIfNeed() {
    switch( isNeedHide() ) {
      case false:
        return;
      case 'hide':
        nav.hidden = true;
        menu.hidden  = false;
        menu.addEventListener('click', hideOrShowNav);
        break;
      case 'show':
        nav.hidden = false;
        menu.hidden  = true;
        menu.removeEventListener('click', hideOrShowNav);
        break;
    }

    function isNeedHide() {
      const bodyWidth = parseInt( getComputedStyle(body).width ),
        lgPoint = 992,
        lw = lastWidth;

      let result;

      /* if checking happens at first time(e.g. page was just loaded) - 
        !lw equals true and result depends only from page width, e.g. is body less or more brakepoint. When checking happens after the first check,
        it compares if page width less or more brakepoint and also its last page width. If current width and last width both less or more brakepoint, it has no need change nav display status and so 
        result = false */
      if(bodyWidth < lgPoint && ( !lw || lw >= lgPoint)) {
        result = 'hide';
      } else if(bodyWidth >= lgPoint && ( !lw || lw < lgPoint)) {
        result = 'show';
      } else {
        result = false;
      }

      lastWidth = bodyWidth;
      return result;
    }
  }

  function hideOrShowNav() {
    if(nav.hidden === true) {
      nav.hidden = false;
    } else {
      nav.hidden = true;
    }
  }

  portfolioCarouselInit();

  function portfolioCarouselInit() {
    const portfolioCarousel = new Siema({
      selector: '.portfolio__items-wrap',
      loop: true,
      perPage: {
        768: 2,
        992: 2,
        1242: 3,
      },
    });

    const leftControl = doc.getElementById('portfolio-left'),
      rightControl = doc.getElementById('portfolio-right');

    leftControl.addEventListener('click', () => portfolioCarousel.next() );
    rightControl.addEventListener('click', () => portfolioCarousel.prev() );
  }

  examplesCarouselInit();

  function examplesCarouselInit() {
    if(pageWidth >= lgPoint) {
      return;
    }

    const examplesCarousel = new Siema({
      selector: '#examples__carousel',
      loop: true
    });

    const controlsWrap = doc.getElementById('examples__controls-wrap'),
      leftControl = doc.getElementById('examples-left'),
      rightControl = doc.getElementById('examples-right');

    controlsWrap.hidden = false;
    leftControl.addEventListener('click', () => examplesCarousel.next() );
    rightControl.addEventListener('click', () => examplesCarousel.prev() );
  }

  initDropdown();

  function initDropdown() {
    const dropHandlers = body.querySelectorAll('.js-dropdown-click-handler');

    dropHandlers.forEach( (item) => {
      item.addEventListener('click', doDropdown);
    });

    function doDropdown(e) {
      const target = e.target,
        dataDropParent = this.dataset.dropdownParent,
        dropParent = this.closest(dataDropParent),
        dataParentClasses = dropParent.classList;

      if(dataParentClasses.contains('opened') ) {
        dataParentClasses.remove('opened');
      } else {
        dataParentClasses.add('opened');
      }
    }
  }
}