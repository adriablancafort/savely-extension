import { draggable } from '@neodrag/svelte';

export async function drag(node) {
  const position = await getPosition();
  
  return draggable(node, {
    position,
    onDragEnd: ({ offsetX, offsetY }) => {
      setPosition({ x: offsetX, y: offsetY });
    }
  });
}

async function getPosition() {
  try {
    const stored = await chrome.storage.local.get(['position']);

    if (stored.position) return stored.position;

    return { x: 0, y: 0 };
  } catch (error) {
    return { x: 0, y: 0 };
  }
}

async function setPosition(newPosition) {
  try {
    await chrome.storage.local.set({ position: newPosition });
  } catch (error) {}
}
