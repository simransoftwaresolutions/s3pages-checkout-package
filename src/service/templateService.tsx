import { ErrorHandler } from "./error-handle";

export const fetchAllTemplate = async (
  page: any,
  pageSize: any,
  title: any,
  search: any
) => {
  return ErrorHandler(async () => {
    const userStr = localStorage.getItem("user") as any;
    const user = JSON.parse(userStr);
    let url = `https://s3pagesapi.s3preview.com/api/site/fe/public?page=${page}&pageSize=${pageSize}&title=${search}&limit=2`;

    if (title) {
      url += `&tag=${title}`;
    }

    const response = await fetch(url, {
      // Add any necessary headers or authentication tokens here
    });

    const responseJSON = await response.json();

    return responseJSON.status ? responseJSON : false;
  });
};
