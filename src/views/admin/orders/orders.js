import * as Api from '../../api.js';

//products list
// const inputData = document.querySelector('#inputData');
// const orderCancerBtn = document.getElementsByClassName('order-cancer');

// // top_cotainer
// const showCnt = document.getElementsByTagName('p');

// 총주문 수
// showCnt[0].innerText = testList.length;
//modal 변수 선언
const modal = document.querySelector('.modal'),
	modalBg = document.querySelector('.modal-background'),
	modalbtn = document.querySelector('.modal-close'),
	delCancelBtn = document.querySelector('#delCancelBtn'),
	delCompleteBtn = document.getElementById('delCompleteBtn');

getOrderInfo();
// orders 목록 받아오기 api 요청
async function getOrderInfo() {
	try {
		const orderInfo = await Api.get('/api/order/list');
		console.log(orderInfo);
		inputOrders(orderInfo);
	} catch (err) {
		console.error(err);
	}
}

//날짜 포맷 설정 함수 (YYYY-MM-DD)
function dateFormat(dateValue) {
	const date = new Date(dateValue);
	const year = date.getFullYear();
	const month = ('0' + (1 + date.getMonth())).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}

// 데이터 주문 리스트에 추가
async function inputOrders(item) {
	const tbody = document.querySelector('#tbody');
	item.forEach((data) => {
		tbody.insertAdjacentHTML(
			'afterend',
			`
    <tr id="item${data._id}">
      <td> ${dateFormat(data.createdAt)}</td>
			<td> ${data.receiver}</td>
      <td> ${data.orderList.productId} / ${data.orderList.volume}</td>
      <td> ${data.receiver} 원</td>
      <td>
        <select class="select-product-state" id ="sel${
					data._id
				}">
          <option value="0" ${
						data.status == 0 ? `selected` : ``
					}> 상품 준비중 </option>
          <option value="1" ${
						data.status == 1 ? `selected` : ``
					}> 상품 배송중 </option>
          <option value="2" ${
						data.status == 2 ? `selected` : ``
					}> 배송 완료 </option>
        </select>
      </td>
      <td> <button class="deleteOrderBtn" id="btn${data._id}">주문 취소</button>
    </tr>
    `,
		);
		const deleteOrderBtn = document.quertSelect('.deleteOrederBtn');
		deleteOrderBtn.addEvenListener('click', () => openModal(data_id));
		const selectChangeOption = document.querySelector('.select-product-state');
		selectChangeOption.addEventListener('change', )
	});
}

async function openModal(id) {
	modal.classList.add('is-active');
	delCompleteBtn.addEventListener('click', () => setDelete(id));
}

//modal창에서 확인 시 회원 삭제
async function setDelete(id) {
	try {
		await Api.delete('/api/order', id, 1);
		// 화면상에서 삭제 부분을 구현
		closeModal();
	} catch (err) {
		console.error(err);
	}
}

// function deleteOrder(btnId) {
// 	const parent = document.querySelector(`#btn${btnId}`).parentElement
// 		.parentElement;
// 	parent.remove();
// 	const sel = Number(parent.childNodes[7].childNodes[1].value);
// 	if (sel == 0) {
// 		showCnt[1].innerText--;
// 	} else if (sel == 1) {
// 		showCnt[2].innerText--;
// 	} else if (sel == 2) {
// 		showCnt[3].innerText--;
// 	}
// 	showCnt[0].innerText--;
// }

// // 처음 화면 시 value 값 표시
// function productCnt() {
// 	let ready_cnt = 0;
// 	let going_cnt = 0;
// 	let success_cnt = 0;
// 	let status = document.getElementsByClassName('select-product-state');
// 	for (let i = 0; i < testList.length; i++) {
// 		if (status[i].selectedIndex === 0) {
// 			ready_cnt++;
// 		} else if (status[i].selectedIndex === 1) {
// 			going_cnt++;
// 		} else if (status[i].selectedIndex === 2) {
// 			success_cnt++;
// 		}
// 	}
// 	showCnt[1].innerText = ready_cnt;
// 	showCnt[2].innerText = going_cnt;
// 	showCnt[3].innerText = success_cnt;
// }

// //select - option 변경 시 카운트 값이 바뀌도록 함수 설정
// function productCntChange(sel) {
// 	const selectOption = Number(sel.value);
// 	if (selectOption == 0) {
// 		showCnt[1].innerText++;
// 	} else if (selectOption == 1) {
// 		showCnt[2].innerText++;
// 	} else if (selectOption == 2) {
// 		showCnt[3].innerText++;
// 	}
// }

//modal btn event
modalBg.addEventListener('click', closeModal);
modalbtn.addEventListener('click', closeModal);
delCancelBtn.addEventListener('click', closeModal);

function closeModal() {
	modal.classList.remove('is-active');
}
