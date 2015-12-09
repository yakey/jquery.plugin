(function($){
	$.fn.uploadImg = function(_opt) {
		var opt = {
          action: '',
          params: [],
          onStart: function() {},
          onSuccess: function() {},
          onError: function() {},
          onAbort: function() {},
          onFail: function() {}
        },
        me = $(this),
        formData;
        if(_opt) {
        	$.extend(opt, _opt);
        }
		if(typeof(window.FormData) != "function") {
			alert("您的浏览器不支持HTML5无刷新上传，请使用现代浏览器！");
			return false;
		}
		if(typeof(me[0].files) == "undefined" || typeof(me[0].files[0]) == "undefined") {
			alert("请在file元素上使用");
			return false;
		}
		if(!opt.action) {
			alert("请设置要上传的地址！！");
			return false;
		}

		formData = new FormData();
		formData.append('name', '燕睿涛');
		formData.append('age', 25);
		formData.append('up_file', me[0].files[0]);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', opt.action);

		xhr.onloadstart = function() {
			opt.onStart.apply(me, opt.params);
		}

	    xhr.onerror = function() {
	        opt.onError.apply(me, opt.params);
	        return false;
	    };

	    xhr.onabort = function() {
	    	opt.onAbort.apply(me, opt.params);
	    	return false;
	    };

	    xhr.onreadystatechange = function() {
	        if (xhr.readyState == 4 && xhr.status == 200) {
	            opt.onSuccess.apply(me, JSON.parse(xhr.responseText));
	        } else if (xhr.status != 200) {
	            opt.onFail.apply(me, {'xhrState': xhr.readyState, 'xhrStatus':xhr.status});
	            return false;
	        }
	    };

		xhr.send(formData);
	};
})($);