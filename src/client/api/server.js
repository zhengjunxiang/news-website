import API from './axios';

const GetBlogs = data => API.get('/blogs/get.json', {params: data});
const GetTags = () => API.get('/tags/get.json');

// 博客
export {
  GetBlogs, GetTags
};
