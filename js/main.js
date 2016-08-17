window.onload = function () {
	mv.app.update();
	mv.app.logout();
	mv.app.published();
	mv.app.showmore();

};

	var mv = {};


//mv.tools
	mv.tools = {};

	mv.tools.getByClass = function ( parent, cName ) {

		var aEle = parent.getElementsByTagName( '*' );
		var arr1 = [];
		for ( var i=0; i<aEle.length; i++ ) {
			if ( aEle[i].className == cName ) {
				arr1.push( aEle[i] );
			}
		}
		return arr1;
	};

	mv.tools.getCookie = function ( key ) {
		var arr1 = document.cookie.split('; ');
		for ( var i=0; i<arr1.length; i++ ) {
			var arr2 = arr1[i].split('=');
			if ( arr2[0] == key ) {
				return arr2[1];
			}
		}
	};

//mv.ui
	mv.ui = {};

	mv.ui.createPublished = function ( data ) {
		var oDiv = document.createElement('div');
		oDiv.className = 'published clear';

		var oH3 = document.createElement('h3');
		oH3.innerHTML = data.username;

		var oText = document.createElement('div');
		oText.innerHTML = data.content;

		var oA = document.createElement('a');
		oA.href = 'javascript:;';
		oA.innerHTML = '赞：';

		var oSpan = document.createElement('span');
		oSpan.innerHTML = data.support;

		oA.appendChild( oSpan );

		oDiv.appendChild( oH3 );
		oDiv.appendChild( oText );
		oDiv.appendChild( oA );

		var oBox = document.getElementById('published_wrap');

		if ( oBox.children[0] ) {
			oBox.insertBefore( oDiv, oBox.children[0] );
		} else {
			oBox.appendChild( oDiv );
		}
	};

	mv.ui.showList = function ( iPage ) {
	

		var oDiv = document.getElementById('noword');

		var oShowmore = document.getElementById('showmore');
		
		ajax( 'get', 'weibo/index.php', 'm=index&a=getList&n=3&page=' + iPage, function ( data ) {

			var d = JSON.parse( data );

			var m = d.data;

			if ( m ) {
				for ( var i=0; i<m.list.length; i++ ) {
					mv.ui.createPublished( m.list[i] );
				}
			} else {
				if ( iPage == 1 ) {
					oDiv.style.display = 'block';
				}
				oShowmore.style.display = 'none';
			}			
		} );
	};

//mv.app
	mv.app = {};

	//留言
	mv.app.published = function () {

		var oDiv = document.getElementById('main');
		var oText = oDiv.getElementsByTagName('textarea')[0];
		var oBtn = oDiv.getElementsByTagName('input')[0];
		var oNowore = document.getElementById('noword');

			oBtn.onclick = function () {

				oBtn.style.outline = 'none';

				if ( !oText.value =='' ) {
					ajax( 'post', 'weibo/index.php', 'm=index&a=send&content=' + encodeURI(oText.value), function (data) {

						var d = JSON.parse( data );					
						if ( !d.code ) {
							mv.ui.createPublished( d.data );
							oText.value = '';
							oNowore.style.display = 'none';
						} else {
							alert(d.message);
						}
					} )					
				} else {
					alert('内容不能为空！');
				};
			};			

	};

	//初始化
	mv.app.update = function () {

		var oPass = mv.tools.getByClass ( document, 'top_wrap_pass' )[0];
		//alert(oPass);
		var oUser = mv.tools.getByClass ( document, 'top_wrap_user' )[0];

		var oUserName = document.getElementById('userName');

		var uid = mv.tools.getCookie ('uid');
		var username = mv.tools.getCookie ('username');

		if ( uid ) {
			oPass.style.display = 'none';
			oUser.style.display = 'block';
			//alert(usernamme);
			oUserName.innerHTML = decodeURIComponent(username);
		} else {
			oPass.style.display = 'block';
			oUser.style.display = 'none';
		}

		var iPage = 1;
		mv.ui.showList( iPage );
	};

	//退出
	mv.app.logout = function () {

		var oLogout = document.getElementById('logout');

		//alert(oLogout);

		oLogout.onclick = function () {

			ajax ( 'get', 'weibo/index.php', 'm=index&a=logout', function ( data ) {

				var d = JSON.parse( data );

				if ( !d.code ) {
					alert('退出成功！');
					mv.app.update();
				}

			} )

			return false;

		};
	};

	//点击显示更多
	mv.app.showmore = function () {

		var oShowmore = document.getElementById('showmore');
		var iPage = 1;

		oShowmore.onclick = function () {

			
			iPage++;

			mv.ui.showList( iPage );
		}

	}




