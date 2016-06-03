'use strict';

import './overlay.styl';

export default class Overlay {
  constructor() {
    this.el = document.querySelector('.js-overlay');

    this.activeClass = 'overlay_state_active';

    document.body.addEventListener('popupClosing', this.hide.bind(this));
    document.body.addEventListener('popupOpening', this.show.bind(this));
  }

  hide() {
    this.el.classList.remove(this.activeClass);
  }

  show() {
    this.el.classList.add(this.activeClass);
  }
}

window.addEventListener('DOMContentLoad', new Overlay());
