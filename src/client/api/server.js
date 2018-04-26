import API from './axios';

const GetBlogs = data => API.get('/blogs/get.json', {params: data});
const LikeBlog = data => API.put('/blogs/like.json', data);
const UnlikeBlog = data => API.put('/blogs/unlike.json', data);
const GetTags = () => API.get('/tags/get.json');
const GetCompanion = () => API.get('/companion/get.json');
const GetAboutUs = () => API.get('/aboutUs/get.json');

export {
  GetBlogs, GetTags, GetCompanion, GetAboutUs, LikeBlog, UnlikeBlog
};
