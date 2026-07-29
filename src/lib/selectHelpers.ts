/** Base UI Select passes `null` when clearing; ignore for controlled POC selects. */
export function selectValue(value: string | null, fallback = ""): string {
  return value ?? fallback;
}

export function onSelectString(setter: (value: string) => void) {
  return (value: string | null) => {
    if (value != null) setter(value);
  };
}
