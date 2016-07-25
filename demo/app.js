/* global angular */

function Config() {
	
}

Run.$inject = ['$rootScope', '$q'];

function Run($rootScope, $q) {
	$rootScope.vm = new TestController($q);
}

function TestController($q) {
    
    this.contacts = [
        { contactId: 1, name: "Thomas" },
        { contactId: 1, name: "Nancy" },
        { contactId: 1, name: "Bill" },
        { contactId: 1, name: "Bob" },
        { contactId: 1, name: "Janice" },
        { contactId: 1, name: "Katrina" }
    ];
    
	this.searchContacts = function(text) {
        var contacts = this.contacts;
        return $q(function(resolve, reject) {
            setTimeout(function() {
                resolve(contacts);
            }, 1000);
                  
        });
    }
}

angular.module("demo", ["ngTypeahead"])
	.config(Config)
	.run(Run);