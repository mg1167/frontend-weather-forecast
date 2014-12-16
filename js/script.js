$(document).ready(function(){
	$(".boton").click(function(){
		var tempType = ($('input[name="temp"]:checked').val());
		var pais = $("input[name=pais]").val();
		var depto = $("input[name=depto]").val();
		if (depto.length!=0 && pais.length!=0){
			jQuery(document).ready(function($) { 
				var codPais = "";
				$.ajax({ 
					url : "paises.json", dataType : "json",
					success : function(parsed_json) {
						for (var i = 0; i <= 242; i++) { //recorrido del JSON
							if (((parsed_json[i]["name"]).toLowerCase()) == pais.toLowerCase()){
								codPais = parsed_json[i]["code"];
							};
						};
						//Codigo departamento

						if (codPais.length==0) { //error si no encontro el codigo para el pais ingresado
							alert("País no existente, por favor intente nuevamente.");
						}else{
							var direccion = "http://api.wunderground.com/api/982477ef024a148c/conditions/q/"+codPais+"/"+depto+".json";
							$(document).ready(function(){
								jQuery(document).ready(function($) { 
									$.ajax({ url : direccion, dataType : "jsonp",
										success : function(parsed_json2) {
											if(parsed_json2["current_observation"]){ //Verificar llave existente
												var location = parsed_json2['current_observation']['display_location']['full']; 
												var lastUpdate = parsed_json2['current_observation']['observation_time']; 
												var actualTemp;
												if (tempType==="Fahrenheit"){
													actualTemp = parsed_json2['current_observation']['temp_f']; 
													actualTemp = actualTemp + "F";
												}else{
													actualTemp = parsed_json2['current_observation']['temp_c']; 
													actualTemp = actualTemp + "C";
												}
												var weather = parsed_json2['current_observation']['weather']; 
												var weatherImg = parsed_json2['current_observation']['icon_url']; 
												$(".resultParagraph").empty();
												$(".resultParagraph").append("<div class=\"hola\"><p>La temperatura en: " + location + " is: " + actualTemp +"</p><p>Weather: "+ weather + "</p><p><img src=\""+weatherImg+"\"></p>" + "<p>"+ lastUpdate+"</p></div>");
											}else{//si no la posee:
												alert("Ciudad no existente o base de datos inexistente.");
											}
										}
									});
								});
							});
						};
					}
				});
			});
			$("input[type=\"text\"]").val("");
		}else if (depto.length==0 && pais.length==0){
			alert("¡Escribe un respectivo País y su Ciudad!");
		}else if(depto.length==0){
			alert("Por favor, ingese ciudad.");
		}else if(pais.length==0){
			alert("Por favor ingrese país.");
		}
		
	});
});