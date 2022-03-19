import React,{useState} from 'react'
import Link from 'next/link'

const Sidebar = (props) => {
    const [sidebarWidth, setsidebarWidth] = useState('0px')

    const handleSidebarOpen=()=>{
        setsidebarWidth('300px')
    }

    const handleSidebarClose=()=>{
        setsidebarWidth('0px')
    }

  return (
    <div>
        <button onClick={handleSidebarOpen} className='sidebar-button btn btn-danger py-2 px-3'>
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>

        <div className='bg-light sidebar-content' style={{width:`${sidebarWidth}`,transition:'0.4s'}}>
            <button onClick={handleSidebarClose} className='sidebar-button-inside btn btn-danger py-2 px-3 d-flex ms-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </button>
            <h3 className='px-2'>{props.productSidebarCategory}</h3>
            <hr />
            {props.allProductsSidebar.map((product)=>{
                return <div className='my-2 px-2'>
                    <Link href={`#${product.product_id}`}><a className='text-secondary text-decoration-none'>{product.product_name}</a></Link>
                </div>
            })}
        </div>
    </div>
  )
}

export default Sidebar