import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addToCart} from '../cart/cartSlice'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    useEffect(()=> {
        const fetchProducts = async() => {
            setLoading(true)
            try {
                const response = await fetch("https://fakestoreapi.com/products")
                const data = await response.json();
                setProducts(data)
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    
    const onClickBuy = (product) => {
        dispatch(addToCart(product))
    }
    
    return (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
            {products.map((product)=> {
                return (
                    <div key={product.id} className="bg-white rounded-xl border shadow p-10 w-full">
                       <div className="group relative w-[80%] h-[250px] mx-auto overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out"/>
                       </div>
                       <div className="flex flex-col gap-6 mt-8">
                            <button type="button" className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8" onClick={() => onClickBuy(product)}>
                                Buy Now
                            </button>
                            <h3 className="font-bold">
                                {product.title}
                            </h3>
                            <h3>{product.price}</h3>
                       </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductList;