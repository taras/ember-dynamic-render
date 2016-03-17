import Ember from 'ember';
import injectScript from 'ember-inject-script';

export default Ember.Route.extend({
  model() {
    return { foo: 'bar' };
  },
  afterModel() {
    return injectScript('//builds.emberjs.com/release/ember-template-compiler.js');
  }
});