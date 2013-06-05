
function shareScoreToFacebook(score) {

	var url =  'https://www.facebook.com/dialog/feed?'
			  +'app_id=151792351673820&'
			  +'link=http://orangutaninteractive.com/t160k&'
			  +'picture=http://d2oadd98wnjs7n.cloudfront.net/projects/407434/pictures/baseball/20130515123521-logo-220x194px.png&'
			  +'name=Save the Library in Exile!&'
			  +'caption=I scored ' + score + ' points in the T160K Libraries in Exile Game!&'
			  +'description=The T160K project is saving REAL books from the rain and mold while they await their return home to the dry north desert of Mali. Play a fun game and find out more what you can do to help! Check out the game at http://orangutaninteractive.com/t160k!&'
			  +'redirect_uri=http://www.facebook.com/';

	window.open(url);
}


function shareScoreToTwitter(score) {


	var url =  'https://twitter.com/intent/tweet?'
			 + 'url=http://orangutaninteractive.com/t160k&'
			 + 'text=%23T160K I scored ' + score + ' points on T160K Libraries in Exile Game. @T160K is saving REAL books in Mali!&'
			 + 'related=T160K:Libraries in Exile'; 

	window.open(url);
}
