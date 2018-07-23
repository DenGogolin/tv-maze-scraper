import { exists, readFile, writeFile } from "fs";
import { promisify } from "util";
import { get } from "http";

export const existsAsync = promisify(exists);

export const readFileAsync = promisify(readFile);
export const writeFileAsync = promisify(writeFile);

export async function coolDown(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getAsync(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) =>
    get(url, res => {
      if (res.statusCode !== 200) {
        reject(res.statusCode);
      }
      let result = ``;
      res.on(`end`, () => resolve(result));
      res.on(`data`, data => (result += data.toString()));
    })
  );
}
