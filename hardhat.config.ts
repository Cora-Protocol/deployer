import dotenv from "dotenv";

dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

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
    }
  }
};

export default config;
