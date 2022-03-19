import * as fs from 'fs'

export default async function handler(req,res){
    let allProducts=await fs.promises.readFile('allProducts/products.json','utf-8')
    res.json(allProducts)
}