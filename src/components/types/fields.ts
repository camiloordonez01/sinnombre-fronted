export interface DefaultProps {
    disabled?: boolean
    required?: boolean
}

export interface DefaultField {
    name: string
    label: string
    rules?: string[]
}

export interface SelectField extends DefaultField {
    type: 'select'
}

interface OptionSelect {
    value: string
    label: string
    selected?: boolean
    disabled?: boolean
}

interface SelectCustomField {
    kind: 'custom'
    options?: OptionSelect[]
}

interface SelectTableField {
    kind: 'table'
}

export interface StringField extends DefaultField {
    type: 'string'
    props?: DefaultProps & {
        maxLenght?: number
        minLenght?: number
        placeholder?: string
    }
}

export interface TextAreaField extends DefaultField {
    type: 'text-area'
    props?: DefaultProps & {
        maxLenght?: number
        minLenght?: number
        placeholder?: string
    }
}

export interface EmailField extends DefaultField {
    type: 'email'
    props?: DefaultProps & {
        maxLenght?: number
        minLenght?: number
        placeholder?: string
    }
}

export interface PasswordField extends DefaultField {
    type: 'password'
    props?: DefaultProps & {
        maxLenght?: number
        minLenght?: number
        placeholder?: string
    }
}

export interface CheckBoxField extends DefaultField {
    type: 'checkbox'
    props?: DefaultProps & {
        checked?: boolean
    }
}

export interface RadioField extends DefaultField {
    type: 'radio'
    value?: string
    props?: DefaultProps & {
        checked?: boolean
    }
}

export interface FileField extends DefaultField {
    type: 'file'
    props?: DefaultProps & {
        accept?: string
    }
}

export interface ImageField extends DefaultField {
    type: 'image'
    props?: DefaultProps & {
        alt?: string
        height?: string
        width?: string
        src: string
    }
}

export interface NumberField extends DefaultField {
    type: 'number'
    props?: DefaultProps & {
        max?: number
        min?: number
        placeholder?: string
    }
}

export interface DateTimeField extends DefaultField {
    type: 'date'
    props?: DefaultProps & {
        max?: number
        min?: number
    }
}

export interface RangeField extends DefaultField {
    type: 'range'
    props?: DefaultProps & {
        max?: number
        min?: number
    }
}
