'use strict';

import './form.styl';
import '../label/label.styl';
import '../text-input/text-input.styl';

export default class EditForm {
  constructor() {
    this.container = document.querySelector('.js-edit-form');

    this.container.addEventListener('submit', this.onSubmit.bind(this));
    document.body.addEventListener('startUserEditing', this.fill.bind(this));
  }

  fill(e) {
    for (let field in e.detail.data) {
      if (this.container.elements[field]) {
        this.container.elements[field].value = e.detail.data[field];
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let formData = {};
    for (let i = 0; i < this.container.elements.length; i++) {
      if (this.container.elements[i].type != 'fieldset' && this.container.elements[i].type != 'submit') {
        formData[this.container.elements[i].name] = this.container.elements[i].value;
      }
    }

    let event = new CustomEvent('sendEditedUser', {
      detail: {
        userId: this.container.elements['_id'].value,
        data: JSON.stringify(formData)
      }
    });
    document.body.dispatchEvent(event);
  }
}

window.addEventListener('DOMContentLoaded', new EditForm());
