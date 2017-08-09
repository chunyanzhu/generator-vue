const dimmerTemplate = `
    <div class="ui inverted dimmer">
        <div class="ui text loader">Loading</div>
    </div>`;

export default {

	methods: {

		dimmer(params) {
			$(params && params.el || this.$el).dimmer({
		        closable: false,
		        template: {
		            dimmer: function() {
		                return dimmerTemplate;
		            }
		        }
		    }).dimmer('show');
		},

		undimmer(params) {
			$(params && params.el || this.$el).dimmer('hide');
		}

	}

}
