import * as Api from '../../api.js';
// import { dateFormat } from '../../useful-functions';

const category = document.querySelector('#categoryName'),
	categoryUploadBtn = document.querySelector('#categoryUploadBtn'),
	categoryDeleteBtn = document.querySelector('#categoryDeleteBtn'),
	categorySelectBox = document.querySelector('#categorySelectBox');

const modal = document.querySelectorAll('.modal'),
	delModalBg = document.querySelector('#deleteModalBack'),
	delModalbtn = document.querySelector('#deleteModalClose'),
	delCancelBtn = document.querySelector('#delCancelBtn'),
	delCompleteBtn = document.querySelector('#delCompleteBtn');

function dateFormat(dateValue) {
	const date = new Date(dateValue);
	const year = date.getFullYear();
	const month = ('0' + (1 + date.getMonth())).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}

getOption();
categoryUploadBtn.addEventListener('click', setCategory);

//카테고리 추가
async function setCategory(e) {
	e.preventDefault();
	try {
		const name = category.value;
		const data = { name };
		await Api.post('/api/category', data);
	} catch (err) {
		console.error(err);
	}
}

async function getOption() {
	try {
		const allCategory = await Api.get('/api/category/list');
		setCategoryList(allCategory);
	} catch (err) {
		console.error(err);
	}
}

function setCategoryList(item) {
	const tbody = document.querySelector('#tbody');
	item.forEach((data) => {
		const tr = document.createElement('tr');
		tr.setAttribute('id', `category${data._id}`);

		const td1 = document.createElement('td');
		td1.textContent = dateFormat(data.createdAt);

		const td2 = document.createElement('td');
		td2.textContent = data.name;

		const td3 = document.createElement('td');
		const deleteBtn = document.createElement('input');
		deleteBtn.setAttribute('id', `delBtn${data._id}`);
		deleteBtn.setAttribute('type', 'button');
		deleteBtn.setAttribute('class', 'del-button');
		deleteBtn.setAttribute('value', '삭제');
		td3.appendChild(deleteBtn);

		const td4 = document.createElement('td');
		const updateBtn = document.createElement('input');
		updateBtn.setAttribute('id', `upBtn${data._id}`);
		updateBtn.setAttribute('type', 'button');
		updateBtn.setAttribute('class', 'update-button');
		updateBtn.setAttribute('value', '수정');
		td4.appendChild(updateBtn);

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tbody.appendChild(tr);

		const delBtn = document.querySelector(`#delBtn${data._id}`);
		delBtn.addEventListener('click', () => openDelModal(data.name, data._id));

		const upBtn = document.querySelector(`#upBtn${data._id}`);
		upBtn.addEventListener('click', () => openUpModal(data._id));
	});
}

function openDelModal(name, id) {
	modal[0].classList.add('is-active');
	delCompleteBtn.addEventListener('click', () => setDelete(name, id));
}

async function setDelete(name, id) {
	try {
		const sendName = { name };
		await Api.delete('/api', 'category', sendName);
		const parent = document.getElementById(`category${id}`);
		parent.remove();
		modal[0].classList.remove('is-active');
	} catch (err) {
		console.error(err);
	}
}

function openUpModal(id) {
	console.log(id);
}

//카테고리 삭제
async function deleteCategory() {
	try {
		const name = categorySelectBox.value;
		const selectValue = { name };
		await Api.delete('/api', 'category', selectValue);
	} catch (err) {
		console.error(err);
	}
}

//modal btn event
delModalBg.addEventListener('click', closeDelModal);
delModalbtn.addEventListener('click', closeDelModal);
delCancelBtn.addEventListener('click', closeDelModal);

function closeDelModal() {
	modal[0].classList.remove('is-active');
}
