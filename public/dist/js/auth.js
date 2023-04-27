webpackJsonp([2],{

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(216);


/***/ }),

/***/ 216:
/***/ (function(module, exports) {

var config = {
    "domain": "incred-repo.us.auth0.com",
    "clientId": "HQXoLp3reQJ4bG8xJhIPRssTzP9H5V9z",
    "cacheLocation": "localstorage"
};

var auth0 = null;
createOverlay();
displayOverlay();
setTimeout(function () {
    auth0 = new Auth0Client({
        domain: config.domain,
        client_id: config.clientId,
        cacheLocation: config.cacheLocation
    });

    var queryParams = getUrlVars();
    if (queryParams.length) {
        if (queryParams.includes('code') && queryParams.includes('state')) {
            auth0.handleRedirectCallback().then(function (res) {
                window.history.replaceState({}, document.title, "/");
                removeOverlay();
                window.reload();
            }, function (err) {
                console.error(err);
            });
        } else if (queryParams.includes('error')) {
            if (queryParams['error'] === 'unauthorized') {
                localStorage.clear();
                checkSession();
            }
        } else {
            checkSession();
        }
    } else {
        checkSession();
    }
}, 0);

function getUrlVars() {
    var vars = [],
        hash;
    if (window.location.href.indexOf('?') != -1) {
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
    }
    return vars;
}

function checkSession() {
    auth0.isAuthenticated().then(function (res) {
        if (!res) {
            login();
        } else {
            removeOverlay();
        }
    });
}

function login() {
    auth0.loginWithRedirect({
        redirect_uri: window.location.origin,
        prompt: 'login'
    });
}

function createOverlay() {
    var div = document.createElement('div');
    div.style = "width: 100vw; height: 100vh; position: fixed; top: 0; bottom:0; right:0; left: 0; background: rgba(0,0,0,0.9);z-index:99999";
    document.getElementById('auth-loader').appendChild(div);
}

function removeOverlay() {
    var x = document.getElementById("auth-loader");
    x.style.display = "none";
}

function displayOverlay() {
    var x = document.getElementById("auth-loader");
    x.style.display = "block";
}

/***/ })

},[215]);