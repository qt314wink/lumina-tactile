export function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function supportsGyro(): boolean {
  return typeof DeviceOrientationEvent !== 'undefined';
}

export function requestGyroPermission(): Promise<boolean> {
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof (DeviceOrientationEvent as any).requestPermission === 'function'
  ) {
    return (DeviceOrientationEvent as any)
      .requestPermission()
      .then((state: string) => state === 'granted');
  }
  return Promise.resolve(true);
}
