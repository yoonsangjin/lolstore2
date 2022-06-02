// import * as Api from "../../api"

//테스트용 데이터
const testList = [
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


//user list
const inputData = document.querySelector('#inputData');
const userDeleteBtn = document.getElementsByClassName('user-delete-btn');
//top cotainer
const element = document.getElementsByTagName('p');

//총회원수
element[0].innerText = testList.length;
InputUser(); //회원 목록 출력
adminCnt(); //관리자수 카운트
oauthCnt();//ouath가입자수 카운트

//json 데이터 주문 리스트에 추가
async function InputUser() {
  const tbody = document.createElement('tbody');
  inputData.appendChild(tbody);
  
  for(let i =0; i<testList.length; i++) {
    tbody.insertAdjacentHTML('beforeend', `
    <tr id="user${testList[i].id}">
      <td>${testList[i].date}</td>
      <td>${testList[i].email}</td>
      <td>${testList[i].signin_type == 0? `일반`:`소셜`}</td>
      <td>${testList[i].name}</td>
      <td>
        <select class="select-user-type" onchange="adminCntChange(this)">
          <option value="0" ${testList[i].user_type == 0 ? `selected`:``}> 일반사용자</option>
          <option value="1" ${testList[i].user_type == 1 ? `selected`:``}> 관리자 </option>
        </select>
      </td>
      <td> <button class="user-delete-btn" id="btn${testList[i].id}" onclick="deleteUser(this.id)">회원정보 삭제</td>
    </tr>
    `);
  } //json 데이터 기반 selected 설정
  console.log("Data Input OK!")
}

async function deleteUser(btnId){
  const delBtn = document.querySelector(`#${btnId}`);
  delBtn.parentElement.parentElement.remove();
  element[0].innerText--;
}

//처음 화면 시 Admin Cnt 값 표시
async function adminCnt() {
  let adminCnt = 0
  let type = document.getElementsByClassName('select-user-type');
  for (let i=0; i< testList.length; i++){
    if(type[i].selectedIndex == 1) {
      adminCnt++;
    }
  }
  element[1].innerText = adminCnt;
}

//select - option 변경시 카운트 값이 바뀌도록 함수 설정
async function adminCntChange(select) {
  let selectOption = Number(select.value);
  if (select.value == 1 ){
    element[1].innerText++;
  }else if(selectOption == 0){
    element[1].innerText--;
  }
}

//ouath 사용자 수
async function oauthCnt() {
  let oauthCnt = 0;
  for(let i =0; i < testList.length; i++) {
    if(testList[i].signin_type == 1) {
      oauthCnt++;
    }
  }
  element[2].innerText = oauthCnt;
}