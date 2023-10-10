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

export const GetGoogleFonts = () => {

    const url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw";

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

export const CreatePage = (pageData:any) => {

    const url = `${ENV.apiRoot}api/pages/`;
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

// export const GetSiteDataFromApi = (id:any) => {
//     if(!id) return;
//     const url = `${ENV.apiRoot}api/site/${id}`;
//     const { data, error, isLoading } = useSWR(url, SwrGetSiteData);
//     return { data, error, isLoading };
// }

export const SwrGetSiteData = async(url:string) => {

    const token = `${ENV.auth}`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
    };

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

    const url = `${ENV.apiRoot}api/autoresponder`;
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

export const GetPages = (funnelId:string) => {

    const url = `${ENV.apiRoot}api/pages/funnel/${funnelId}`;
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
            
            // if(response.status === 403){
            //     localStorage.removeItem('authToken');
            //     localStorage.removeItem('userId');
            //     localStorage.removeItem('userData');
            //     window.location = window.location;
            // }

            return response.json();
        })
        .then(async data => {

            const pageDetails = [];
            if(data?.status && data?.data?.length){
                for(let i=0; i<data?.data?.length; i++){
                    const _pageDetails = {
                        pageData:data.data[i],
                        template:data.data[i].variants.data,
                    };
                    // const pageTemp = await GetPageVariants(data.data[i].id);
                    // // console.log(pageTemp);

                    // if(pageTemp?.data?.length){
                    //     _pageDetails.template = pageTemp?.data;
                    // }

                    pageDetails.push(_pageDetails);
                }
            }
            return (pageDetails);
        }
    );
}

export const GetPageVariants = ( id:string ) => {

    const url = `${ENV.apiRoot}api/pages/${id}/variants`;
    // const url = `${ENV.apiRoot}/api/pages/641d64c8ce0eaba12edcbe6d/variants`;
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
            
            // if(response.status === 403){
            //     localStorage.removeItem('authToken');
            //     localStorage.removeItem('userId');
            //     localStorage.removeItem('userData');
            //     window.location = window.location;
            // }

            return response.json();
        })
        .then(data => {
            return (data);
        }
    );
}

export const DeletePage = (pageId:string) => {

    const url = `${ENV.apiRoot}api/pages/${pageId}`;
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

export const ClonePage = (pageId:string, data:any) => {

    const url = `${ENV.apiRoot}api/pages/${pageId}/clone`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(data)
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

export const UpdatePage = (pageId:string, data:any) => {

    const url = `${ENV.apiRoot}api/pages/${pageId}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(data)
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

export const PageSortOrder = (fId:string, pageData:any) => {

    const url = `${ENV.apiRoot}api/pages/funnel/${fId}/sortorder`;
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

export const UpdateSiteApi = (site:string, siteData:any) => {

    const url = `${ENV.apiRoot}api/site/${site}`;
    const token = `${ENV.auth}`;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        maxRedirects: 20,
        body: JSON.stringify(siteData)
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