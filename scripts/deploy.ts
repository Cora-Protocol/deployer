import { ethers } from "hardhat";
import { FACTORY_ADDRESS, SALT } from "../config";

async function main() {
  const [deployer] = await ethers.getSigners();

  const deployerFactory = await ethers.getContractFactory(
    "Deployer"
  );

  const bytecode = (await deployerFactory.getDeployTransaction()).data;

  console.log(`Deployer bytecode: ${bytecode}`);

  const deployerSingletonFactory = await ethers.getContractAt(
    "Deployer", FACTORY_ADDRESS, deployer
  );

  const expectedAddress = await ethers.getCreate2Address(
    FACTORY_ADDRESS,
    SALT,
    ethers.keccak256(bytecode)
  );

  console.log(`Expected address: ${expectedAddress}`);

  const tx = await deployerSingletonFactory.deploy(bytecode, SALT, { gasLimit: 1000000 });
  await tx.wait();

  console.log(`Deployed successfully`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});