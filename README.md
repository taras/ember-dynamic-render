# ember-dynamic-render [![Build Status](https://travis-ci.org/taras/ember-dynamic-render.svg?branch=master)](https://travis-ci.org/taras/ember-dynamic-render)

Allows to render a template from a string. 

For example `{{dynamic-render '<h1>{{model.foo}}</h1>' model}}`

## Requires HTMLBars compiler

HTMLBars compiler must be explicitely loaded before this component is rendered.
The compiler can be included in vendor.js or loaded via a script.

### Loading script in route

1. Install `ember-inject-script` addon.
2. Inject `ember-template-compiler.js` in afterModel of the route where the component will be rendered.

```javascript
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
```

### vendor.js

**Note**: this will increase the download size of your application. Consider loading script in the route.

In `ember-cli-build.js` add `app.import('bower_components/ember/ember-template-compiler.js')`.
