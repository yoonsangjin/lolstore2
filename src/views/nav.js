function nav() {
	//네비게이션
	const navbar = document.querySelector('#navbar');
	const register = '<li><a href="/register">회원가입</a></li>',
		login = '<li><a href="/login">로그인</a></li>',
		logout = '<li><a href="#" id="logout">로그아웃</a></li>',
		account = '<li><a href="/account">계정관리</a></li>',
		admin = '<li><a href="/admin" ">페이지 관리</a></li>',
		cart =
			'<li><a href="#cart" aria-current="page"><span class="icon"><i class="fas fa-cart-shopping"></i></span><span>카트</span></a></li>';

	// 어드민 인지 확인

	// 유저 로그인 유무
	if (sessionStorage.getItem('token')) {
		//현재 경로 기준 navbar 다르게 설정
		let nav;
		switch (window.location.pathname) {
			case '/':
			case '/cart/':
			case '/product/detail/':
			case '/product/list/':
			case '/account/orders/':
			case '/account/management/':
			case '/account/withdrawal/':
				nav = `${account} ${logout} ${cart}`;
				break;
			case '/account/':
				nav = `${logout} ${cart}`;
				break;
		}
		navbar.insertAdjacentHTML('afterend', nav);
	} else {
		navbar.insertAdjacentHTML('afterend', `${login} ${register} ${cart}`);
	}
	// 로그아웃 구현
	const logoutElem = document.querySelector('#logout');
	if (logoutElem) {
		logoutElem.addEventListener('click', () => {
			sessionStorage.clear();
			window.location.href = '/';
		});
	}
}

export { nav };
