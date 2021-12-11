import * as fs from 'fs'
import { Day, Part } from './types'

/**
 * Reads file at given path and splits buffer as a string by given delimiter
 * @param path path to file to be read
 * @param delimiter optional, defaults to "\n".
 * @returns string[] file read at provided path split by delimiter
 */
export const readFile = (path: string, delimiter: string = '\n') =>
  fs.readFileSync(path).toString().split(delimiter)

/**
 * Logs answer in standard format to console
 * @param day day number
 * @param part part number
 * @param answer answer to problem
 * @returns void
 */
export const reportAnswer = (day: Day, part: Part, answer: number | string) =>
  console.log(`Day${day}, part${part}: ${answer}`)

/**
 * Converts binary number as string to decimal number
 * @param bin binary number as string
 * @returns decimal number equivalent of input binary value
 */
export const bin2Dec = (bin: string): number => parseInt(bin, 2)
