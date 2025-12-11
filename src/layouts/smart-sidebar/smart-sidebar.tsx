import { cn } from "@/lib/utils"
import { createContext, ReactNode } from "react"
import SmartButton from "@/components/ui/smart-button"
import useSmartSidebarLogic from "./use-smart-sidebar-logic"

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
                    p-2
                    text-sm
                    w-full
                    rounded-md
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
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
                <SmartButton onClick={toggleMenu} className="w-full" label="Hide"/>
            </div>
        </SmartSidebarContext.Provider>
    )
}
