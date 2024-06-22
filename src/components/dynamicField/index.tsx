import { FC } from 'react'
import {
    Checkbox,
    Label,
    Datepicker,
    TextInput,
    Radio,
    RangeSlider,
    Textarea,
} from 'flowbite-react'
import { HiMail, HiLockClosed } from 'react-icons/hi'
import { Field } from '../types/dynamicForm'
import { RadioField } from '../types/fields'
import { UseFormRegister } from 'react-hook-form'

interface Props {
    field: Field
    register: UseFormRegister<any>
}
const DynamicField: FC<Props> = ({ field, register }) => {
    const getField = () => {
        switch (field.type) {
            case 'checkbox':
                return (
                    <div className='flex items-center gap-2'>
                        <Checkbox name={field.name} {...field.props} {...register} />
                        <Label htmlFor={field.name} className='flex'>
                            {field.label}
                        </Label>{' '}
                        {field.props?.required && <Label color='failure'>*</Label>}
                    </div>
                )
            case 'date':
                return (
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor={field.name} value={field.label} />{' '}
                            {field.props?.required && <Label color='failure'>*</Label>}
                        </div>
                        <Datepicker
                            language='es-ES'
                            name={field.name}
                            {...field.props}
                            {...register}
                        />
                    </div>
                )
            case 'email':
                return (
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor={field.name} value={field.label} />{' '}
                            {field.props?.required && <Label color='failure'>*</Label>}
                        </div>
                        <TextInput
                            type='email'
                            rightIcon={HiMail}
                            name={field.name}
                            {...field.props}
                            {...register}
                        />
                    </div>
                )
            case 'password':
                return (
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor={field.name} value={field.label} />{' '}
                            {field.props?.required && <Label color='failure'>*</Label>}
                        </div>
                        <TextInput
                            type='password'
                            rightIcon={HiLockClosed}
                            name={field.name}
                            {...field.props}
                            {...register}
                        />
                    </div>
                )
            case 'radio':
                const radioField: RadioField = field
                return (
                    <div className='flex items-center gap-2'>
                        <Radio
                            name={field.name}
                            value={radioField.value}
                            {...field.props}
                            {...register}
                        />
                        <Label htmlFor={field.name} value={field.name} />{' '}
                        {field.props?.required && <Label color='failure'>*</Label>}
                    </div>
                )
            case 'range':
                return (
                    <div>
                        <div className='mb-1 block'>
                            <Label htmlFor={field.name} value={field.name} />{' '}
                            {field.props?.required && <Label color='failure'>*</Label>}
                        </div>
                        <RangeSlider name={field.name} {...field.props} {...register} />
                    </div>
                )
            case 'text-area':
                return (
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor={field.name} value={field.name} />{' '}
                            {field.props?.required && <Label color='failure'>*</Label>}
                        </div>
                        <Textarea name={field.name} rows={4} {...field.props} {...register} />
                    </div>
                )
            default:
                return (
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor={field.name} value={field.label} />{' '}
                            {field.props?.required && <Label color='failure'>*</Label>}
                        </div>
                        <TextInput
                            type={field.type}
                            name={field.name}
                            {...field.props}
                            {...register}
                        />
                    </div>
                )
        }
    }

    return getField()
}

export default DynamicField
