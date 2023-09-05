export async function getSiteInfo(site: string) {

    try {
        const res = await fetch(process.env.BACKEND_API_URL + `/api/site/fe/${site}`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-cache'
        });

        if (!res.ok) {
            return { status: false, data: [] }
        }
        return res.json();

    } catch (error) {
        return { status: false, data: [] }
    }

}



export async function getUriInfo(siteid: string, requestUri: string) {

    try {
        console.log(process.env.BACKEND_API_URL + `/api/url/fe/${siteid}/${requestUri}`);

        const res = await fetch(process.env.BACKEND_API_URL + `/api/url/fe/${siteid}/${requestUri}`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-cache'
        });

        if (!res.ok) {
            return { status: false, data: [] }
        }
        return res.json();
        
    } catch (error) {
        return { status: false, data: [] }
    }
}
