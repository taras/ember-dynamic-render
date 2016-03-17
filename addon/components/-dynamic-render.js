import Ember from 'ember';
import layout from '../templates/components/-dynamic-render';

export default Ember.Component.extend({
  layout,
  classNames: 'dynamic-render--output'
});