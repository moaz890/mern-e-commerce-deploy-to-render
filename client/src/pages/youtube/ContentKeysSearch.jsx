import { AxeIcon } from 'lucide-react'
import React, { useState, useRef, useCallback } from 'react'

const ContentKeys = [
    {
        id: 'all-content',
        text: "All Content"        
    },
    {
        id: 'live',
        text: "Live"
    },
    {
        id: 'games',
        text: "Games"
    },
    {
        id: "football",
        text: "Football"
    },
    {
        id: 'beauty-advices',
        text: "Advices For Beauty"
    },
    {
        id: 'last-channels',
        text: "Last Uploaded Channels"
    },
    {
        id: 'subscribes',
        text: "Subscribes"
    },
    {
        id: "new-content",
        text: "New Content For You"
    }
]

const ContentKeysElements = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0)
    const listRef = useRef(null);
    
    const handleMouseDown = useCallback((e) => {

        setIsDragging(true);
        setStartX(e.pageX - listRef.current.offsetLeft);
        setScrollLeft(listRef.current.scrollLeft);
    }, [setIsDragging, setStartX, setScrollLeft]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, [setIsDragging]);

    const handleMouseMove = useCallback((e) => {

        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - listRef.current.offsetLeft;
        const walk = (x - startX);
        requestAnimationFrame(() => {
            listRef.current.scrollLeft = scrollLeft - walk;
        });
    }, [isDragging, startX, scrollLeft]);



    return( 
        <ul className='px-3 py-3 flex items-center gap-3 flex-1 overflow-auto scrollbar-hide select-none'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            ref={listRef}
            onScroll={(e) => e.preventDefault()}
        >
            {ContentKeys.map((key) => (
                <li key={key.id}
                    className='text-center text-nowrap py-2 px-2 text-white bg-black/30 hover:bg-white/15 cursor-pointer rounded-sm text-sm w-max'
                ><span className='block'>{key.text}</span></li>
            ))}
        </ul>
    )

}

const ContentKeysSearch = ({ setOpen }) => {


    return (
        <div className='flex gap-3 px-3 items-center'
        >
            <div className="w-10 h-10 rounded-full text-white hover:bg-white/15 flex items-center justify-center lg:hidden"
                onClick={() => setOpen(true)}
            >
                <AxeIcon />
            </div>

            <ContentKeysElements />
        </div>
    )
}

export default ContentKeysSearch
