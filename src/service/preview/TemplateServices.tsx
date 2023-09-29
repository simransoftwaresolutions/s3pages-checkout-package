import ENV from "../../utils/env";

export const CreateTemplate = (template:any) => {

    const url = `${ENV.apiRoot}api/variants/`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(template)
    };

    return fetch(url, options)
        .then(response => {
            
            // if(response.status === 403){
            //     localStorage.removeItem('authToken');
            //     localStorage.removeItem('userId');
            //     localStorage.removeItem('userData');
            //     window.location = window.location;
            // }

            return response.json();
        })
        .then(async data => {
                console.log(data);
                return (data);
            }
        );
}

export const DeleteTemplate = (templateId:string) => {

    const url = `${ENV.apiRoot}api/variants/${templateId}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20
    };

    return fetch(url, options)
        .then(response => {
            
            // if(response.status === 403){
            //     localStorage.removeItem('authToken');
            //     localStorage.removeItem('userId');
            //     localStorage.removeItem('userData');
            //     window.location = window.location;
            // }

            return response.json();
        })
        .then(async data => {
                console.log(data);
                return (data);
            }
        );
}


export const UpdateTemplate = (templateId:string, template:any) => {

    const url = `${ENV.apiRoot}api/variants/${templateId}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(template)
    };

    return fetch(url, options)
        .then(response => {
            
            // if(response.status === 403){
            //     localStorage.removeItem('authToken');
            //     localStorage.removeItem('userId');
            //     localStorage.removeItem('userData');
            //     window.location = window.location;
            // }

            return response.json();
        })
        .then(async data => {
                console.log(data);
                return (data);
            }
        );
}

export const CloneTemplate = (templateId:string, template:any) => {

    const url = `${ENV.apiRoot}api/variants/${templateId}/clone`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(template)
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

export const UpdateSplitTesting = (pageData:any) => {

    const url = `${ENV.apiRoot}api/variants/updateSplitTestingSettings`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(pageData)
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

export const CopyTemplate = (templateData:any) => {

    const url = `${ENV.apiRoot}api/variants/copy`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(templateData)
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

export const CopyToTemplate = (id:string, templateData:any) => {

    const url = `${ENV.apiRoot}api/variants/${id}/copyto`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(templateData)
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

export const GetTemplateDetail = (id:any) => {

    const url = `${ENV.apiRoot}api/variants/${id}/detail`;
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