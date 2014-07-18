$(document).ready(function() {

var options = {
	active: true
};

var options2 = {
	active: false,
	date: '2014-05-01 00:00',
	setter: true
}

$('#horlogeBig').horloge(400, options2);
$('#horlogeMedium').horloge(200, options);
$('#horlogeSmall').horloge(100, options);
	
	
});