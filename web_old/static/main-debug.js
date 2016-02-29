requirejs.config({
    urlArgs: "v=" + (new Date()).getTime(),
    baseUrl: 'static',
    paths: { 
        'text':               'bower_components/text/text',
        'augment':            'bower_components/augment.js/augment',
        'knockout':           'bower_components/knockout/dist/knockout',
        'jquery':             'bower_components/jquery/dist/jquery.min',
        'moment':             'bower_components/moment/min/moment.min'
    },
    shim: {
        'notifyjs': {
            deps: ['jquery']
        }
    },
    packages: [
        {
            name: 'content-panel',
            location: 'components/content-panel'
        }
    ]
});

require(['augment',
         'knockout',
         'content-panel'],  
    function (augment, ko, ContentPanel) {

        // Main App //
        function App() {
            this.loading = ko.observable(true);

            this.component = ko.observable();
            this.component_params = ko.observable();
        }

        App.prototype.start = function() {
            // set default panel
            this.component_params({app:this});
            this.component("content-panel");
        }

        // ---- Main Start ---- //
        // for notify
        window.debug = false;

        // register components
        ko.components.register("content-panel",ContentPanel);

        // build app
        var app = window.app = new App();

        // apply knockout bindings to DOM
        ko.applyBindings(app);

        // ready
        setTimeout( this.app.start.bind(app), 2000 );
    }
);