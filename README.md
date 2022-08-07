# chore_ethereum_contract

```
$ npm install -g truffle
$ truffle init
```

## create contract scaffold

```
$ truffle create contract Memo
```

contracts/Memo.sol ができるので、コードを書く

## compile contract

```
$ truffle compile
```

build/contracts/Memo.json が生成される。

## シミュレーター

```
$ truffle develop
```

開発用のサーバと、CLIが起動する。

CLI起動時にテスト用のアカウントが表示される。

### テスト用アカウントの状態を見てみる

```
> balance = await web3.eth.getBalance("0xede4a94bc8b2729e4ba32b11be6fb80daa998c29");
'100000000000000000000'
```

単位が一番小さい単位のweiで表示される。ethで表示するには

```
> web3.utils.fromWei(balance, 'ether')
'100'
```

100ETH持ってるっぽい。

### デプロイの準備をする

migrationファイルを作成する

```
$ truffle create migration DeployMemo
```

migrations/1659795724_deploy_memo.js ができた。

migrationのコードを記述する。

### デプロイする

CLIでmigrateコマンドを実行する

```
truffle(develop)> migrate

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xca1c5359ed350e827e29e9f5eea7eaf466a96632692fe02c69b9fbc900a8a884
   > Blocks: 0            Seconds: 0
   > contract address:    0xbbcEEB60e64492cF4046507E1A76DBD8145d250b
   > block number:        1
   > block timestamp:     1659796111
   > account:             0xEDe4A94BC8B2729E4BA32b11be6fB80daA998C29
   > balance:             99.99915573025
   > gas used:            250154 (0x3d12a)
   > gas price:           3.375 gwei
   > value sent:          0 ETH
   > total cost:          0.00084426975 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:       0.00084426975 ETH


1659795724_deploy_memo.js
=========================

   Deploying 'Memo'
   ----------------
   > transaction hash:    0xa8fb8887c9a3d80ee5d51cdf62beb8b81112e9e8379b2c6cd2bc511a4a360b29
   > Blocks: 0            Seconds: 0
   > contract address:    0x67996f6402eAa9E485A068fAbdBc34020cf03b41
   > block number:        3
   > block timestamp:     1659796113
   > account:             0xEDe4A94BC8B2729E4BA32b11be6fB80daA998C29
   > balance:             99.997558022486759523
   > gas used:            455391 (0x6f2df)
   > gas price:           3.178366198 gwei
   > value sent:          0 ETH
   > total cost:          0.001447399361273418 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.001447399361273418 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.002291669111273418 ETH
```

migrateしてdeployされると、 `build/contracts/Memo.json` の networksにaddressが記録されている。

### スマートコントラクトを実行する

CLIで実行する

> smartContractAddress = "0x67996f6402eAa9E485A068fAbdBc34020cf03b41"
> abi = [];
> let myAccount;
> let contractInstance;
> myAccount = (await web3.eth.getAccounts())[0];
> contractInstance = new web3.eth.Contract(abi, smartContractAddress);

現在の状態を確認する
> result = await contractInstance.methods.message().call();

methodsが空でうまく呼べない。CLIからやろうと思ったのがダメ？
イメージとしてはこんな感じで大丈夫なはず