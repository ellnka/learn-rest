'use strict';

import template from './users-list.jade';

import './users-list.styl';

export default class UsersList {
  render(items) {
    return template({items: items});
  }
}

window.addEventListener('load', new UsersList());
