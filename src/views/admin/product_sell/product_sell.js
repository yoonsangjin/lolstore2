import * as Api from '../../api.js';

const productName = document.querySelector('#productName'), //제품 이름
    makerName = document.querySelector('#makerName'), // 제조사
    productInfo = document.querySelector('#productInfo'), // 설명
    productCntInfo = document.querySelector('#productCntInfo'), //재고 수
    productPrice = document.querySelector('#productPrice'), // 제품 가격
    categorySelectBox = document.querySelector('#categorySelectBox'); // select id

const productImg = document.querySelector('#productImg'); // 제품 사진 업로드 버튼

const form = document.querySelector('#productSubmitForm');
getSelectOption();

form.addEventListener('submit', handleSubmit);

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



async function handleSubmit(e) {  
try {
    const name = productName.value;
    const category = '62a0bc450778877936379c20';
    const image = productImg.files[0];
    const information = productInfo.value;
    const storage = productCntInfo.value;
    const price = productPrice.value;
    const date = new Date();
    const company = makerName.value;



const data = { name, category, information, storage, price, date, company };
await Api.post('/api/product/', data );
} catch (err) {
    console.error(err.stack);
		alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
};
};