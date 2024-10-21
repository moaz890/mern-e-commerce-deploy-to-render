import { Input } from '../ui/input';
import { Select, SelectValue, SelectContent, SelectTrigger, SelectItem } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const TYPES = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea',
    NUmber: "number"
}

const Form = ({ formControls, onSubmit, formData, setFormData, buttonText, isFormValid }) => {

    

    function renderInputsByComponentType(control) {
        let element = null;;
        const value = formData[control.name] || "";

        switch (control.componentType) {
            case TYPES.INPUT:
                element = (<Input 
                    type={control.type} 
                    name={control.name}
                    placeholder={control.placeholder}
                    id={control.name} 
                    value={value} 
                    onChange={(e) => setFormData({
                        ...formData,
                        [control.name]: e.target.value
                    })}
                    />)
                break;
            case TYPES.SELECT:
                element = (
                    <Select value={value}
                        onValueChange={(value) => setFormData({
                            ...formData,
                            [control.name]: value
                        })}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={control.label}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {control.options && control.options.length > 0 ? control.options.map((option, index) => 
                                (
                                    <SelectItem value={option.value} key={value+index}>
                                        {option.label}
                                    </SelectItem>
                                )
                            )
                            :
                            null
                        }
                        </SelectContent>
                    </Select>
                )
                break;
            case TYPES.TEXTAREA:
                element = (<Textarea 
                    value={value} 
                    onChange={(e) => setFormData({
                        ...formData,
                        [control.name]: e.target.value
                    })} 
                    name={control.name} 
                    id={control.name} 
                    className='border border-gray-400 rounded-md p-2'></Textarea>)
                break;
            default:
                element = (<Input 
                    type={control.type} 
                    name={control.name} 
                    placeholder={control.placeholder}
                    id={control.name}
                    value={value} 
                    onChange={(e) => setFormData({
                        ...formData,
                        [control.name]: e.target.value
                    })}
                    />)
        }
        return element;
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {
                    formControls.map((control, index) => {
                        return (
                            <div key={index} className='grid w-full gap-1.5'>
                                <label htmlFor={control.name} className='mb-1 text-left'>{control.label}</label>
                                {
                                    renderInputsByComponentType(control)
                                }
                            </div>
                        )
                    })
                }
            </div>
            <Button 
                type='submit' 
                className="mt-2 w-full" 
                disabled={isFormValid ? !isFormValid() : false}
            >{buttonText || "Submit"}</Button>
        </form>
    )
}

export default Form
