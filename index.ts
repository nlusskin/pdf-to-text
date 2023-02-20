#! /usr/bin/env node

import { program } from 'commander'

import convert from './cli/convert'

program
  .name('PDF -> Text')
  .description('Convert PDF documents to images or text')
  .version('0.0.1')

program
  .option('-q', '--quiet', 'suppress verbose output')

const options = program.opts()

if (options.quiet) null

program
  .command('convert')
  .description('Convert pdf to images or text file. By default, the program will output a single text file in the current directory.')
  .argument('<filename>', 'path to file')
  .option('-o, --imageonly', 'output image files instead of text')
  .option('-i, --both', 'output images in addition to text')
  .option('-p, --pages', 'do not concatenate text into a single file')
  .option('-d, --outdir <path>', 'output directory')
  .option('-s, --startpage <number>', 'start page of pdf')
  .option('-e, --endpage <number>', 'end page of pdf')
  .action(async (filename, options) => {
    try {
      await convert(filename, options)
    } catch(e: any) {
      console.error(e.message)
    }
  })

program.parse(process.argv)
