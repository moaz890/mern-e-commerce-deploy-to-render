import { Bell, SearchIcon, TvIcon, Wifi } from 'lucide-react'
import { Fragment } from 'react'
import ContentKeysSearch from './ContentKeysSearch'

const HeaderIcons = [
    {
        id: "connection",
        icon: <Wifi color='white'/>
    },
    {
        id: 'notification',
        icon: <Bell color='white'/>
    },
    {
        id: 'search',
        icon: <SearchIcon color='white'/>
    },
]


const HeaderItems = () => {

    return (
        <div className='flex items-center '>
            {HeaderIcons.map((icon) => (
                <div key={icon.id} className='w-6 h-6 lg:h-10 lg:w-10 rounded-full hover:bg-white/25 cursor-pointer flex justify-center items-center'>
                    {icon.icon}
                </div>
            ))}
        </div>
    )
}


const YoutubeHeader = ( {setOpen }) => {
    return (
        <div className=''>

            <div className='flex justify-between items-center px-3 py-3'>
                <div className='flex gap-2 items-center'>
                    <TvIcon size={30} color='red'/>
                    <span className='text-xl lg:text-2xl text-white'>Youtube</span>
                </div>
                <HeaderItems />
            </div>
            <ContentKeysSearch setOpen={setOpen}></ContentKeysSearch>
        </div>
    )
}

export default YoutubeHeader
