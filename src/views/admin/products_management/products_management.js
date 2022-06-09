import * as Api from '../../api.js';
const categorySelectBox = document.querySelector('#categorySelectBox');
const classValue = document.getElementsByClassName('deleteCheck');
const delModal = document.querySelector('#delModal'),
	delCompleteBtn = document.querySelector('#delCompleteBtn');

//modal 창 닫기
const delCancelBtn = document.querySelector('#delCancelBtn'),
	delBg = document.querySelector('#deleteModalBack'),
	deleteModalClose = document.querySelector('#deleteModalClose');

//전체 선택
const allSelect = document.querySelector('#allSelect');

//카테고리 목록 불러오기
getSelectOption();

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
		option.setAttribute('value', data._id);
		option.textContent = data.name;
		categorySelectBox.appendChild(option);
		categorySelectBox.addEventListener('change', setItemList);
	});
}

async function setItemList(e) {
	e.preventDefault();
	const categoryId = categorySelectBox.value;
	try {
		const tbody = document.querySelector('#tbody');
		while (tbody.hasChildNodes()) {
			tbody.removeChild(tbody.lastChild);
		}
		const item = await Api.get('/api/product/list', `?category=${categoryId}`);
		item.forEach((data) => {
			const tr = document.createElement('tr');
			tr.setAttribute('id', `product${data._id}`);

			const check = document.createElement('input');
			check.setAttribute('type', 'checkbox');
			check.setAttribute('id', `check${data._id}`);
			check.setAttribute('class', 'deleteCheck');
			check.setAttribute('value', `${data.product_id}`);
			check.setAttribute('name', 'check');

			const td1 = document.createElement('td');
			td1.textContent = data.name;

			const td2 = document.createElement('td');
			td2.textContent = data.price;

			const td3 = document.createElement('td');
			td3.textContent = data.storage;

			const updateBtn = document.createElement('input');
			updateBtn.setAttribute('type', 'button');
			updateBtn.setAttribute('id', `updateBtn${data._id}`);
			updateBtn.setAttribute('class', 'btn btn-primary');
			updateBtn.setAttribute('value', '수정');

			tr.appendChild(check);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(updateBtn);
			tbody.appendChild(tr);
		});
	} catch (err) {
		console.error(err);
	}
}

allSelect.addEventListener('click', selectAll);
const checkboxes = document.getElementsByName('check');

//전체 선택 event
function selectAll() {
    checkboxes.forEach((checkbox) => {
		checkbox.checked = allSelect.checked;
	});
}

//삭제하기 버튼
const deleteBtn = document.querySelector('#deleteBtn');
deleteBtn.addEventListener('click', openDelModal);

async function openDelModal() {
	delModal.classList.add('is-active');
	delCompleteBtn.addEventListener('click', setDelete);
}

async function setDelete() {
	try {
		for (let i = 0; i < classValue.length; i++) {
			console.log(classValue[i].value)
			if (classValue[i].checked) {
				await Api.delete('/api/product/detail',classValue[i].value);
			}
		}
		// location.reload();
		closeDelModal();
	} catch (err) {
		console.error(err);
	}
}

delCancelBtn.addEventListener('click', closeDelModal);
delBg.addEventListener('click', closeDelModal);
deleteModalClose.addEventListener('click', closeDelModal);

function closeDelModal() {
	delModal.classList.remove('is-active');
}
