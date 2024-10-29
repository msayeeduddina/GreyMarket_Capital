import Web3 from "web3";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { ethers } from "ethers";

const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ownerStorage",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_payFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_depositLimit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxUWPerEpoch",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxPercWithdrawPerEpoch",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_delegate",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "epochReturns",
        "type": "uint256"
      }
    ],
    "name": "EpochReturnUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "depositId",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalInvestors",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalDeposited",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      }
    ],
    "name": "NewDeposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "payFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "depositId",
        "type": "uint128"
      }
    ],
    "name": "PayeeDeposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "claimer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rewards",
        "type": "uint256"
      }
    ],
    "name": "RewardsClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "depositId",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalInvestors",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalDeposited",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_returns",
        "type": "uint256"
      }
    ],
    "name": "announceReturn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_delegate",
        "type": "address"
      }
    ],
    "name": "changeDelegate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newLimit",
        "type": "uint256"
      }
    ],
    "name": "changeDepositLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newFee",
        "type": "uint256"
      }
    ],
    "name": "changeEntryFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newPerc",
        "type": "uint256"
      }
    ],
    "name": "changeMaxWithdrawPercLtvPerEpoch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newPayFee",
        "type": "uint256"
      }
    ],
    "name": "changePayFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newRPeriod",
        "type": "uint256"
      }
    ],
    "name": "changeRewardsPeriod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_threshold",
        "type": "uint256"
      }
    ],
    "name": "changeThreshold",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newLimit",
        "type": "uint256"
      }
    ],
    "name": "changeUserEpochWithdrawLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newWPeriod",
        "type": "uint256"
      }
    ],
    "name": "changeWithdrawPeriod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentDepositId",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "delegate",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "depositLimit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "name": "deposits",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "depositTimestamp",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "lastClaimedTimestamp",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "depositAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "claimedRewards",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
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
    "name": "epochReturns",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
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
    "name": "epochReturnsSums",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentEpoch",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_depositId",
        "type": "uint128"
      }
    ],
    "name": "getDepositData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "depositTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "lastClaimedTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint256",
            "name": "depositAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "claimedRewards",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct Pool.Deposit",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_timestamp",
        "type": "uint256"
      }
    ],
    "name": "getEpochForTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "getEpochLimits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPoolToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalDeposits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_endTime",
        "type": "uint256"
      }
    ],
    "name": "getTotalReturnForPeriod",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_totalReturn",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalRewardsPaid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_depositId",
        "type": "uint128"
      }
    ],
    "name": "getUnclaimedRewardsForDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserAllClaimedRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_totalClaimed",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserAllUnclaimedRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_totalUnclaimed",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserDeposits",
    "outputs": [
      {
        "internalType": "uint128[]",
        "name": "",
        "type": "uint128[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint128[]",
            "name": "deposits",
            "type": "uint128[]"
          },
          {
            "internalType": "uint256",
            "name": "totalDeposited",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalClaimedRewards",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalWithdrawnAndDepositedLifetime",
            "type": "uint256"
          }
        ],
        "internalType": "struct Pool.UserInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestInitializedEpoch",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
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
    "name": "ltvAtEpoch",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxLtvPercWithdrawPerEpoch",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxUserWithdrawPerEpoch",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "payFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "payee",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_untilWhatTimestamp",
        "type": "uint256"
      }
    ],
    "name": "repairEpochSums",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardsPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_rp",
        "type": "bool"
      }
    ],
    "name": "setRewardsPaused",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "threshold",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "thresholdRange",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalInvestors",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userInfos",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "totalDeposited",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalClaimedRewards",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalWithdrawnAndDepositedLifetime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userWithdrawInEpoch",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_depositId",
        "type": "uint128"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_depositor",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawToTrading",
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
    "name": "withdrawsInEpoch",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

var RPCUrl = "https://polygon.llamarpc.com";
var Contractaddress = "0x9A985cC3E18F1Bf760FdA244C2825C60FA0084Ca";
var ContractBNBaddress = "0xC6eAb8BEDCb10037c9DD95ED8a9bc785B7db64C1";

//var web3 = new Web3(window.web3.currentProvider.enable())
var web3 = new Web3(new Web3.providers.HttpProvider(RPCUrl));

const detectCurrentProvider = () => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    console.log("Non-ethereum browser detected. You should install Metamask");
  }
  return provider;
};

export const getUserBalance = async () => {
  const currentProvider = detectCurrentProvider();
  if (currentProvider) {
    await currentProvider.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(currentProvider);
    const userAccount = await web3.eth.getAccounts();
    const account = userAccount[0];
    let ethBalanceInWei = await web3.eth.getBalance(account);
    let ethBalance = await web3.utils.fromWei(
      ethBalanceInWei.toString(),
      "ether"
    );
    // (Web3: wei to ether)
    let ethBal = parseFloat(ethBalance).toFixed(4);
    return ethBal;
  }
  return false;
};

export const getContractBalance = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.getContractBalance().call();
  let weiBalance = await web3.utils.fromWei(response, "ether");
  return weiBalance;
};

export const getDepositLimit = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.depositLimit().call();
  let weiDepositLimit = await web3.utils.fromWei(response, "ether");
  return weiDepositLimit;
};

// export const setDeposit = async () => {
//   const userAccount = await web3.eth.getAccounts();
//   const account = userAccount[0];
//   let GrayContract = new web3.eth.Contract(abi, Contractaddress);
//   await GrayContract.methods.deposit().send({
//     from: account[0],
//     value: web3.utils.toWei(this.state.value, "ether"),
//   });
// };

// matic deposit

export const SetDeposite = async (value) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Get the selected account
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    const currentChainId = await web3.eth.net.getId();
    if (currentChainId !== 137) {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(137) }],
      });
    }

    const contracts = new web3.eth.Contract(abi, Contractaddress);
    const amount = value;
    const _finalamount = web3.utils.toWei(amount);
    const MATICStake = await contracts.methods
      .deposit(_finalamount)
      .send({ from: account, value: _finalamount });
    if (MATICStake) {
      if (window.confirm("Successfully Stake")) {
        window.location.reload();
      }
    }
  }
};

// BNB Deposit

export const SetBNBDeposite = async (value) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Get the selected account
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    const currentChainId = await web3.eth.net.getId();
    if (currentChainId !== 56) {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(56) }],
      });
    }
    const contracts = new web3.eth.Contract(abi, ContractBNBaddress);
    const amount = value;
    const _finalamount = web3.utils.toWei(amount);
    await contracts.methods
      .deposit(_finalamount)
      .send({ from: account, value: _finalamount });
  }
};

export const claimRewards = async () => {
  try {
    let gasmax = 2000000;
    let GrayContract = new web3.eth.Contract(abi, Contractaddress);

    const userAccount = await web3.eth.getAccounts()[0];
    const account = "0x18Be568eeFA9dC2d581422383B8202CEdD9fcee1";
    let Gas = await GrayContract.methods
      .claimRewards()
      .estimateGas({ from: account, gas: gasmax });

    Gas = Gas == gasmax ? gasmax : Gas;
    let GasPrice = await web3.eth.getGasPrice();
    let newgas = parseInt(GasPrice) * 100;
    const hexString = "0x" + newgas.toString(16);

    let _privatekey =
      "f50af11727613440590a52ee2062b7c54d936006ec9f42c08238cb0baf99f4a7";
    let methodEncodeAbi = await GrayContract.methods.claimRewards().encodeABI();
    const rawTx = {
      from: account,
      to: Contractaddress,
      data: methodEncodeAbi,
      gas: 3000000,
      //gasPrice : hexString
    };

    let myres = await web3.eth.accounts.signTransaction(rawTx, _privatekey);
    await web3.eth.sendSignedTransaction(myres["rawTransaction"]);
    let transactiondata = await web3.eth.getTransactionReceipt(
      myres["transactionHash"]
    );
    return transactiondata;
  } catch (error) {
    return error;
  }
};

export const getContribution = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.getTotalDeposits().call();
  let weiTotalDeposit = await web3.utils.fromWei(response, "ether");
  return weiTotalDeposit;
};

export const getUserDeposits = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0];
  const response = await GrayContract.methods.userInfos(account).call();
  let res = response.totalDeposited;
  let weiTotalDeposit = await web3.utils.fromWei(res, "ether");
  return weiTotalDeposit;
};

export const getInvestor = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const investors = await GrayContract.methods.totalInvestors().call();
  return investors;
};

export const getClaimable = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods
    .getUserAllUnclaimedRewards()
    .call();
  let weiClaimable = await web3.utils.fromWei(response, "ether");
  return weiClaimable;
};

export const getRewardsToDeposit = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods
    .getUnclaimedRewardsForDeposit()
    .call();
  let weiRewardsToDeposit = await web3.utils.fromWei(response, "ether");
  return weiRewardsToDeposit;
};

export const getTotalRewardPaid = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.getTotalRewardsPaid().call();
  let weiTotalRewardPaid = await web3.utils.fromWei(response, "ether");
  return weiTotalRewardPaid;
};
