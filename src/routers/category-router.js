import express from 'express';
const categoryRouter = express.Router();
import {loginRequired} from '../middlewares';
import {categoryModel} from '../db/models/category-model.js'

categoryRouter.post('/', async(req,res,next)=>{
    try{
        const {name} = req.body;
        if(await categoryModel.findOne({name})){
            throw new Error('이미 존재하는 카테고리입니다.');
        }
        const addCategory = await categoryModel.create({name});
        res.status(200).json(addCategory);
    }catch(err){
        next(err);
    }
})

categoryRouter.delete('/', async(req,res,next)=>{
    try{
        const {name} = req.body;
        if(!await categoryModel.findOne({name})){
            throw new Error('존재하지 않는 카테고리입니다.');
        }
        const addCategory = await categoryModel.deleteOne({name});
        res.status(200).json(addCategory);
    }catch(err){
        next(err);
    }
})

export {categoryRouter};