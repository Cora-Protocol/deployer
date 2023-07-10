# Deployer contract

A wrapper around EIP-2470 that emits events with deployed contract address, or reverts on deploy failure. 

Contracts are deployed via underlying singleton factory, so expected addresses should be computed using singleton factory address and not deployer address.

## Getting Started 

1. git clone git@github.com:Cora-Protocol/deployer.git
2. nvm use
3. npm install

## Start

```bash
$ yarn test
```


## Deployments

Arbitrum Goerli

0x252158dd2e52926905284866BD39C563E8Ed1719

Arbitrum Mainnet

[0x974c1AE30321E5673f6863345B8e00E222dD3E12](https://arbiscan.io/address/0x974c1ae30321e5673f6863345b8e00e222dd3e12#code
)
