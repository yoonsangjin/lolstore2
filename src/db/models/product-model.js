import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('Product', ProductSchema);

export class ProductModel {
  async findById(productId) {
    const product = await Product.findOne({ _id: productId }).populate(
      'category',
      'name'
    );
    return product;
  }

  // TODO: 해당 categories에 product._id 등록
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
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
