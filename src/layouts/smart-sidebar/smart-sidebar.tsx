import { cn } from "@/lib/utils"
import { createContext, ReactNode } from "react"
import SmartButton from "@/components/ui/smart-button"
import useSmartSidebarLogic from "./use-smart-sidebar-logic"
import SmartIcon from "@/components/ui/smart-icon"

export const SmartSidebarContext = createContext({} as ReturnType<typeof useSmartSidebarLogic>)

export default function SmartSidebar(
    props: { children?: ReactNode } & ReturnType<typeof useSmartSidebarLogic>
) {
    const {
        showMenu,
        children,
        className,
        toggleMenu,
        buttonClassName,
    } = props

    if (!showMenu) return null

    return (
        <SmartSidebarContext.Provider value={props}>
            <div
                className={cn(
                    `
                    relative
                    p-2
                    text-sm
                    w-full
                    rounded-md
                    rounded-tr-none
                    h-full max-w-[500px]
                    flex flex-col gap-3
                    border
                    border-gray-500
                    bg-black/85 text-white
                    pointer-events-auto
                    `,
                    className
                )}
            >
                <div 
                onClick={toggleMenu}
                className="absolute z-2 cursor-pointer -top-1.5 -right-1.5 flex justify-center  text-gray-400 items-center rounded-full p-[0.01rem] border-2 border-gray-500 bg-gray-900 hover:bg-gray-700 hover:border-gray-400 hover:text-gray-300">
                    <SmartIcon iconCode="minus" className="h-0.5 w-0.5 pointer-events-none"/>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
                <SmartButton onClick={toggleMenu} className="w-full" label="Hide"/>
            </div>
        </SmartSidebarContext.Provider>
    )
}
