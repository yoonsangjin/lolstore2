import * as Api from '../../api.js';
// import { dateFormat } from '../../useful-functions';

const category = document.querySelector('#categoryName'),
	categoryUploadBtn = document.querySelector('#categoryUploadBtn'),
	categoryDeleteBtn = document.querySelector('#categoryDeleteBtn'),
	categorySelectBox = document.querySelector('#categorySelectBox');

//common modal
const modal = document.querySelector('.modal'),
	modalBg = document.querySelector('.modal-background'),
	modalbtn = document.querySelector('.modal-close');

// deletee modal
const delCancelBtn = document.querySelector('#delCancelBtn'),
	delCompleteBtn = document.querySelector('#delCompleteBtn');

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

async function deleteCategory() {
	try {
		const name = categorySelectBox.value;
		const selectValue = { name };
		await Api.delete('/api', 'category', selectValue);
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

// function setSelectOption(item) {
// 	item.forEach((data) => {
// 		const option = document.createElement('option');
// 		option.setAttribute('value', data.name);
// 		option.textContent = data.name;
// 		categorySelectBox.appendChild(option);
// 	});
// }

function setCategoryList(item) {
	const tbody = document.querySelector('#tbody');
	item.forEach((data) => {
		const tr = document.createElement('tr');
		tr.setAttribute('id', `cartegory${data.id}`);

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

		const delBtn = document.querySelector('.del-button');
		delBtn.addEventListener('click', () => openDelModal(this));

	});
}

function openDelModal(id) {
	console.log('hi')
}

function dateFormat(dateValue) {
	const date = new Date(dateValue);
	const year = date.getFullYear();
	const month = ('0' + (1 + date.getMonth())).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}
