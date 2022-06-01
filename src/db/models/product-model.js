import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';
import { ProductSchema } from '../schemas/product-schema';

const Category = model('Category', CategorySchema);
const Product = model('Product', ProductSchema);

export class ProductModel {
  async findById(productId) {
    const product = await Product.findOne({ _id: productId }).populate(
      'category',
      'name'
    );
    return product;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);

    // 해당 카테고리 Products 필드에 생성한 Product 추가
    const { category } = productInfo;
    const targetCategory = await Category.findById(category);
    targetCategory.products.push(createdNewProduct._id);
    targetCategory.save();

    return createdNewProduct;
  }

  async findAll() {
    const products = await Product.find({}).populate('category', 'name');
    return products;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
