import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { categoryService } from '../services';

const categoryRouter = Router();

// 카테고리 등록 api (아래는 /create이지만, 실제로는 /api/category/create로 요청해야 함.)
categoryRouter.post('/create', async (req, res, next) => {
  try {
    // req (request)의 body 에서 데이터 가져오기
    const name = req.body.name;

    // 위 데이터를 카테고리 db에 추가하기
    const newCategory = await categoryService.addCategory({
      name,
    });

    // 추가된 카테고리의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// 전체 카테고리 목록을 가져옴 (배열 형태임)
categoryRouter.get('/categoryList', async (req, res, next) => {
  try {
    // 전체 카테고리 목록을 얻음
    const categories = await categoryService.getCategories();

    // 카테고리 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

// 카테고리 이름 수정
// (예를 들어 /api/category/abc12345 로 요청하면 req.params.categoryId는 'abc12345' 문자열로 됨)
categoryRouter.patch('/:categoryId', async function (req, res, next) {
  try {
    // params로부터 id를 가져옴
    const categoryId = req.params.categoryId;

    // body data 로부터 업데이트할 카테고리 정보를 추출함.
    const name = req.body.name;

    // 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
    };

    // 카테고리 정보를 업데이트함.
    const updatedCategoryInfo = await categoryService.setCategory(
      categoryId,
      toUpdate
    );

    // 업데이트 이후의 카테고리 데이터를 프론트에 보내 줌
    res.status(200).json(updatedCategoryInfo);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
