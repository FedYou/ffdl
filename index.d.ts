interface Stdout {
  /**
   * The id of the download.
   */
  id: string | undefined
  /**
   * The completed length of the download.
   */
  completedLength: string | undefined
  /**
   * The total length of the download.
   */
  totalLength: string | undefined
  /**
   * The percentage of the download.
   */
  percent: number
  /**
   * The number of connections.
   */
  cn: number
  /**
   * The speed of the download.
   */
  speed: string | undefined
  /**
   * The estimated time of completion.
   */
  eta: string | undefined
}

interface Options {
  /**
   * The maximum number of concurrent connections per server.
   * @default 16
   */
  maxConnectionPerServer?: number
  /**
   * The minimum size of each part to be downloaded.
   * Minimum value is 1. Maximum value is 1024.
   * @default 1
   */
  minSplitSize?: number
  /**
   * Number of parts to split the file into.
   * @default 16
   */
  split?: number
  /**
   * Name of the file to be downloaded.
   * @default undefined Use the file name from the url
   */
  fileName?: string
  /**
   * The directory where the file will be saved.
   * @default undefined Use the current directory
   */
  dir?: string
  /**
   * Url of the file to be downloaded.
   */
  url: string
}

interface FfdlArgs {
  options: Options
  /**
   * Callback function to be called when the download is updated.
   */
  onUpdate: (stdout: Stdout) => void
  /**
   * Callback function to be called when an error occurs.
   */
  onError: (error: Error) => void
  /**
   * Callback function to be called when the download is finished.
   */
  onFinished: () => void
  /**
   * Callback function to be called when the download is closed.
   */
  onClose: (code: number) => void
}

declare function ffdl(args: FfdlArgs): Promise<void>

export = ffdl
export as namespace ffdl
