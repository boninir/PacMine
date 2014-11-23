import Ember from 'ember';


//8 chances out of 10 that the money or progress change will be positive 

function sign(){
    return Math.random()<.8 ? 1 : -1;
};


export default [
Ember.Object.create(
	{type: 0},   	//Coffee 
	{basicSpeed: 10},
	{moneyChange: 0},
	{progressChange:30}
),
Ember.Object.create(
	{type: 1}, 		//Bug
	{basicSpeed: 7},
	{moneyChange: 0},
	{progressChange:-20}
),
Ember.Object.create(
	{type: 2}, 		//Money
	{basicSpeed: 15},
	{moneyChange: 10},
	{progressChange: 0}
),
Ember.Object.create(
	{type: 3}, 		//Trainee
	{basicSpeed: 10},
	{moneyChange: 0},
	{progressChange: 0}
)

];
