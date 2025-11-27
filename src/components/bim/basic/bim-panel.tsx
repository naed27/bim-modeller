import { useRef, useEffect } from "react"

export default function BimPanel({
  label,
  active,
  className,
  children,
  ...props
}: {
  label?: string
  active?: boolean
  className?: string
  children?: React.ReactNode
  [key: string]: any
}) {
  const panelRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    // add more native listeners if needed
  }, [])

  return (
    <bim-panel
      ref={panelRef}
      label={label}
      active={active ? true : undefined}
      className={className}
      {...props}
    >
      {children}
    </bim-panel>
  )
}
