
cheet '↑ ↑ ↓ ↓ ← → ← → b a', ->
	mixpanel.track 'cheet-konami'
	$('.card').addClass('twirl')
	setTimeout (->
		$('.card').removeClass('twirl')
	), 1000

cheet 'l u l u', ->
	mixpanel.track 'cheet-lulu'
	$('.card-image').attr 'src', '/static/images/lulu.jpg'
