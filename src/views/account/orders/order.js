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

userData.forEach((data) => {
	ordersContainer.insertAdjacentHTML(
		'afterend',
		`<div class="colums"> 
  <div class="column is-2" id="order-date">${data.createAt}</div>
  <div class="column is-6" id="order-summary">${data.summary} / ${data.amount}개</div>
  <div class="column is-2" id="order-state">${data.state}</div>
  <div class="column is-2">
  <button class="button" id="order-cancel">주문 취소</button>
</div>`,
	);
});
