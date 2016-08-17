function ajax ( method, url, data, fn ) {
	var a = null;
	try {
		a = new XMLHttpRequest();
	} catch (e) {
		a = new ActiveXObject('Microsoft.XMLHTTP');
	}

	if ( method == 'get' && data ) {
		url += '?' + data;
	}

	a.open( method, url, true );

	if ( method == 'get' ) {
		a.send();
	} else {
		a.setRequestHeader('content-type','application/x-www-form-urlencoded');
		a.send( data );
	}

	a.onreadystatechange = function () {

		if ( a.readyState == 4 ) {
			if ( a.status == 200 ) {
				fn && fn( a.responseText )
			} else {
				alert('出错了,Err：' + a.status )
			}
		}
	}

};