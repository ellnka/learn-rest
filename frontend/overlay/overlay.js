'use strict';

import './overlay.styl';

export default class Overlay {
  constructor() {
    this.el = document.querySelector('.js-overlay');

    this.activeClass = 'overlay_state_active';
  }
}
