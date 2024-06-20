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

function generatePaths(basePath: string, count: number): string[] {
    const paths: string[] = [];
    for (let i = 1; i <= count; i++) {
        paths.push(`${basePath}/path${i}`);
    }
    return paths;
}

function setCookieWithPaths(paths: string[]){
    paths.forEach(path => {
        setCookie('testCookie', 'testValue', domain, path, new Date('2024-12-31'), false, true);
    });
}

// Example usage:
const domain = window.location.hostname;
const basePath = window.location.pathname;
const numberOfPaths = 100;
const paths = generatePaths(basePath, numberOfPaths);

setCookieWithPaths(paths);
document.body.innerHTML = `<h1>Cookie set with ${numberOfPaths} paths. Check the console for details.</h1>`;