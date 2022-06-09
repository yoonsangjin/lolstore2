import * as Api from '/api.js';
import { nav } from '/component.js';
//네비게이션 바 생성
nav();
const getId = await Api.get(`/api/email/${sessionStorage.getItem('email')}`);
sessionStorage.setItem('userId', getId._id);
