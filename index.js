const { spawn } = require('child_process')

const headers = [
  'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
  'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language: en-us,en;q=0.5',
  'Sec-Fetch-Mode: navigate',
]

const command = 'aria2c'
const args = [
  '--download-result=hide',
  '--console-log-level=error',
  '--enable-color=false',
  '--summary-interval=1',
  '--max-resume-failure-tries=4',
  '--allow-overwrite',
  ...headers.map((header) => `--header="${header}"`),
]

function colonSymbolName(string = '') {
  return string.split(':')[1]
}

function parseStdout(string = '') {
  if (!string.startsWith('[') && !string.endsWith(']')) {
    return {
      id: undefined,
      completedLenght: undefined,
      totolLenght: undefined,
      progress: 0,
      cn: 0,
      speed: undefined,
      eta: undefined,
    }
  }

  const content = string.match(/\[([^\]]+)\]/)[1]

  const [id, progress, cn, speed, eta] = content.split(' ')
  let [lenghts, _percent] = progress.split('(')
  let percent = parseInt((_percent ?? '').replace('%').replace(')'))
  let [completedLenght, totalLenght] = lenghts.split('/')

  return {
    id,
    completedLenght,
    totalLenght,
    percent,
    cn: parseInt(colonSymbolName(cn)),
    speed: colonSymbolName(speed),
    eta: colonSymbolName(eta),
  }
}

function createArgs(
  options = {
    maxConnectionPerServer,
    minSplitSize,
    split,
    fileName,
    dir,
    url,
  }
) {
  const _args = [...args]

  _args.push(`-x${options.maxConnectionPerServer ?? 16}`)
  _args.push(`-s${options.split ?? 16}`)
  _args.push(`-k${options.minSplitSize ?? 1}M`)
  if (options.fileName) {
    _args.push(`--out=${options.fileName}`)
  }
  if (options.dir) {
    _args.push(`--dir=${options.dir}`)
  }

  if (options.url) {
    _args.push(options.url)
  }
  return _args
}

async function ffdl(on = {}, options = {}) {
  const _on = {
    update: () => {},
    error: () => {},
    finished: () => {},
    close: () => {},
    ...on,
  }

  return new Promise((resolve, reject) => {
    const _args = createArgs(options)
    const _process = spawn(command, _args)
    _process.stdout.on('data', (chunk) => {
      const chunkLines = chunk.toString().split('\n')
      _on.update(parseStdout(chunkLines[0]))
    })
    _process.on('close', (code) => {
      if (code === 0) {
        _on.finished()
      } else {
        _on.error(code)
        reject(code)
      }
      resolve(code)
    })
  })
}

module.exports = ffdl
