const template = `
    <div class="ui inverted dimmer">
        <div class="ui text loader">Loading</div>
    </div>`;

var showTime = 0;
var isShowing = false;

export function close() {
    setTimeout(() => $(document.body).dimmer('hide'), 500 - (Date.now() - showTime));

}

export function show(options) {
	showTime = Date.now();
	if(isShowing) {
		return;
	}
    $(document.body).dimmer({
        closable: false,
        template: {
            dimmer: function() {
                return template;
            }
        }
    }).dimmer('show');
}
