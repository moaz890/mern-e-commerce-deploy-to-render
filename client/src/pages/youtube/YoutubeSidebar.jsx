import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { FireExtinguisherIcon, GamepadIcon, ListVideoIcon, MusicIcon, TrophyIcon, TvIcon } from 'lucide-react'
import { Fragment } from 'react'


const MenuLinks = [
    {
        id: "timeline-content",
        text: "Timeline Content",
        icon: <FireExtinguisherIcon size={30} color='white'/>
    },
    {
        id: "music",
        text: "Music",
        icon: <MusicIcon size={30} color='white'/>
    },
    {
        id: "live",
        text: "Live",
        icon: <ListVideoIcon size={30} color='white'/>
    },
    {
        id: 'video-games',
        text: "Video Games",
        icon: <GamepadIcon size={30} color='white'/>
    },
    {
        id: "sports",
        text: "Sport",
        icon: <TrophyIcon />
    }
]

const MenuItems = ({ setOpen }) =>{

}

const YoutubeSidebar = ({ open, setOpen}) => {
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <div>
                    <SheetContent side='left' className='h-full'>
                        <SheetHeader className={'border-r'}>
                            <SheetTitle className='flex items-center gap-2'>
                                <TvIcon size={30} color='red'/>
                                <span className='text-2xl font-bold'>Youtube</span>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>
                    </SheetContent>
                </div>
            </Sheet>
            <aside className='lg:flex flex-col gap-2 px-3 py-3 w-64 hidden'>
                <div className='w-full mb-2 flex items-center gap-2'>
                    <TvIcon color='red' size={30}/>
                    <span className='text-3xl font-bold text-white'>Youtube</span>
                </div>
            </aside>
        </Fragment>
    )
}

export default YoutubeSidebar
