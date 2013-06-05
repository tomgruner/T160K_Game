

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
	 rainSpeed : 2500,
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
	 umbrellas : [[500,387,.25,15, '#1676be'],
	 			  [240,384,.3,15, '#731000']],
	 /* List of angles the rain will transition through */
	 rainAngles : [0,30,0,-30, -40, -10, 20],
	 /* smaller numbers = faster */
	 rainSpeed : 1600,
	 rainIntensity : .6,
	 rainSize: 9
	},
	{title: "The Tempest",
	 time: 30, 
	 bg : 'bg_2',
	/* image_resource_key, x, y, scale, rotation */
	 books : [['book_3', 323, 360,  .6, 5],
	 		  ['book_1', 320, 390,  .75, 0]],
     /* x, y, scale, rotation  where x,y represent the base point of the umprella pole*/
	 umbrellas : [[360,380,.28,-30, '#718c44'],
	 			  [440,400,.19,-15, '#e1caab']],
	 /* List of angles the rain will transition through */
	 rainAngles : [-40, -45, 40, 45,0],
	 /* smaller numbers = faster */
	 rainSpeed : 1600,
	 rainIntensity : 8,
	 rainSize: 5
	},
	{title: "Book Mountain",
	 time: 30, 
	 bg : 'bg_2',
	/* image_resource_key, x, y, scale, rotation */
	 books : [['book_3', 223, 360,  .5, 76],
			  ['book_3', 260, 374,  .4, 70],
	 		  ['book_2', 295, 355,  .4, -90],
	 		  ['book_1', 290, 338,  .75, 85],
	 		  ['book_3', 400, 400,  .5, -5],
	 		  ['book_2', 400, 360,  .4, -2],
	 		  ['book_1', 390, 340,  .5, -3],
	 		  ['book_2', 392, 310,  .3, 178],
	 		  ['book_1', 392, 298,  .3, 177],
	 		  ['book_2', 155, 380,  .4, 180],
	 		  ['book_3', 170, 360,  .4, 180],
	 		  ['book_1', 190, 348,  .3, 180],
	 		  ['book_1', 450, 360,  .6, -105],
	 		  ['book_1', 280, 312,  .36, -24],
	 		  ['book_2', 277, 274,  .3, -27],
	 		  ],
     /* x, y, scale, rotation  where x,y represent the base point of the umprella pole*/
	 umbrellas : [[360,270,.25,-30, '#1676be'],
	 			  [170,370,.25,-30, '#1676be'],
	 			  [470,370,.25,-30, '#1676be'],
	 			  ],
	 /* List of angles the rain will transition through */
	 rainAngles : [-30, -35, 50, 35,0],
	 /* smaller numbers = faster */
	 rainSpeed : 1800,
	 rainIntensity : 5,
	 rainSize: 5
	}
];
