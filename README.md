# scripts-deploy

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Use scripts to quick deploy your build files.

## 📦 Install

```shell
pnpm i scripts-deploy -D
```

If install warning, you can use `pnpm i scripts-deploy -D --ignore-scripts`

## 🦄 Usage

#### Open cmd, Init `deploy.config` file and write it
```shell
deploy init
```

![screenshots](https://github.com/user-attachments/assets/2c67bce4-89a2-4ac4-9e0f-919e3b9599cd)

<details>
  <summary>Show examples</summary>

```js
export default {
  host: '192.xxx',
  port: 10022,
  username: 'xxx',
  password: 'xxx',
  wwwPath: '/usr/xxx/xxx',
  rootDir: '/dist',
  confirm: true
}
```
</details>

<details>
  <summary>Show types</summary>

```ts
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
}
```

[See file](https://github.com/warmthsea/scripts-deploy/blob/main/src/type.ts)
</details>

#### Run

```shell
deploy
```

![screenshots](https://github.com/user-attachments/assets/226db360-02d0-4dc7-a323-bda3683bedf8)

## License

[MIT](./LICENSE) License © 2024-PRESENT [warmthsea](https://github.com/warmthsea)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/scripts-deploy?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/scripts-deploy
[npm-downloads-src]: https://img.shields.io/npm/dm/scripts-deploy?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/scripts-deploy
[bundle-src]: https://img.shields.io/bundlephobia/minzip/scripts-deploy?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=scripts-deploy
[license-src]: https://img.shields.io/github/license/warmthsea/scripts-deploy.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/warmthsea/scripts-deploy/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/scripts-deploy
