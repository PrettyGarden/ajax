window.onload = function () {

	//用户登陆
	mv.app.login();

};

	var mv = {};

	mv.app = {};

	//用户登陆
	mv.app.login = function () {
		var oUser = document.getElementById('login_user');
		var oPword = document.getElementById('login_password');
		var oSubmit = document.getElementById('login_submit');

		var oTab = document.getElementById('login_tab');
		
		var oPwordHint = oTab.tBodies[0].rows[3].cells[1];
		
		oSubmit.onclick = fn;

		document.onkeydown = function (e) {
			var e = e || event;
			if ( e.keyCode == 13 ) {
				 
				fn(); 
			} 		
		};		

		function fn () {
			ajax( 'get', '../weibo/index.php', 'm=index&a=login&username=' + oUser.value + '&password=' + oPword.value, function (data) {
			
				var d = JSON.parse( data );

				if ( d.code !== 1 ) {
					window.location.href = '../index.html';
				} else {
					oPwordHint.innerHTML = d.message;
				}

			});
		};



	};