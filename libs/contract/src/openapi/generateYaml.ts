import { stringify } from 'yaml'
import { openApiDocument } from '.'
import { writeFile } from 'fs/promises'

const yamlDocument = stringify(openApiDocument)
writeFile('specs.yaml', yamlDocument)
