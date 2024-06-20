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
function generateDomains(baseDomain, count) {
    var domains = [];
    for (var i = 1; i <= count; i++) {
        domains.push("".concat(i, ".").concat(baseDomain));
    }
    return domains;
}
function setCookieWithDomains(domains) {
    var dayInMs = 1000 * 60 * 60 * 24;
    domains.forEach(function (domain) {
        setCookie('testCookie', 'testValue', domain, "/", new Date(Date.now() + dayInMs), false, true);
    });
}
// Example usage:
var baseDomain = window.location.hostname.split('.').slice(-2).join('.');
var numberOfDomains = 100;
var domains = generateDomains(baseDomain, numberOfDomains);
setCookieWithDomains(domains);
document.body.innerHTML = "<h1>Cookie set with ".concat(numberOfDomains, " sub-domains. Check the console for details.</h1>");
