var app = angular.module('user_details', ["ngMessages"]);
app.controller('user_data', function ($scope, $http, $window) {
    $scope.add_user = function () {
        var data = {
            full_name: $scope.full_name,
            username: $scope.Username,
            email_id: $scope.userEmail,
            phone_number: $scope.phone_number,
            password: $scope.inputPassword,
        }
        //console.log(data);

        $http.post('http://localhost:3017/register_user', data).then(function (res, err) {
            if (err) {
                console.log("err")
            }
            else if (res.data == 'User already exists with same username') {
                alert("User already exists with same username")
            }
            else {
                alert("User Registered")
            }
        })
    }

    $scope.login_user = function () {
        var data = {
            username: $scope.Username,
            password: $scope.password,
        }
        $http.post('http://localhost:3017/register_user/auth', data).then(function (res, err) {
            if (err) {
                console.log(err)
            }
            else if (res.data == "user found") {
                $window.location = "http://localhost/User_registration/user_list.html"
            }
            else {
                alert("Invalid User")
            }
        })
    }

    $http.get('http://localhost:3017/create_contact/getusers').then(function (res) {
        $scope.user_details = res.data;
    })

    $scope.create_contact = function()
    {
        $window.location = "http://localhost/User_registration/create_contact.html"
    }

    $scope.contact_list = function()
    {
        $window.location = "http://localhost/User_registration/user_list.html"
    }

    $scope.logout = function()
    {
        $window.location = "http://localhost/User_registration/user_login.html"
    }

    $scope.sign_up = function()
    {
        $window.location = "http://localhost/User_registration/user_registration.html"
    }

    $scope.save_contact = function()
    {
        var data = {
            name: $scope.name,
            nickname: $scope.nickname,
            city: $scope.city,
            phone_number: $scope.phone_number,
            email_id: $scope.email_id
        }

        $http.post('http://localhost:3017/create_contact', data).then(function (res, err) {
            alert(res.data)
        })
    }
})