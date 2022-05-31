// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';

// 테스트용 데이터
const categoryWithProducts = [
  {
    id: 1,
    name: 'Men',
    products: [
      {
        id: 1,
        name: '예쁜 남자 상의',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 39000,
      },
      {
        id: 2,
        name: '예쁜 남자 하의',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 72000,
      },
      {
        id: 3,
        name: '예쁜 남자 아우터',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 172000,
      },
      {
        id: 7,
        name: '멋진 남자 아우터',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 250000,
      },
      {
        id: 9,
        name: '귀여운 남자 아우터',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 57000,
      },
      {
        id: 9,
        name: '귀여운 남자 상의',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 46000,
      },
    ],
  },
  {
    id: 2,
    name: 'Women',
    products: [
      {
        id: 4,
        name: '예쁜 여자 상의',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 43000,
      },
      {
        id: 5,
        name: '예쁜 여자 하의',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 65000,
      },
      {
        id: 6,
        name: '예쁜 여자 아우터',
        image: 'https://bulma.io/images/placeholders/480x640.png',
        price: 195000,
      },
    ],
  },
];

// 요소(element), input 혹은 상수
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertCategoryContents();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

// 카테고리 HTML 요소 생성
function insertCategoryContents() {
  const categoryContainer = document.querySelector('.category-container');
  // TODO: 테스트 데이터 -> 실제 데이터
  const datas = categoryWithProducts;
  console.log(datas);

  // Category 추가
  datas.map((data) => {
    const categoryLabel = document.createElement('div');
    categoryLabel.classList.add('category-label');
    categoryLabel.textContent = `${data.name}`;
    categoryContainer.appendChild(categoryLabel);

    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryContainer.appendChild(categoryDiv);

    // Product 카운트
    // Category의 Product는 4개까지만 출력하기 위한 카운트 변수
    let productCount = 0;

    // Product 추가
    data.products.map((product) => {
      // Category의 Product가 4개 출력되었다면 리턴
      if (productCount >= 4) {
        return;
      }
      const productDiv = document.createElement('div');
      productDiv.classList.add('category-product');
      categoryDiv.appendChild(productDiv);

      const productImage = document.createElement('img');
      productImage.src = `${product.image}`;
      productDiv.appendChild(productImage);

      const productName = document.createElement('div');
      productName.classList.add('category-product-name');
      productName.innerHTML = `${product.name}`;
      productDiv.appendChild(productName);

      const productPrice = document.createElement('div');
      productPrice.classList.add('category-product-price');
      productPrice.innerHTML = `${product.price.toLocaleString()}원`;
      productDiv.appendChild(productPrice);

      // Product 카운트 증가
      productCount++;
    });
  });
}
