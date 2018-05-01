import API from './axios';

const GetNews = data => API.get('/news/get.json', {params: data});
const LikeNew = data => API.put('/news/like.json', data);
const UnlikeNew = data => API.put('/news/unlike.json', data);
const GetTags = () => API.get('/tags/get.json');
const GetPartners = () => API.get('/partners/get.json');
const GetAbout = () => API.get('/about/get.json');
const GetEvents = data => API.get('/events/get.json', {params: data});

export {
  GetNews, GetTags, GetPartners, GetAbout, LikeNew, UnlikeNew, GetEvents
};
