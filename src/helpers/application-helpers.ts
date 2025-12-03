export const removeSessionStorageValue = (
  key: string | undefined,
  silent: boolean = false
): void => {
  try {
    if (!key) return;

    window.sessionStorage.removeItem(key);
    if (silent) return;
    window.dispatchEvent(new StorageEvent("storage"));
  } catch (error) {
    return;
  }
};

export const getAndDeleteSessionStorageValue = <T = any>(
  key: string,
  defaultValue: T
): T => {
  try {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue) {
      sessionStorage.removeItem(key);
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        return storedValue as T;
      }
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const setSessionStorageValue = (
  key: string | undefined,
  value: any,
  silent: boolean = false,
  storageKeyAcrossTabs?: string
): void => {
  try {
    if (!key) return;
    const newValue = typeof value === "string" ? value : JSON.stringify(value);
    window.sessionStorage.setItem(key, newValue);

    if (silent) return;
    window.dispatchEvent(new StorageEvent("storage", { key, newValue }));

    if (storageKeyAcrossTabs) {
      localStorage.setItem(
        storageKeyAcrossTabs,
        JSON.stringify({ key, value: newValue })
      );
      localStorage.removeItem(storageKeyAcrossTabs);
      window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
    }
  } catch {
    return;
  }
};

export const setLocalStorageValue = (
  key: string | undefined,
  value: any,
  silent: boolean = false
): void => {
  try {
    if (!key) return;

    const newValue = typeof value === "string" ? value : JSON.stringify(value);
    window.localStorage.setItem(key, newValue);
    if (silent) return;
    window.dispatchEvent(new StorageEvent("storage"));
  } catch (error) {
    return;
  }
};

export const removeLocalStorageValue = (
  key: string,
  silent: boolean = false
): void => {
  try {
    window.localStorage.removeItem(key);
    if (silent) return;
    window.dispatchEvent(new StorageEvent("storage"));
  } catch (error) {
    return;
  }
};

export const getSessionStorageValue = <T = any>(
  key: string | undefined,
  defaultValue: T
): T => {
  try {
    if (!key) return defaultValue;

    const storedValue = sessionStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        return storedValue as T;
      }
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const getLocalStorageValue = <T = any>(
  key: string | undefined,
  defaultValue: T
): T => {
  try {
    if (!key) return defaultValue;

    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        return storedValue as T;
      }
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const getAndDeleteLocalStorageValue = <T = any>(
  key: string | undefined,
  defaultValue: T
): T => {
  try {
    if (!key) return defaultValue;

    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      localStorage.removeItem(key);
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        return storedValue as T;
      }
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export function initSessionStorageSync(
  storageKey?: string,
  callback?: (...args: any) => any
) {
  const onEventHandler = (event: StorageEvent) => {
    if (event.key === storageKey && event.newValue) {
      try {
        const { key, value } = JSON.parse(event.newValue);
        window.sessionStorage.setItem(key, value);
        callback?.();
      } catch (error) {}
    }
  };

  window.addEventListener("storage", onEventHandler);

  return () => {
    window.removeEventListener("storage", onEventHandler);
  };
}
