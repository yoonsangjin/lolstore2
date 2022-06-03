import express from 'express';
import path from 'path';
const categoryRouter = express.Router();
import { loginRequired } from '../middlewares';
import { categoryModel } from '../db/models/category-model.js';

// 카테고리 추가
categoryRouter.post('/add', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (await categoryModel.findOne({ name })) {
      throw new Error('이미 존재하는 카테고리입니다.');
    }
    const addCategory = await categoryModel.create({ name });
    res.status(200).json(addCategory);
  } catch (err) {
    next(err);
  }
});

// 카테고리 삭제
categoryRouter.delete('/delete', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!(await categoryModel.findOne({ name }))) {
      throw new Error('존재하지 않는 카테고리입니다.');
    }
    const addCategory = await categoryModel.deleteOne({ name });
    res.status(200).json(addCategory);
  } catch (err) {
    next(err);
  }
});

// 카테고리 전체받기
categoryRouter.get('/list', async (req, res, next) => {
  try {
    const list = await categoryModel.find({}).populate('products');
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
});

//////////////////////////////////////

categoryRouter.use('/add', serveStatic('category'));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/admin/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { categoryRouter };
