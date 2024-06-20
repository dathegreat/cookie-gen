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

function generateNetworkTraffic(paths: string[]): void {
    paths.forEach(path => {
        fetch(path)
            .then(response => console.log(`Request to ${path} completed with status: ${response.status}`))
            .catch(error => console.error(`Request to ${path} failed: ${error}`));
    });
}

function generatePaths(basePath: string, count: number): string[] {
    const paths: string[] = [];
    for (let i = 1; i <= count; i++) {
        paths.push(`${basePath}/path${i}`);
    }
    return paths;
}

// Example usage:
const basePath = '/test';
const numberOfPaths = 100;
const paths = generatePaths(basePath, numberOfPaths);

setCookie('testCookie', 'testValue', window.location.hostname, basePath, new Date('2024-12-31'), false, true);
generateNetworkTraffic(paths);
document.body.innerHTML = `<h1>Network traffic generated. Fetched ${numberOfPaths} paths. Check the console for details.</h1>`;