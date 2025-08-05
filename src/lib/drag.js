import { getValue, setValue } from '$lib/storage.js';
import { draggable } from '@neodrag/svelte';

export async function drag(node, { key, ...options } = {}) {
  const position = await getValue(key) ?? { x: 0, y: 0 };
  
  return draggable(node, {
    position,
    onDragEnd: ({ offsetX, offsetY }) => {
      setValue(key, { x: offsetX, y: offsetY });
    },
    ...options
  });
}
