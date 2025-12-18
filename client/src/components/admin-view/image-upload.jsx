import { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const ProductImageUpload = ({file, setFile , setUploadedImageUrl, setImageLoadingState, imageLoadingState, isEditMode}) => {
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setFile(selectedFile);
    }

    const handleDragOver = (e) =>{
        e.preventDefault();
    }
    const handleDrop = (e) =>{
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) setFile(droppedFile);
    }

    const handleRemoveImage = (e) => {
        setFile(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    useEffect(() => {

        async function UploadCloudImageToCloudinary() {
            setImageLoadingState(true)
            const data = new FormData();
            data.append("my_file", file);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data);
            console.log(response);
            if (response?.data?.success) {
                setUploadedImageUrl(response?.data?.result?.url);
                setImageLoadingState(false);
            }
        }

        if (file !== null) UploadCloudImageToCloudinary();
    }, [file, setImageLoadingState, setUploadedImageUrl])
    return (
        <div className='w-full max-w-md mx-auto'>
            <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
            <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`${isEditMode ? 'opacity-60' : ''} border-2 border-dashed rounded-lg p-4 mt-4`}>
                <Input 
                    type='file' 
                    name='image' 
                    id='image-upload' 
                    className='hidden' ref={inputRef}
                    onChange={handleImageChange}
                    disabled={isEditMode}
                />
                {
                    !file ? 
                    <Label htmlFor='image-upload' className={`flex flex-col items-center justify-center h-32 cursor-pointer ${isEditMode ?'cursor-not-allowed': "" }`}>
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
                        <span>Drag & Drop or Click to upload Image</span>
                    </Label>
                    :
                    imageLoadingState ?
                        <Skeleton className={'h-10 bg-gray-100'}/>
                        :
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center ">
                            <FileIcon className='w-8 text-primary mr-2 h-8'/>
                        </div>
                        <p className='text-sm font-medium'>{file.name}</p>
                        <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground'
                            onClick={handleRemoveImage}
                        >
                            <XIcon className='w-4 h-4'/>
                            <span className='sr-only'>Remove File</span>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload;