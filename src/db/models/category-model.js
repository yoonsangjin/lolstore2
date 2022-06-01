import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('Category', CategorySchema);

export class CategoryModel {
  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId }).populate(
      'products',
      'name'
    );
    return category;
  }

  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async findAll() {
    const categories = await Category.find({}).populate('products', 'name');
    return categories;
  }

  async update({ categoryId, update }) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
