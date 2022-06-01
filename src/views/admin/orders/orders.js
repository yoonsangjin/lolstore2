//products list
const input_data = document.querySelector('#input_data');
const order_cancer = document.getElementsByClassName('order_cancer');
// top_cotainer 
const element = document.getElementsByTagName('p');


//테스트용 데이터
const test_list = [
  {
    "id":1,
    "date":"2022-05-10",
    "order_info":"아이보리 니트",
    "order_cnt": 1,
    "order_price":22000,
    "order_status":0,
  },
  {
    "id":2,
    "date":"2022-05-12",
    "order_info":"남성 정장",
    "order_cnt": 1,
    "order_price":180000,
    "order_status":2,
  },
  {
    "id":3,
    "date":"2022-05-12",
    "order_info":"캐주얼 반팔 코디 남성",
    "order_cnt": 1,
    "order_price":13000,
    "order_status":1,
  },
  {
    "id":4,
    "date":"2022-05-13",
    "order_info":"봄, 가을 남자 느낌 물씬 코디",
    "order_cnt": 1,
    "order_price":28900,
    "order_status":1,
  },
  {
    "id":5,
    "date":"2022-05-13",
    "order_info":"아이보리 니트",
    "order_cnt": 1,
    "order_price":19000,
    "order_status":0,
  },
]

InputItem(); 
// json 데이터 주문 리스트에 추가
function InputItem() {
  const tbody = document.createElement('tbody');
  for(let i =0; i < test_list.length; i++){
    tbody.innerHTML += `
    <tr>
      <td> ${test_list[i].date}</td>
      <td> ${test_list[i].order_info}</td>
      <td> ${test_list[i].order_price.toLocaleString('ko-KR')} 원</td>
      <td>
        <select class="select_product_state" onchange="ProductCntChange()">
          <option value="0" ${test_list[i].order_status == 0 ? `selected` :``}> 상품 준비중 </option>
          <option value="1" ${test_list[i].order_status == 1 ? `selected` :``}> 상품 배송중 </option>
          <option value="2" ${test_list[i].order_status == 2 ? `selected` :``}> 배송 완료 </option>
        </select>
      </td>
      <td> <button class="order_cancer">주문 취소</button>
    </tr>
    `;
  }//json 데이터 기반으로 selected 설정
    input_data.appendChild(tbody);
}

function DeleteItem(){
  // 삭제 버튼 클릭 시 이벤트 
  for (let i=0; i<order_cancer.length; i++) {
    order_cancer[i].addEventListener('click', () => {
      //parentElement는 td를 의미, 그 다음 td의 parentElement는 tr을 의미
      let parent = document.querySelector('#input_data tbody');
      parent.removeChild(order_cancer[i].parentElement.parentElement);
      i--
      // delete 클릭 시 총 총주문 수 감소
      element[0].innerText -= 1;
    })
  }
  
}


// 총주문 수 
element[0].innerText = test_list.length
DeleteItem();
// 상풍 준비중 / 상품 배송중 / 배송 완료
ProductCnt();
// 처음 화면 시 value 값 표시
function ProductCnt() {
  let ready_cnt = 0
  let going_cnt = 0
  let success_cnt = 0
  let status = document.getElementsByClassName('select_product_state')
  for(let i =0; i<test_list.length; i++){
    if(status[i].selectedIndex == 0) {
      ready_cnt++;
    }else if(status[i].selectedIndex == 1) {
      going_cnt++;
    }else if(status[i].selectedIndex == 2) {
      success_cnt++;
    }
  }
  element[1].innerText = ready_cnt;
  element[2].innerHTML = going_cnt;
  element[3].innerHTML = success_cnt;
}

//select - option 변경 시 카운트 값이 바뀌도록 함수 설정
function ProductCntChange () {
  let ready_cnt = 0
  let going_cnt = 0
  let success_cnt = 0
  let status = document.getElementsByClassName('select_product_state')
  for(let i =0; i<test_list.length; i++){
    if(status[i].selectedIndex == 0) {
      ready_cnt++;
    }else if(status[i].selectedIndex == 1) {
      going_cnt++;
    }else if(status[i].selectedIndex == 2) {
      success_cnt++;
    }
  }
  element[1].innerText = ready_cnt;
  element[2].innerHTML = going_cnt;
  element[3].innerHTML = success_cnt;
}

