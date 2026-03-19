import { useCallback } from 'react';

export function useInitials() {
  return useCallback((fullName?: string | null): string => {
    const cleaned = (fullName ?? '').trim();
    if (!cleaned) return '';

    // Split on any whitespace and remove empty entries
    const names = cleaned.split(/\s+/).filter(Boolean);

    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }, []);
}
