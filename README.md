# duplicate_update
To duplicate without creating new reocrd

Steps:
1. Clone and install
2. Override 'copy' method of the required model like 
    
    @api.multi
    @api.returns(None, lambda vals: {'value': vals})
    def copy(self, default=None):
        self.ensure_one()
        vals = self.copy_data(default)[0]
        return vals
        

You can also override the copy method of Model class to make it default for all the models present.
Thats it :)
