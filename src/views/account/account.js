import * as Api from '/api.js';
import { nav } from '/nav.js';
nav();
const getId = await Api.get(`/api/email/${sessionStorage.getItem('email')}`);
sessionStorage.setItem('userId', getId._id);
