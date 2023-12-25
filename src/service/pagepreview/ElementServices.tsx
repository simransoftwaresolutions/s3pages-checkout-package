import ENV from "../../utils/env";

export const GetAllElements = (site:string) => {

    const url = `${ENV.apiRoot}api/elements/of/${site}?limit=500&page=1&sortby=title`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return (data);
        }
    );
}

export const SaveSection = (eleData:any) => {

    const url = `${ENV.apiRoot}api/elements`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(eleData)
    };

    return fetch(url, options)
    .then(response => {
        return response.json();
    })
    .then(async data => {
            console.log(data);
            return (data);
        }
    );
}

export const UpdateSectionApi = (id:string, eleData:any) => {

    const url = `${ENV.apiRoot}api/elements/${id}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(eleData)
    };

    return fetch(url, options)
    .then(response => {
        return response.json();
    })
    .then(async data => {
            console.log(data);
            return (data);
        }
    );
}

export const DeleteSectionApi = (id:string) => {

    const url = `${ENV.apiRoot}api/elements/${id}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(async data => {
            console.log(data);
            return (data);
        }
    );
}

export const CloneSectionApi = (id:string) => {

    const url = `${ENV.apiRoot}api/elements/${id}/clone`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    return fetch(url, options)
    .then(response => {
        return response.json();
    })
    .then(async data => {
            console.log(data);
            return (data);
        }
    );
}

export const GetAllTags = () => {

    const url = `${ENV.apiRoot}api/elements/tags`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return (data);
        }
    );
}

export const GetSectionDetail = (id:any) => {

    const url = `${ENV.apiRoot}api/elements/${id}/detail`;

    const options = {
        method: 'GET',
        maxRedirects: 20,
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return (data);
        }
    );
}

export const GetSection = (siteId:string, themeId:string) => {

    const url = `${ENV.apiRoot}api/elements?limit=30&page=1&sortby=title&type=section&tags=grids&site=${siteId}&themeId=${themeId}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return (data);
        }
    );
}

export const GetAllSectionTags = ($tags:string, siteId:string, themeId:string, page:number=1, limit:number=30) => {

    const url = `${ENV.apiRoot}api/elements?limit=${limit}&page=${page}&sortby=title&type=section&tags=${$tags}&site=${siteId}&themeId=${themeId}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return (data);
        }
    );
}