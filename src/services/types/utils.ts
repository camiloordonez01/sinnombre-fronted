export interface Parameter {
    id: number
    name: string
    code: string
    description: string
    label: string
    type: string
    moduleCode: string
    defaultValue: string
    notNull: boolean
    dependenceParameterCode?: string
    dependenceParameterValue?: string
}

export type ModulesCode = 'music' | 'menu' | 'account'

export interface Config {
    code: string
    value: string
}