import { initSodium } from './sodium';

export async function deriveSharedKey(
  myPrivateKey: string,
  theirPublicKey: string,
  isClient: boolean
): Promise<Uint8Array> {
  const s = await initSodium();
  const result = s.crypto_kx_client_session_keys(
    s.crypto_scalarmult_base(s.from_base64(myPrivateKey)),
    s.from_base64(myPrivateKey),
    s.from_base64(theirPublicKey)
  );
  return isClient ? result.sharedRx : result.sharedTx;
}

export async function encryptChannelKey(
  channelKey: Uint8Array,
  recipientPublicKey: string,
  senderPrivateKey: string
): Promise<{ encryptedKey: string; nonce: string }> {
  const s = await initSodium();
  const nonce = s.randombytes_buf(s.crypto_box_NONCEBYTES);
  const encrypted = s.crypto_box_easy(
    channelKey,
    nonce,
    s.from_base64(recipientPublicKey),
    s.from_base64(senderPrivateKey)
  );
  return {
    encryptedKey: s.to_base64(encrypted),
    nonce: s.to_base64(nonce),
  };
}

export async function decryptChannelKey(
  encryptedKey: string,
  nonce: string,
  senderPublicKey: string,
  recipientPrivateKey: string
): Promise<Uint8Array> {
  const s = await initSodium();
  return s.crypto_box_open_easy(
    s.from_base64(encryptedKey),
    s.from_base64(nonce),
    s.from_base64(senderPublicKey),
    s.from_base64(recipientPrivateKey)
  );
}
