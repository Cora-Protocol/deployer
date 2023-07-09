import { expect } from "chai";
import hre, { deployments, ethers } from "hardhat";

import { SimpleStorage__factory, Deployer__factory, Deployer } from "../typechain-types";
import { FACTORY_ADDRESS } from "../config";

describe("Deployer Tests", function () {
  let deployerContractInstance: Deployer
  let deployerAddress: string
  let deployerUserAddress: string

  beforeEach(async () => {
    const [deployerSigner] = await ethers.getSigners();
    deployerUserAddress = await deployerSigner.getAddress()

    await deployments.fixture(['Deployer']);
    const deployerDeployment = await deployments.get('Deployer');

    deployerContractInstance = Deployer__factory.connect(deployerDeployment.address, deployerSigner);

    deployerAddress = await deployerContractInstance.getAddress()
  });

  describe("Deployment", function () {
    it('should work', async () => {
      const bytecode = SimpleStorage__factory.bytecode
      const salt = '0x000000000000000000000000000000000000000000000000000000000000beef'
      const expectedAddress = getExpectedAddress(bytecode, salt)

      await expect(
        deployerContractInstance.deploy(bytecode, salt)
      ).to.emit(deployerContractInstance, "Deployed").withArgs(deployerUserAddress, expectedAddress)
    })

    it('should throw on repeated deploy', async () => {
      const bytecode = SimpleStorage__factory.bytecode
      const salt = '0x000000000000000000000000000000000000000000000000000000000000beef'
      await deployerContractInstance.deploy(bytecode, salt)
      await expect(deployerContractInstance.deploy(bytecode, salt)).to.be.revertedWith("Deploy failed");
    })
  });

  function getExpectedAddress(bytecode: string, salt: string) {
    return hre.ethers.getCreate2Address(
      FACTORY_ADDRESS,
      salt,
      hre.ethers.keccak256(bytecode)
    );
  }
});