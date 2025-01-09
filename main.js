
const web3 = new Web3('https://rpc-amoy.polygon.technology/'); 

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "data",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const contractAddress = '0xcD3ae69710BA81AECe87a667868B0a73afC4cbae';
console.log("Contract Deployed At:", contractAddress);
const contract = new web3.eth.Contract(contractABI, contractAddress);
console.log("Contract:",contract);


async function addData() {

    const privateKey = 'dd5edd90d6e6f36b08b9cbeb6a8db8b8c22ffb20ff960cf264748b080a214fab'; 
    const senderAddress = '0xdAFF799ADaF32E1E1041e9C95D8AEEdc921bBbC1';
	console.log("Wallet Address:",senderAddress);

    const id = document.getElementById('id').value;
    const stringData = document.getElementById('string').value;

    if (!id || !stringData) {
        alert('Please fill in both the ID and String fields.');
        return;
    }

    try {
      
        const transactionData = contract.methods.addData(id, stringData).encodeABI();
		console.log("Data to be added:", transactionData)
        const gasPrice = await web3.eth.getGasPrice(); 
		console.log("Gas Price:", gasPrice);
		const nonce = await web3.eth.getTransactionCount(senderAddress);
		console.log("Nonce:",nonce);
        

        
        const txObject = {
            to: contractAddress,
            gas: 199000, 
            gasPrice: gasPrice,
			nonce:nonce,
            data: transactionData,
        };

      
        const signTransaction = await web3.eth.accounts.signTransaction(txObject, privateKey);
		console.log("Transaction Signed:",signTransaction);
		console.log("Sending the transaction, please wait for confirmation...")
        const sendTransaction = await web3.eth.sendSignedTransaction(signTransaction.rawTransaction);
		

        console.log('Transaction successful:', sendTransaction);
        alert('Data successfully added');
		
    } catch (error) {
        console.error('Error:', error);
        alert('Fail');
    }
}

async function getData()
{
    const id=document.getElementById("id").value;
    const string =document.getElementById("string");

    const result=await contract.methods.getData(id).call();
    string.value=result;
}



