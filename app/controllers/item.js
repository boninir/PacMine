import Ember from 'ember';
import Items from 'game/models/item';

var clickedItems = Ember.Set.create();

export default clickedItems;

export default Ember.Controller.extend({
	actions: {
		//After being added, an item can be clicked. This function is then called.
		click: function(item) {
			console.log("ajouté");
			clickedItems.add(item);
		}
	}
});
