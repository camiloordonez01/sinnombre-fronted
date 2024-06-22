import { FC } from 'react'
import { Tabs } from 'flowbite-react'
import { FormDynamicData } from '../types/dynamicForm'

interface Props {
    tabs: FormDynamicData[]
}
const FormTabs: FC<Props> = ({ tabs }) => {
    return (
        <Tabs aria-label='Default tabs' style='default'>
            {tabs.map((tab, index) => (
                <Tabs.Item key={`tabItem${index}`} active title={tab.name}>
                    {tab.groups.map((group) => (
                        <div>
                            <h2>{group.name}</h2>
                            <div className='grid grid-cols-4 gap-6'>
                                {group.fields.map(() => (
                                    <div></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Tabs.Item>
            ))}
        </Tabs>
    )
}

export default FormTabs
