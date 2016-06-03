'use strict'

import './users-manager.styl';
import UserList from '../users-list/users-list';

export default class UsersManager {
  constructor() {
    this.container = document.querySelector('.js-users-manager');
    this.preloader = this.container.querySelector('.js-users-manager-preloader');

    this.baseUrl = 'http://test-api.javascript.ru/v1/roughtron/users/';

    this.dataReceivedClass = 'users-manager_state_data-received';

    this.init();

    document.body.addEventListener('patchUser', e => this.sendRequest('PATCH', e.detail.data, e.detail.userId));
    document.body.addEventListener('removeUser', e => this.sendRequest('DELETE', null, e.detail.id));
  }

  init() {
    this.sendRequest('GET');
  }

  sendRequest(method, data, userId) {
    let url = this.baseUrl,
      xhr = new XMLHttpRequest();

    if (method == 'PATCH' || method == 'DELETE' ) {
      url += userId;
    } else {
      url += '?delay=1000';
    }

    xhr.open(method, url);

    if (data) {
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(data);
    } else {
      xhr.send();
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);

        if (xhr.status == 400) {
          let event = new CustomEvent('editFormValidateError', {
            detail: {
              data: xhr.responseText
            }
          });
          document.body.dispatchEvent(event);
        }
      } else {
        switch (method) {
          case 'GET':
            this.hidePreloader();
            this.render(JSON.parse(xhr.responseText));
            break;

          case 'PATCH':
            let event = new CustomEvent('patchUserSuccess', {
              detail: {
                data: xhr.responseText
              }
            });
            document.body.dispatchEvent(event);
            break;
        }
      }
    }
  }

  hidePreloader() {
    this.container.classList.add(this.dataReceivedClass);
  }

  render(items) {
    let usersList = new UserList();
    this.container.insertAdjacentHTML("afterBegin", usersList.render(items));

    let event = new CustomEvent('usersLoaded');
    document.body.dispatchEvent(event);
  }
}

window.addEventListener('DOMContentLoaded', new UsersManager());
