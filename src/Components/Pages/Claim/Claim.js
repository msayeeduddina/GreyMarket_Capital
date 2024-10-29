import React, { useEffect, useState } from "react";
import {
  getClaimable,
  getContribution,
  getUserDeposits,
} from "../../../ABI/contractAction";
import {
  getUSDCUserBalance,
  SetUSDCClaim,
  getUSDCClaimable,
  getUSDCUserDeposits,
} from "../../../ABI/usdccontractAction";
import {
  getBNBBalance,
  SetBNBClaim,
  getBNBClaimable,
  getBNBUserDeposits,
} from "../../../ABI/bnbcontractAction";
import {
  getMaticBalance,
  SetMATICClaim,
  getMaticClaimable,
  getMaticUserDeposits,
} from "../../../ABI/maticcontractAction";
import {
  getBNBUserBalance,
  SetBUSDClaim,
  getBUSDCClaimable,
  getBUSDUserDeposits,
} from "../../../ABI/busdcontractAction";
import { Link } from "react-router-dom";

const Claim = ({ isConnected , wallet2,account1}) => {
  
  const [UserBalance, setUserBalance] = useState();
  const [Symbol, setSymbol] = useState("BNB");
  const [userTotalDeposit, setUserTotalDeposit] = useState();
  const [getTotalrewards, setTotalrewards] = useState();
  const [unclaimed, setUnclaimed] = useState();


  useEffect(() => {

    const BNBfunction = async () => {
      
      const BNBBalance = await getBNBBalance();
      const unclaimed = await getBNBClaimable();
      const userTotalDeposit = await getBNBUserDeposits();
      setUserBalance(parseFloat(BNBBalance).toFixed(2));
      setUnclaimed(parseFloat(unclaimed).toFixed(4));
      setUserTotalDeposit(parseFloat(userTotalDeposit).toFixed(4));
      const Totalrewards = parseFloat(unclaimed) + parseFloat(userTotalDeposit);
      setTotalrewards(parseFloat(Totalrewards).toFixed(4));

    };
  
   BNBfunction();

  }, []);

  const Maticfunction = async () => {
   
    const MaticBalance = await getMaticBalance();
    const unclaimed = await getMaticClaimable();
    const userTotalDeposit = await getMaticUserDeposits();
    setUserBalance(parseFloat(MaticBalance).toFixed(2));
    setUnclaimed(parseFloat(unclaimed).toFixed(2));
    setUserTotalDeposit(parseFloat(userTotalDeposit).toFixed(2));
    const Totalrewards = parseFloat(unclaimed) + parseFloat(userTotalDeposit);
    setTotalrewards(parseFloat(Totalrewards).toFixed(2));
    setSymbol("MATIC");
  };

  const BNBfunction = async () => {
   
    const BNBBalance = await getBNBBalance();
    const unclaimed = await getBNBClaimable();
    const userTotalDeposit = await getBNBUserDeposits();
    setUserBalance(parseFloat(BNBBalance).toFixed(2));
    setUnclaimed(parseFloat(unclaimed).toFixed(4));
    setUserTotalDeposit(parseFloat(userTotalDeposit).toFixed(4));
    const Totalrewards = parseFloat(unclaimed) + parseFloat(userTotalDeposit);
    setTotalrewards(parseFloat(Totalrewards).toFixed(4));
    setSymbol("BNB");
  };

  const USDCfunction = async () => {
   
    const USDCBalance = await getUSDCUserBalance();
    const unclaimed = await getUSDCClaimable();
    const userTotalDeposit = await getUSDCUserDeposits();
    setUserBalance(parseFloat(USDCBalance).toFixed(2));
    setUnclaimed(parseFloat(unclaimed).toFixed(2));
    setUserTotalDeposit(parseFloat(userTotalDeposit).toFixed(2));
    const Totalrewards = parseFloat(unclaimed) + parseFloat(userTotalDeposit);
    setTotalrewards(parseFloat(Totalrewards).toFixed(2));
    setSymbol("USDC");
  };

  const BUSDCfunction = async () => {
  
    const BUSDCBalance = await getBNBUserBalance();
    const unclaimed = await getBUSDCClaimable();
    const userTotalDeposit = await getBUSDUserDeposits();
    setUserBalance(parseFloat(BUSDCBalance).toFixed(2));
    setUnclaimed(parseFloat(unclaimed).toFixed(2));
    setUserTotalDeposit(parseFloat(userTotalDeposit).toFixed(2));
    const Totalrewards = parseFloat(unclaimed) + parseFloat(userTotalDeposit);
    setTotalrewards(parseFloat(Totalrewards).toFixed(2));
    setSymbol("BUSD");
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>Claim</p>
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
                        name="claim"
                        id="claim-bnb"
                        autocomplete="off"
                        onClick={(e) => BNBfunction(e)}
                        defaultChecked
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="claim-bnb"
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
                        name="claim"
                        id="claim-busd"
                        autocomplete="off"
                        onClick={(e) => BUSDCfunction(e)}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="claim-busd"
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
                        name="claim"
                        id="claim-matic"
                        autocomplete="off"
                        onClick={(e) => Maticfunction(e)}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="claim-matic"
                      >
                        <div className="hstack gap-2">
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
                        name="claim"
                        id="claim-usdc"
                        autocomplete="off"
                        onClick={(e) => USDCfunction(e)}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="claim-usdc"
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
              <div className="gap-2 text-center mx-auto mt-md-5">
                    {Symbol == "USDC" &&  wallet2 && account1 ? (
                      <button
                        onClick={(e) => SetUSDCClaim(e)}
                        className="btn btn-secondary mt-md-5 pt-2 px-4"
                      >
                        Claim
                      </button>
                    ) :( Symbol == "USDC" ?
                    (<button
                      className="btn btn-secondary  mx-auto pt-2 mt-md-5"
                    >Connect wallet to get started</button>) : null
                  )}

                    {Symbol === "MATIC" &&  wallet2 && account1? (
                      <button
                        onClick={(e) => SetMATICClaim(e)}
                        className="btn btn-secondary pt-2 mt-md-5 px-4"
                      >
                        Claim
                      </button>
                    ) : ( Symbol == "MATIC" ?
                    (<button
                      className="btn btn-secondary mx-auto pt-2 mt-md-5"
                    >Connect wallet to get started</button>) : null
                  )}

                    {Symbol === "BNB" &&  wallet2 && account1 ? (
                      <button
                        onClick={(e) => SetBNBClaim(e)}
                        className="btn btn-secondary pt-2 mt-md-5 px-4"
                      >
                        Claim
                      </button>
                    ) : ( Symbol == "BNB" ?
                    (<button
                      className="btn btn-secondary  mx-auto pt-2 mt-md-5"
                    >Connect wallet to get started</button>) : null
                  )}

                    {Symbol == "BUSD" &&  wallet2 && account1 ? (
                      <button
                        onClick={(e) => SetBUSDClaim(e)}
                        className="btn btn-secondary pt-2 mt-md-5 px-4"
                      >
                        Claim
                      </button>
                    ) :( Symbol == "BUSD" ?
                    (<button
                      className="btn btn-secondary   mx-auto pt-2 mt-md-5"
                    >Connect wallet to get started</button>) : null
                  )}
                    {Symbol == undefined &&  wallet2 && account1 ? (
                      <button className="btn btn-secondary pt-2 mt-md-5 px-4">Claim</button>
                    ) : (
                      <></>
                    )}
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt-lg-2">
            <div className="panel p-4">
              <p>Rewards</p>
              <div className="row mb-2">
                <div className="col-7">Unclaimed Rewards:</div>
                <div className="col-5 text-end fw-semibold">
                  {unclaimed} {Symbol}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-7">Deposited Capital:</div>
                <div className="col-5 text-end fw-semibold">
                  {userTotalDeposit} {Symbol}
                </div>
              </div>
              <div className="row">
                <div className="col-7">Total Value:</div>
                <div className="col-5 text-end fw-semibold">
                  {getTotalrewards} {Symbol}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Claim;
