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
// const baseDomain = window.location.hostname.split('.').slice(-2).join('.');
// const numberOfDomains = 100;
// const domains = generateDomains(baseDomain, numberOfDomains);

// setCookieWithDomains(domains);
// document.body.innerHTML = `<h1>Cookie set with ${numberOfDomains} sub-domains.<br>${domains.join("<br>")}</h1>`;

const authKey = "1JXAsN7KIBRJhI2pr6eQ8J";

async function makeHttpRequests(url: string, queryParamsList: string[]): Promise<void> {
    const requests = queryParamsList.map(param => {
        const requestUrl = `${url}?${param}&kitchenSinkAuth=${authKey}`;
        return fetch(requestUrl, {mode: 'no-cors'})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });
    });

    try {
        const responses = await Promise.all(requests);
        responses.forEach((response, index) => {
            console.log(`Response from request ${index + 1}:`, response);
        });
    } catch (error) {
        console.error('Error making HTTP requests:', error);
    }
}

// Example usage:
const url = 'https://kitchensinkstaging.tech/consoleLogs';
const queryParamsList: string[] = []
const queryAmount = 100;
for(let i = 0; i < queryAmount; i++) {
    queryParamsList.push(`infoLogsCount=${i + 1}`);
}

setCookie('testCookie', 'testValue', 'kitchensinkstaging.tech', '/', new Date(Date.now() + 1000 * 60 * 60 * 24), false, true);

makeHttpRequests(url, queryParamsList);