import * as Api from '../../api.js';

const productName = document.querySelector('#productName'), //제품 이름
	makerName = document.querySelector('#makerName'), // 제조사
	productInfo = document.querySelector('#productInfo'), // 설명
	productCntInfo = document.querySelector('#productCntInfo'), //재고 수
	productPrice = document.querySelector('#productPrice'), // 제품 가격
	categorySelectBox = document.querySelector('#categorySelectBox'); // select id

const productImg = document.querySelector('#productImg'); // 제품 사진 업로드 버튼

const sellSubmitBtn = document.querySelector('#sellSubmitBtn'); // 제품 추가 하기 버튼

//제품 추가 버튼 클릭 시
getSelectOption();

// 상품 추가 버튼 클릭 시
sellSubmitBtn.addEventListener('click', handleSubmit);
//제품 추가 구현
async function handleSubmit(e) {
	try {
		e.preventDefault();
		const name = productName.value;
		const category = categorySelectBox.value;
		const img = productImg.files[0];
		const info = productInfo.value;
		const storage = productCntInfo.value;
		const price = productPrice.value;
		const date = new Date();

		console.log(img);
		const isNameValid = name.length >= 2;
		const isMakerValid = maker.length >= 2;
		const isInfoValid = info.length >= 5;
		//최소작성요건 에러 핸들링
		if (!isNameValid) {
			return alert('최소 2자 이상의 제품 명을 입력해주세요!');
		}
		if (!isMakerValid) {
			return alert('최소 2자 이상의 제조사 명을 입력해주세요!');
		}
		if (!isInfoValid) {
			return alert('최소 5자 이상을 포함한 설명을 작성해주세요');
		}

		const newProduct = {
			name: name,
			category: category,
			img: img,
			info: info,
			price: price,
			storage: storage,
			date: date,
			maker: maker,
		};
    
		await Api.post('/api/product/add', newProduct);
	} catch (err) {
		console.error(err);
		alert(`문제가 발생하였습니다. 확인 후 다시 시도해주세요 : ${err.message}`);
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
