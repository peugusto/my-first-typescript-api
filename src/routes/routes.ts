import {Router} from 'express'
import type { Todos } from '../models/data.js'

let data: Todos[] = []

type RequestBody = {text:string}
type RequestParams = {id:string}

const router = Router()
router.get('/',(req,res,next) =>{
    res.status(200).json({data:data})
})

router.post('/todo',(req,res,next) =>{
    const body = req.body as RequestBody
    const newTodo: Todos = {
        id: new Date().toISOString(),
        text: body.text
    }
    data.push(newTodo)

    res.status(201).json({message:'added data',datas:data,data:newTodo})
})

router.put('/todo/:id',(req,res,next) =>{
    const params = req.params as RequestParams;
    const body = req.body as RequestBody
    const {id} = params
    const dataIndex = data.findIndex((dataItem) => dataItem.id === id);
    if (dataIndex >= 0){
        const existData = data[dataIndex]
        if (existData){
        data[dataIndex] = {id: existData.id, text: body.text};
        return res.status(200).json({message: 'updated',data:data})
        }

    }
    res.status(404).json({message:'data not found'})

})

router.delete('/todo/:id',(req,res,next) =>{
    const params = req.params as RequestParams;

    if(!params.id) return res.status(400).json({message:'please enter an id'})

    data = data.filter(dataItem => dataItem.id !== params.id)
    res.status(200).json({message:'data deleted', data:data})
})

export default router
