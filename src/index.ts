#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

console.log('Hello world')
console.log('argv:', process.argv)

const args = process.argv.slice(2);


function encodeToBase64(text: string): string {
  return Buffer.from(text).toString('base64');
}

function decodeFromBase64(base64: string): string {
  return Buffer.from(base64, 'base64').toString('utf-8');
}

function unescapeString(str: string) {
  // 包裝為 JSON 字串並解析
  return JSON.parse(`"${str.replace(/"/g, '\\"')}"`);
}

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // 去除前後空白字符並替換 \n 為實際的換行符
    const normalizedData = unescapeString(data);

    // 解碼 Base64 字串
    const decodedData = decodeFromBase64(normalizedData) //;Buffer.from(normalizedData, 'base64').toString('utf8');

    // 輸出解碼後的字串進行檢查
    console.log('Decoded Data:', decodedData);
});