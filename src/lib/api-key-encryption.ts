export async function encryptApiKey(
  plaintextApiKey: string,
  base64PublicKey: string,
) {
  const publicKeyBytes = Uint8Array.from(atob(base64PublicKey), (c) =>
    c.charCodeAt(0),
  );
  const publicKey = await crypto.subtle.importKey(
    "spki",
    publicKeyBytes,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["wrapKey"],
  );

  const dataKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"],
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedApiKey = new TextEncoder().encode(plaintextApiKey);

  const encryptedApiKey = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    dataKey,
    encodedApiKey,
  );

  const encryptedDataKey = await crypto.subtle.wrapKey(
    "raw",
    dataKey,
    publicKey,
    { name: "RSA-OAEP" },
  );

  const toBase64 = (buf: ArrayBuffer | Uint8Array) =>
    btoa(String.fromCharCode(...new Uint8Array(buf)));

  return {
    encryptedApiKey: toBase64(encryptedApiKey),
    encryptedDataKey: toBase64(encryptedDataKey),
    initializationVector: toBase64(iv),
  };
}
