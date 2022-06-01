import * as Api from '../../api.js';

// API로 JSON을 받아왔다고 가정
const userData = [
	{
		_id: 1,
		createAt: '2022-05-30',
		summary: '아이보리 니트',
		amount: 1,
		state: '상품 준비중',
	},
	{
		_id: 2,
		createAt: '2022-05-29',
		summary: '남성 정장',
		amount: 1,
		state: '출고중',
	},
	{
		_id: 3,
		createAt: '2022-05-28',
		summary: '봄, 가을 남자 느낌 물씬 코디',
		amount: 2,
		state: '상품 준비중',
	},
	{
		_id: 4,
		createAt: '2022-05-30',
		summary: '캐주얼 반팔 코디',
		amount: 3,
		state: '출고중',
	},
];

const ordersContainer = document.querySelector('.orders-container');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-background');
const modalbtn = document.querySelector('.modal-close');
const delcencelBtn = document.querySelector('#delcencelBtn');

function closeModal() {
	modal.classList.remove('is-active');
}

modalBg.addEventListener('click', closeModal);
modalbtn.addEventListener('click', closeModal);
delcencelBtn.addEventListener('click', closeModal);

userData.forEach((data) => {
	ordersContainer.insertAdjacentHTML(
		'afterend',
		`<div class="colums order-item id="order_${data._id}"> 
  <div class="column is-2">${data.createAt}</div>
  <div class="column is-6" id="order-summary">${data.summary} / ${data.amount}개</div>
  <div class="column is-2">${data.state}</div>
  <div class="column is-2">
	<button class="button" id="delBtn_${data._id}">주문 취소</button>
	</div>
 </div>`,
	);
	const cancelBtn = document.querySelector('.button');
	cancelBtn.addEventListener('click', orderCancel);

	function orderCancel(e) {
		e.preventDefault();
		modal.classList.add('is-active');
	}
});
