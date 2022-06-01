import { categoryModel } from '../db';

class CategoryService {
  // 본 파일의 맨 아래에서, new CategoryService(categoryModel) 하면, 이 함수의 인자로 전달됨
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 카테고리 등록
  async addCategory(categoryInfo) {
    // db에 저장
    const createdNewCategory = await this.categoryModel.create(categoryInfo);

    return createdNewCategory;
  }

  // 카테고리 목록을 받음.
  async getCategories() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }

  // 카테고리 이름 수정
  async setCategory(categoryId, toUpdate) {
    // 우선 해당 id의 카테고리가 db에 있는지 확인
    let category = await this.categoryModel.findById(categoryId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error(
        '해당 카테고리가 존재하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 업데이트 진행
    category = await this.categoryModel.update({
      update: toUpdate,
    });

    return category;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
