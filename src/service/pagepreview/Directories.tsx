export const GetDirectories = () => {
    return {
            subFolders:[
                {
                    folderName:"folder 1",
                    type:"folder",
                    files:[
                        {
                            fileName:"file1.png",
                            fileUrl:"",
                            type:"file",
                        },
                        {
                            fileName:"file2.png",
                            fileUrl:"",
                            type:"file",
                        },
                    ],
                },
                {
                    folderName:"folder 2",
                    type:"folder",
                    files:[]
                },
            ],
            files:[
                {
                    fileName:"file1.png",
                    fileUrl:"",
                    type:"file",
                },
                {
                    fileName:"file2.png",
                    fileUrl:"",
                    type:"file",
                },
            ],            
        }
    ;
}


export const CreateFolder = ( folderData: any ) => {
    return true;
}

export const uploadImage = ( imageData: any ) => {
    return true;
}

// import ENV from "utils/env";

// export const GetDirectories = () => {

//     const limit = 5;

//     const url = `${ENV.apiRoot}`;
//     const authToken = `${ENV.auth}`;

//     const options = {
//         method: 'GET',
//         port: 3000,
//         headers: {
//             'Authorization': 'Bearer ' + authToken
//         },
//         maxRedirects: 20
//       };

//     return fetch(url, options)
//         .then(response => {
            
//             if(response.status === 403){
//                 localStorage.removeItem('authToken');
//                 localStorage.removeItem('userId');
//                 localStorage.removeItem('userData');
//                 window.location = window.location;
//             }

//             return response.json();
//         })
//         .then(data => {
//                 return (data);
//             }
//         );
// }

// export const CreateFolder = ( folderData: any ) => {

//     const limit = 5;

//     const url = `${ENV.apiRoot}`;
//     const authToken = `${ENV.auth}`;

//     const options = {
//         method: 'POST',
//         port: 3000,
//         headers: {
//             'Authorization': 'Bearer ' + authToken,
//             'Content-Type': 'application/json'
//         },
//         maxRedirects: 20,
//         body: JSON.stringify(data)
//     };

//     return fetch(url, options)
//         .then(response => {
            
//             if(response.status === 403){
//                 localStorage.removeItem('authToken');
//                 localStorage.removeItem('userId');
//                 localStorage.removeItem('userData');
//                 window.location = window.location;
//             }

//             return response.json();
//         })
//         .then(data => {
//                 return (data);
//             }
//         );
// }

// export const uploadImage = ( imageData: any ) => {

//     const limit = 5;

//     const url = `${ENV.apiRoot}`;
//     const authToken = `${ENV.auth}`;

//     const options = {
//         method: 'POST',
//         port: 3000,
//         headers: {
//             'Authorization': 'Bearer ' + authToken,
//             'Content-Type': 'application/json'
//         },
//         maxRedirects: 20,
//         body: JSON.stringify(data)
//     };

//     return fetch(url, options)
//         .then(response => {
            
//             if(response.status === 403){
//                 localStorage.removeItem('authToken');
//                 localStorage.removeItem('userId');
//                 localStorage.removeItem('userData');
//                 window.location = window.location;
//             }

//             return response.json();
//         })
//         .then(data => {
//                 return (data);
//             }
//         );
// }
