
cheet '↑ ↑ ↓ ↓ ← → ← → b a', ->
	$('.card').addClass('twirl')
	setTimeout (->
		$('.card').removeClass('twirl')
	), 1000

cheet 'l u l u', ->
	$('.card-image').attr 'src', '/static/images/lulu.jpg'
