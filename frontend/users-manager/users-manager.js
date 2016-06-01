'use strict'

import './users-manager.styl';
import UserList from '../users-list/users-list';

export default class UsersManager {
  constructor() {
    this.container = document.querySelector('.js-users-manager');
    this.preloader = document.querySelector('.js-users-manager-preloader');

    this.url = 'http://test-api.javascript.ru/v1/roughtron/users/?delay=1000';

    this.dataReceivedClass = 'users-manager_state_data-received';

    this.init();
  }

  init() {
    this.sendRequest('GET');
  }

  sendRequest(type, data) {
    let xhr = new XMLHttpRequest();

    xhr.open(type, this.url);

    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        this.hidePreloader();
        this.render(JSON.parse(xhr.responseText));
      }
    }
  }

  hidePreloader() {
    this.container.classList.add(this.dataReceivedClass);
  }

  render(items) {
    let usersList = new UserList();
    this.container.insertAdjacentHTML("afterBegin", usersList.render(items));
  }
}

window.addEventListener('DOMContentLoaded', new UsersManager());
