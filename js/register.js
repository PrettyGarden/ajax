window.onload = function () {

	//用户注册
	mv.app.register();

};

	var mv = {};

	mv.app = {};

	//用户注册
	mv.app.register = function () {
		var oUser = document.getElementById('register_user');
		var oPword = document.getElementById('register_password');
		var oSubmit = document.getElementById('register_submit');

		var oTab = document.getElementById('register_tab');

		var oUserHint = oTab.tBodies[0].rows[1].cells[1];
		var oPwordHint = oTab.tBodies[0].rows[3].cells[1];

		//验证用户名
		oUser.onblur = function () {
			ajax( 'get', '../weibo/index.php', 'm=index&a=verifyUserName&username=' + this.value, function (data) {
				
				var d = JSON.parse( data );				
				
				if ( oUser.value ) {
					oUserHint.innerHTML = d.message;
					if ( d.code ) {
						oUserHint.style.color = 'red';
					} else {
						oUserHint.style.color = 'green';
					}
				}			
			} )
		};
		//验证密码
		oPword.onblur = function () {
			if ( oPword.value ) {
				var rePassWord = new RegExp('^[a-zA-Z0-9]{6,12}$');

				if ( !rePassWord.test( oPword.value ) ) {
					oPwordHint.innerHTML = '密码长度为6至12位的字母或数字的组合!';
					oPwordHint.style.color = 'red';
				} else {
					oPwordHint.innerHTML = '';
				}
			} else {
				oPwordHint.innerHTML = '';
			}
		};	

		//确认注册
		oSubmit.onclick = function (){
			ajax( 'post', '../weibo/index.php', 'm=index&a=reg&username=' + encodeURI(oUser.value) + '&password=' + oPword.value, function(data) {
				var d = JSON.parse( data );				
				alert(d.message);
				if ( d.code == 0 ) {
					window.location.href = '../index.html';
				}
			})
		};



	};