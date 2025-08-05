export async function getValue(key) {
  try {
    const result = await chrome.storage.local.get([key]);
    return result[key];
  } catch (error) {
    return undefined;
  }
}

export async function setValue(key, value) {
  try {
    await chrome.storage.local.set({ [key]: value });
  } catch (error) {}
}