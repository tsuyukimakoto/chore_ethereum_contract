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

### METAMASKとAlchemyをプロジェクトに設定する

#### .env

.envファイルを読み込んで環境変数に設定するためのモジュールをインストールする
```
$ npm install dotenv --save
```

.env.baseを作成した
```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

.envにコピーして実際の値を入れていく

API_URLはalchemyのサイトで作成したプロジェクトを表示して、VIEW KEYから、HTTPSのURLをコピーする。

PRIVATE_KEYは、METAMASKの秘密鍵。METAMASK拡張のアカウントの詳細から秘密鍵のエクスポートを行う。
