import { useSelector } from 'react-redux'
import Modal from '../../components/Modal'
import { selectCartItems , selectCartTotalItems, selectCartTotalPrice , addItemQuantity, reduceItemQuantity, removeItemFromCart} from './cartSlice'
import { useDispatch } from 'react-redux'

const CartModal = ({handleHideModalCart}) => {
    const cartItems = useSelector(selectCartItems)  
    const totalItems = useSelector(selectCartTotalItems)
    const totalPrice = useSelector(selectCartTotalPrice)
    const dispatch = useDispatch()

    const onClickAdd = (product) => {
        dispatch(addItemQuantity(product.id))
    }
    const onClickReduce = (product) => {
        dispatch(reduceItemQuantity(product))
    }
    const onClickDelete = (product) => {
        dispatch(removeItemFromCart(product))
    }

    const showCheckout = () => {
        if(totalItems) {
            return (
                <button type='button' className='ml-4 bg-green-600 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-lg text-sm' onClick={handleCheckoutToWhatsapp}>
            Checkout (whatsapp)
            </button>
        )
         }
    }

    const handleCheckoutToWhatsapp = () => {
        if (totalItems === 0) return;

        const phoneNumber = "62818299384";
        const message = encodeURIComponent(`Halo, saya ingin membeli ${totalItems} barang dengan total harga ${totalPrice}`)

        const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`

        window.open(URL, "_blank")
    }

    return (
        <Modal>
            <div className='flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]'>
                <div className='flex flex-col gap-6 max-h-[500px] overflow-auto'>
                    {cartItems.map((product) => {
                        return (
                            <div key={product.id} className='w-full border-b-4 border-blue-200 pb-2 px-4 flex'>
                                <div className='w-[120px] overflow-hidden rounded-lg'>
                                    <img src={product.image} alt={product.title} className='w-full h-full object-cover' />
                                </div>
                                <div className='ml-10 w-[75%]'>
                                    <h3 className='capitalize mt-3 text-lg'> {product.title}</h3>
                                    <div className=' flex items-center gap-2'>
                                        <h4 className='text-sm'>{product.price}</h4>
                                        <h3 className='text-lg font-bold'>{product.totalPrice}</h3>
                                    </div>
                                    <div className='flex items-center gap-4 mt-4 ml-auto'>
                                        <button type='button' className='rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center' onClick={() => onClickReduce(product)}>
                                            -
                                        </button>
                                        <h3>{totalItems}</h3>
                                        <button type='button' className='rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center' onClick={() => onClickAdd(product)}>
                                            +
                                        </button>
                                        <button type="button" className='rounded-md bg-red-500 px-2 text-white flex items-center justify-center' onClick={() => onClickDelete(product)}>
                                        Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h3 className='text-md font-bold'>Total Item: {totalItems}</h3>
                    <h3 className='text-md font-bold'>Total Price: {totalPrice}</h3>
                </div>
                <div className='flex items-center justify-center'>
                    <button type='button' className='bg-slate-600 hover:bg-slate-800 text-white px-8 py-3 rounded-lg text-sm' onClick={handleHideModalCart}>
                    Close
                    </button>
                    {showCheckout()}
                </div>
            </div>
        </Modal>
    )
}
export default CartModal