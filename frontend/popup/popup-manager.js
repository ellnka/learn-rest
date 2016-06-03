'use strict';

import './popup.styl';
import '../overlay/overlay';

export default class PopupManager {
  constructor() {
    this.currentOpen = null;
  }
}

window.addEventListener('DOMContentLoad', new PopupManager());
