odoo.define('web.InheritFormView', function (require) {
    "use strict";

    var FormView = require('web.FormView');

    FormView.include({
        create_new_form: function(value){
            var self = this;
            var new_values = value['value'];
            this.dataset.index = null;
            this.do_show().then(function(){
                self._internal_set_values(new_values);
            });
        },
        on_button_duplicate: function () {
            var self = this;
            return this.has_been_loaded.then(function() {
                return self.dataset.call('copy', [self.datarecord.id, {}, self.dataset.context]).then(function(response) {
                    if(response.hasOwnProperty('value')){
                        //Expects hash with key 'value' in it.
                        self.create_new_form(response);
                    }else{
                        self.record_created(response);
                        self.to_edit_mode();
                    }
                });
            });
        }
    })
});