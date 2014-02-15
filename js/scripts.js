
$(function(){
    var socket = io.connect();
	var lastCmd = "Stop"; //default

    //sending command to server
	function sendToServer( name, power){
		socket.json.emit('emit_from_client', {
			name: name,
			power: power,
		});
		console.log(name + ": power:" + power);
	}

	//length data from server
	socket.on('emit_from_server', function(data){
		//console.log("length : " + data);
		$('#distance').val(data);
	});

	//power data from server 
	socket.on('emit_from_server_pw', function(data){
		console.log("from_server power : " + data);
		var power = JSON.parse(data).power;
		$("#slider").slider("value",power)
        //$('#defaultSlider').val(power);
        $('#slideValue').val(power);
	});

    $('#go').click(function(){
		sendToServer($('#go').text(), $('#slideValue').val());
		lastCmd = $('#go').text();
    });
    $('#left').click(function(){
		sendToServer($('#left').text(), $('#slideValue').val());
		lastCmd = $('#left').text();
    });
    $('#right').click(function(){
		sendToServer($('#right').text(), $('#slideValue').val());
		lastCmd = $('#right').text();
    });
    $('#back').click(function(){
		sendToServer($('#back').text(), $('#slideValue').val());
		lastCmd = $('#back').text();
    });
    $('#stop').click(function(){
		sendToServer($('#stop').text(), $('#slideValue').val());
		lastCmd = $('#stop').text();
    });

	
	//slider
	$("#slider").slider({
		range: "max",
		min: 0,
		max: 244,
		value: 150,

		//default
		create: function( event, ui ) {
        	$('#slideValue').val(150);
			console.log("create val : " + 150);
		},
		//change slider
		slide: function( event, ui ) {
			console.log("slider val : " + ui.value);
        	$('#slideValue').val(ui.value);
			socket.emit('emit_from_client_pw', {power : ui.value});
		},
		//slider change done
		stop: function( event, ui ) {
			console.log("stop val : " + ui.value);
			sendToServer(lastCmd, $('#slideValue').val());
		}
	});

	//change input field
    $('#slideValue').change( function () {
		$("#slider").slider("value",this.value)
		socket.emit('emit_from_client_pw', {power : this.value});
    });

/***
	//change slider
    $('#defaultSlider').change(function(){
        $('#slideValue').val(this.value);
		socket.emit('emit_from_client_pw', {power : this.value});
    });
***/

});

function clickButton(go){
    //var val = document.getElementById("slideValue").value;
    //console.log(go + ": power:" + val);
}
