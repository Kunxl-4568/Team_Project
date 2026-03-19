import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Heart, X } from 'lucide-react';

export default function WishlistToast() {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isAdded, setIsAdded] = useState(true);

    useEffect(() => {
        const unsubscribe = router.on('success', (event) => {
            const flash = (event.detail.page.props as any)?.flash;
            const successMsg: string = flash?.success || '';

            if (successMsg.toLowerCase().includes('wish')) {
                const added = !successMsg.toLowerCase().includes('remov');
                setIsAdded(added);
                setMessage(added ? '❤️ Added to wishlist!' : '🤍 Removed from wishlist');
                setVisible(true);
                setTimeout(() => setVisible(false), 3000);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-3 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3">
            <div className={`p-2 rounded-full ${isAdded ? 'bg-[#FFC300]' : 'bg-gray-100'}`}>
                <Heart className={`w-4 h-4 ${isAdded ? 'fill-[#2C2C2C] text-[#2C2C2C]' : 'text-gray-400'}`} />
            </div>
            <span className="text-[#2C2C2C] font-slab text-sm">{message}</span>
            <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600 ml-1">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
