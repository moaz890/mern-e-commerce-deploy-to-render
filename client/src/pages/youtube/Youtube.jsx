import React, { useState } from 'react'
import YoutubeHeader from './YoutubeHeader'
import ContentKeysSearch from './ContentKeysSearch';
import YoutubeSidebar from './YoutubeSidebar';

const Youtube = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className='bg-black flex w-full min-h-screen'>
            <YoutubeSidebar open={open} setOpen={setOpen}></YoutubeSidebar>
            <div className="flex-1 flex flex-col max-w-full">
                <YoutubeHeader setOpen={setOpen}></YoutubeHeader>
                
            </div>
        </div>
    )
}

export default Youtube
