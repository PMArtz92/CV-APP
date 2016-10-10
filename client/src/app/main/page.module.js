(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('app.pages', [
            'app.pages.cvUpload',
            'app.pages.cvView',
            'app.pages.login',
            'app.pages.register',
            'app.sample',
            'app.authService',
            'app.test'
        ]);
})();
