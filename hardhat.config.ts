import dotenv from "dotenv";

dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";


const ARBITRUM_TESTNET_MNEMONIC = process.env.ARBITRUM_TESTNET_MNEMONIC;

if (!ARBITRUM_TESTNET_MNEMONIC) {
  console.warn("ARBITRUM_TESTNET_MNEMONIC not specified");
}

const ARBITRUM_MAINNET_MNEMONIC = process.env.ARBITRUM_MAINNET_MNEMONIC;

if (!ARBITRUM_MAINNET_MNEMONIC) {
  console.warn("ARBITRUM_MAINNET_MNEMONIC not specified");
}

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!ETHERSCAN_API_KEY) {
  console.warn("Etherscan API not specified");
}


const config: HardhatUserConfig = {
  solidity: "0.8.19",
  namedAccounts: {
    deployer: 0
  },
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_KEY || ""}`,
        blockNumber: 100447164,
        enabled: process.env.FORKING === "true" ? true : false,
      }
    },
    arbitrum_testnet: {
      url: `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_KEY || ""}`,
      accounts: {
        mnemonic: process.env.ARBITRUM_TESTNET_MNEMONIC || "",
      },
      chainId: 421613
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_KEY || ""}`,
      accounts: {
        mnemonic: process.env.ARBITRUM_MAINNET_MNEMONIC || "",
      },
      chainId: 42161
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY || ""}`,
      accounts: {
        mnemonic: process.env.ARBITRUM_TESTNET_MNEMONIC || "",
      },
      chainId: 5
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || ""
  }
};

export default config;
