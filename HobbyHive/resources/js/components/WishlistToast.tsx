import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Heart, X } from 'lucide-react';

export default function WishlistToast() {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (flash?.success && (
            flash.success.toLowerCase().includes('wishlist') ||
            flash.success.toLowerCase().includes('wish')
        )) {
            setMessage(flash.success);
            setVisible(true);

            const timer = setTimeout(() => setVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-3 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 animate-fade-in">
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
