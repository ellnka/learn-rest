'use strict';

import template from './users-list.jade';

import './users-list.styl';

export default class UsersList {
  constructor() {
    this.container = null;

    this.actionButtonClass = 'js-action-link';

    this.items = {};

    this.init = this.init.bind(this);
    this.patchUser = this.patchUser.bind(this);

    document.body.addEventListener('usersLoaded', this.init);
    document.body.addEventListener('patchUserSuccess', this.patchUser);
  }

  onClick(e) {
    let target = e.target;

    if (!target.classList.contains(this.actionButtonClass)) return;

    let userID = target.getAttribute('data-id');

    switch (target.getAttribute('data-action')) {
      case 'remove':
        this.removeItem(userID);
        break;

      case 'edit':
        this.editItem(userID);
    }
  }

  removeItem(id) {
    console.log('remove id = ' + id);
  }

  editItem(id) {
    let event = new CustomEvent('showPopup', {
      detail: {
        popupClass: '.js-edit-popup',
      }
    });
    document.body.dispatchEvent(event);

    let item = this.items.find(item => item._id == id);
    item.birthdate = this.formatDate(item.birthdate);

    event = new CustomEvent('startUserEditing', {
      detail: {
        data: item
      }
    });
    document.body.dispatchEvent(event);
  }

  patchUser(e) {
    let data = JSON.parse(e.detail.data),
        row = this.container.querySelector(`.users-list__item[data-id="${data._id}"]`);

    for (let field in data) {
      let cell = row.querySelector(`[data-name="${field}"]`);
      if (cell) {
        cell.innerHTML = (field == 'birthdate') ? this.formatDate(data[field]) : data[field];
      }
    }
  }

  formatDate(dateString) {
    let date = new Date(dateString),
    dd = date.getDate();
    
    if (dd < 10) dd = `0${dd}`;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = `0${mm}`;

    let yy = date.getFullYear();

    return `${yy}-${mm}-${dd}`;
  }

  render(items) {
    this.items = Array.from(items);
    return template({items: items});
  }

  init() {
    this.container = document.querySelector('.js-users-list');

    this.container.addEventListener('click', this.onClick.bind(this));
  }
}
