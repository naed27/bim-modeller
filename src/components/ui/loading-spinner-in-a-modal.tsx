import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function LoadingSpinnerInAModal({
  showWhen,
  progressPercentage,
}: {
  showWhen: boolean;
  progressPercentage?: number | null;
}) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!showWhen) return;

    // Blur focused element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Create an overlay blocker element instead of altering body styles
    const blocker = document.createElement("div");
    blocker.style.position = "fixed";
    blocker.style.inset = "0";
    blocker.style.zIndex = "99998";
    blocker.style.pointerEvents = "auto";
    blocker.style.background = "transparent";
    blocker.style.userSelect = "none";
    blocker.style.cursor = "wait";

    document.body.appendChild(blocker);

    // Trap keyboard input gently (no override of other handlers)
    const handleKeyDown = (e: KeyboardEvent) => e.preventDefault();
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      blocker.remove();
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [showWhen]);

  if (!showWhen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-99999 flex items-center justify-center bg-black/60 flex-col gap-2"
      style={{ pointerEvents: "auto" }}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-info border-t-transparent" />
      {progressPercentage && <p>{progressPercentage +' %'}</p>}
    </div>,
    document.body
  );
}
