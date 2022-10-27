const solc = require('solc');
const fs = require('fs');
const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3();
web3.setProvider("https://eth-goerli.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY);
async function start(){
    file = fs.readFileSync('initial.sol').toString();
    // console.log(file);

    var input = {
        language: 'Solidity',
        sources: {
            'initial.sol':{
                content: file,
            }
        }, 

        settings: {
            outputSelection:{
                "*":{
                    "*": ["*"]
                }
            }
        }
    }

    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    // console.log("Result: " , output);

    ABI = output.contracts['initial.sol']['initial'].abi;
    bytecode = output.contracts['initial.sol']['initial'].evm.bytecode.object;
    // console.log("Bytecode: " , bytecode);
    // console.log("ABI: ", ABI);

    contract = new web3.eth.Contract(ABI);
    // console.log("KEY:", process.env.PRIVATE_KEY)
    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    // console.log(account);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    console.log('Attempting to deploy from account:', account.address);

    const txData = contract
        .deploy({
            data: bytecode,
            arguments: []
        })
        // .encodeABI()
        .send({
            from: web3.eth.defaultAccount,
            gasLimit: "200000",
            gas: 500000,
            gasPrice: '70000000000', 
        })
        .on("receipt", (receipt) => {
  
            // Contract Address will be returned here
            console.log("Contract Address:", receipt.contractAddress);
        })

    // const incrementer = new web3.eth.Contract(ABI);
    // const incrementerTx = incrementer.deploy(
    //     bytecode
    // );
    // console.log(incrementerTx)
    // const createTransaction = await web3.eth.accounts.signTransaction(
    //     {
    //         from: account.address,
    //         data: incrementerTx.encodeABI(),
    //         gas: '4294967295',
    //     },
    //     account.privKey
    // );
    // console.log(createTransaction)
    // const createReceipt = await web3.eth.sendSignedTransaction(
    //     createTransaction.rawTransaction
    //  );
    //  console.log('Contract deployed at address', createReceipt.contractAddress);
}


start();