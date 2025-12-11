import { useEffect, useState } from "react";

export default function useCountUp({
  to,
  fps = 120,
  from = 0,
  duration = 1000,
}: {
  to: number;
  fps?: number;
  from?: number;
  duration?: number;
  isLoading?: boolean;
}) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (isNaN(to) || isNaN(from)) return;

    const totalFrames = Math.round((duration / 1000) * fps);
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const current = Math.round(from + (to - from) * progress);
      setValue(current);

      if (progress === 1) clearInterval(interval);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [to, from, duration, fps]);

  return value;
}
