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

### ABI

コントラクトのABI(Application Binary Interface)を読み込む。

Hardhatがartifacts/contracts/HelloWorld.sol/HelloWorld.json を生成してくれている。

interact.jsに追記する
```
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");
```

### コントラクトを取り出す

interact.jsに追記してコントラクトのインスタンスを生成する。

- Ether.jsの流儀
  - Provider - blockchainを読み書きする
  - Signer - トランザクションにサインするEthereumアカウント
  - Contract - チェーン上の特定のコントラクト

### イニシャルのメッセージを取得する

interact.jsに追記する

デプロイした時点のメッセージを取得する
```
async function main() {
  const message = await helloWorldContract.message();
  console.log("The message is: " + message);
}
main();
```

interact.jsを実行する
```
$ npx hardhat run scripts/interact.js
The message is: Hello World from kamakura!
```

取れてる！

### メッセージを更新する

interact.jsにmainに追記する

```
  ...
  console.log("update...");
  const tx = await helloworldContract.update(
    "This is the new Message from kamakura."
  );
  await tx.wait();
  ...
```

再びinteract.jsを実行する
```
$ npx hardhat run scripts/interact.js
The message is: Hello World from kamakura!
update...
```

しばらく（数秒から1分くらい？15秒くらいだった）すると完了する。

続けて `await helloWorldContract.message();` すれば更新されたメッセージも得られる。


## チュートリアル3 EtherscanにPublishする

https://docs.alchemy.com/docs/submitting-your-smart-contract-to-etherscan

### EtherscanのAPI KEYを設定する

アカウントを持ってなかったら[ここ](https://etherscan.io/register) から登録する。

API KEYはアカウントのAPI KEYのところからADDする

.envにETHERSCAN_API_KEYとして設定する。

### Hardhatからeherscanを使うモジュールをインストールする

```
npm install --save-dev @nomiclabs/hardhat-etherscan
```

hardhat.config.jsにetherscanについて記述を追加する
```
 require("dotenv").config();
 require("@nomiclabs/hardhat-ethers");
+require("@nomiclabs/hardhat-etherscan");

 const { API_URL, PRIVATE_KEY } = process.env;
+const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

 module.exports = {
   solidity: "0.8.9",
@@ -15,4 +17,7 @@ module.exports = {
       accounts: [`0x${PRIVATE_KEY}`],
     },
   },
+  etherscan: {
+    apiKey: ETHERSCAN_API_KEY,
+  },
 };
```

### Etherscanでコントラクトを検証する

DEPLOYED_CONTRACT_ADDRESS はデプロイ時に表示されたものを設定する。つまり、.envのCONTRACT_ADDRESSで良い。

```
$ npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World from kamakura!'

... snip
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0x****************************************
for verification on the block explorer. Waiting for verification result...

Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/0x****************************************#code
```

DEPLOYED_CONTRACT_ADDRESSの後ろの文字列を、デプロイ時のものと別のものにするとVerifyに失敗する
```
Error in plugin @nomiclabs/hardhat-etherscan: The contract verification failed.
Reason: Fail - Unable to verify
```

成功時に表示されるURLを開くと、etherscan上でコードなどが見える。
