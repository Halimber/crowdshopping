var registro = function(){
	// Valida el formulario
	if(validateFrmRegistro()){
		var frm = document.getElementById('frmCliente');
		frm.submit();
	}
}

var validateFrmRegistro = function(){
	var correo = document.getElementById('correo');
	var nombres = document.getElementById('nombres');
	var apellidos = document.getElementById('apellidos');
	var html = '';
	removeClass(correo,'error');
	removeClass(nombres,'error');
	removeClass(apellidos,'error');
	if(correo.value.length<3){
		html += '<li>El correo debe ser mayor a 3 caracteres<br></li>';
		addClass(correo,'error');
	}
	if(!checkEmail(correo)){
		html += '<li>Ingrese un correo válido<br></li>';
		addClass(correo,'error');
	}
	if(nombres.value.length<3){
		html += '<li>El nombres debe ser mayor a 3 caracteres<br></li>';
		addClass(nombres,'error');
	}
	if(apellidos.value.length<3){
		html += '<li>Los apellidos deben ser mayor a 3 caracteres<br></li>';
		addClass(apellidos,'error');
	}
	if(html==''){
		return true;
	} else {
		var ulErrores = document.getElementsByClassName('ulErrores');
		ulErrores[0].innerHTML = html;
		return false;
	}
}

var aClick = function(tipo){
	var btnNuevo = document.getElementById('btnNuevo');
	var btnVer = document.getElementById('btnVer');
	if(tipo=='nuevo'){
		var toShow =  document.getElementById('divNuevo');
		var toHide =  document.getElementById('divVer');
		addClass(btnNuevo,'btnSelected');
		removeClass(btnVer,'btnSelected');
	}
	if(tipo=='ver'){
		var toShow =  document.getElementById('divVer');
		var toHide =  document.getElementById('divNuevo');
		addClass(btnVer,'btnSelected');
		removeClass(btnNuevo,'btnSelected');
	}
	toShow.style.display = "block";
	toHide.style.display = "none";
}

var getClientes = function(){
	var xmlhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
               var data = JSON.parse(xmlhttp.responseText);
                var r = '';
				for (var i=0; i<data.length; i++){
				    r+='<tr><td>';
				    r+= data[i]['correo'];
				    r+= '</td><td class="whatever1">';
				    r+= data[i]['nombres'];
				    r+= '</td><td class="whatever2">';
				    r+= data[i]['apellidos'];
				    r+= '</td><td class="whatever3">';
				    r+= data[i]['telefono'];
				    r+= '</td><td class="whatever3">';
				    r+= '<img src="/img/erase.png" class="img-icon"/>';
				    r+= '</td></tr>';
				 }
				 var bodyVer = document.getElementById('bodyVer');
				 bodyVer.innerHTML = r;
           }
           else if(xmlhttp.status == 400) {
              alert('There was an error 400')
           }
           else {
               alert('something else other than 200 was returned')
           }
        }
    }

    xmlhttp.open("GET", "/api/getClientes", true);
    xmlhttp.send();
}

getClientes();