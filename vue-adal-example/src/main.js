// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import authentication from './authentication'
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.config.productionTip = false

Vue.http.interceptors.push(function (request, next) {
  authentication.acquireToken().then(token => {
    // Set default request headers for every request
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('Authorization', 'Bearer ' + token)
    // continue to next interceptor
    next();
  });
});

// Init adal authentication - then create Vue app.
authentication.initialize().then(_ => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  });
});
