import { draggable } from '@neodrag/svelte';

export async function drag(node, { key, ...options } = {}) {
  const position = await getPosition(key);
  
  return draggable(node, {
    position,
    onDragEnd: ({ offsetX, offsetY }) => {
      setPosition(key, { x: offsetX, y: offsetY });
    },
    ...options
  });
}

async function getPosition(key) {
  try {
    const stored = await chrome.storage.local.get([key]);

    if (stored[key]) return stored[key];

    return { x: 0, y: 0 };
  } catch (error) {
    return { x: 0, y: 0 };
  }
}

async function setPosition(key, newPosition) {
  try {
    await chrome.storage.local.set({ [key]: newPosition });
  } catch (error) {}
}
