import API from './axios';

const GetNews = (data) => API.get('/api/news/get.json', {params: data});
const LikeNew = (data) => API.put('/api/news/like.json', data);
const UnlikeNew = (data) => API.put('/api/news/unlike.json', data);
const GetTags = () => API.get('/api/tags/get.json');
const GetPartners = () => API.get('/api/partners/get.json');
const GetAbout = () => API.get('/api/about/get.json');
const GetEvents = (data) => API.get('/api/events/get.json', {params: data});
const LikeEvent = (data) => API.put('/api/events/like.json', data);
const UnlikeEvent = (data) => API.put('/api/events/unlike.json', data);
const GetPosters = (data) => API.get('/api/posters/get.json', {params: data});
const GetUserAvatar = (data) => API.get('/api/user/getUserAvatar.json', {params: data});
const AddContact = (data) => API.post('/api/contact/add.json', data);

const AccountSignin = (data) => API.post('/api/account/signin.json', data);

export {
  GetNews, GetTags, GetPartners, GetAbout, LikeNew, UnlikeNew, GetEvents,
  GetPosters, GetUserAvatar, LikeEvent, UnlikeEvent, AccountSignin, AddContact
};
