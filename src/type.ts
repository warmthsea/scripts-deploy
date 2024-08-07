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
  default?: Omit<ScriptsDeployOption, 'default'>
}
