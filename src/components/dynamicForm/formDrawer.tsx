import { FC, useState } from 'react'
import { Button } from 'flowbite-react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Field } from '../types/dynamicForm'
// import DynamicField from '../dynamicField'

interface Inputs {}
interface Props {
    fields: Field[]
}
const FormDrawer: FC<Props> = ({ fields }) => {
    const [submit, setSubmit] = useState(false)

    const {
        handleSubmit,
        // register,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async () => {
        setSubmit(true)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* {fields.map((field, index) => (
                <div className='mb-3' key={`fieldDrawer${index}`}>
                    <DynamicField key={`fieldForm${index}`} field={field} register={register('password', { required: true })}/>
                </div>
            ))} */}
            <div className='mb-6'>
                <Button type='submit' className='w-full' disabled={!submit} isProcessing={submit}>
                    Crear
                </Button>
            </div>
        </form>
    )
}

export default FormDrawer
