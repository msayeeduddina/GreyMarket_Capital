import Web3 from "web3";
import tokenabi from "../ABI/usdcABI.json";
// import { ethers,BigNumber } from "ethers";

import { toast, ToastContainer } from "react-toastify";

const ethers = require("ethers");

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

const abiBUSd = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// var RPCUrl = "https://endpoints.omniatech.io/v1/bsc/testnet/public";
var RPCUrl = "https://bsc-dataseed.binance.org";
var Contractaddress = "0xC6eAb8BEDCb10037c9DD95ED8a9bc785B7db64C1";
var TokenContractaddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

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
    )
    // (Web3: wei to ether);
    let ethBal = parseFloat(ethBalance).toFixed(4);
    return ethBal;
  }
  return false;
};


export const getBUSDCContractBalance = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.getContractBalance().call();
  let weiBalance = await web3.utils.fromWei(response, "ether");
  return weiBalance;
};

export const getBUSDCDepositLimit = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.depositLimit().call();
  let weiDepositLimit = await web3.utils.fromWei(response, "ether");
  return weiDepositLimit;
};


//trp
export const getBNBUserBalance = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Get the selected account
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    // const provider = new ethers.BrowserProvider(window.ethereum);
    // Get the signer (account owner)
    // const signer = provider.getSigner();
    // Create a new contract instance using the signer
    const contracts = new web3.eth.Contract(abiBUSd, TokenContractaddress);
    const balance = await contracts.methods.balanceOf(account).call();
    let weiBalanceBUSD = await web3.utils.fromWei(balance, "ether");
    return weiBalanceBUSD;
  }
};



export const SetBUSDApprove = async () => {
try{
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

    const contracts = new web3.eth.Contract(tokenabi, TokenContractaddress);
    const BUASDApprove = await contracts.methods.approve(Contractaddress, "100000000000000000000000000000000000").send({ from: account });
      if (BUASDApprove) {
        if(window.confirm("Successfully Stake")){
          window.location.reload();
        }
      }

  }
}catch(error){
 return error;
}
};




export const SetDeposite = async (value) => {

  try {
    const amount = value;
    const famount = Number(amount);
    const _finalamount = web3.utils.toWei(famount.toString(), "ether");
    let gasmax = 2000000;
    let GrayContract = new web3.eth.Contract(abi, Contractaddress);

    const currentProvider = detectCurrentProvider();
    await currentProvider.request({ method: "eth_requestAccounts" });
    const Metaweb3 = new Web3(currentProvider);
    const userAccount = await Metaweb3.eth.getAccounts();
    const account = userAccount[0];
    let Gas = await GrayContract.methods
      .deposits(_finalamount)
      .estimateGas({ from: account, gas: gasmax });

    Gas = Gas == gasmax ? gasmax : Gas;
    let GasPrice = await web3.eth.getGasPrice();
    let newgas = parseInt(GasPrice) * 100;
    const hexString = "0x" + newgas.toString(16);

    // let _privatekey = "f50af11727613440590a52ee2062b7c54d936006ec9f42c08238cb0baf99f4a7"
    let methodEncodeAbi = await GrayContract.methods
      .deposit(_finalamount)
      .encodeABI();

    const transactionParameters = {
      from: account,
      to: Contractaddress,
      data: methodEncodeAbi,
      value: _finalamount,
      gas: "100000",
      chainId: "56",
    };

    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await currentProvider.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return txHash;
  } catch (error) {
    toast.error(error);
    return error;
  }
};

export const SetApprove = async (value) => {
  try {
    const amount = value;
    const famount = Number(amount);
    const _finalamount = web3.utils.toWei(famount.toString(), "ether");
    let gasmax = 2000000;
    let GrayContract = new web3.eth.Contract(tokenabi, TokenContractaddress);
    
    const currentProvider = detectCurrentProvider();
    await currentProvider.request({ method: "eth_requestAccounts" });
    const Metaweb3 = new Web3(currentProvider);
    const userAccount = await Metaweb3.eth.getAccounts();
    const account = userAccount[0];
    let Gas = await GrayContract.methods
      .approve(Contractaddress, _finalamount)
      .estimateGas({ from: account, gas: gasmax });

    Gas = Gas == gasmax ? gasmax : Gas;
    let GasPrice = await web3.eth.getGasPrice();
    let newgas = parseInt(GasPrice) * 100;

    // let _privatekey = "f50af11727613440590a52ee2062b7c54d936006ec9f42c08238cb0baf99f4a7"
    let methodEncodeAbi = await GrayContract.methods
      .approve(Contractaddress, _finalamount)
      .encodeABI();

    const transactionParameters = {
      from: TokenContractaddress,
      to: Contractaddress,
      data: methodEncodeAbi,
      value: _finalamount,
      gas: "100000",
      chainId: "56",
    };

    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await currentProvider.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return txHash;
  } catch (error) {
    toast.error(error);
    return error;
  }
};

export const claimRewards = async () => {
  try {
    let gasmax = 2000000;
    let GrayContract = new web3.eth.Contract(abi, Contractaddress);

    const currentProvider = detectCurrentProvider();
    await currentProvider.request({ method: "eth_requestAccounts" });
    const Metaweb3 = new Web3(currentProvider);
    const userAccount = await Metaweb3.eth.getAccounts();
    const account = userAccount[0];
    let Gas = await GrayContract.methods
      .claimRewards()
      .estimateGas({ from: account, gas: gasmax });

    Gas = Gas == gasmax ? gasmax : Gas;
    let GasPrice = await web3.eth.getGasPrice();
    let newgas = parseInt(GasPrice) * 100;
    const hexString = "0x" + newgas.toString(16);
    let methodEncodeAbi = await GrayContract.methods.claimRewards().encodeABI();
    const transactionParameters = {
      from: account,
      to: Contractaddress,
      data: methodEncodeAbi,
      gas: "100000",
      chainId: "56",
    };

    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await currentProvider.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return txHash;
  } catch (error) {
    toast.error(error);
    return error;
  }
};

//BUSD  set deposit data

export const SetBUSDDeposite = async (value) => {

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

    const contracts = new web3.eth.Contract(abi, Contractaddress);
    const amount = value;
    const _finalamount = web3.utils.toWei(amount);
    const BUSDstake = await contracts.methods.deposit(_finalamount).send({ from: account });
    if (BUSDstake) {
      if(window.confirm("Successfully Stake")){
        window.location.reload();
      }
    }
  }
};

export const getBUSDCContribution = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.getTotalDeposits().call();
  let weiTotalDeposit = await web3.utils.fromWei(response, "ether");
  return weiTotalDeposit;
};

export const getBUSDCInvestor = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const investors = await GrayContract.methods.totalInvestors().call();
  return investors;
};

export const getBUSDCClaimable = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  // Get the selected account
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const account = accounts[0];

  const response = await GrayContract.methods
    .getUserAllUnclaimedRewards(account)
    .call();

  let weiClaimable = await web3.utils.fromWei(response, "ether");
  return weiClaimable;
};

export const getBUSDCRewardsToDeposit = async (value) => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);

  //
  await window.ethereum.request({ method: "eth_requestAccounts" });
  // Get the selected account
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const account = accounts[0];
  let _depositIds = await GrayContract.methods.getUserDeposits(account).call()
  _depositIds = value;
  const response = await GrayContract.methods.getUnclaimedRewardsForDeposit(_depositIds).call();
  let weiRewardsToDeposit = await web3.utils.fromWei(response, "ether");
  return weiRewardsToDeposit;
};

export const getBUSDCTotalRewardPaid = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.getTotalRewardsPaid().call();
  let weiTotalRewardPaid = await web3.utils.fromWei(response, "ether");
  return weiTotalRewardPaid;
};

export const SetBUSDClaim = async () => {
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
    const contracts = new web3.eth.Contract(abi, Contractaddress);
   const busdClaim = await contracts.methods.claimRewards().send({ from: account });
    if (busdClaim) {
      if(window.confirm("Successfully Claim")){
        window.location.reload();
      }
    }
  }
};

export const getBUSDUserDeposits = async () => {
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

//epoc return & latest epoch
export const getBUSDepochReturns = async (value) => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const timestmp = value;
  const response = await GrayContract.methods.epochReturns(timestmp).call();
  return response;
};

export const getBUSDLatestepoch = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.latestInitializedEpoch().call();
  return response;
};

export const getBUSDEpochLimits = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const latestepoch = await GrayContract.methods.latestInitializedEpoch().call();
  const response = await GrayContract.methods.getEpochLimits(latestepoch).call();
  const res = response[0]
  return res;
};

export const getBUSDcurrentepoch = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const response = await GrayContract.methods.getCurrentEpoch().call();
  return response;
};


export const getBUSDTotalReturnForPeriod = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const currentEpoch = await GrayContract.methods.getCurrentEpoch().call();
  const [todaysReturn, totalUserDeposit] = await Promise.all([
    GrayContract.methods.epochReturns(currentEpoch).call(),
    getBUSDUserDeposits(),
  ]);

  return {
    oneHourReward: parseFloat((todaysReturn / 10000 / 24) * totalUserDeposit).toFixed(4),
    oneDayReward: parseFloat((todaysReturn / 10000) * totalUserDeposit).toFixed(4),
    oneWeekReward: parseFloat((todaysReturn / 10000) * 7 * totalUserDeposit).toFixed(4),
  };
};


// set BUSD withdraw

export const SetBUSDWithdraw = async (_id) => {
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
    const GrayContract = new web3.eth.Contract(abi, Contractaddress);
    const withdrawId = _id;
    const withdrawAmo = await GrayContract.methods.withdraw(withdrawId).send({ from: account });
     if (withdrawAmo) {
      if (window.confirm("Successfully Withdraw")) {
        window.location.reload();
      }
    }
  }
};

export const getBUSDUserDepositsIds = async (account) => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const _account = accounts[0];
  const response = await GrayContract.methods.getUserDeposits(_account).call();
  return response;
};

export const getBUSDDepositData = async (_id) => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  const response = await GrayContract.methods.deposits(_id).call();
  return response;
};

export const getBUSDeposits_depositDate = async (_id) => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  const account = accounts[0];
  const depositId = _id;
  const response = await GrayContract.methods.deposits(depositId).call();
  let res_depositDate = response.depositTimestamp;
  const date = new Date(res_depositDate * 1000)
  var new_depositDate = date.toLocaleDateString('en-GB');
  return new_depositDate;
};

export const getBUSDDeposits_endDate = async (_id) => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const depositId = _id;
  const response = await GrayContract.methods.deposits(depositId).call();
  let res_depositDate = response.depositTimestamp;
  let res_endDate = parseFloat(res_depositDate * 1000) + 2592000 * 1000;
  const date = new Date(res_endDate);
  var new_endDate = date.toLocaleDateString('en-GB');
  return new_endDate;
};


export const getBUSDDeposits_active = async (_id) => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const depositId = _id;
  const response = await GrayContract.methods.deposits(depositId).call();
  let res_active = response.isActive;
  return res_active;

};


export const getBUSDeposits_depositAmount = async (_id) => {

  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const depositId = _id;
  const response = await GrayContract.methods.deposits(depositId).call();
  let res = response.depositAmount;
  const res_depositAmount = await web3.utils.fromWei(res, "ether");
  return res_depositAmount;

};

export const getBUSDUserAllRewardsWithdrawn = async () => {
  let GrayContract = new web3.eth.Contract(abi, Contractaddress);
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  const account = accounts[0];
  const response = await GrayContract.methods.getUserAllClaimedRewards(account).call();
  let totalRewardsWithdrawn = await web3.utils.fromWei(response, "ether");
  let usertotalRewardsWithdrawn = parseFloat(totalRewardsWithdrawn).toFixed(2);
  return usertotalRewardsWithdrawn;

};


