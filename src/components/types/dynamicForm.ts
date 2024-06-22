import {
    StringField,
    EmailField,
    PasswordField,
    CheckBoxField,
    RadioField,
    FileField,
    ImageField,
    NumberField,
    DateTimeField,
    RangeField,
    TextAreaField,
} from './fields'

export type Field =
    | StringField
    | EmailField
    | PasswordField
    | CheckBoxField
    | RadioField
    | FileField
    | ImageField
    | NumberField
    | DateTimeField
    | RangeField
    | TextAreaField

interface FormDynamicGroup {
    name?: string
    fields: Field[]
}

export interface FormDynamicData {
    name?: string
    description?: string
    groups: FormDynamicGroup[]
}

interface FormDynamic {
    pathname: string
    titles: {
        all?: string
        create?: string
        edit?: string
        view?: string
        delete?: string
    }
    entity: string
    mode: 'customizable' | 'default'
}

export interface FormDynamicTabs extends FormDynamic {
    type: 'tabs'
    tabs: FormDynamicData[]
}

export interface FormDynamicModal extends FormDynamic {
    type: 'modal'
    data: FormDynamicGroup[]
}

export interface FormDynamicDrawer extends FormDynamic {
    type: 'drawer'
    data: Field[]
}

export type FormConfigure = FormDynamicModal | FormDynamicDrawer | FormDynamicTabs
