import type { Customizations } from './types'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { prepareStackBlitzExampleContent } from './utils'

export async function prepareStackBlitzExampleScript(
  rootDir: string,
  name: string,
  dependenciesRecord: string,
  customizations?: Customizations,
) {
  const script = resolve(rootDir, 'playgrounds', name, '.stackblitz.js')

  const content = prepareStackBlitzExampleContent(
    name,
    dependenciesRecord,
    customizations,
  )

  await writeFile(script, content, 'utf-8')
}
