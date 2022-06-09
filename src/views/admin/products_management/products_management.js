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

//Modal 변수 선언
const getModalNameText = document.querySelector('#getModalNameText'),
	setModalNameText = document.querySelector('#setModalNameText');
const getModalCategory = document.querySelector('#getModalCategory'),
	setModalCategory = document.querySelector('#setModalCategory');
const getModalImg = document.querySelector('#getModalImg'),
	setModalImg = document.querySelector('#setModalImg');
const getProductInfo = document.querySelector('#getProductInfo'),
	setProductInfo = document.querySelector('#setProductInfo');
const getModalStorage = document.querySelector('#getModalStorage'),
	setModalStorage = document.querySelector('#setModalStorage');
const getModalPrice = document.querySelector('#getModalPrice'),
	setModalPrice = document.querySelector('#setModalPrice');
const getModalCompany = document.querySelector('#getModalCompany'),
	setModalCompany = document.querySelector('#setModalCompany');

//modal 변경하기 버튼
const modalUpdateBtn = document.querySelector('#modalUpdateBtn');
//modal 변경 취소 버튼
const modalCancelBtn = document.querySelector('#modalCancelBtn');

//카테고리 목록 불러오기
getSelectOption();
async function getSelectOption() {
	try {
		const allCategory = await Api.get('/api/category/list');
		setSelectOption(allCategory);
		setModalSelectBox(allCategory);
	} catch (err) {
		console.error(err);
	}
}

//modal 이름 입력
setModalNameText.addEventListener('keyup', setModalNameValue);
function setModalNameValue() {
	getModalNameText.value = setModalNameText.value;
}

//modal 변경 카테고리 set
function setModalSelectBox(item) {
	item.forEach((data) => {
		const option = document.createElement('option');
		option.setAttribute('id', data._id);
		option.setAttribute('value', data.name);
		option.textContent = data.name;
		setModalCategory.appendChild(option);
		setModalCategory.addEventListener('change', setModalCategoryValue);
	});
}

//modal 카테고리 입력
function setModalCategoryValue() {
	getModalCategory.value = setModalCategory.value;
}
//modal Img
setModalImg.addEventListener('change', (e) => setModalImgSrc(e.target));
function setModalImgSrc(input) {
	if (input.files && input.files[0]) {
		//FileReader인스턴스 생성
		const reader = new FileReader();
		//이미지 로드된 경우
		reader.onload = (e) => {
			getModalImg.src = e.target.result
		}
		reader.readAsDataURL(input.files[0]);
	}
}
//modal 상세정보 입력
setProductInfo.addEventListener('keyup', setModalProductInfoValue);
function setModalProductInfoValue() {
	getProductInfo.value = setProductInfo.value;
}

//modal 재고 수 입력
setModalStorage.addEventListener('keyup', setModalStorageValue);
function setModalStorageValue() {
	getModalStorage.value = setModalStorage.value;
}

//modal 가격 입력
setModalPrice.addEventListener('keyup', setModalPriceValue);
function setModalPriceValue() {
	getModalPrice.value = setModalPrice.value;
}

//modal 제조사 입력
setModalCompany.addEventListener('keyup', setModalCompanyValue);
function setModalCompanyValue() {
	getModalCompany.value = setModalCompany.value;
}

//검색 카테고리 set
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
			console.log(classValue[i].value);
			if (classValue[i].checked) {
				await Api.delete('/api/product/detail', classValue[i].value);
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
