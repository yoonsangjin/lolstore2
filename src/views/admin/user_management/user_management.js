import * as Api from "../../api.js"
//user status change
const selectChange = document.querySelector('.select-user-type');

//top cotainer
const showCnt = document.getElementsByTagName('p');

//modal 변수 선언
const modal = document.querySelector('.modal'),
      modalBg = document.querySelector('.modal-background'),
      modalbtn = document.querySelector('.modal-close'),
      delCancelBtn = document.querySelector('#delCancelBtn'),
      delCompleteBtn = document.querySelector('#delCompleteBtn');

getUserInfo(); 
// user 정보 목록 받아오기 api요청
async function getUserInfo() {
  try { 
    const userInfo = await Api.get('/api/userlist');
    InputUser(userInfo);//유저 목록 데이터 생성
    userCnt(userInfo);//총회원수, 관리자수, ouath가입자수 카운트
  } catch(err) {
    console.error(err);
  }
}
//삭제 버튼 클릭 시 
// async function setDelUser(id) {
//   try {
//     await Api.delete(`/users/${id}`);
//   } catch(err) {
//     console.error(err);
//   }
// }

//select - option 변경시 카운트 값이 바뀌도록 함수 설정
async function adminCntChange(sel) {
  console.log("chang event")
  const selectOption = Number(sel.value);
  if (selectOption == 1 ){
    showCnt[1].innerText++;
  }else if(selectOption == 0){
    showCnt[1].innerText--;
  }
}

//날짜 포맷 설정 함수 (YYYY-MM-DD)
function dateFormat(dateValue) {
  const date = new Date(dateValue);
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  return year+'-'+ month + '-' + day;
}

//getUserInfo 유저 정보를 불러와 목록으로 출력
function InputUser(item) {
  const tbody = document.querySelector('#tbody');
    item.forEach(data => {
      tbody.insertAdjacentHTML('afterend', `
    <tr id="user${data._id}">
      <td>${dateFormat(data.createdAt)}</td>
      <td>${data.email}</td>
      <td>${data.loginTypeCode == 0? `일반`:`소셜`}</td>
      <td>${data.fullName}</td>
      <td>
        <select class="select-user-type">
          <option value="0" ${data.admin ? `selected`:``}> 일반사용자</option>
          <option value="1" ${data.admin ? `selected`:``}> 관리자 </option>
        </select>
      </td>
      <td><button class="deleteBtn" id="btn${data._id}">회원정보 삭제 </td>
    </tr>
    `);
    const deleteBtn = document.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => deleteUser(data._id));
  });
}


//회원 삭제 클릭 시 이벤트
async function deleteUser(btnId){  
      modal.classList.add('is-active');
      delCompleteBtn.addEventListener('click', setDelete(btnId));
}

//modal창에서 확인 시 회원 삭제
async function setDelete(id) {
  try {
    await Api.delete(`/api/users/${id}`)
    closeModal();
  }catch(err) {
    console.error(err);
  }
}

//총회원수, ouath, admin 수
async function userCnt(item) {
  let oauthCnt = 0;
  let adminCnt = 0;
  for(let i =0; i < item.length; i++) {
    if(item[i].loginTypeCode == 1) {
      oauthCnt++;
    }
    if(item[i].admin) {
      adminCnt++;
    }
  }
  showCnt[0].innerText = item.length;
  showCnt[1].innerText = adminCnt;
  showCnt[2].innerText = oauthCnt;
}

//modal btn event
modalBg.addEventListener('click', closeModal);
modalbtn.addEventListener('click', closeModal);
delCancelBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.classList.remove('is-active');
}