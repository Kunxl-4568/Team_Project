import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Heart, X } from 'lucide-react';

export default function WishlistToast() {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = router.on('success', (event) => {
            const flash = (event.detail.page.props as any)?.flash;
            if (flash?.success && (
                flash.success.toLowerCase().includes('wishlist') ||
                flash.success.toLowerCase().includes('wish')
            )) {
                setMessage(flash.success);
                setVisible(true);
                setTimeout(() => setVisible(false), 3000);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-3 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3">
            <div className="bg-[#FFC300] p-2 rounded-full">
                <Heart className="w-4 h-4 text-[#2C2C2C] fill-[#2C2C2C]" />
            </div>
            <span className="text-[#2C2C2C] font-slab text-sm">{message}</span>
            <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600 ml-1">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
