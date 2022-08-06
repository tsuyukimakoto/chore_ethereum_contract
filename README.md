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

