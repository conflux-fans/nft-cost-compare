// @ts-ignore
import { conflux } from "hardhat";
import { deploy } from "./lib/deploy"

type DeployResult = {
    erc721: string,
    erc1155: string,
    erc721Enum: string,
    erc1155Enum: string,
}

class Action {
    contractType: string
    name: string
    hash: string
    gas: string
    collateral: string

    constructor(_contractType: string, _name: string, receipt: any) {
        this.contractType = _contractType
        this.name = _name
        this.gas = receipt.gasUsed
        this.collateral = receipt.storageCollateralized
        this.hash = receipt.transactionHash
    }
}

class Actions {
    value: Action[] = []
    push(v: Action) {
        console.log(v)
        this.value.push(v)
    }

    map(fn: any): any[] {
        return this.value.map(fn)
    }
}

async function deployContracts(): Promise<DeployResult> {
    // @ts-ignore
    const erc721 = await deploy("MYERC721");
    console.log("Deployed ERC721 at %s", erc721.contractCreated);

    // @ts-ignore
    const erc1155 = await deploy("MYERC1155");
    console.log("Deployed MYERC1155 at %s", erc1155.contractCreated);

    // @ts-ignore
    const erc721Enum = await deploy("MYERC721Enumberable");
    console.log("Deployed MYERC721Enumberable at %s", erc721Enum.contractCreated);

    // @ts-ignore
    const erc1155Enum = await deploy("MYERC1155Enumberable");
    console.log("Deployed MYERC1155Enumberable at %s", erc1155Enum.contractCreated);

    return {
        erc721: erc721.contractCreated,
        erc1155: erc1155.contractCreated,
        erc721Enum: erc721Enum.contractCreated,
        erc1155Enum: erc1155Enum.contractCreated
    }
}

async function summary() {
    // @ts-ignore
    const accounts = await conflux.getSigners();
    const receivers = ["cfxtest:aang4d91rejdbpgmgtmspdyefxkubj2bbywrwm9j3z", "cfxtest:aamjxdgz4m84hjvf2s9rmw5uzd4dkh8aa6krdsh0ep"];
    console.log("Start deploy NFT contracts");

    let contractAddrs = await deployContracts()

    const actions = new Actions();

    // ============= erc721 ==============
    console.log("run erc721")
    // @ts-ignore
    let erc721 = await conflux.getContractAt("MYERC721", contractAddrs.erc721);
    let receipt = await erc721.mint().sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721", "mint", receipt))
    // return

    receipt = await erc721.transferFrom(accounts[0].address, receivers[0], 0).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721", "transferFrom -> poor user", receipt))

    receipt = await erc721.mint().sendTransaction({ from: accounts[0].address, }).executed();
    receipt = await erc721.transferFrom(accounts[0].address, receivers[0], 1).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721", "transferFrom -> rich user", receipt))
    // actions.push({ contractType: "erc721", name: "transferFrom -> rich user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })

    receipt = await erc721.mint().sendTransaction({ from: accounts[0].address, }).executed();
    receipt = await erc721.safeTransferFrom(accounts[0].address, receivers[1], 2).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721", "safeTransferFrom -> poor user", receipt))
    // actions.push({ contractType: "erc721", name: "safeTransferFrom -> poor user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })

    receipt = await erc721.mint().sendTransaction({ from: accounts[0].address, }).executed();
    receipt = await erc721.safeTransferFrom(accounts[0].address, receivers[1], 3).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721", "safeTransferFrom -> rich user", receipt))
    // actions.push({ contractType: "erc721", name: "safeTransferFrom -> rich user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })


    // ============= erc721 enum ==============
    console.log("run erc721 enum")
    // @ts-ignore
    let erc721Enum = await conflux.getContractAt("MYERC721Enumberable", contractAddrs.erc721Enum);
    receipt = await erc721Enum.mint().sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721Enum", "mint", receipt))
    // actions.push({ contractType: "erc721Enum", name: "mint", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })
    console.log("aa")
    receipt = await erc721Enum.transferFrom(accounts[0].address, receivers[0], 0).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721Enum", "transferFrom -> poor user", receipt))
    // actions.push({ contractType: "erc721Enum", name: "transferFrom -> poor user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })
    console.log("bb")
    receipt = await erc721Enum.mint().sendTransaction({ from: accounts[0].address, }).executed();
    receipt = await erc721Enum.transferFrom(accounts[0].address, receivers[0], 1).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721Enum", "transferFrom -> rich user", receipt))
    // actions.push({ contractType: "erc721Enum", name: "transferFrom -> rich user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })
    console.log("cc")
    receipt = await erc721Enum.mint().sendTransaction({ from: accounts[0].address, }).executed();
    receipt = await erc721Enum.safeTransferFrom(accounts[0].address, receivers[1], 2).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721Enum", "safeTransferFrom -> poor user", receipt))
    // actions.push({ contractType: "erc721Enum", name: "safeTransferFrom -> poor user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })
    console.log("dd")
    receipt = await erc721Enum.mint().sendTransaction({ from: accounts[0].address, }).executed();
    receipt = await erc721Enum.safeTransferFrom(accounts[0].address, receivers[1], 3).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc721Enum", "safeTransferFrom -> rich user", receipt))
    // actions.push({ contractType: "erc721Enum", name: "safeTransferFrom -> rich user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })

    // ============= erc1155 ==============
    console.log("run erc1155")
    // @ts-ignore
    let erc1155 = await conflux.getContractAt("MYERC1155", contractAddrs.erc1155);
    receipt = await erc1155.mint(10).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc1155", "mint", receipt))
    // actions.push({ contractType: "erc1155", name: "mint", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })
    console.log("aa")
    receipt = await erc1155.safeTransferFrom(accounts[0].address, receivers[0], 0, 1, []).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc1155", "safeTransferFrom -> poor user", receipt))
    // actions.push({ contractType: "erc1155", name: "safeTransferFrom -> poor user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })
    console.log("bb")
    receipt = await erc1155.safeTransferFrom(accounts[0].address, receivers[0], 0, 1, []).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc1155", "safeTransferFrom -> owned t0 token", receipt))
    // actions.push({ contractType: "erc1155", name: "safeTransferFrom -> owned t0 token", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })
    console.log("cc")
    receipt = await erc1155.mint(10).sendTransaction({ from: accounts[0].address, }).executed();
    receipt = await erc1155.safeTransferFrom(accounts[0].address, receivers[0], 1, 1, []).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc1155", "safeTransferFrom -> owned t0 and send t1", receipt))
    // actions.push({ contractType: "erc1155", name: "safeTransferFrom -> owned t0 and send t1", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })

    // ============= erc1155 enum ==============
    console.log("run erc1155 enum")
    // @ts-ignore
    let erc1155Enum = await conflux.getContractAt("MYERC1155Enumberable", contractAddrs.erc1155Enum);
    receipt = await erc1155Enum.mint(10).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc1155Enum", "mint", receipt))
    // actions.push({ contractType: "erc1155Enum", name: "mint", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })

    receipt = await erc1155Enum.safeTransferFrom(accounts[0].address, receivers[0], 0, 1, []).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc1155Enum", "safeTransferFrom -> poor user", receipt))
    // actions.push({ contractType: "erc1155Enum", name: "safeTransferFrom -> poor user", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })

    receipt = await erc1155Enum.safeTransferFrom(accounts[0].address, receivers[0], 0, 1, []).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc1155Enum", "safeTransferFrom -> owned t0 token", receipt))
    // actions.push({ contractType: "erc1155Enum", name: "safeTransferFrom -> owned t0 token", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })

    receipt = await erc1155Enum.mint(10).sendTransaction({ from: accounts[0].address, }).executed();
    receipt = await erc1155Enum.safeTransferFrom(accounts[0].address, receivers[0], 1, 1, []).sendTransaction({ from: accounts[0].address, }).executed();
    actions.push(new Action("erc1155Enum", "safeTransferFrom -> owned t0 and send t1", receipt))
    // actions.push({ contractType: "erc1155Enum", name: "safeTransferFrom -> owned t0 and send t1", gas: receipt.gasUsed, collateral: receipt.storageCollateralized, hash: receipt.transactionHash })


    const actStrs = actions.map((a: Action) => `${a.contractType}|${a.name}|${a.gas}|${a.collateral}|${a.hash}`)
    console.log("Contract|Action|GasUsed|StorageCollateral|hash\n-|-|-|-|-\n" + actStrs.join("\n"))
}

summary().
    then(() => console.log("completed"))