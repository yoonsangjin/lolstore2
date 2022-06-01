import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService } from '../services';

const productRouter = Router();

// 상품 등록 api (아래는 /create이지만, 실제로는 /api/product/create로 요청해야 함.)
productRouter.post('/create', async (req, res, next) => {
  try {
    // req (request)의 body 에서 데이터 가져오기
    const name = req.body.name;
    const category = req.body.categoryId;

    // 위 데이터를 상품 db에 추가하기
    const newProduct = await productService.addProduct({
      name,
      category,
    });

    // 추가된 상품의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// 전체 상품 목록을 가져옴 (배열 형태임)
productRouter.get('/productList', async (req, res, next) => {
  try {
    // 전체 상품 목록을 얻음
    const products = await productService.getProducts();

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 상품 정보 수정
// (예를 들어 /api/product/abc12345 로 요청하면 req.params.productId는 'abc12345' 문자열로 됨)
productRouter.patch('/:productId', async function (req, res, next) {
  try {
    // params로부터 id를 가져옴
    const productId = req.params.productId;

    // body data 로부터 업데이트할 상품 정보를 추출함.
    const name = req.body.name;
    const categoryId = req.body.categoryId;

    // 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
      ...(categoryId && { categoryId }),
    };

    // 상품 정보를 업데이트함.
    const updatedProductInfo = await productService.setProduct(
      productId,
      toUpdate
    );

    // 업데이트 이후의 상품 데이터를 프론트에 보내 줌
    res.status(200).json(updatedProductInfo);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
