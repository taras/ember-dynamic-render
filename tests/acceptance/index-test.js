import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    
    assert.equal($('.dynamic-render--output').text(), '', 'dynamic output is empty');
  });
  
  fillIn('textarea', '<h1>{{model.foo}}</h1>');
  
  andThen(function(){
    assert.equal($('.dynamic-render--output').html(), '<h1>bar</h1>');
  });
});
