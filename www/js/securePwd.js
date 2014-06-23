$( document ).ready(function() {
// PWD SECURITY LEVEL

var securityLvl = function(pwd, max, authorized) {
	if(pwd.length > 0) {
		if(!max) max = 16;
		if(!authorized) authorized = 'aZ9';
		
		var multiplier = 0;
		var lvl = pwd.length;
		var count = 1;

		// contient au moins un chiffre
		if ($.inArray('9', authorized) != -1) {
			var intRegex = /[0-9]+/g;  
			var integer = pwd.match(intRegex); 
			if(integer) multiplier++;
			count++;
		}
		
		// contient au moins une minuscule
		if ($.inArray('a', authorized) != -1) {
			var minRegex = /[a-z]+/g; 
			var minuscule = pwd.match(minRegex);  
			if(minuscule) multiplier++;
			count++;
		}
		
		// contient au moins une majuscule
		if ($.inArray('Z', authorized) != -1) {
			var majRegex = /[A-Z]+/g;   
			var majuscule = pwd.match(majRegex);
			if(majuscule) multiplier++;
			count++;
		}

		// Repartition des chiffres
		if ($.inArray('9', authorized) != -1) {
			var nbIntRegex = /[0-9]/g;   
			var nbInteger = pwd.match(nbIntRegex);
			if(nbInteger) multiplier += (integer.length) / (nbInteger.length);
			count++;
		}
		
		// Repartition des minuscules
		if ($.inArray('a', authorized) != -1) {
			var nbMinRegex = /[a-z]/g;
			var nbMinuscule = pwd.match(nbMinRegex);   
			if(nbMinuscule) multiplier += (minuscule.length) / (nbMinuscule.length);
			count++;
		}

		// Repartition des majuscules
		if ($.inArray('Z', authorized) != -1) {
			var nbMajRegex = /[A-Z]/g;   
			var nbMajuscule = pwd.match(nbMajRegex);
			if(nbMajuscule) multiplier += (majuscule.length) / (nbMajuscule.length);
			count++;
		}

		// Repetition des caracteres
		var alreadyCount = [];
		for (var i = 0; i < pwd.length; i++) {
			if ($.inArray(pwd[i], alreadyCount) == -1) {
				alreadyCount.push(pwd[i]);
			}
		};
		multiplier += (alreadyCount.length) / (pwd.length);

		// resultat
		return result = (lvl * multiplier) / (max * count);
	} 
	return 0;
}

var showLvl = function(lvl) {
	var txt = '';
	if(lvl > 0.8) txt = 'VERY HIGH';
	else if(lvl > 0.6) txt = 'HIGH';
	else if(lvl > 0.4) txt = 'MEDIUM';
	else if(lvl > 0.2) txt = 'LOW';
	else txt = 'VERY LOW';
	$('#levSecu').text(txt);
	if(lvl > 0.8) {
		$('#nivSecu div').eq(4).addClass('greenLvl');
	} else {
		$('#nivSecu div').removeClass('greenLvl');
		$('#nivSecu div').eq(0).addClass('redLvl');
		$('#nivSecu div').eq(1).addClass('redLvl');
		$('#nivSecu div').eq(2).addClass('yellowLvl');
		$('#nivSecu div').eq(3).addClass('greenLvl');
	}
	if(lvl > 0.6) {
		$('#nivSecu div').eq(3).addClass('greenLvl');
	} else {
		$('#nivSecu div').removeClass('greenLvl');
		$('#nivSecu div').eq(0).addClass('redLvl');
		$('#nivSecu div').eq(1).addClass('redLvl');
		$('#nivSecu div').eq(2).addClass('yellowLvl');
	}
	if(lvl > 0.4) {
		$('#nivSecu div').eq(2).addClass('yellowLvl');
	} else {
		$('#nivSecu div').removeClass('yellowLvl').removeClass('greenLvl');
		$('#nivSecu div').eq(0).addClass('redLvl');
		$('#nivSecu div').eq(1).addClass('redLvl');
	}
	if(lvl > 0.2) {
		$('#nivSecu div').eq(1).addClass('redLvl');
	} else {
		$('#nivSecu div').removeClass('redLvl').removeClass('yellowLvl').removeClass('greenLvl');
		$('#nivSecu div').eq(0).addClass('redLvl');
	}
	
}

$('#pwd').on({
	keyup : function() {
		showLvl(securityLvl($(this).val()));
	},
	change : function() {
		showLvl(securityLvl($(this).val()));
	}
});

var generate = function(size){
	var minuscule = 'abcdefghijklmnopqrstuvwxyz';
	var majuscule = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var integer = '0123456789';
	var password = '';
	var list = [];
	list.push(minuscule.split(''));
	list.push(majuscule.split(''));
	list.push(integer.split(''));
	var i = 0;
	do {
        i++;
        var index = Math.floor(Math.random() * list[(i%3)].length);
        password += list[(i%3)][index];
    } while(i < size);
    return password;
};

$('#generate .flashBtn').click(function() {
	$('#generate input').prop('checked', true);
	$('#pwd, #confirm').prop('type', 'text').val(generate(16));
	showLvl(securityLvl($('#pwd').val()));
});

$('#generate input').change(function() {
	if ( $(this).is(':checked') )
            $('#pwd, #confirm').prop('type', 'text');
        else
            $('#pwd, #confirm').prop('type', 'password');
});



});