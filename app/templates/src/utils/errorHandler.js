const errorTemplate = `
	<div id="errorView" class="ui error message">
		<i class="close icon"></i>
		<div class="header">网站出现了点问题</div>
		<ul class="list">
		</ul>
		<p class="suggest">
			点击此处 <a href="javascript:window.location.reload();">刷新</a> 页面试试!
		</p>
	</div>`;

var hideTimer;

$(document).ajaxError(function(e, jqXHR, ajaxSettings, thrownError) {
	if(TEST) {
		thrownError = '网络请求错误：<b>' + ajaxSettings.url + '</b> ' + thrownError;
	}
	errorHandler(thrownError);
});


export default function errorHandler(err) {
	if(!err) err = '程序未知错误';
	var errorView = $('#errorView');
	if(!errorView || errorView.length === 0) {
		errorView = $(errorTemplate).appendTo(document.body);
		errorView.on('click', '.close.icon', () => {
			errorView.remove();
			clearTimeout(hideTimer);
		});
	}
	var list = errorView.find('.list');

	var message;
	if(typeof err === 'string') {
		message = err;
	} else if(err instanceof Error) {
		message = err.message;
	} else {
		message = err.toString && err.toString() || err;
	}
	list.append(`<li>${message}</li>`);
	errorView.show();
}

window.errorHandler = errorHandler;
