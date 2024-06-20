function setCookie(name: string, value: string, domain: string, path: string, expires?: Date, httpOnly?: boolean, secure?: boolean): void {
    let cookieString = `${name}=${value}; Domain=${domain}; Path=${path};`;
    
    if (expires) {
        cookieString += ` Expires=${expires.toUTCString()};`;
    }
    if (httpOnly) {
        cookieString += ' HttpOnly;';
    }
    if (secure) {
        cookieString += ' Secure;';
    }

    document.cookie = cookieString;
}

function generateDomains(baseDomain: string, count: number): string[] {
    const domains: string[] = [];
    for (let i = 1; i <= count; i++) {
        domains.push(`${i}.${baseDomain}`);
    }
    return domains;
}

function setCookieWithDomains(domains: string[]){
    const dayInMs = 1000 * 60 * 60 * 24;
    domains.forEach(domain => {
        setCookie('testCookie', 'testValue', domain, "/", new Date(Date.now() + dayInMs), false, true);
    });
}

// Example usage:
const baseDomain = window.location.hostname.split('.').slice(-2).join('.');
const numberOfDomains = 100;
const domains = generateDomains(baseDomain, numberOfDomains);

setCookieWithDomains(domains);
document.body.innerHTML = `<h1>Cookie set with ${numberOfDomains} sub-domains.<br>${domains.join("<br>")}</h1>`;