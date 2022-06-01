//user list
const input_data = document.querySelector('#input_data');
const user_delete_btn = document.getElementsByClassName('user_delete_btn');
//top cotainer
const element = document.getElementsByTagName('p');

//테스트용 데이터
const test_list = [
  {
    "id":1,
    "date":"2022-05-11",
    "email":"1234@naver.com",
    "signin_type":0,
    "name":"아이유",
    "user_type":0,
  },
  {
    "id":2,
    "date":"2022-05-12",
    "email":"asdfasdf@naver.com",
    "signin_type":0,
    "name":"손흥민",
    "user_type":0,
  },
  {
    "id":3,
    "date":"2022-05-13",
    "email":"pek@naver.com",
    "signin_type":0,
    "name":"윤상진",
    "user_type":0,
  },
  {
    "id":4,
    "date":"2022-05-13",
    "email":"doad1010@naver.com",
    "signin_type":1,
    "name":"배창현",
    "user_type":1,
  },
  {
    "id":5,
    "date":"2022-05-13",
    "email":"pgka12@naver.com",
    "signin_type":0,
    "name":"박우람",
    "user_type":0,
  },
  {
    "id":6,
    "date":"2022-05-31",
    "email":"gkgkgkk1@gmail.com",
    "signin_type":0,
    "name":"이학성",
    "user_type":0,
  },
  {
    "id":7,
    "date":"2022-05-31",
    "email":"zxcvd4@naver.com",
    "signin_type":0,
    "name":"정승우",
    "user_type":0,
  },
]

InputUser();


//json 데이터 주문 리스트에 추가
function InputUser() {
  const tbody = document.createElement('tbody');
  for(let i =0; i<test_list.length; i++) {
    tbody.innerHTML += `
    <tr>
      <td>${test_list[i].date}</td>
      <td>${test_list[i].email}</td>
      <td>${test_list[i].signin_type == 0? `일반`:`소셜`}</td>
      <td>${test_list[i].name}</td>
      <td>
        <select class="select_user_type" onchange="AdminCntChange()">
          <option value="0" ${test_list[i].user_type == 0 ? `selected`:``}> 일반사용자</option>
          <option value="1" ${test_list[i].user_type == 1 ? `selected`:``}> 관리자 </option>
        </select>
      </td>
      <td> <button class="user_delete_btn">회원정보 삭제</td>
    </tr>
    `;
  } //json 데이터 기반 selected 설정
  input_data.appendChild(tbody);
}

function DeleteUser(){
  //삭제 버튼 클릭 시 이벤트
  for (let i =0; i<user_delete_btn.length; i++){
    user_delete_btn[i].addEventListener('click', () => {
      //parentElement는 td를 의미, 그 다음 td의 parentElement는 tr
      let parent = document.querySelector('#input_data tbody');
      parent.removeChild(user_delete_btn[i].parentElement.parentElement);
      i--;
      // delete 이벤트 발생 시 총회원수도 감소 
      element[0].innerText -= 1;
    })
  }

}

//총회원수
element[0].innerText = test_list.length;
DeleteUser();
// 관리자수 / OAuth 가입자 수 
AdminCnt();
OauthCnt();
//처음 화면 시 Admin Cnt 값 표시
function AdminCnt() {
  let admin_cnt = 0;
  let type = document.getElementsByClassName('select_user_type');
  for (let i=0; i< test_list.length; i++){
    if(type[i].selectedIndex == 1) {
      admin_cnt++;
    }
  }
  element[1].innerText = admin_cnt;
}

//select - option 변경시 카운트 값이 바뀌도록 함수 설정
function AdminCntChange() {
  let admin_cnt = 0
  let type = document.getElementsByClassName('select_user_type');
  for (let i=0; i< test_list.length; i++){
    if(type[i].selectedIndex == 1) {
      admin_cnt++;
    }
  }
  element[1].innerText = admin_cnt;
}

//ouath 사용자 수
function OauthCnt() {
  let oauth_cnt = 0;
  for(let i =0; i < test_list.length; i++) {
    if(test_list[i].signin_type == 1) {
      oauth_cnt++;
    }
  }
  element[2].innerText = oauth_cnt;
}

