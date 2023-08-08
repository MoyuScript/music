import { useEffect } from 'react';

export default function useHtmlBackgroundImage(imageUrl?: string) {
    useEffect(() => {
        if (!imageUrl) return;
        document.documentElement.style.backgroundImage = `url(${imageUrl})`;
        return () => {
            document.documentElement.style.backgroundImage = '';
        };
    }, [imageUrl]);
}
