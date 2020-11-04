export const baseUrl = 'localhost:9080';
export const serverUrl = baseUrl + '/api';
export const secure = false;

export const status = (response: Response) =>
    (response.status >= 200 && response.status < 300) || response.status === 500
        ? Promise.resolve(response)
        : Promise.reject(new Error(response.statusText));

export const json = (response: Response) => response.json();

export const throwErr = (response: any) =>
    response.error ? Promise.reject(new Error(response.error)) : Promise.resolve(response);

export default function api(url: string, body?: any, headers?: Record<string, string>, mainUrl = baseUrl) {
    console.log({ url, headers, body });

    const finalHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
    };

    const securityType = secure ? 'https://' : 'http://';
    const buildedUrl = `${securityType}${mainUrl}${url}`;

    return fetch(buildedUrl, {
        method: 'POST',
        headers: finalHeaders,
        body: JSON.stringify(body) || '{}',
    })
        .then(status)
        .then(json)
        .then(throwErr);
}
