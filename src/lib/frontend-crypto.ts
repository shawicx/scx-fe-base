import CryptoJS from 'crypto-js';

export class FrontendCrypto {
  /**
   * 加密文本
   * @param text 要加密的文本
   * @param key 加密密钥（hex格式）
   * @returns 加密后的文本（格式: iv:encryptedText）
   */
  static encrypt(text: string, key: string): string {
    try {
      // 将hex密钥转换为WordArray
      const keyWordArray = CryptoJS.enc.Hex.parse(key);

      // 生成随机IV
      const iv = CryptoJS.lib.WordArray.random(16);

      // 加密 - 与后端保持一致的配置
      const encrypted = CryptoJS.AES.encrypt(text, keyWordArray, {
        iv: iv,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding, // 与后端保持一致
      });

      // 返回格式: iv:encryptedText (与后端保持一致)
      return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`;
    } catch {
      throw new Error('加密失败');
    }
  }

  /**
   * 解密文本
   * @param encryptedText 加密的文本（格式: iv:encryptedText）
   * @param key 解密密钥（hex格式）
   * @returns 解密后的明文
   */
  static decrypt(encryptedText: string, key: string): string {
    try {
      const parts = encryptedText.split(':');
      if (parts.length !== 2) {
        throw new Error('加密数据格式错误');
      }

      const [ivHex, encrypted] = parts;

      // 将hex转换为WordArray
      const keyWordArray = CryptoJS.enc.Hex.parse(key);
      const ivWordArray = CryptoJS.enc.Hex.parse(ivHex);
      const encryptedWordArray = CryptoJS.enc.Hex.parse(encrypted);

      // 创建解密器 - 与后端保持一致的配置
      const decryptor = CryptoJS.algo.AES.createDecryptor(keyWordArray, {
        iv: ivWordArray,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding, // 与后端保持一致
      });

      // 解密
      const decrypted = decryptor.process(encryptedWordArray);
      decryptor.finalize();

      // 转换为UTF-8字符串
      return CryptoJS.enc.Utf8.stringify(decrypted);
    } catch {
      throw new Error('解密失败');
    }
  }

  /**
   * 验证加密数据格式
   * @param encryptedText 加密文本
   * @returns 是否为有效格式
   */
  static isValidEncryptedFormat(encryptedText: string): boolean {
    if (!encryptedText || typeof encryptedText !== 'string') {
      return false;
    }

    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      return false;
    }

    const [ivHex, encrypted] = parts;

    // 验证hex格式
    const hexPattern = /^[0-9a-fA-F]+$/;
    // IV长度应该是16字节 = 32个hex字符，加密数据应该是有效的hex字符串
    return (
      hexPattern.test(ivHex) && hexPattern.test(encrypted) && ivHex.length === 32 // 16字节 = 32 hex字符
    );
  }
}

// 使用示例:
/*
// 1. 获取加密密钥
const response = await fetch('/api/users/encryption-key');
const { key, keyId } = await response.json();

// 2. 加密密码
const password = 'mySecretPassword';
const encryptedPassword = FrontendCrypto.encrypt(password, key);

// 3. 发送登录请求
const loginResponse = await fetch('/api/users/login-password?keyId=' + keyId, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: encryptedPassword
  })
});
*/
