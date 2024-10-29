import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
// import { SetDeposite, SetBNBDeposite } from "../../../ABI/contractAction";
import { SetDeposite } from "../../../ABI/contractAction";

import {
  SetApprove,
  checkApproval,
  SetUSDTDeposite,
  getUSDCUserBalance,
  getUSDCepochReturns,
  getUSDCLatestepoch,
  getUSDCcurrentepoch,
} from "../../../ABI/usdccontractAction";
import {
  SetBUSDDeposite,
  approveBUSD,
  getBNBUserBalance,
  getBUSDepochReturns,
  getBUSDLatestepoch,
  getBUSDcurrentepoch,
} from "../../../ABI/busdcontractAction";
import { SetBUSDApprove } from "../../../ABI/busdcontractAction";
import {
  getBNBBalance,
  getBNBepochReturns,
  getBNBLatestepoch,
  getBNBcurrentepoch,
  SetBNBDeposite
} from "../../../ABI/bnbcontractAction";
import {
  getMaticBalance,
  getMaticepochReturns,
  getMaticLatestepoch,
  getMaticcurrentepoch,
} from "../../../ABI/maticcontractAction";
import tokenabi from "../../../ABI/usdcABI.json";
import poolabi from "../../../ABI/poolABI.json";
import Web3 from "web3";
import { ethers } from "ethers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var RPCUrl = "https://bsc-dataseed.binance.org";
var RPCUrlMatic = "https://polygon.llamarpc.com";
var Contractaddress = "0x94F92F1173F40b0134cD2938E129d2D5EC50B9b0";
var TokenContractaddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
var TokenBUSDaddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
var ContractAddrerssBNB = "0xC6eAb8BEDCb10037c9DD95ED8a9bc785B7db64C1";
var web3 = new Web3(new Web3.providers.HttpProvider(RPCUrl));
var web3USDC = new Web3(new Web3.providers.HttpProvider(RPCUrlMatic));

const Trading = ({  wallet2,account1 }) => {
  const [stakeValue, setstakeValue] = useState();
  const [BNBBalance, setBNBBalance] = useState();
  const [MaticBalance, setMaticBalance] = useState();

  const [stakeBNBValue, setstakeBNBValue] = useState();
  const [USDCBAlanceValue, setUSDCBAlanceValue] = useState();
  const [BNBBAlanceValue, setBNBBAlanceValue] = useState();
  const [stakeUSDCValue, setstakeUSDCValue] = useState();
  const [approveValue, setApproveValue] = useState();
  const [stakeBUSDValue, setstakeBUSDValue] = useState();
  const [approveBUSDValue, setApproveBUSDValue] = useState();
 
  // BUSD approve data

  const approveData = async () => {
    try {
      if (window.ethereum) {
        //const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the selected account
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const account = accounts[0];
        const contracts = new web3USDC.eth.Contract(tokenabi, TokenContractaddress);
        const allowance = await contracts.methods
          .allowance(account, Contractaddress)
          .call();
        setApproveValue(allowance);
      }
    } catch (error) {
      return error;
    }
  };
  
  const approveBUSD = async () => {
    try {
      if (window.ethereum) {
        //const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the selected account
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const account = accounts[0];
        const contracts = new web3.eth.Contract(tokenabi, TokenBUSDaddress);
        const allowance = await contracts.methods
          .allowance(account, ContractAddrerssBNB)
          .call();
        setApproveBUSDValue(allowance);
      }
    } catch (error) {
      return error;
    }
  };
  

  useEffect(() => {
    approveData();
    approveBUSD();
    getBNBepochReturns();
    getBNBLatestepoch();
    getBNBcurrentepoch();
    getBUSDepochReturns();
    getBUSDLatestepoch();
    getBUSDcurrentepoch();
    getMaticepochReturns();
    getMaticLatestepoch();
    getMaticcurrentepoch();
    getUSDCepochReturns();
    getUSDCLatestepoch();
    getUSDCcurrentepoch();
  }, []);

  
  useEffect(() => {
    const getBNBBalanceOfValue = async () => {
      const data = await getBNBUserBalance();
      const Balance = parseFloat(data).toFixed(4);
      setBNBBAlanceValue(Balance);
    };
    getBNBBalanceOfValue();
  }, []);

  useEffect(() => {
    const getUSDCBalanceOfValue = async () => {
      const data = await getUSDCUserBalance();
      const Balance = parseFloat(data).toFixed(4);
      setUSDCBAlanceValue(Balance);
    };
    getUSDCBalanceOfValue();
  }, []);

  useEffect(() => {
    const getBNBTokenBalance = async () => {
      const data = await getBNBBalance();
      const Balance = parseFloat(data).toFixed(4);
      setBNBBalance(Balance);
    };
    getBNBTokenBalance();
  }, []);

  useEffect(() => {
    const getMaticTokenBalance = async () => {
      const data = await getMaticBalance();
      const Balance = parseFloat(data).toFixed(4);
      setMaticBalance(Balance);
    };
    getMaticTokenBalance();
  }, []);

  return (
    <div>
      <div className="container">
      <ToastContainer />
        <div className="row">
          <div className="col-md-12 mt-3">
            <p>Trading Bot: Earn Daily Yield</p>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-6 col-xl-3 mb-4 mb-xl-0">
            <div className="panel p-4">
              <div className="hstack mb-3">
                <div className="fs-5 fw-semibold">
                  <div className="hstack gap-2">
                    <div>
                      <img src="images\icon-bnb.svg" alt="icon.bnb" />
                    </div>
                    <div className="mt-1"> BNB</div>
                  </div>
                </div>
                <div className="ms-auto text-muted">
                  <small>{ wallet2 || account1? parseFloat(BNBBalance).toFixed(2) : ""} BNB</small>
                </div>
              </div>
              { wallet2 || account1? (
                <>
                  <small className="text-muted">
                    Network: Binance Smart Chain
                  </small>
                  <input
                    type="number"
                    value={stakeBNBValue}
                    onChange={(e) => setstakeBNBValue(e.target.value)}
                    className="form-control mb-3 mt-1"
                    id="inputAmount"
                    placeholder="Add Value"
                  />
                  <div className="text-center">
                    <button
                      onClick={() => SetBNBDeposite(stakeBNBValue)}
                      className="btn btn-secondary  col-12 col-md-6 mx-auto pt-2"
                    >
                      Stake
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <small> Didn't Start Yet</small>
                  <br />
                  <div className="text-center" >
                    <button type="button" class="btn btn-secondary mt-3 pt-2" data-bs-toggle="button" >Didn't Start Yet</button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-6 col-xl-3 mb-4 mb-xl-0">
            <div className="panel p-4">
              <div className="hstack mb-3">
                <div className="fs-5 fw-semibold">
                  <div className="hstack gap-2">
                    <div>
                      <img src="images\icon-busd.svg" alt="icon-busd" />
                    </div>
                    <div className="mt-1"> BUSD</div>
                  </div>
                </div>
                <div className="ms-auto text-muted">
                  <small>{wallet2 || account1? parseFloat(BNBBAlanceValue).toFixed(2): ""} BUSD</small>
                </div>
              </div>
              {  wallet2 || account1? (
                <>
                  <small className="text-muted">
                    Network: Binance Smart Chain
                  </small>
                  <div style={{ height: 63, lineHeight: 4 }}>
                    <small>
                      {approveBUSDValue == 0 ? (
                        "Approve Wallet to Get Started"
                      ) : (
                        <input
                          type="number"
                          value={stakeBUSDValue}
                          onChange={(e) => setstakeBUSDValue(e.target.value)}
                          className="form-control mb-3 mt-1"
                          id="inputAmount"
                          placeholder="Add Value"
                        />
                      )}
                    </small>
                  </div>
                  <div className="text-center">
                    {approveBUSDValue == 0 ? (
                      <button
                        onClick={() => SetBUSDApprove()}
                        className="btn btn-secondary col-12 col-md-6 mx-auto pt-2"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => SetBUSDDeposite(stakeBUSDValue)}
                        className="btn btn-secondary col-12 col-md-6 mx-auto pt-2"
                      >
                        Stake
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <small> Didn't Start Yet</small>
                  <br />
                  <div className="text-center" >
                    <button type="button" class="btn btn-secondary mt-3 pt-2" data-bs-toggle="button" >Didn't Start Yet</button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-6 col-xl-3 mb-4 mb-md-0 mb-xl-0">
            <div className="panel p-4">
              <div className="hstack mb-3">
                <div className="fs-5 fw-semibold">
                  <div className="hstack gap-2">
                    <div>
                      <img src="images\icon-matic.svg" alt="icon-matic" />
                    </div>
                    <div className="mt-1"> MATIC</div>
                  </div>
                </div>
                <div className="ms-auto text-muted">
                  <small>{  wallet2 || account1? parseFloat(MaticBalance).toFixed(2) : ""} MATIC</small>
                </div>
              </div>
              {  wallet2 || account1? (
                <>
                  <small className="text-muted">Network: Polygon</small>
                  <input
                    type="number"
                    value={stakeValue}
                    onChange={(e) => setstakeValue(e.target.value)}
                    className="form-control mb-3 mt-1"
                    id="inputAmount"
                    placeholder="Add Value"
                  />
                  <div className="text-center">
                    <button
                      onClick={() => SetDeposite(stakeValue)}
                      className="btn btn-secondary  col-12 col-md-6 mx-auto pt-2"
                    >
                      Stake
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <small> Didn't Start Yet</small>
                  <br />
                  <div className="text-center" >
                    <button type="button" class="btn btn-secondary mt-3 pt-2" data-bs-toggle="button" >Didn't Start Yet</button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-6 col-xl-3 mb-4 mb-md-0 mb-xl-0">
            <div className="panel p-4">
              <div className="hstack mb-3">
                <div className="fs-5 fw-semibold">
                  <div className="hstack gap-2">
                    <div>
                      <img src="images/icon-usdc.svg" alt="icon-usdc" />
                    </div>
                    <div className="mt-1"> USDC</div>
                  </div>
                </div>
                <div className="ms-auto text-muted">
                  <small>{ wallet2 || account1?parseFloat(USDCBAlanceValue).toFixed(2)  : ""} USDC</small>
                </div>
              </div>
              { wallet2 || account1? (
                <>
                  <small className="text-muted">Network: Polygon</small>
                  <div style={{ height: 63, lineHeight: 4 }}>
                    <small>
                      {approveValue == 0 ? (
                        "Approve Wallet to Get Started"
                      ) : (
                        <input
                          type="number"
                          value={stakeUSDCValue}
                          onChange={(e) => setstakeUSDCValue(e.target.value)}
                          className="form-control mb-3 mt-1"
                          id="inputAmount"
                          placeholder="Add Value"
                        />
                      )}
                    </small>
                  </div>
                  <div
                    className="text-center" >
                    {approveValue == 0 ? (
                      <button
                        onClick={() => SetApprove()}
                        className="btn btn-secondary col-12 col-md-6 mx-auto pt-2"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => SetUSDTDeposite(stakeUSDCValue)}
                        className="btn btn-secondary col-12 col-md-6 mx-auto pt-2"
                      >
                        Stake
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <small> Didn't Start Yet</small>
                  <br />
                  <div className="text-center" >
                    <button type="button" class="btn btn-secondary mt-3 pt-2" data-bs-toggle="button" >Didn't Start Yet</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading;
