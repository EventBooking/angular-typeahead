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
        { contactId: 1, name: "Thomas2" },
        { contactId: 1, name: "Nancy" },
        { contactId: 1, name: "Bill" },
        { contactId: 1, name: "Bob" },
        { contactId: 1, name: "Janice" },
        { contactId: 1, name: "Katrina" }
    ];

    this.onBlur = function() {
        console.log('blur');
    }
    
	this.searchContacts = function(text) {
        var contacts = this.contacts.filter( x => x.name.toLowerCase().trim().indexOf(text.toLowerCase().trim()) > -1 );
        console.log(text, contacts.map( x => x.name));
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