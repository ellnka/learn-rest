'use strict';

import './form.styl';
import '../label/label.styl';
import '../text-input/text-input.styl';

export default class EditForm {
  constructor() {
    this.container = document.querySelector('.js-edit-form');

    this.inputErrorClass = 'text-input_state_error';

    this.container.addEventListener('submit', this.onSubmit.bind(this));
    document.body.addEventListener('startUserEditing', this.fill.bind(this));
    document.body.addEventListener('editFormValidateError', this.onError.bind(this));
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
    //FIXME костыли и палки :(
    let formData = {};
    for (let i = 0; i < this.container.elements.length; i++) {
      if (this.container.elements[i].type != 'fieldset' && this.container.elements[i].type != 'submit') {
        formData[this.container.elements[i].name] = this.container.elements[i].value;
      }
    }

    let event = new CustomEvent('patchUser', {
      detail: {
        userId: this.container.elements['_id'].value,
        data: JSON.stringify(formData)
      }
    });
    document.body.dispatchEvent(event);
  }

  onError(e) {
    let errors = JSON.parse(e.detail.data).errors;
    for (let field in errors) {
      let input = this.container.querySelector(`[name="${field}"]`);
      if (input) {
        input.classList.add(this.inputErrorClass);

        let errorBlock = this.container.querySelector(`[name="${field}"] + .js-input-error`);
        if (errorBlock) {
          errorBlock.innerHTML = errors[field];
        } 
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', new EditForm());
