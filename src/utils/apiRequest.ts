type ParamsType = Record<string, string | number | string[] | File | null | undefined | boolean>;

type Options = {
    url: string;
    method: string;
    params?: ParamsType;
    headers?: Record<string, string>;
}

export const apiRequest = async({
    url,
    method = "GET",
    params = {},
    headers = {}
}:Options) => {

    const queryParts: string[] = [];

    const fetchOptions: RequestInit = {
        method,
        headers: {...headers}
    }

    if( method === "GET") {
        for (const key in params) {
          const value = params[key];
    
          if (Array.isArray(value)) {
            value.forEach((val) => {
              queryParts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`);
            });
          } else if (value !== undefined && value !== null && !(value instanceof File)) {
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
          }
        }

        if (queryParts.length > 0) {
          url += `?${queryParts.join('&')}`;
        }
    }    else {
        fetchOptions.headers = {
            'Content-Type': 'application/json'
        };
        fetchOptions.body = JSON.stringify(params);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    
    if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Error desconocido');
    }
    
    return data;
}