import { exec as _exec } from 'child_process'
import { mkdtemp, readFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import pdf from 'pdf-parse'
import util from 'node:util'

const exec = util.promisify(_exec)

export default async function(filename: string, options: ConvertOptionsType): Promise<void> {
  let [img_dir, txt_dir] = await createDirectories(options.outdir, options.imageonly ? 1:2)

  let dataBuffer = await readFile(filename)
  let pdfData = await pdf(dataBuffer)

  for (var i=0; i<pdfData.numpages; i++) {
    let { stderr } = await exec(`
      convert -density 150 -trim -background white -alpha remove \
      "${filename}[${i}]" -quality 100 -flatten -sharpen 0x1.0 \
      "${img_dir}/${i}.png"
    `)
    if (stderr) console.error(stderr)
  }
}


async function createDirectories(prefix: string, iter: number): Promise<string[]> {
  let paths: string[] = []
  prefix = path.join(prefix ? prefix : os.tmpdir(), 'ptt.')
  for (var i=0; i<iter; i++) {
    paths.push(await mkdtemp(prefix))
  }
  return paths
}


export type ConvertOptionsType = {
  imageonly: boolean    // output image files instead of text
  both: boolean         // output images in addition to text
  pages: boolean        // do not concatenate text into a single file
  outdir: string        // output directory
  startpage: number     // start page of pdf
  endpage: number       // end page of pdf
}