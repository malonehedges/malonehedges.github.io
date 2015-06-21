
cheet '↑ ↑ ↓ ↓ ← → ← → b a', ->
	$('.card').addClass('twirl')
	setTimeout (->
		$('.card').removeClass('twirl')
	), 1000
