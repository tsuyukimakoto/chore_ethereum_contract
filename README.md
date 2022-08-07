# chore_ethereum_contract

## 前準備

- https://www.tsuyukimakoto.com/blog/2022/08/06/get_ethereum_test_network_token/

## チュートリアル

- https://docs.alchemy.com/docs/hello-world-smart-contract

Step 6: Initialize our project、から

### 開発環境準備

Hardhatを入れる。

```
$ npm install --save-dev hardhat
```

Hardhatプロジェクトを作る。

```
$ npx hardhat
```

Create TypeScript projectに惹かれるが、まずは Create an empty hardhat.config.js で。

ソースとdeploy用のフォルダを作る

```
$ mkdir contracts
$ mkdir scripts
```

ソース用のcontractsフォルダにHelloWorld.solを作る。sol拡張子はスマートコントラクト記述用言語のSolidityファイルということかな？

```
$ touch contracts/HelloWorld.sol
```

コントラクトを記述する
