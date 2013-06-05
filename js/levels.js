

var levels = [
	{title : "The Sprinkle",
	 time : 15,
	 bg : 'bg_1',
	/* image_resource_key, x, y, scale, rotation */
	 books : [['book_3', 423, 380,  .4, 5],
			  ['book_1', 420, 390,  .4, 0],
			  ['book_2', 400, 400,  .5, -5]],
     /* x, y, scale, rotation  where x,y represent the base point of the umprella pole*/
	 umbrellas : [[460,400,.35,15, '#564B43']],
	 /* List of angles the rain will transition through */
	 rainAngles : [0,30,0,-40, -45, -10, 20],
	 /* smaller numbers = faster */
	 rainSpeed : 3000,
	 rainIntensity : 1,
	 rainSize: 10
	},
	{title: "Cats n' Dogs",
	 time: 30, 
	 bg : 'bg_2',
	/* image_resource_key, x, y, scale, rotation */
	 books : [['book_3', 423, 380,  .4, 5],
			  ['book_1', 420, 390,  .4, 0],
			  ['book_2', 400, 400,  .5, -5],
			  ['book_3', 223, 380,  .4, 5],
			  ['book_1', 220, 390,  .4, 0],
			  ['book_2', 200, 400,  .5, -5]],
     /* x, y, scale, rotation  where x,y represent the base point of the umprella pole*/
	 umbrellas : [[460,420,.25,15, '#564B43'],
	 			  [260,410,.3,15, '#731000']],
	 /* List of angles the rain will transition through */
	 rainAngles : [0,30,0,-30, -40, -10, 20],
	 /* smaller numbers = faster */
	 rainSpeed : 1600,
	 rainIntensity : .6,
	 rainSize: 9
	},
	{title: "The Tempest",
	 time: 35, 
	 bg : 'bg_2',
	/* image_resource_key, x, y, scale, rotation */
	 books : [['book_3', 423, 380,  .4, 5],
	 		  ['book_1', 420, 390,  .4, 0]],
     /* x, y, scale, rotation  where x,y represent the base point of the umprella pole*/
	 umbrellas : [[460,380,.28,30, '#564B43']],
	 /* List of angles the rain will transition through */
	 rainAngles : [-10,40,10,-40],
	 /* smaller numbers = faster */
	 rainSpeed : 2500,
	 rainIntensity : .8,
	 rainSize: 8
	}
];
