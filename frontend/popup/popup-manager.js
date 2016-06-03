'use strict';

import './popup.styl';
import '../overlay/overlay';

export default class PopupManager {
  constructor() {
    this.currentOpen = null;

    this.popupActiveClass = 'popup_state_active';
    
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);

    document.body.addEventListener('showPopup', this.showPopup);
    document.body.addEventListener('patchUserSuccess', this.closePopup);
  }

  showPopup(e) {
    this.closePopup();

    let popup = document.querySelector(e.detail.popupClass);

    if (popup) {
      let event = new CustomEvent('popupOpening');
      document.body.dispatchEvent(event);

      this.currentOpen = popup;
      this.currentOpen.classList.add(this.popupActiveClass);
    }
  }

  closePopup() {
    if (this.currentOpen) {
      let event = new CustomEvent('popupClosing');
      document.body.dispatchEvent(event);

      this.currentOpen.classList.remove(this.popupActiveClass);
      this.currentOpen = null;
    }
  }
}

window.addEventListener('DOMContentLoad', new PopupManager());
