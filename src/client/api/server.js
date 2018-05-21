import API from './axios';

const GetNews = data => API.get('/api/news/get.json', {params: data});
const LikeNew = data => API.put('/api/news/like.json', data);
const UnlikeNew = data => API.put('/api/news/unlike.json', data);
const GetTags = () => API.get('/api/tags/get.json');
const GetPartners = () => API.get('/api/partners/get.json');
const GetAbout = () => API.get('/api/about/get.json');
const GetEvents = data => API.get('/api/events/get.json', {params: data});

export {
  GetNews, GetTags, GetPartners, GetAbout, LikeNew, UnlikeNew, GetEvents
};
