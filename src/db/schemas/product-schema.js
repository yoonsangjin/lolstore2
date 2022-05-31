import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { // 상품명
      type: String,
      required: true,
    },
    category: { // 카테고리
      type: String,
      required: true,
    },
    //  picture: { // 상품이미지
    //    type: String,
    //    required: true,
    //  },
    inform: { // 상품정보
      type: String,
      required: true,
    },
    price: { // 가격
      type: Number,
      required: true,
    },
    storage: { // 재고
      type: Number,
      required: true,
    },
    date: { // 올린날짜
      type: Date,
      required: true,
    },
    thumbs: { // 추천수
      type: Number,
      default: 0,
    },
    views: { // 조회수
      type: Number,
      default: 0,
    }
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };