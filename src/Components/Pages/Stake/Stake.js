import React, { useEffect, useState } from "react";
import {
  getContractBalance,
  getContribution,
  getDepositLimit,
} from "../../../ABI/contractAction";
import {
  getBNBBalance,
  getBNBDepositLimit,
  getBNBContractBalance,
  SetBNBDeposite,
  getBNBTotalReturnForPeriod,
} from "../../../ABI/bnbcontractAction";
import {
  getMaticBalance,
  getMaticDepositLimit,
  getMaticContractBalance,
  SetMaticDeposite,
  getMaticTotalReturnForPeriod,
} from "../../../ABI/maticcontractAction";
import {
  getUSDCUserBalance,
  getUSDCDepositLimit,
  getUSDCContractBalance,
  SetUSDTDeposite,
  getUSDCTotalReturnForPeriod,
  SetUSDCWithdraw,
  getDeposits_depositDate,
  getDeposits_active,
  getDeposits_depositAmount,
  getUserDepositsIds,
  getDeposits_endDate,
  getDepositData
} from "../../../ABI/usdccontractAction";
import {
  getBNBUserBalance,
  getBUSDCDepositLimit,
  getBUSDCContractBalance,
  SetBUSDDeposite,
  getBUSDTotalReturnForPeriod,
} from "../../../ABI/busdcontractAction";
import { Link } from "react-router-dom";


const Stake = ({ isConnected, wallet2, account1, DailyAverage, MonthlyAverage }) => {
  const [depositLimit, setdepositLimit] = useState();
  const [Symbol, setSymbol] = useState("BNB");
  const [UserBalance, setUserBalance] = useState();
  const [bnbTotalRewards, setBNBTotalRewards] = useState();
  const [busdTotalRewards, setBUSDTotalRewards] = useState();
  const [maticTotalRewards, setMaticTotalRewards] = useState();
  const [usdcTotalRewards, setUsdcTotalRewards] = useState();
  const [contractBalance, setcontractBalance] = useState();
  const [stakeValue, setstakeValue] = useState();
  
 

  useEffect(() => {
    const BNBfunction = async () => {
      const BNBBalance = await getBNBBalance();
      const depositLimit = await getBNBDepositLimit();
       const contractBalance = await getBNBContractBalance();
       const totalBnbRewards = await getBNBTotalReturnForPeriod();
      
      setUserBalance(parseFloat(BNBBalance).toFixed(2));
      setdepositLimit(parseFloat(depositLimit).toFixed(2));
      setcontractBalance(parseFloat(contractBalance).toFixed(2));
      setBNBTotalRewards(totalBnbRewards);
    };
    BNBfunction()
  }, []);


  const BNBfunction = async () => {
    const BNBBalance = await getBNBBalance();
    const depositLimit = await getBNBDepositLimit();
     const contractBalance = await getBNBContractBalance();
     const totalBnbRewards = await getBNBTotalReturnForPeriod();
    setUserBalance(parseFloat(BNBBalance).toFixed(2));
    setdepositLimit(parseFloat(depositLimit).toFixed(2));
    setcontractBalance(parseFloat(contractBalance).toFixed(2));
    setBNBTotalRewards(totalBnbRewards);
    setSymbol("BNB");
  };

  const BUSDCfunction = async () => {
    const BUSDCBalance = await getBNBUserBalance();
    const depositLimit = await getBUSDCDepositLimit();
    const contractBalance = await getBUSDCContractBalance();
    const totalBusdRewards = await getBUSDTotalReturnForPeriod();
    setUserBalance(parseFloat(BUSDCBalance).toFixed(2));
    setdepositLimit(parseFloat(depositLimit).toFixed(2));
    setcontractBalance(parseFloat(contractBalance).toFixed(2));
    setBUSDTotalRewards(totalBusdRewards);
    setSymbol("BUSD");
  };

  const Maticfunction = async () => {
    const MaticBalance = await getMaticBalance();
    const depositLimit = await getMaticDepositLimit();
    const contractBalance = await getMaticContractBalance();
    const totalMaticRewards = await getMaticTotalReturnForPeriod();
    setUserBalance(parseFloat(MaticBalance).toFixed(2));
    setdepositLimit(parseFloat(depositLimit).toFixed(2));
    setcontractBalance(parseFloat(contractBalance).toFixed(2));
    setMaticTotalRewards(totalMaticRewards);
    setSymbol("MATIC");
  };


  const USDCfunction = async () => {
    const USDCBalance = await getUSDCUserBalance();
    const depositLimit = await getUSDCDepositLimit();
    const contractBalance = await getUSDCContractBalance();
    const totalUsdcRewards = await getUSDCTotalReturnForPeriod();
    setUserBalance(parseFloat(USDCBalance).toFixed(2));
    setdepositLimit(parseFloat(depositLimit).toFixed(2));
    setcontractBalance(parseFloat(contractBalance).toFixed(2));
    setUsdcTotalRewards(totalUsdcRewards);
    setSymbol("USDC");
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>Stake</p>
          </div>
        </div>
        <div className="row mb-5">
          <div class="col-lg-8 mb-4 mb-lg-0 mt-lg-2">
            <div className="panel p-4">
              <div className="row mb-2">
                <div className="col-10 col-md-auto mb-2 mb-md-0">
                  <div className="row">
                    <div className="col-auto mb-3 px-2">
                      <input
                        type="radio"
                        className="btn-check"
                        name="stake"
                        id="stake-bnb"
                        autocomplete="off"
                        defaultChecked
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="stake-bnb"
                        onClick={(e) => BNBfunction(e)}
                      >
                        <div className="hstack gap-2">
                          <div>
                            <img
                              src="images/icon-bnb.svg"
                              height="24"
                              alt="icon-bnb"
                            />
                          </div>
                          <div className="mt-1">BNB</div>
                        </div>
                      </label>
                    </div>
                    <div className="col-auto mb-3 px-2">
                      <input
                        type="radio"
                        className="btn-check"
                        name="stake"
                        id="stake-busd"
                        autocomplete="off"
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="stake-busd"
                        onClick={(e) => BUSDCfunction(e)}
                      >
                        <div className="hstack gap-2">
                          <div>
                            <img
                              src="images/icon-busd.svg"
                              height="24"
                              alt="icon-busd"
                            />
                          </div>
                          <div className="mt-1">BUSD</div>
                        </div>
                      </label>
                    </div>
                    <div className="col-auto mb-3 px-2">
                      <input
                        type="radio"
                        className="btn-check"
                        name="stake"
                        id="stake-matic"
                        autocomplete="off"
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="stake-matic"
                        onClick={(e) => Maticfunction(e)}
                      >
                        <div className="hstack gap-2">
                          {/* <div>stakeValue */}
                          <div>
                            <img
                              src="images/icon-matic.svg"
                              height="24"
                              alt="icon-matic"
                            />
                          </div>
                          <div className="mt-1">MATIC</div>
                        </div>
                      </label>
                    </div>
                    <div className="col-auto mb-3 px-2">
                      <input
                        type="radio"
                        className="btn-check"
                        name="stake"
                        id="stake-usdc"
                        autocomplete="off"
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="stake-usdc"
                        onClick={(e) => USDCfunction(e)}
                      >
                        <div className="hstack gap-2">
                          <div>
                            <img
                              src="images/icon-usdc.svg"
                              height="24"
                              alt="icon-usdc"
                            />
                          </div>
                          <div className="mt-1">USDC</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-2 col-md-auto ms-md-auto">
                  <span className="text-muted">
                    {UserBalance} {Symbol}
                  </span>
                </div>
              </div>
              <div className="col-12 mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="inputAmount"
                  placeholder="0.00"
                  value={stakeValue}
                  onChange={(e) => setstakeValue(e.target.value)}
                />
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 text-end mb-2">
                    <span style={{ fontWeight: "bold" }}>
                      {DailyAverage}
                      {"%"}
                    </span>
                    <span className="text-muted"> Daily</span>
                  </div>
                  <div className="col-12 text-end">
                    <span style={{ fontWeight: "bold" }}>
                      {MonthlyAverage?.toFixed(2)}
                      {"%"}
                    </span>
                    <span className="text-muted"> Monthly</span>
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 text-center mx-auto">

                <div>
                  {Symbol == "MATIC" && wallet2 && account1 ? (
                    <button
                      onClick={() => SetMaticDeposite(stakeValue)}
                      className="btn btn-secondary  mx-auto pt-2  px-4 mt-md-5"
                    >
                      Stake
                    </button>
                  ) : ( Symbol == "MATIC" ?
                  (<button
                    className="btn btn-secondary  mx-auto pt-2 mt-md-5"
                  >Connect wallet to get started</button>) : null
                )}
                  {/* comment:8:2,24-2 */}
                  {Symbol == "BNB" && wallet2 && account1 ? (
                    <button
                      onClick={() => SetBNBDeposite(stakeValue)}
                      className="btn btn-secondary  mx-auto pt-2 px-4 mt-md-5"
                    >
                      Stake
                    </button>
                  ) :
                    ( Symbol == "BNB" ?
                      (<button
                        className="btn btn-secondary  mx-auto pt-2 mt-md-5"
                      >Connect wallet to get started</button>) : null
                    )
                  }

                  {Symbol == "USDC" && wallet2 && account1 ? (
                    <button
                      onClick={() => SetUSDTDeposite(stakeValue)}
                      className="btn btn-secondary  mx-auto pt-2  px-4 mt-md-5"
                    >
                      Stake
                    </button>
                  ) :( Symbol == "USDC" ?
                  (<button
                    className="btn btn-secondary mx-auto pt-2 mt-md-5"
                  >Connect wallet to get started</button>) : null
                )}

                  {Symbol == "BUSD" && wallet2 && account1 ? (
                    <button
                      onClick={() => SetBUSDDeposite(stakeValue)}
                      className="btn btn-secondary  mx-auto pt-2 px-4 mt-md-5"

                    >
                      Stake
                    </button>
                  ) : ( Symbol == "BUSD" ?
                  (<button
                    className="btn btn-secondary  mx-auto pt-2 mt-md-5"
                  >Connect wallet to get started</button>) : null
                )}
                </div>

                {/* comment: 8:2,24-2*/}
                {/* 
                {Symbol == undefined && isConnected ? (
                  <button
                    className="btn btn-secondary col-12 col-md-6 mx-auto pt-2"
                    style={{ width: "100%" }}
                  >
                    Stake
                  </button>
                ) : (
                  <></>
                )} */}
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt-lg-2">
            <div className="panel p-4">
              <p>Deposit</p>
              <div className="mb-5">
                <div className="row mb-2">
                  <div className="col-7">Total Deposited:</div>
                  <div className="col-5 text-end fw-semibold">
                    {isNaN(contractBalance)
                      ? 0
                      : parseFloat(contractBalance).toFixed(2)}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-7">Deposit Limit:</div>
                  <div className="col-5 text-end fw-semibold">
                    {isNaN(depositLimit)
                      ? 0
                      : parseFloat(depositLimit).toFixed(2)}
                  </div>
                </div>
              </div>
              <p>Yields</p>
              <div className="row mb-2">
                <div className="col-7">Weekly Rewards:</div>
                <div className="col-5 text-end fw-semibold">
                  {Symbol === "BNB" && bnbTotalRewards ? (
                    `${bnbTotalRewards.oneWeekReward} BNB`
                  ) : (
                    <></>
                  )}
                  {Symbol === "BUSD" && busdTotalRewards ? (
                    `${busdTotalRewards.oneWeekReward} BUSD`
                  ) : (
                    <></>
                  )}
                  {Symbol === "MATIC" && maticTotalRewards ? (
                    `${maticTotalRewards.oneWeekReward} MATIC`
                  ) : (
                    <></>
                  )}
                  {Symbol === "USDC" && usdcTotalRewards ? (
                    `${usdcTotalRewards.oneWeekReward} USDC`
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-7">Daily Rewards:</div>
                <div className="col-5 text-end fw-semibold">
                  {Symbol === "BNB" && bnbTotalRewards ? (
                    `${bnbTotalRewards.oneDayReward} BNB`
                  ) : (
                    <></>
                  )}
                  {Symbol === "BUSD" && busdTotalRewards ? (
                    `${busdTotalRewards.oneDayReward} BUSD`
                  ) : (
                    <></>
                  )}
                  {Symbol === "MATIC" && maticTotalRewards ? (
                    `${maticTotalRewards.oneDayReward} MATIC`
                  ) : (
                    <></>
                  )}
                  {Symbol === "USDC" && usdcTotalRewards ? (
                    `${usdcTotalRewards.oneDayReward} USDC`
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-7">Hourly Rewards:</div>
                <div className="col-5 text-end fw-semibold">
                  {Symbol === "BNB" && bnbTotalRewards ? (
                    `${bnbTotalRewards.oneHourReward} BNB`
                  ) : (
                    <></>
                  )}
                  {Symbol === "BUSD" && busdTotalRewards ? (
                    `${busdTotalRewards.oneHourReward} BUSD`
                  ) : (
                    <></>
                  )}
                  {Symbol === "MATIC" && maticTotalRewards ? (
                    `${maticTotalRewards.oneHourReward} MATIC`
                  ) : (
                    <></>
                  )}
                  {Symbol === "USDC" && usdcTotalRewards ? (
                    `${usdcTotalRewards.oneHourReward} USDC`
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stake;
