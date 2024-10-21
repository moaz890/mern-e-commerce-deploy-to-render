import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addFeatureImage, getFeatureImages } from "@/store/common/featureSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(''); 
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { images } = useSelector(state => state.feature); 
  const dispatch = useDispatch();
    
  const handleUploadFeatureImage = (e) => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
        if (data?.payload?.success) {
            dispatch(getFeatureImages());
            setImageFile(null)
            setUploadedImageUrl("")
            toast({
                title: "Image Uploaded Successfully"
            })
        }
    })    
  }

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])
  return (
    <div>
      
      <ProductImageUpload
        file={imageFile} 
        setFile={setImageFile} 
        uploadedImageUrl={uploadedImageUrl} 
        setUploadedImageUrl={setUploadedImageUrl} 
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        
        />
        <Button className='mt-5 w-full'
            disabled={imageLoadingState || uploadedImageUrl === ''}
            onClick={handleUploadFeatureImage}
        >Upload</Button>

        <div className="flex items-center mt-4 gap-2 flex-col">
            {
                images?.length > 0 &&
                images.map((image, index) =>(
                    <div key={index} className="relative w-full">
                        <img src={image.image} alt="" 
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AdminDashboard;
