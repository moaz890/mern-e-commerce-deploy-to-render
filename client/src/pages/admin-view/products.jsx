import ProductImageUpload from '@/components/admin-view/image-upload';
import ProductTile from '@/components/admin-view/product-tile';
import Form from '@/components/common/form';
import { addProductFormElements } from '@/components/config';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { addNewProduct, editProduct, fetchProducts } from '@/store/admin/productSlice';
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    price: '',
    brand: "",
    salePrice: '',
    totalStock: "",
}

const AdminProducts = () => {

    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(''); 
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { products } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const { toast } = useToast();
    
    const isFormValid = () => {
        return Object.values(formData).every(value => {
            if (typeof value === 'string') {
                return value.trim() !== '';
            }
            return true;
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        currentEditedId !== null ?
        dispatch(editProduct({id: currentEditedId, FormData: formData}))
        .then((data) => {
            if (data?.payload?.success) {
                setOpenCreateProductDialog(false);
                dispatch(fetchProducts());
                setFormData(initialFormData);
                toast({
                    title: data?.payload?.message,
                    variant: "success"
                })
            }
        })
        :
        dispatch(addNewProduct({
            ...formData,
            image: uploadedImageUrl,
        })).then((data) => {
            
            if (data?.payload?.success) {
                dispatch(fetchProducts());
                setImageFile(null);
                setFormData(initialFormData);
                setOpenCreateProductDialog(false);
                toast({
                    title: data?.payload?.message,
                    variant: "success"
                })
            }
        })
    }
    

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])
    return (
        <Fragment>
            <div className='mb-5 flex justify-end w-full'>
                <Button
                    onClick={() => {
                        setOpenCreateProductDialog(true)
                    }}
                >Add new Product</Button>
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 '>
                {   
                    products && products.length > 0 ?
                    products.map((product => (
                        <ProductTile key={product._id} product={product} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductDialog={setOpenCreateProductDialog} setFormData={setFormData} />
                    )))
                    :
                    <></>
                }
            </div>
            <Sheet open={openCreateProductDialog} onOpenChange={() => {                
                    setOpenCreateProductDialog(false);
                    setFormData(initialFormData);
                    setCurrentEditedId(null);
                }
                }>
                <SheetContent side="right" className='overflow-auto'>
                    <SheetHeader>
                        <SheetTitle>
                            {
                                currentEditedId !== null ?
                                "Edit Product"
                                :
                                "Add new Product"
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload 
                        file={imageFile} 
                        setFile={setImageFile} 
                        uploadedImageUrl={uploadedImageUrl} 
                        setUploadedImageUrl={setUploadedImageUrl} 
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditedId !== null}
                        />
                    <div className="py-6">
                        <Form
                        formControls={addProductFormElements}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={ currentEditedId !== null ? "Edit Product" : "Add Product"}
                        onSubmit={onSubmit}
                        isFormValid={isFormValid}
                        >
                        </Form>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts;
