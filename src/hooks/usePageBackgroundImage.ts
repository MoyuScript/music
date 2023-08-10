import { useEffect } from 'react';

export default function usePageBackgroundImage(imageUrl?: string) {
    useEffect(() => {
        if (!imageUrl) return;
        document.body.style.backgroundImage = `url(${imageUrl})`;
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, [imageUrl]);
}
