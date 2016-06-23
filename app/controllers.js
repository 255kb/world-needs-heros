'use strict';

angular.module('wnh.controllers', [])
    .controller('PostCtrl', ['$scope', '$mdDialog', 'Auth', '$firebaseObject', 'Database', function ($scope, $mdDialog, Auth, $firebaseObject, Database) {


        /*$scope.showLoginDialog = function (event) {
         $mdDialog.show({
         controller: function DialogController($scope, $mdDialog, $firebaseAuth) {
         $scope.hide = function () {
         $mdDialog.hide();
         };
         $scope.login = function () {
         Auth.$signInAnonymously().then(function () {
         $mdDialog.hide();
         }).catch(function (error) {
         //TODO display error
         $scope.error = error;
         });
         };
         },
         templateUrl: 'loginDialog.html',
         parent: angular.element(document.body),
         targetEvent: event,
         clickOutsideToClose: true
         })
         .then(function (answer) {
         $scope.status = 'You said the information was "' + answer + '".';
         }, function () {
         $scope.status = 'You cancelled the dialog.';
         });
         };*/

        /*$scope.post = function () {
         if (Auth.getUser() && $scope.videoLink) {
         var videoId = $scope.videoLink.match();

         Database.newPost({youtubeId: videoId});
         } else {
         $scope.showLoginPopup();
         }
         };*/
    }])

    .controller('ToolbarCtrl', ['$scope', '$mdDialog', 'Auth', 'Database', function ($scope, $mdDialog, Auth, Database) {
        var showLoginDialog = function (event) {
            $mdDialog.show({
                controller: function DialogController($scope, $mdDialog, Auth, Database) {
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };

                    $scope.login = function (providerName) {
                        Auth.providerLogin(providerName).then(function (result) {
                            $mdDialog.hide();
                            Database.getProfile(result.user.uid).then(function (userProfile) {
                                var profile = userProfile.val();
                                if (!profile || (profile && !profile.onboarding)) {
                                    showOnboardingDialog();
                                }
                            });
                        }).catch(function (error) {
                            //TODO show error
                            /*// Handle Errors here.
                             var errorCode = error.code;
                             var errorMessage = error.message;
                             // The email of the user's account used.
                             var email = error.email;
                             // The firebase.auth.AuthCredential type that was used.
                             var credential = error.credential;
                             // ...*/
                        });
                    };
                },
                templateUrl: 'loginDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    //dialog validated
                }, function () {
                    //dialog cancelled
                });
        };

        var showOnboardingDialog = function (event) {
            $mdDialog.show({
                controller: function DialogController($scope, $mdDialog, Database) {
                    $scope.onboard = function () {
                        Database.saveProfile({
                            name: $scope.onboarding.displayName,
                            battletag: $scope.onboarding.battleTag,
                            picture: '',
                            onboarding: true
                        });
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'onboardingDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: false
            })
                .then(function (answer) {
                    //dialog validated
                }, function () {
                    //dialog cancelled
                });
        };


        $scope.showPostDialog = function (event) {
            if (Auth.getUser()) {
                $mdDialog.show({
                    controller: function DialogController($scope, $mdDialog) {
                        $scope.heroesList = [
                            {id: 'multi', name: 'Multiple heroes'},
                            {id: 'genji', name: 'Genji'},
                            {id: 'mccree', name: 'Mccree'},
                            {id: 'pharah', name: 'Pharah'},
                            {id: 'reaper', name: 'Reaper'},
                            {id: 'soldier76', name: 'Soldier: 76'},
                            {id: 'tracer', name: 'Tracer'},
                            {id: 'bastion', name: 'Bastion'},
                            {id: 'hanzo', name: 'Hanzo'},
                            {id: 'junkrat', name: 'Junkrat'},
                            {id: 'mei', name: 'Mei'},
                            {id: 'torbjorn', name: 'Torbjörn'},
                            {id: 'widowmaker', name: 'Widowmaker'},
                            {id: 'dva', name: 'D.VA'},
                            {id: 'reinhardt', name: 'Reinhardt'},
                            {id: 'roadhog', name: 'Roadhog'},
                            {id: 'winston', name: 'Winston'},
                            {id: 'zarya', name: 'Zarya'},
                            {id: 'lucio', name: 'Lúcio'},
                            {id: 'mercy', name: 'Mercy'},
                            {id: 'symmetra', name: 'Symmetra'},
                            {id: 'zenyatta', name: 'Zenyatta'}
                        ];

                        $scope.post = function () {
                            if ($scope.newPost.videoLink && $scope.newPost.hero) {
                                var regex = $scope.newPost.videoLink.match(/(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/i), videoId = null;
                                if (regex && regex[1].length === 11) {
                                    videoId = regex[1];
                                } else if ($scope.newPost.videoLink.length === 11) {
                                    videoId = $scope.newPost.videoLink;
                                }

                                if (videoId) {
                                    Database.newPost({youtubeId: videoId, hero: $scope.newPost.hero});
                                } else {
                                    //TODO show error if no valid id
                                }
                            } else {
                                //TODO show error message if empty
                            }
                            $mdDialog.hide();
                        };

                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                    },
                    templateUrl: 'postDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true
                })
                    .then(function (answer) {
                        //dialog validated
                    }, function () {
                        //dialog cancelled
                    });
            } else {
                showLoginDialog();
            }

        };
    }]);