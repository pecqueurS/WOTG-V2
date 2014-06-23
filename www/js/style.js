$( document ).ready(function() {
	// Declaration du json comprenant les informations sur les icones
	json = JSON.parse($.ajax({
				type: "GET",
				dataType : "json",
				url:"../../js/tileset.json",
				async: false
			}).responseText);

			 

	/*INPUT AVEC FOCUS BLEU EN DESSOUS */
	// Barre grise (sauf 1e, bleue) en dessous de chaque input
	$(".input").each(function(){
		var div=document.createElement('div');
		$(div).addClass('blockInput');
		var input = $(this).clone();
		$(div).append(input);
		var div2= $(document.createElement('div'));
		div2.addClass("barInput");
		$(div).append(div2);
		$(this).replaceWith($(div));
	});
	$(".blockInput").eq(0).find(".barInput").css("backgroundColor","rgb(0,153,255)");
	//$(".blockInput").eq(0).find(".input").focus();

	// Effet barre bleue sur le focus
	// entrée
	$(".input").on("focus",function(){
		$(this).next().css("backgroundColor","rgb(0,153,255)");
	});
	// Sortie
	$(".input").on("focusout",function(){
		$(".barInput").css("backgroundColor","#cccccc");
	});





	/*BOUTONS AVEC FOCUS BLEU AU DESSUS */
	var img = new Image();
	$(img).attr("src", "../../images/tileset32.png");

	$(img).on("load",function(){
		//$.getJSON("../../js/tileset.json", function(json){




			$(".btn").each(function(){
				//div
					var div=document.createElement('div');
					$(div).addClass('blockBtn');
					var ico = $(document.createElement('div'));
					ico.css("display","inline-block");
				//image
					if($(this).attr("class")!="btn"){
						var typeico = $(this).attr("class").replace(/btn /g, '');
						eval("var coord = (json."+typeico+");");
						var bgPos = (-coord[1]*32)+"px "+(-coord[0]*32)+"px";
						ico.css({ 	width : "32px", 
									height: "32px", 
									marginRight: "5px",
									backgroundImage: "url(../../images/tileset32.png)", 
									backgroundPosition : bgPos, 
									verticalAlign: "top"
								});
						
					}
					$(div).append(ico);
				
				// btn
					var input = $(this).clone();
					$(div).append(input);
				// Barre grise (sauf 1e, bleue)
					var div2= $(document.createElement('div'));
					div2.addClass("barBtn");
					$(div).append(div2);
					$(this).replaceWith($(div));

				
			});
			$(".cadre").each(function(){
				$(this).find(".blockBtn").eq(0).find(".barBtn").css("backgroundColor","rgb(0,153,255)");
			});



			// Effet barre bleue sur le hover
			// entrée
			function ongletSelected(element){
				var colorHEX = "#0099ff";
				var colorRGB = "rgb(0,153,255)";
				var tabBarBtn = element.parent().find(".barBtn");

				for (var i = 0; i < tabBarBtn.length; i++) {
					var color = tabBarBtn[i].style.backgroundColor.replace(/ /g,"");
					if(color == colorRGB) {
						return i;
					}
				};

				return 0;
			}

			var onglet;
			$(".blockBtn").on("mouseenter",function(){
				onglet = ongletSelected($(this));
				$(this).parent().find(".barBtn").css("backgroundColor","#cccccc");
				$(this).find(".barBtn").css("backgroundColor","rgb(0,153,255)");
			});
			// Sortie
			$(".blockBtn").on("mouseleave",function(){
				$(this).parent().find(".barBtn").css("backgroundColor","#cccccc");
				$(this).parent().find(".barBtn").eq(onglet).css("backgroundColor","rgb(0,153,255)");
			});

			// click
			$(".blockBtn").on("mousedown",function(){
				onglet = ongletSelected($(this));
				$(this).find(".barBtn").css("backgroundColor","rgb(0,153,255)");
				$(this).find(".btn").css("textShadow","0 0 2px #000");
			});

			$(".blockBtn").on("mouseup",function(){
				$(this).find(".btn").css("textShadow","0 0 0 #000");
			});



		// LINKS ET INFOS
			$(".link").each(function(){
				//div
					var div=document.createElement('div');
					$(div).addClass('blockLink');
					$(div).css("display","block");
					var ico = $(document.createElement('div'));
					ico.css("display","inline-block");
				//image
					if($(this).attr("class")!="link"){
						var typeico = $(this).attr("class").replace(/link /g, '');
						eval("var coord = (json."+typeico+");");
						var bgPos = (-coord[1]*32)+"px "+(-coord[0]*32)+"px";
						ico.css({ 	position : "absolute", 
									top: "0",
									left: "0",
									width : "32px", 
									height: "32px", 
									marginRight: "5px",
									backgroundImage: "url(../../images/tileset32.png)", 
									backgroundPosition : bgPos
								});
						
					}
					$(div).append(ico);
				// btn
					var input = $(this).clone();
					$(div).append(input);

					$(this).replaceWith($(div));
				
				
			});			




		//});

	});



	// Affichage des onglets en fonction du menu appuyé
	$(".menu").on("click",".blockBtn", function(){
		var attrData = ($(this).find(".btn").attr("data-info"));
		
		var classe = $("#onglet"+attrData).attr("class");
		$("."+classe).hide();

		$("#onglet"+attrData).fadeIn("slow");
		$("#onglet"+attrData).find(".blockInput").eq(0).find(".input").focus();
		$("#onglet"+attrData).find(".menu").find(".blockBtn").eq(0).find(".barBtn").css("backgroundColor","rgb(0,153,255)");
	});




// Chargement des images 50px
	var img = new Image();
	$(img).attr("src", "../../images/tileset50.png");

	$(img).on("load",function(){
		//$.getJSON("../../js/tileset.json", function(json){


			 
			$(".act").each(function(){
				//image
					if($(this).attr("class")!="act"){
						var typeico = $(this).attr("class").replace(/act /g, '');
						eval("var coord = (json."+typeico+");");
						var bgPos = (-coord[1]*50)+"px "+(-coord[0]*50)+"px";
						$(this).css({ 	width : "50px", 
										height: "50px", 
										marginRight: "5px",
										backgroundImage: "url(../../images/tileset50.png)", 
										backgroundPosition : bgPos, 
										verticalAlign: "top"
								});
						
					}
				
			});
			





		//});

	});




// Chargement des images 24px
	var img = new Image();
	$(img).attr("src", "../../images/tileset24.png");

	$(img).on("load",function(){
		//$.getJSON("../../js/tileset.json", function(json){


			 
			$(".min").each(function(){
				//image
					if($(this).attr("class")!="min"){
						var typeico = $(this).attr("class").replace(/min /g, '');
						eval("var coord = (json."+typeico+");");
						var bgPos = (-coord[1]*24)+"px "+(-coord[0]*24)+"px";
						$(this).css({ 	width : "24px", 
										height: "24px", 
										/*marginRight: "5px",*/
										backgroundImage: "url(../../images/tileset24.png)", 
										backgroundPosition : bgPos, 
										verticalAlign: "middle"
								});
						$(this).attr("title", $(this).html());
						$(this).empty();
					}
				
			});
			





		//});

	});


// Chargement des images 24px en blanc
	var img = new Image();
	$(img).attr("src", "../../images/tileset24B.png");

	$(img).on("load",function(){
		//$.getJSON("../../js/tileset.json", function(json){


			 
			$(".minB").each(function(){
				//image
					if($(this).attr("class")!="minB"){
						var typeico = $(this).attr("class").replace(/minB /g, '');
						eval("var coord = (json."+typeico+");");
						var bgPos = (-coord[1]*24)+"px "+(-coord[0]*24)+"px";
						$(this).css({ 	width : "24px", 
										height: "24px", 
										/*marginRight: "5px",*/
										backgroundImage: "url(../../images/tileset24B.png)", 
										backgroundPosition : bgPos, 
										verticalAlign: "middle"
								});
						$(this).attr("title", $(this).html());
						$(this).empty();
					}
				
			});
			





		//});

	});


// EFFACER MESSAGES D'ERREUR
$("body > header").on("click",".error", function(){
	$(this).fadeOut("slow").remove();
});








// Range creat units (formulaires abus / bug)
	$("#horaireForm > div").on("change",".range", function(){
		$(this).parent().find(".range").val($(this).val());
		var heure = ($("#heure2").val()<10) ? "0"+($("#heure2").val()) : $("#heure2").val();
		var minute = ($("#minute2").val()<10) ? "0"+($("#minute2").val()) : $("#minute2").val();

		$("#resultHoraire").find("span").eq(0).text(heure);
		$("#resultHoraire").find("span").eq(1).text(minute);

	});

	if(typeof $.datepicker != "undefined") {
		$.datepicker.regional['fr'] = {
		    closeText: 'Fermer',
		    prevText: 'Précédent',
		    nextText: 'Suivant',
		    currentText: 'Aujourd\'hui',
		    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
		    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
		    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		    dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
		    dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		    weekHeader: 'Sem.',
		    dateFormat: 'dd/mm/yy',
		    firstDay: 1,
		    isRTL: false,
		    showMonthAfterYear: false,
		    yearSuffix: ''
		};
		$.datepicker.setDefaults($.datepicker.regional['fr']);

		$( "#datepicker" ).datepicker();
	}


// IMAGES PROFIL
$('#avatar-file #avatar').on('change', function(){
	var preview = new FileReader();
	preview.readAsDataURL(this.files[0]);
	console.log(this.files[0]);
	preview.onload = function (e){
		$('#blockAvatar img').attr('src', e.target.result);
	}
});



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
	//$('#nivSecu')
	console.log(lvl);
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







});