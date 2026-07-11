export type HapticPattern = 'switch' | 'buzz' | 'dial';

export function triggerHaptic(pattern: HapticPattern): void {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  const patterns: Record<HapticPattern, number[]> = {
    switch: [10],
    buzz: [20, 10, 20],
    dial: [5, 5, 5, 5, 5],
  };
  navigator.vibrate(patterns[pattern]);
}
