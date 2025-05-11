# Ffdl

Download files fast using aria2

> [note]
> You need to have [aria2](https://github.com/aria2/aria2) installed on your system.

## Uso

```js
// CommonJs
const ffdl = require('ffdl')

// Module
import ffdl from 'ffdl'

// -------------
const options = {
  url: '<your url>',
  name: '<file-name>' // Optional
}
const onUpdate = ({ id, completedLenght, totalLenght, percent, cn, speed, eta }) => {
  console.clear()
  console.log(`${id} ${completedLenght}/${totalLenght} ${percent}% ${cn} ${speed} ${eta}`)
}
const onError = (err) => {
  console.log(err.cause)
  console.log(err.message)
  console.log(err.name)
  console.log(err.stack)
}
const onFinished = () => {
  console.log('Download finished')
}
const onClose = (code) => {
  console.log(code)
}
await ffdl({
  options,
  onUpdate,
  onError,
  onFinished,
  onClose
})
```

## Options

### `url` (required)

**Tipo:** `string`  
The URL of the file to download.

---

### `maxConnectionPerServer`

**Type:** `number`  
**Default:** `16`  
Maximum number of concurrent connections allowed per server.

---

### `minSplitSize`

**Type:** `number`  
**Default:** `1`  
Minimum size (which is MB) of each part into which the file is divided.  
**Minimum value:** `1`  
**Maximum value:** `1024`

### `split`

**Type:** `number`  
Default:\*\* `16`  
Number of parts into which the file will be divided during download.

---

### `fileName`

**Type:** `string`  
**Default:** `undefined` (the name of the file extracted from the URL will be used)  
Name that the file will have once downloaded.

---

### `dir`

**Type:** `string`  
**Default:** `undefined` (the current directory will be used)  
Directory (absolute) where the downloaded file will be saved.

---

## Callbacks

### `onUpdate(stdout)`

**Type:** `(stdout: Stdout) => void`

```ts
interface Stdout {
  id: string | undefined // Download ID
  completedLength: string | undefined // Total downloaded size
  totalLength: string | undefined // Total file size
  percent: number // Percentage (0–100)
  cn: number // Connections used
  speed: string | undefined // Download speed
  eta: string | undefined // Estimated time remaining
}
```

It is executed every time there is an update during download (e.g. progress, estimates, etc.).

---

### `onError(error)`

**Type:** `(error: Error) => void`  
It is executed when an error occurs during download.

---

### `onFinished()`

**Type:** `() => void`  
It is executed when the download is successfully completed.

---

### `onClose(code)`

**Type:** `(code: number) => void`  
It is executed when the download process closes, either successfully or with error.  
`code` is the exit code of the process.
