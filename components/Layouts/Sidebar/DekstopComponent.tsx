import React, { useState, useEffect, useRef, Fragment, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import SidebarList from './SidebarList';
import { MenuProps } from '../../../utils/routes';

type Props = {
    sidebar: boolean
    setSidebar: Dispatch<SetStateAction<boolean>>;
    menus: MenuProps[];
}

const DekstopComponent = ({ sidebar, setSidebar, menus }: Props) => {
    const router = useRouter()
    const trigger = useRef<HTMLButtonElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)

    const getFromLocalStorage = (key: string) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        return localStorage.getItem(key)
    };

    const initiaLocalStorage: any = { sidebar: getFromLocalStorage("sidebar-component") ? JSON.parse(getFromLocalStorage("sidebar-component") || '{}') : [] };

    const [sidebarExpanded, setSidebarExpanded] = useState(initiaLocalStorage === null ? false : initiaLocalStorage === 'true');

    useEffect(() => {
        setSidebarExpanded(initiaLocalStorage === null ? false : initiaLocalStorage === 'true')
    }, [initiaLocalStorage])

    // close on click outside
    useEffect(() => {
        type Props = {
            target: any
        }
        const clickHandler = ({ target }: Props) => {
            if (!sidebarRef.current || !trigger.current) return
            if (
                !sidebarRef ||
                sidebarRef.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setSidebar(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        type Props = {
            keyCode: any
        }
        const keyHandler = ({ keyCode }: Props) => {
            if (!sidebar || keyCode !== 27) return
            setSidebar(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    useEffect(() => {
        const body = document.querySelector('body');
        const parentNode = body?.parentNode;

        if (!(parentNode instanceof Element)) {
            throw new Error('box.parentNode is not an Element');
        }

        console.log(parentNode.querySelector('body'), 'body');

        localStorage.setItem('sidebar-component', sidebarExpanded?.toString())
        if (sidebarExpanded) {
            body?.classList.add('sidebar-component')
        } else {
            body?.classList.remove('sidebar-component')
        }
    }, [sidebarExpanded]);

    return (
        <Fragment>
            <aside
                ref={sidebarRef}
                className={`border-gray-4 shadow-card absolute inset-y-0 left-0 z-9999 flex w-full max-w-sm flex-col overflow-y-hidden bg-gray duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* <!-- SIDEBAR HEADER --> */}

                <div className='w-full flex flex-col h-full overflow-y-auto duration-300 ease-linear'>
                    {/* <!-- Sidebar Menu --> */}
                    <div className='w-full flex-flex-col gap-2 px-4 lg:px-6 overflow-y-auto pt-12'>
                        {/* <SidebarList menus={menus} sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} /> */}
                    </div>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
            {/* overlay */}
            <button
                ref={trigger}
                onClick={() => setSidebar(!sidebar)}
                aria-controls='sidebar-component'
                aria-expanded={sidebar}
                className={`lg:static ${sidebar && 'fixed z-9998 inset-0 bg-black bg-opacity-40 transition-opacity duration-100 transform opacity-100'}`}>

            </button>
        </Fragment>
    )
}

export default DekstopComponent;