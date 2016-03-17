import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dynamic-render', 'Integration | Component | dynamic render', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{dynamic-render}}`);

  assert.equal(this.$('.dynamic-render').text(), '');
});

test('it accepts value argument', function(assert){
  
  this.render(hbs`{{dynamic-render value='<h1>Foo</h1>'}}`);
  
  assert.ok(this.$('h1:contains(Foo)').length, 'h1 with Foo is rendered');
});

test('it should accept value as first positional param', function(assert){
  
  this.render(hbs`{{dynamic-render '<h1>Foo</h1>'}}`);
  
  assert.ok(this.$('h1:contains(Foo)').length, 'h1 with Foo is rendered');
});

test('it accepts model argument', function(assert){
  
  this.set('model', {foo: 'bar'});
  
  this.render(hbs`{{dynamic-render '<h1>{{model.foo}}</h1>' model=model}}`);
  
  assert.ok(this.$('h1:contains(bar)').length, 'h1 with Bar is rendered');
});

test('it shows an error when bad template is rendered', function(assert){
  
  this.render(hbs`{{dynamic-render '<div>foo'}}`);
  
  assert.equal(this.$('.dynamic-render--error').text(), 'Unclosed element `div` (on line 1).', 'error is shown');
});

test('it rerenders when template is changed', function(assert){
  
  this.set('model', {foo: 'bar'});
  this.set('template', '<h1>{{model.foo}}</h1>');
  
  this.render(hbs`{{dynamic-render template model=model}}`);
  
  assert.equal(this.$('.dynamic-render--output').html(), '<h1>bar</h1>');
  
  this.set('template', '<h2>{{model.foo}}</h2>');
  
  assert.equal(this.$('.dynamic-render--output').html(), '<h2>bar</h2>');
});

test('it accepts model as second positional param', function(assert){

  this.set('model', {foo: 'bar'});
  
  this.render(hbs`{{dynamic-render '<h1>{{model.foo}}</h1>' model}}`);
  
  assert.ok(this.$('h1:contains(bar)').length, 'h1 with Bar is rendered');
});