import React,{useState} from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ProductRange from '../../components/ProductRange'

const Display = (props) => {
    const [product, setproduct] = useState(props.productDisplay)
    const [categoryWise, setcategoryWise] = useState(props.allProductsCategoryWise)

    const router = useRouter();

    const handleClick=async(productRangeCategory)=>{
        const host="http://localhost:3000"
        let data=await fetch(`${host}/api/getAllProducts`)
        let parsedData=await data.json()
        let allProductsArray=parsedData.products
        let allProducts=[]
        allProductsArray.map((product)=>{
            if(product.product_category===productRangeCategory){
                allProducts.push(product)
            }
        })
        setproduct(allProducts)
        router.push(`/our-products/${productRangeCategory}`)
    }

    const handleProductDisplayClick=async(productId,product_name)=>{
        const host="http://localhost:3000"
        let data=await fetch(`${host}/api/getAllProducts`)
        let parsedData=await data.json()
        let allProductsArray=parsedData.products
        let productDisplay={}
        let productCategoryWise=""
        allProductsArray.map((product)=>{
            if(productId===product.product_id){
                productDisplay=product
                productCategoryWise=product.product_category
            }
        })
        let allProductsCategoryWise=[]
        allProductsArray.map((product)=>{
            if(product.product_category===productCategoryWise){
                if(productId!==product.product_id){
                    allProductsCategoryWise.push(product)
                }
            }
        })
        setproduct(productDisplay)
        setcategoryWise(allProductsCategoryWise)
        router.push(`/display-product/${productId}?product=${product_name}`)
    }
  return (
    <div>
        <Head>
            <title>{product.product_name} | Survive Pharma</title>
            <meta name="description" content="Survive Pharma Product Display" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta name="theme-color" content="#000000" />
        </Head>

        <ProductRange handleClick={handleClick}/>

        <div className="card m-5 mb-3">
            <h2 className='text-center my-2'>A Survive Pharma Product</h2>
            <hr className='mt-0'/>
            <div className='d-flex flex-row p-5 pt-4'>
                <div className='img-fluid img-thumbnail p-5'>
                    <Image width={500} height={500} src={`/ProductsImages/${product.product_image}`} alt={product.product_name}></Image>
                </div>
                <div className="card-body w-75 py-0">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h3 className="card-title">{product.product_name}</h3>
                            <h5 className='card-title'>Price : Rs. {product.product_price} /Piece</h5>
                        </div>
                        <div>
                            <a href={product.product_brochure} className={`btn btn-success d-flex align-items-center ${product.product_brochure===null?"d-none":""}`} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                            <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z"/>
                            <path fillRule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"/>
                            </svg><i className="bi bi-file-earmark-pdf-fill"></i><span className='ms-1'>Product Brochure</span></a>
                        </div>
                    </div>
                    <hr />
                    <h5>Product Description</h5>
                    <p className="card-text product-desc">{product.product_description}</p>
                    <hr />
                    <div className='card p-4' style={{backgroundColor:'aliceblue'}}>
                        <h4 className='text-center text-dark mb-0'>Interested in this product?</h4>
                        <div className='text-secondary text-center' style={{fontSize:'18px'}}><a className='text-primary text-decoration-none'>Call Us</a> or leave your number below and we will call you.</div>
                        <form action="" className='mt-2'>
                            <div className='d-flex mx-auto mb-1 w-50'>
                                <select className='bg-success mx-1 text-white' name="countryCode" id="ccode"style={{border:'1px solid rgb(0,0,0,.125)',borderRadius:'0.25rem',outline:'none'}}>
                                    <option value="+91">India +91</option>
                                    <option value="+1">USA +1</option>
                                    <option value="+971">UAE +971</option>
                                    <option value="+44">UK +44</option>
                                    <option value="+61">Aus +61</option>
                                </select>
                                <input type="number" name='contactNumber' className='form-control' placeholder='Contact Number' />
                            </div>
                            <div className='text-center mt-2'>
                                <button className='btn btn-dark py-1' type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className='mx-3'>
            <h3 className='text-center'>More products related to this category - <Link href={`/our-products/${product.product_category}`}><a className='text-dark'>{props.productCategory}</a></Link></h3>
            <div className="row px-5 justify-content-center product-row">
            {categoryWise.slice(0,6).map((categoryProduct)=>{
                return <div key={categoryProduct.product_id} className="col-md-4 my-3">
                    <div className="card product-card">
                        <div className="img-thumbnail img-fluid mx-5 mt-4 mb-1 p-5">
                            <Image width={500} height={500} src={`/ProductsImages/${categoryProduct.product_image}`}></Image>
                        </div>
                    <div className="card-body m-auto">
                    <a onClick={()=>handleProductDisplayClick(categoryProduct.product_id,categoryProduct.product_name)} className="card-title text-dark text-decoration-none text-center"><h5>{categoryProduct.product_name}</h5></a>
                        <h6 className="text-dark text-center">Price : Rs. {categoryProduct.product_price} /Piece</h6>
                        <div className='d-flex justify-content-center mt-4 product-btns'>
                            <button onClick={()=>handleProductDisplayClick(categoryProduct.product_id,categoryProduct.product_name)} className="btn btn-info mx-1 d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg><span className='ms-1'>Know More</span></button>
                        </div>
                    </div>
                    </div>
                </div>
            })}
            </div>
        </div>
    </div>
  )
}

export async function getServerSideProps(context){
    const host="http://localhost:3000"
    let data=await fetch(`${host}/api/getAllProducts`)
    let parsedData=await data.json()
    let allProductsArray=parsedData.products
    let productDisplay={}
    let productCategory=""
    let productCat=""
    let productCategoryWise=""
    allProductsArray.map((product)=>{
        if(context.query.id===product.product_id){
           productDisplay=product
           productCategoryWise=product.product_category
           productCat=product.product_category.split(/(?=[A-Z])/)
        }
    })
    for (let index = 0; index < productCat.length; index++) {
        productCategory+=productCat[index]+" "
    }
    let allProductsCategoryWise=[]
    allProductsArray.map((product)=>{
        if(product.product_category===productCategoryWise){
            if(context.query.id!==product.product_id){
                allProductsCategoryWise.push(product)
            }
        }
    })
    return{
        props:{productDisplay,productCategory,allProductsCategoryWise}
    }
}


export default Display