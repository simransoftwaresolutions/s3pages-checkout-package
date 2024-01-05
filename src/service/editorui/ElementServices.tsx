import ENV from "../../utils/env";

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