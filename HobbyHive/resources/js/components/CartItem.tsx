import React from 'react';

type CartItemProps = {
    title: string;
    image: string;
    price: number;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
    title,
    image,
    price,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,

}) => {
    return (

        <div className='flex items-center justify-between border border-black rounded-lg pb-6 px-2 py-2'>
            <div className = 'flex item-center gap-4'>
                <img src={image} alt={title} className='w-16 h-16 object-cover'/>
                <div>
                    <h2 className='text-lg font-semibold text-[#2c2c2c]'>{title}</h2>
                    <p className='text-sm text-[#2c2c2c]'>Qty: {quantity}</p>
                    
                    <div className='flex gap-2 mt-2'>
                        <button className='px-2 border rounded text-[#2c2c2c]'onClick={onDecrease}>-</button>
                        <button className='px-2 border rounded text-[#2c2c2c]' onClick={onIncrease}>+</button>
                        <button className='px-2 border rounded text-[#2c2c2c]' onClick={onRemove} >REMOVE</button>
                    </div>
                </div>
            </div>
            <p className='text-lg font-bold text-[#2c2c2c]'>£{price.toFixed(2)}</p>
        </div>
    );
};

export default CartItem;