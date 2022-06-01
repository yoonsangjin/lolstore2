import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';
import { ProductSchema } from '../schemas/product-schema';



const productModel = model('products', ProductSchema);
const categoryModel = model('category', CategorySchema)

export { productModel, categoryModel };