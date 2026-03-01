import sodium from 'libsodium-wrappers-sumo';

let initialized = false;

export async function initSodium(): Promise<typeof sodium> {
  if (!initialized) {
    await sodium.ready;
    initialized = true;
  }
  return sodium;
}

export async function generateKeyPair() {
  const s = await initSodium();
  const keyPair = s.crypto_box_keypair();
  return {
    publicKey: s.to_base64(keyPair.publicKey),
    privateKey: s.to_base64(keyPair.privateKey),
  };
}

export async function encryptForRecipient(
  message: string,
  recipientPublicKey: string,
  senderPrivateKey: string
): Promise<{ ciphertext: string; nonce: string }> {
  const s = await initSodium();
  const nonce = s.randombytes_buf(s.crypto_box_NONCEBYTES);
  const encrypted = s.crypto_box_easy(
    s.from_string(message),
    nonce,
    s.from_base64(recipientPublicKey),
    s.from_base64(senderPrivateKey)
  );
  return {
    ciphertext: s.to_base64(encrypted),
    nonce: s.to_base64(nonce),
  };
}

export async function decryptFromSender(
  ciphertext: string,
  nonce: string,
  senderPublicKey: string,
  recipientPrivateKey: string
): Promise<string> {
  const s = await initSodium();
  const decrypted = s.crypto_box_open_easy(
    s.from_base64(ciphertext),
    s.from_base64(nonce),
    s.from_base64(senderPublicKey),
    s.from_base64(recipientPrivateKey)
  );
  return s.to_string(decrypted);
}

export async function encryptSymmetric(
  message: string,
  key: Uint8Array
): Promise<{ ciphertext: string; nonce: string }> {
  const s = await initSodium();
  const nonce = s.randombytes_buf(s.crypto_secretbox_NONCEBYTES);
  const encrypted = s.crypto_secretbox_easy(s.from_string(message), nonce, key);
  return {
    ciphertext: s.to_base64(encrypted),
    nonce: s.to_base64(nonce),
  };
}

export async function decryptSymmetric(
  ciphertext: string,
  nonce: string,
  key: Uint8Array
): Promise<string> {
  const s = await initSodium();
  const decrypted = s.crypto_secretbox_open_easy(
    s.from_base64(ciphertext),
    s.from_base64(nonce),
    key
  );
  return s.to_string(decrypted);
}

export async function generateSymmetricKey(): Promise<Uint8Array> {
  const s = await initSodium();
  return s.crypto_secretbox_keygen();
}

export async function encryptPrivateKeyWithPassword(
  privateKey: string,
  password: string
): Promise<string> {
  const s = await initSodium();
  const salt = s.randombytes_buf(s.crypto_pwhash_SALTBYTES);
  const key = s.crypto_pwhash(
    s.crypto_secretbox_KEYBYTES,
    password,
    salt,
    s.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    s.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    s.crypto_pwhash_ALG_DEFAULT
  );
  const nonce = s.randombytes_buf(s.crypto_secretbox_NONCEBYTES);
  const encrypted = s.crypto_secretbox_easy(s.from_base64(privateKey), nonce, key);
  const combined = new Uint8Array([...salt, ...nonce, ...encrypted]);
  return s.to_base64(combined);
}

export async function decryptPrivateKeyWithPassword(
  encryptedKey: string,
  password: string
): Promise<string> {
  const s = await initSodium();
  const combined = s.from_base64(encryptedKey);
  const salt = combined.slice(0, s.crypto_pwhash_SALTBYTES);
  const nonce = combined.slice(
    s.crypto_pwhash_SALTBYTES,
    s.crypto_pwhash_SALTBYTES + s.crypto_secretbox_NONCEBYTES
  );
  const ciphertext = combined.slice(s.crypto_pwhash_SALTBYTES + s.crypto_secretbox_NONCEBYTES);
  const key = s.crypto_pwhash(
    s.crypto_secretbox_KEYBYTES,
    password,
    salt,
    s.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    s.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    s.crypto_pwhash_ALG_DEFAULT
  );
  const decrypted = s.crypto_secretbox_open_easy(ciphertext, nonce, key);
  return s.to_base64(decrypted);
}
