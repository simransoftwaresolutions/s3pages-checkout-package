import ENV from "../../utils/env";
// import useSWR from 'swr';

export const getSiteInfo = (site: string) => {

    const url = `https://s3pagesapi.s3preview.com/api/site/fe/${site}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    return fetch(url, options)
    .then(response => {
        return response.json();
    })
    .then(async data => {
            return (data);
        }
    );
}

export const getUriInfo = (siteid: string) => {

    const url = `https://s3pagesapi.s3preview.com//api/url/fe/${siteid}/`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    return fetch(url, options)
    .then(response => {
        return response.json();
    })
    .then(async data => {
            return (data);
        }
    );
}

export const GetAllCollectionData = (id:any) => {

    // const url = `${ENV.apiRoot}api/collection/6492c2e769432838474ccf86`;
    const url = `${ENV.apiRoot}api/collection/?site=${id}`;
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
    .then(async data => {
            return (data);
        }
    );
}

export const GetCollectionData = (id:any) => {

    const url = `${ENV.apiRoot}api/collection/${id}`;
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
    .then(async data => {
            return (data);
        }
    );
}

export const SubmitFormApi = (formData:any) => {

    // const url = `${ENV.apiRoot}api/contacts/fe/form`;
    const url = `${ENV.apiRoot}api/contacts/fe/form/subscribe`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(formData)
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

export const GetSiteData = async(id:any) => {

    const url = `${ENV.apiRoot}api/site/${id}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

    // return fetch(url, options)
    // .then(response => {
    //     return response.json();
    // })
    // .then(async data => {
    //         // console.log(data);
    //         return (data);
    //     }
    // );


    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
}

export const GetThemeSiteStyles = async(id:any) => {

    const url = `${ENV.apiRoot}api/site/fe/theme/${id}`;
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
    .then(async data => {
            // console.log(data);
            return (data);
        }
    );
}

export const GetAutoResponderData = () => {

    const url = `${ENV.apiRoot}api/autoresponder/client/installed`;
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
    .then(async data => {
            // console.log(data);
            return (data);
        }
    );
}

export const GetFormTags = () => {

    const url = `${ENV.apiRoot}api/tags`;
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
    .then(async data => {
            return (data);
        }
    );
}


