// elements, input 변수 선언
const idChangeBtn = document.querySelector('#idChangeBtn'),
	newIdInput = document.querySelector('#newIdInput'),
	idCompleteBtn = document.querySelector('#idCompleteBtn'),
	idCencelBtn = document.querySelector('#idCencelBtn'),
	pwChangeBtn = document.querySelector('#pwChangeBtn'),
	newPwInput = document.querySelector('#newPwInput'),
	newPwConfirm = document.querySelector('#newPwConfirm'),
	pwCompleteBtn = document.querySelector('#pwCompleteBtn'),
	pwCencelBtn = document.querySelector('#pwCencelBtn'),
	addressChangeBtn = document.querySelector('#addressChangeBtn'),
	newAdressInput = document.querySelector('#newAdressInput'),
	searchAdressBtn = document.querySelector('#searchAdressBtn'),
	addressCompleteBtn = document.querySelector('#addressCompleteBtn'),
	addressCencelBtn = document.querySelector('#addressCencelBtn'),
	phoneChangeBtn = document.querySelector('#phoneChangeBtn'),
	phoneCompleteBtn = document.querySelector('#phoneCompleteBtn'),
	phoneCencelBtn = document.querySelector('#phoneCencelBtn');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
	idChangeBtn.addEventListener('click', displaySwitch);
	pwChangeBtn.addEventListener('click', displaySwitch);
	addressChangeBtn.addEventListener('click', displaySwitch);
	phoneChangeBtn.addEventListener('click', displaySwitch);

	idCencelBtn.addEventListener('click', cencleSwitch);
	pwCencelBtn.addEventListener('click', cencleSwitch);
	addressCencelBtn.addEventListener('click', cencleSwitch);
	phoneCencelBtn.addEventListener('click', cencleSwitch);

	idCompleteBtn.addEventListener('click', completeChange);
	pwCompleteBtn.addEventListener('click', completeChange);
	addressCompleteBtn.addEventListener('click', completeChange);
	phoneCompleteBtn.addEventListener('click', completeChange);
}
// 변경 입력 폼이 보이게
function displaySwitch(e) {
	e.preventDefault();
	e.path[2].lastElementChild.classList.remove('display-none');
	e.path[2].lastElementChild.classList.add('display-gird');
	e.path[1].classList.remove('display-grid');
	e.path[1].classList.add('display-none');
}
//취소시 원래대로 보이게
function cencleSwitch(e) {
	e.preventDefault();
	e.path[3].classList.remove('display-grid');
	e.path[3].classList.add('display-none');
	e.path[4].firstElementChild.classList.remove('display-none');
	e.path[4].firstElementChild.classList.add('display-grid');
}
// 최종 변경시
function completeChange(e) {
	//post (수정 API 요청) 문제 없을시 새로고침 아니면 에러 반환
	location.reload();
}
