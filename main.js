function setCookie(name, value, domain, path, expires, httpOnly, secure) {
    var cookieString = "".concat(name, "=").concat(value, "; Domain=").concat(domain, "; Path=").concat(path, ";");
    if (expires) {
        cookieString += " Expires=".concat(expires.toUTCString(), ";");
    }
    if (httpOnly) {
        cookieString += ' HttpOnly;';
    }
    if (secure) {
        cookieString += ' Secure;';
    }
    document.cookie = cookieString;
}
function generateNetworkTraffic(paths) {
    paths.forEach(function (path) {
        fetch(path)
            .then(function (response) { return console.log("Request to ".concat(path, " completed with status: ").concat(response.status)); })
            .catch(function (error) { return console.error("Request to ".concat(path, " failed: ").concat(error)); });
    });
}
function generatePaths(basePath, count) {
    var paths = [];
    for (var i = 1; i <= count; i++) {
        paths.push("".concat(basePath, "/path").concat(i));
    }
    return paths;
}
// Example usage:
var domain = window.location.hostname;
var basePath = window.location.pathname;
var numberOfPaths = 100;
var paths = generatePaths(basePath, numberOfPaths);
setCookie('testCookie', 'testValue', domain, basePath, new Date('2024-12-31'), false, true);
generateNetworkTraffic(paths);
document.body.innerHTML = "<h1>Network traffic generated. Fetched ".concat(numberOfPaths, " paths. Check the console for details.</h1>");
