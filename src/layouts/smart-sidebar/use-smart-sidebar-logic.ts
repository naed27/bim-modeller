import useSmartMenuToggler from "@/hooks/use-smart-menu-toggler"

export default function useSmartSidebarLogic(props:{
    className?: string
    buttonClassName?: string
    isOpen?: boolean
}={}) {

    const { isOpen = false } = props

    const menuTogglerLogic = useSmartMenuToggler(isOpen)

    return {
        ...props,
        ...menuTogglerLogic,
    }
}