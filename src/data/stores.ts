import { persistentAtom } from '@nanostores/persistent';
export const $pubListMode = persistentAtom<string>('pubListMode', 'cards');
