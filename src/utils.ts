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

/**
 * Replaces characters starting at specified index with replacement string
 * @param str String to have characters replaced on.
 * @param idx Starting index to replace characters at.
 * @param repl Replacement string/char
 * @returns New string with characters starting at str's idx replaced with repl
 */
export const replaceAt = (str: string, idx: number, repl: string) =>
  str.substr(0, idx) + repl + str.substr(idx + repl.length)

/**
 * Sum of numbers in input array
 * @param arr Array of numbers to be summed
 * @param init optional initial value, defaults to 0
 * @returns sum
 */
export const sum = (arr: number[], init = 0) =>
  arr.reduce((sum, cur) => sum + cur, init)
