export interface ScriptsDeployOption {
  /** Server host */
  host: string
  /** Server post */
  port: number
  /** Server login username */
  username: string
  /** Server login password */
  password: string
  /** Server folder path */
  wwwPath: string
  /** Build output folder */
  rootDir: string
  /** Confirm execution */
  confirm?: boolean
  /** Number of concurrent uploads, Default is 15  */
  limit?: number
  default?: Omit<ScriptsDeployOption, 'default'>
}
