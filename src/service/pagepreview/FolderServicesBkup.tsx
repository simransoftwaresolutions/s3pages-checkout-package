import ENV from "../../utils/env";


export const FetchFolders = () => {

    const url = `${ENV.apiRoot}api/folders`;
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

export const FolderDelete = (folderId:string) => {

    const url = `${ENV.apiRoot}api/folders/${folderId}`;
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

export const AddFolder = (eleData:any) => {

    const url = `${ENV.apiRoot}api/folders`;
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

export const UploadFileToFolder = (file:any, folderId:any) => {

    const url = `${ENV.apiRoot}api/files/folder/${folderId}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(file)
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

export const ExportMultipleDocs = ({form_data}:any) => {

    const url = `${ENV.apiRoot}api/files/multi`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(form_data)
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

export const RenameFiles = (id:any, fileData:any) => {

    const url = `${ENV.apiRoot}files/${id}/rename`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(fileData)
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

export const DeleteFile = (fileId:string) => {

    const url = `${ENV.apiRoot}api/files/${fileId}`;
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

/////////////////////////////////////////////////////
export const GetAllElements = () => {

    const url = `${ENV.apiRoot}api/elements`;
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

