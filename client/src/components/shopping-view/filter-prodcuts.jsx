import { Fragment } from 'react'
import { filterOptions } from '../config'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const FilterProducts = ({ filters, handleFilters}) => {
  return (
    <div className='bg-background rounded-lg shadow-sm text-left'>
        <div className='p-4 border-b'>
            <h2 className='text-xl font-extrabold'>Filters</h2>
        </div>
        <div className="p-4 space-y-4">
            {Object.keys(filterOptions).map(filterkey => (
                <Fragment key={filterkey}>
                    <div>
                        <h3 className='text-base font-bold'>{filterkey}</h3>
                        <div className='grid gap-2 mt-2'>
                            {
                                filterOptions[filterkey].map((option) => (
                                   <Label key={option.id} className='flex items-center gap-2 font-medium'>
                                    <Checkbox onCheckedChange={() => handleFilters(filterkey, option.id)} checked={filters[filterkey]?.includes(option.id)} />
                                    {option.label}
                                   </Label> 
                                ))
                            }
                        </div>
                    </div>
                    <Separator/>

                </Fragment>
                
            ))}
        </div>
    </div>
  )
}

export default FilterProducts