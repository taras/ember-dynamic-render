import Ember from 'ember';
import layout from '../templates/components/dynamic-render';

const {
  HTMLBars,
  Logger,
  computed
} = Ember;

const DynamicRenderComponent = Ember.Component.extend({
  layout,
  classNames: ['dynamic-render'],
  
  didInsertElement() {
    try {
      HTMLBars.compile('');
    } catch (e) {
      Logger.error(`HTMLBars compiler was not loaded. Load //builds.emberjs.com/release/ember-template-compiler.js before rendering this component`);
    }
  },
  
  didReceiveAttrs() {
    this._super(...arguments);
    
    if (this.get('_value') !== this.get('value')) {
      this.scheduleRerender();
    }
  },
  
  scheduleRerender() {
    this.set('isReady', false);
    Ember.run.scheduleOnce('afterRender', this, this.causeRerender);
  },
  
  causeRerender() {
    this.setProperties({
      _value: this.get('value'),
      isReady: true
    });
  },

  compiled: computed('_value', function(){
    let value = this.get('_value') || '';
    let compiled;
    try {
      compiled = HTMLBars.compile(value);
    } catch (e) {
      compiled = e;
    }
    return compiled;
  }),

  isBadTemplate: computed('compiled', function(){
    let compiled = this.get('compiled');
    return compiled instanceof Error;
  })
});

DynamicRenderComponent.reopenClass({
  positionalParams: ['value', 'model']
});

export default DynamicRenderComponent;