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
function generatePaths(basePath, count) {
    var paths = [];
    for (var i = 1; i <= count; i++) {
        paths.push("".concat(basePath, "/path").concat(i));
    }
    return paths;
}
function setCookieWithPaths(paths) {
    paths.forEach(function (path) {
        setCookie('testCookie', 'testValue', domain, path, new Date('2024-12-31'), false, true);
    });
}
// Example usage:
var domain = window.location.hostname;
var basePath = window.location.pathname;
var numberOfPaths = 100;
var paths = generatePaths(basePath, numberOfPaths);
setCookieWithPaths(paths);
document.body.innerHTML = "<h1>Cookie set with ".concat(numberOfPaths, " paths. Check the console for details.</h1>");
