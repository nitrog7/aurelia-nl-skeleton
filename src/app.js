'use strict';

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Aurelia';
      config.options.pushState = true;
      config.map([
        { route: ['','welcome'],  moduleId: 'views/index/welcome',      nav: true, title:'Welcome' },
        { route: 'flickr',        moduleId: 'views/index/flickr',       nav: true, title:'Flickr'  },
        { route: 'child-router',  moduleId: 'views/index/child-router', nav: true, title:'Child Router' }
      ]);
    });
  }
}