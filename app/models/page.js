import DS from 'ember-data';

export default DS.Model.extend({
	score: DS.attr('int'),
	exp: DS.attr('int'),
	prestige: DS.attr('int')
});
