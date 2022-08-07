# chore_ethereum_contract

## 前準備

- https://www.tsuyukimakoto.com/blog/2022/08/06/get_ethereum_test_network_token/

## チュートリアル1

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

### Ethers.jsを使う

Ethers.jsはJSON-RPCをラップしてEthereumとのやりとりを簡単にするライブラリらしい。

```
$ npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

hardhat.config.js を記述する

### コントラクトをcompileする

```
$ npx hardhat compile
```

### コントラクトをdeployする

まずは、デプロイスクリプトを書く

```
$ touch scripts/deploy.js
```

詳しくはHardhatのチュートリアルを読むと良さそう
https://hardhat.org/tutorial/testing-contracts#writing-tests

### デプロイ

```
$ npx hardhat run scripts/deploy.js --network goerli
Contract deployed to address: 0x****************************************
```

deploy.jsでaddressを出力するようにしてあるのでaddressが表示された

[ehterscan](https://goerli.etherscan.io/)に行ってaddressを検索すると、 Contract Creation のトランザクションが。デプロイできてるっぽい。

Txt Fee（トランザクションフィー）として0.00039982かかったらしい。ガス代というやつだな。

METAMASKを見ると、その分が減っている。

## チュートリアル2 スマートコントラクトを使う

https://docs.alchemy.com/docs/interacting-with-a-smart-contract

### interact.js

インタラクションスクリプトを書く。

scripts/interact.jsを作成して書く
```
$ touch scripts/interact.js
```

.envファイルを更新する

API_KEYとCONTRACT_ADDRESSを追加する。

API_KEYはalchemyのプロジェクトにあるVIEW KEYから見えるAPI KEYを設定する。

CONTRACT_ADDRESSはデプロイ時に表示されたものを設定する。

