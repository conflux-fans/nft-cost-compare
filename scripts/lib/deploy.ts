// import { Signer } from "ethers";
// @ts-ignore
import { conflux } from "hardhat";
// @ts-ignore
import { FactoryOptions} from "hardhat-conflux"


async function deploy(contractName: string, ...args: any[]): Promise<any> {
  return deployWithLibs(contractName, null, ...args);
}

async function deployWithLibs(contractName: string, libs: FactoryOptions | null, ...args: any[]): Promise<any> {
  // @ts-ignore
  const accounts = await conflux.getSigners();
  // We get the contract to deploy
  // @ts-ignore
  const contract = libs === null ?
    // @ts-ignore
    await conflux.getContractFactory(contractName) :
    // @ts-ignore
    await conflux.getContractFactory(contractName, libs);
    
  const deployReceipt = await contract
    .constructor(...args)
    .sendTransaction({
      from: accounts[0].address,
    })
    .executed();
  return deployReceipt;
}

export { deploy, deployWithLibs };
