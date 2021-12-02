import * as fs from "fs";

/**
 * Reads file at given path and splits buffer as a string by given delimiter
 * @param {string} path path to file to be read
 * @param {string} delimiter optional, defaults to "\n".
 * @returns string[] file read at provided path split by delimiter
 */
export const readFile = (path: string, delimiter: string = "\n") =>
  fs.readFileSync(path).toString().split(delimiter);
