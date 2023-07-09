# Deployer contract

A wrapper around EIP-2470 that emits events with deployed contract address, or reverts on deploy failure. 

Contracts are deployed via underlying singleton factory, so expected addresses should be computed using singleton factory address and not deployer address.

## Getting Started 

1. git clone <>
2. nvm use
3. npm install

## Start

```bash
$ npm run test
```