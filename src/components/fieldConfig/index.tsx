import { FC } from 'react'
import { Checkbox, Label, Select, TextInput } from 'flowbite-react'
import MultiSelect from 'react-select'
import makeAnimated from 'react-select/animated'
import { Control, Controller, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import { Parameter } from '../../services/types/utils'

const animatedComponents = makeAnimated()

interface Props {
    parameter: Parameter
    val?: string
    disabled: boolean
    control: Control<FieldValues, any>
    errors: FieldErrors<FieldValues>
    register: UseFormRegister<any>
    validateDependencies: (code: string) => void
}
const FieldConfig: FC<Props> = ({
    parameter,
    val,
    disabled,
    control,
    errors,
    register,
    validateDependencies,
}) => {
    const getField = () => {
        if (parameter.type === 'string' || parameter.type === 'number') {
            return (
                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor={parameter.code} value={parameter.label} />
                    </div>
                    <TextInput
                        type={parameter.type}
                        disabled={disabled}
                        color={errors[parameter.code] && 'failure'}
                        defaultValue={parameter.defaultValue}
                        {...register(parameter.code, {
                            value: val,
                            onChange: () => validateDependencies(parameter.code),
                        })}
                    />
                    {errors[parameter.code] && (
                        <Label color='failure' className='text-xs'>
                            {errors[parameter.code]?.message?.toString()}
                        </Label>
                    )}
                </div>
            )
        } else if (parameter.type === 'boolean') {
            return (
                <div>
                    <div className='flex items-center gap-2' style={{ width: 'inherit' }}>
                        <Checkbox
                            disabled={disabled}
                            color={errors[parameter.code] && 'failure'}
                            defaultValue={parameter.defaultValue}
                            {...register(parameter.code, {
                                value: val === 'true',
                                onChange: () => validateDependencies(parameter.code),
                            })}
                        />
                        <Label htmlFor={parameter.code} value={parameter.label} />
                    </div>
                    {errors[parameter.code] && (
                        <Label color='failure' className='text-xs'>
                            {errors[parameter.code]?.message?.toString()}
                        </Label>
                    )}
                </div>
            )
        } else if (parameter.type.includes('select:')) {
            const options = parameter.type.split('select:')[1].split(',')
            return (
                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor={parameter.code} value={parameter.label} />
                    </div>
                    <Select
                        color={errors[parameter.code] && 'failure'}
                        disabled={disabled}
                        {...register(parameter.code, {
                            value: val,
                            onChange: () => validateDependencies(parameter.code),
                        })}
                    >
                        {options.map((option, index) => (
                            <option key={`OptionFieldConfig${index}`} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>
                    {errors[parameter.code] && (
                        <Label color='failure' className='text-xs'>
                            {errors[parameter.code]?.message?.toString()}
                        </Label>
                    )}
                </div>
            )
        } else if (parameter.type.includes('multiSelect:')) {
            const options = parameter.type
                .split('multiSelect:')[1]
                .split(',')
                .map((option) => ({ value: option, label: option }))

            return (
                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor={parameter.code} value={parameter.label} />
                    </div>
                    <Controller
                        control={control}
                        defaultValue={val ?? parameter.defaultValue}
                        name={parameter.code}
                        render={({ field: { onChange, value, ref } }) => (
                            <MultiSelect
                                isDisabled={disabled}
                                ref={ref}
                                components={animatedComponents}
                                value={options.filter((c) => value.includes(c.value))}
                                onChange={(val) => onChange(val.map((c) => c.value))}
                                options={options}
                                isMulti
                            />
                        )}
                    />
                    {errors[parameter.code] && (
                        <Label color='failure' className='text-xs'>
                            {errors[parameter.code]?.message?.toString()}
                        </Label>
                    )}
                </div>
            )
        }
    }
    return getField()
}

export default FieldConfig
