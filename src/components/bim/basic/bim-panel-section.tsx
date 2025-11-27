import { useRef, useEffect } from "react"

export default function BimPanelSection({
  label,
  className,
  children,
  ...props
}: {
  label?: string
  className?: string
  children?: React.ReactNode
  [key: string]: any
}) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    // add more native listeners if needed
  }, [])

  return (
    <bim-panel-section ref={sectionRef} label={label} className={className} {...props}>
      {children}
    </bim-panel-section>
  )
}
