var login = function(){
	if(validateFrmLogin()){
		var frmLogin = document.getElementById('frmLogin');
		frmLogin.submit();
	}
}

var registro = function(){
	if(validateFrmRegistro()){
		var frmRegistro = document.getElementById('frmRegistro');
		frmRegistro.submit();
	}
}

var aClick = function(tipo){
	var aAcceso = document.getElementById('aAcceso');
	var aRegistro = document.getElementById('aRegistro');
	if(tipo=='acceso'){
		var toShow =  document.getElementById('divAcceso');
		var toHide =  document.getElementById('divRegistro');
		addClass(aAcceso,'selected');
		removeClass(aRegistro,'selected');
	}
	if(tipo=='registro'){
		var toShow =  document.getElementById('divRegistro');
		var toHide =  document.getElementById('divAcceso');
		addClass(aRegistro,'selected');
		removeClass(aAcceso,'selected');
	}
	toShow.style.display = "block";
	toHide.style.display = "none";
}

var validateFrmRegistro = function(){
	var correo = document.getElementById('correo');
	var password = document.getElementById('password');
	var verifyPassword = document.getElementById('verifyPassword');
	var nombres = document.getElementById('nombres');
	var apellidos = document.getElementById('apellidos');
	var html = '';
	removeClass(correo,'error');
	removeClass(password,'error');
	removeClass(verifyPassword,'error');
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
	if(password.value.length<3){
		html += '<li>El password debe ser mayor a 3 caracteres<br></li>';
		addClass(password,'error');
	}
	if(password.value != verifyPassword.value){
		html += '<li>La segunda contraseña debe coincidir con la primera</li>';
		addClass(verifyPassword,'error');
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
		ulErrores[1].innerHTML = html;
		return false;
	}
}

var validateFrmLogin = function(){
	var aCorreo = document.getElementById('aCorreo');
	var aPassword = document.getElementById('aPassword');
	var html = '';
	removeClass(aCorreo,'error');
	removeClass(aPassword,'error');
	if(aCorreo.value.length<3){
		html += '<li>El correo debe ser mayor a 3 caracteres<br></li>';
		addClass(aCorreo,'error');
	}
	if(!checkEmail(aCorreo)){
		html += '<li>Ingrese un correo válido<br></li>';
		addClass(aCorreo,'error');
	}
	if(aPassword.value.length<3){
		html += '<li>El password debe ser mayor a 3 caracteres<br></li>';
		addClass(aPassword,'error');
	}
	if(html==''){
		return true;
	} else {
		var ulErrores = document.getElementsByClassName('ulErrores');
		ulErrores[0].innerHTML = html;
		return false;
	}
}