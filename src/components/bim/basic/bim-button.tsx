import { cn } from "../../../lib/utils"
import { useEffect, useRef } from "react"

export default function BimButton({
  label,
  className,
  onClick = ()=> {},
}: {
  label: string
  className?: string
  onClick?: () => void
}) {
  const btnRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    btn.addEventListener("click", onClick)
    return () => btn.removeEventListener("click", onClick)
  }, [onClick])

  return (
    <bim-button
      ref={btnRef}
      label={label}
      className={cn("content-none shadow-none", className)}
    />
  )
}
