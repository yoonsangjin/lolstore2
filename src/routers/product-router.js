import express from 'express';
const productRouter = express.Router();

import {loginRequired} from '../middlewares';

import {productModel} from '../db/models/product-model.js';
import {categoryModel} from '../db/models/category-model.js'

// // 상품 전체 보기 (카테고리별)
// productRouter.get('/list', async(req,res,next)=>{
//     try{
//         //product/list/?category=Man%20Clothes
//         const {category} = req.query;
//         // 상품 카테고리를 기준으로 전부 검색
//         const products = await productModel.find({}).populate({
//             path : 'category',
//             match : {name : category}
//         });
        
//         // 상품들 정보를 프론트에 전달
//         res.status(200).json(products);
//         console.log('hi');
//     }catch(err){
//         next(err);
//     }
// });

// 상품 전체 보기 (카테고리별)
productRouter.get('/list', async(req,res,next)=>{
    try{
        
        // 상품 전체 검색
        const products = await productModel.find({})
        
        // 상품들 정보를 프론트에 전달
        res.status(200).json(products);
        console.log('hi');
    }catch(err){
        next(err);
    }
});

// 상품 상세 보기
productRouter.get('/detail', async(req,res,next)=>{
    try{
        // product/detail/?product_id=6
        const {product_id} = req.query;
        // product_id로 상품 하나 찾기
        const product = await productModel.find({product_id});

        // 상품 데이터 프론트에 전달
        res.status(200).json(product);
        console.log('asdf');
    }catch(err){
        next(err);
    }
});

// 상품 추가
productRouter.post('/add', async(req,res,next)=>{
    try{
        const {name, category, inform, price, storage, date, company} = req.body;

        //////////////////// 입력값 빠졌는지 검사 //////////////////////////
        if(name == ""){
            throw new Error('상품 이름을 입력해주세요!');
        }
        if(category == ""){
            throw new Error('상품 카테고리를 입력해주세요!');
        }
        if(inform == ""){
            throw new Error('상품 설명을 입력해주세요!');
        }
        if(price == ""){
            throw new Error('상품 가격을 입력해주세요!');
        }
        if(storage == ""){
            throw new Error('상품 재고를 입력해주세요!');
        }
        if(date == ""){
            throw new Error('상품 출시 날짜를 입력해주세요!');
        }
        if(company == ""){
            throw new Error('상품 제조사를 입력해주세요!');
        }
        ////////////////////////////////////////////////////////////////////

        // // 데이터베이스에서 같은 이름의 상품이 있는지 검사
        // if(await productModel.findOne({name})){
        //     throw new Error('이미 있는 상품입니다.')
        // }

        // 새로운 상품 모델 생성

        // const newProduct = await productModel.create({name, inform, price, storage, date, company});
        // const pushCategory = await categoryModel.findOne({name : category});
        // const newProductCategory = await productModel.findOneAndUpdate(
        //     {product_id : newProduct.product_id},
        //     {$push : {category : pushCategory}},
        //     {new : true}
        // ).populate('category')
        
        const newProductCategory = await productModel.create({name, category, inform, price, storage, date, company});
        
        // 카테고리 모델에 상품 모델 추가
        const thisCategory = await categoryModel.findOneAndUpdate(
            {_id : category},
            {$push : {products : newProductCategory}},
            {new : true}
        ).populate('products')


        // 상품 모델이 생성되었음을 알리고 데이터를 프론트에 전달
        res.status(201).json(newProductCategory);
        console.log('상품 추가 완료');
    }catch(err){
        next(err);
    }
})

// 상품 삭제
productRouter.delete('/detail', async(req,res,next)=>{
    try{
        // /detail/?prodict_id=26
        const {product_id} = req.query;
        
        // 해당 상품 name을 가진 상품 데이터를 삭제
        const deleteProduct = await productModel.deleteOne({product_id});
        
        res.status(200).json(deleteProduct); 
        console.log('상품이 삭제되었습니다');
    }catch(err){
        next(err);
    }
    
})

// 상품 정보 수정
productRouter.post('/update_product', async(req,res,next)=>{
    try{
        // /update_product/?name=브라운%20상의
        const {product_id} = req.query;

        // 제품명과 출시날짜, 제조사는 고정, category, inform, price, storage 수정하기 위해 값을 받아오기
        const {category, inform, price, storage} = req.body;

        // 입력값 빠졌는지 검사
        if(category == ""){
            throw new Error('상품 카테고리를 입력해주세요!');
        }
        if(inform == ""){
            throw new Error('상품 설명을 입력해주세요!');
        }
        if(price == ""){
            throw new Error('상품 가격을 입력해주세요!');
        }
        if(storage == ""){
            throw new Error('상품 재고를 입력해주세요!');
        }

        // product_id 로 상품을 찾고 그 제품의 category, inform, price, storage을 수정
        // const oldCategory = await productModel.findOne({product_id});
        // console.log(oldCategory);
        // await productModel.findOneAndUpdate(
        //     {product_id},
        //     {$pull : {category :  {ObjectId : oldCategory.ObejctId}}},
        // )
        
        // const updateProduct = await productModel.findOneAndUpdate({product_id}, { inform, price, storage}, {returnOriginal : false});
        // const newCategory = await categoryModel.findOne({name : category});
        // await productModel.findOneAndUpdate(
        //     {product_id},
        //     {$push : {category : newCategory}},
        //     {new : true}
        // )
       
        // body 값들을 받아와 상품 정보 수정
        const updateProduct = await productModel.findOneAndUpdate(
            {product_id},
            {category, inform, price, storage}
        ).populate('category');

        // // 상품 정보를 수정하였으니 카테고리 내에 포함되었던 상품도 카테고리 이동
        // const product = await productModel.find({product_id});
        // // 기존 카테고리에서 상품 제거
        // await categoryModel.updateMany({}, {$pull : {products: {ObjectId : product._id}}});

        
        res.status(200).json(updateProduct);
        console.log('상품 정보 수정이 완료되었습니다');
    }catch(err){
        next(err);
    }
})

export {productRouter};