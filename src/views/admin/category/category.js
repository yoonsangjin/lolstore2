import * as Api from '../../api.js';

const category = document.querySelector('#categoryName'),
	categoryUploadBtn = document.querySelector('#categoryUploadBtn'),
	categoryDeleteBtn = document.querySelector('#categoryDeleteBtn'),
	categorySelectBox = document.querySelector('#categorySelectBox');

getSelectOption();
categoryUploadBtn.addEventListener('click', setCategory);
categoryDeleteBtn.addEventListener('click', deleteCategory);

async function setCategory(e) {
	e.preventDefault();
	try {
		const name = category.value;

		console.log(name);
		await Api.post('/api/category/add', name);
	} catch (err) {
		console.error(err);
	}
}

async function deleteCategory() {
	try {
		const selectValue = categorySelectBox.value;
    const select = { selectValue }

		await Api.patch('/api/category', '', select);
	} catch (err) {
		console.error(err);
	}
}

async function getSelectOption() {
	try {
		const allCategory = await Api.get('/api/category/list');
		setSelectOption(allCategory);
	} catch (err) {
		console.error(err);
	}
}

function setSelectOption(item) {
	item.forEach((data) => {
		const option = document.createElement('option');
		option.setAttribute('value', data.name);
		option.textContent = data.name;
		categorySelectBox.appendChild(option);
	});
}

