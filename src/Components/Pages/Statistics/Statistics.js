import React, { useEffect, useState } from "react";
import {
  getClaimable,
  getContractBalance,
  getContribution,
  getInvestor,
  getRewardsToDeposit,
  getTotalRewardPaid,
} from "../../../ABI/contractAction";

import {
  getMaticClaimable,
  getMaticContractBalance,
  getMaticContribution,
  getMaticInvestor,
  getMaticRewardsToDeposit,
  getMaticTotalRewardPaid,
  getMaticepochReturns,
  getMaticcurrentepoch,
  getMaticEpochLimits,
  getMaticUserAllRewardsWithdrawn
} from "../../../ABI/maticcontractAction";
import {
  getUSDCClaimable,
  getUSDCContractBalance,
  getUSDCContribution,
  getUSDCInvestor,
  getUSDCRewardsToDeposit,
  getUSDCTotalRewardPaid,
  getUSDCepochReturns,
  getUSDCcurrentepoch,
  getUSDCEpochLimits,
  getUSDCUserAllRewardsWithdrawn
} from "../../../ABI/usdccontractAction";

import {
  getBNBClaimable,
  getBNBContractBalance,
  getBNBContribution,
  getBNBInvestor,
  getBNBRewardsToDeposit,
  getBNBTotalRewardPaid,
  getBNBepochReturns,
  getBNBLatestepoch,
  getBNBEpochLimits,
  getBNBcurrentepoch,
  getBNBUserAllRewardsWithdrawn
} from "../../../ABI/bnbcontractAction";

import {
  getBUSDCClaimable,
  getBUSDCContractBalance,
  getBUSDCContribution,
  getBUSDCInvestor,
  getBUSDCRewardsToDeposit,
  getBUSDCTotalRewardPaid,
  getBUSDepochReturns,
  getBUSDcurrentepoch,
  getBUSDEpochLimits,
  getBUSDUserAllRewardsWithdrawn
} from "../../../ABI/busdcontractAction";

import LineChart from "./chart";
import Stake from "../Stake/Stake";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Statistics({ isConnected, wallet2, account1 }) {

  const [contractBalance, setcontractBalance] = useState();
  const [contribution, setContribution] = useState(parseFloat(0.00).toFixed(2));
  const [investors, setInvestors] = useState(parseFloat(0.00).toFixed(2));
  const [unclaimed, setUnclaimed] = useState(parseFloat(0.00).toFixed(2));
  const [rewardsToDeposit, setRewardsToDeposit] = useState(parseFloat(0.00).toFixed(2));
  const [totalRewardPaid, setTotalRewardPaid] = useState(parseFloat(0.00).toFixed(2));
  const [allRewardWithdraw, setAllRewardsWithdrawn] = useState(parseFloat(0.00).toFixed(2));
  const [chartData, setChartData] = useState([])
  const [contractUrl, setContractUrl] = useState("https://testnet.bscscan.com/address/0x429Dfa7C6463391Fa331DEb46C696C9E5a01753a")

  //State for graph data handle    

  const [DailyAverage, setDailyAverage] = useState();
  const [MonthlyAverage, setMonthlyAverage] = useState();

  // const [MaticLiveValue, setMaticLiveValue] = useState()
  const [Symbol, setSymbol] = useState()
  const [CapitalRewardsDeposits, setCapitalRewardsDeposits] = useState(parseFloat(0.00).toFixed(2))

  let BNBliveValue  = window.localStorage.getItem("BNBLiveValue")
  let MaticliveValue  =  window.localStorage.getItem("MaticLiveValue")

  useEffect(() => {

    const getBNBLiveValue = () => {
      const events = {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          "Graymarket-API-KEY": "DcREPsakFX",
        }
      }
      axios.get("https://test.gray.market/preview/bot/portal/api/graph/bnb/livevalue/", events)
        .then((response) => response.data)
        .then((res) => {
          window.localStorage.setItem("BNBLiveValue", res?.data?.binancecoin)
          //setBNBLiveValue(res?.data?.binancecoin)
        }
        )
    }


    const getMATICLiveValue = () => {

      const events = {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          "Graymarket-API-KEY": "DcREPsakFX",
        }
      }

      axios.get("https://test.gray.market/preview/bot/portal/api/graph/matic/livevalue/", events)
        .then((response) => response.data)
        .then((res) => {
          window.localStorage.setItem("MaticLiveValue",res?.data?.maticcoin)
          // setMaticLiveValue(res?.data?.maticcoin)
        })
    }
    getMATICLiveValue();
    getBNBLiveValue();
  }, []);

  const redirectToContract = () => {
    window.open(contractUrl)
  }

  useEffect(() => {
    ALLfunction()
  }, [MaticliveValue, BNBliveValue])

  const ALLfunction = async () => {

    document.getElementById("fundr-all").checked = true;
    setSymbol("")

    const BUSDCcontribution = await getBUSDCContribution();
    const Maticcontributions = await getMaticContribution();
    const Maticcontribution = parseFloat(Maticcontributions) * parseFloat(MaticliveValue);
    const USDCcontribution = await getUSDCContribution();
    const BNBcontributions = await getBNBContribution();
    const BNBcontribution = parseFloat(BNBcontributions) * parseFloat(BNBliveValue);
    // const BUSDCcontribution = await getBUSDCContribution();
    const Totalcontribution =
      parseFloat(Maticcontribution) +
      parseFloat(USDCcontribution) +
      parseFloat(BNBcontribution) +
      parseFloat(BUSDCcontribution);
    setContribution(parseFloat(Totalcontribution).toFixed(2));

    const BUSDCtotalRewardsPaid = await getBUSDCTotalRewardPaid();
    const MatictotalRewardsPaids = await getMaticTotalRewardPaid();
    const MatictotalRewardsPaid = parseFloat(MatictotalRewardsPaids) * parseFloat(MaticliveValue);
    const USDCtotalRewardsPaid = await getUSDCTotalRewardPaid();
    const BNBtotalRewardsPaids = await getBNBTotalRewardPaid();
    const BNBtotalRewardsPaid = parseFloat(BNBtotalRewardsPaids) * parseFloat(BNBliveValue);
    // const BUSDCtotalRewardsPaid = await getBUSDCTotalRewardPaid();

    const TotaltotalRewardsPaid =
    parseInt(MatictotalRewardsPaid) +
    parseInt(USDCtotalRewardsPaid) +
    parseInt(BNBtotalRewardsPaid) +
    parseInt(BUSDCtotalRewardsPaid);
  setTotalRewardPaid(parseFloat(TotaltotalRewardsPaid).toFixed(2));

    const MaticcontractBalance = await getMaticContractBalance();
    const USDCcontractBalance = await getUSDCContractBalance();
    const BNBcontractBalance = await getBNBContractBalance();
    const BUSDCcontractBalance = await getBUSDCContractBalance();

    const TotalcontractBalance =
      parseFloat(MaticcontractBalance) +
      parseFloat(USDCcontractBalance) +
      parseFloat(BNBcontractBalance) +
      parseFloat(BUSDCcontractBalance);
    setcontractBalance(parseFloat(TotalcontractBalance).toFixed(2));


    const CapitalRewardsDeposits = parseFloat(TotaltotalRewardsPaid) + parseFloat(contribution);
    setCapitalRewardsDeposits(parseFloat(CapitalRewardsDeposits).toFixed(2));

    const MaticAllRewardsWithdrawn = await getMaticUserAllRewardsWithdrawn();;
    const USDCAllRewardsWithdrawn = await getUSDCUserAllRewardsWithdrawn();
    const BNBAllRewardsWithdrawn = await getBNBUserAllRewardsWithdrawn();
    const BUSDCAllRewardsWithdrawn = await getBUSDUserAllRewardsWithdrawn();

    const AllRewardsWithdrawn =
      parseFloat(MaticAllRewardsWithdrawn) +
      parseFloat(USDCAllRewardsWithdrawn) +
      parseFloat(BNBAllRewardsWithdrawn) +
      parseFloat(BUSDCAllRewardsWithdrawn);
    setAllRewardsWithdrawn(parseFloat(AllRewardsWithdrawn).toFixed(2));


    const Maticinvestor = await getMaticInvestor();
    const USDCinvestor = await getUSDCInvestor();
    const BNBinvestor = await getBNBInvestor();
    const BUSDCinvestor = await getBUSDCInvestor();
    const Totalinvestor =
      parseFloat(Maticinvestor) +
      parseFloat(USDCinvestor) +
      parseFloat(BNBinvestor) +
      parseFloat(BUSDCinvestor);
    setInvestors(parseFloat(Totalinvestor).toFixed(2));

    const Maticunclaimeds = await getMaticClaimable();
    const Maticunclaimed = parseFloat(Maticunclaimeds) * parseFloat(MaticliveValue);
    const USDCunclaimed = await getUSDCClaimable();
    const BNBunclaimeds = await getBNBClaimable();
    const BNBunclaimed = parseFloat(BNBunclaimeds) * parseFloat(BNBliveValue);

    const BUSDCunclaimed = await getBUSDCClaimable();
    const Totalunclaimed =
      parseFloat(Maticunclaimed) +
      parseFloat(USDCunclaimed) +
      parseFloat(BNBunclaimed) +
      parseFloat(BUSDCunclaimed);
    setUnclaimed(parseFloat(Totalunclaimed).toFixed(2));

    const MaticunclaimedRewardsToDeposits = await getMaticRewardsToDeposit();
    const MaticunclaimedRewardsToDeposit = parseFloat(MaticunclaimedRewardsToDeposits) * parseFloat(MaticliveValue);

    const USDCunclaimedRewardsToDeposit = await getUSDCRewardsToDeposit();
    const BNBunclaimedRewardsToDeposits = await getBNBRewardsToDeposit();
    const BNBunclaimedRewardsToDeposit = parseFloat(BNBunclaimedRewardsToDeposits) * parseFloat(BNBliveValue);

    const BUSDCunclaimedRewardsToDeposit = await getBUSDCRewardsToDeposit();
    const TotalunclaimedRewardsToDeposit =
      parseInt(MaticunclaimedRewardsToDeposit) +
      parseInt(USDCunclaimedRewardsToDeposit) +
      parseInt(BNBunclaimedRewardsToDeposit) +
      parseInt(BUSDCunclaimedRewardsToDeposit);
    setRewardsToDeposit(parseFloat(TotalunclaimedRewardsToDeposit).toFixed(2));

  };


  const Maticfunction = async () => {
    setSymbol("MATIC");
    setContractUrl("https://mumbai.polygonscan.com/address/0x9A985cC3E18F1Bf760FdA244C2825C60FA0084Ca")

    const Maticcontributions = await getMaticContribution();
    const Maticcontribution = parseFloat(Maticcontributions) * parseFloat(MaticliveValue);
    setContribution(parseFloat(Maticcontribution).toFixed(2));

    const MaticcontractBalance = await getMaticContractBalance();
    const MatictotalRewardsPaids = await getMaticTotalRewardPaid();
    const MatictotalRewardsPaid = parseFloat(MatictotalRewardsPaids) * parseFloat(MaticliveValue);
    setTotalRewardPaid(parseFloat(MatictotalRewardsPaid).toFixed(2));

    const MaticAllRewardsWithdrawn = await getMaticUserAllRewardsWithdrawn();
    setAllRewardsWithdrawn(parseFloat(MaticAllRewardsWithdrawn).toFixed(2))

    const CapitalRewardsDeposits = parseFloat(MatictotalRewardsPaids) + parseFloat(Maticcontribution);
    setCapitalRewardsDeposits(parseFloat(CapitalRewardsDeposits).toFixed(2));
    setcontractBalance(parseFloat(MaticcontractBalance).toFixed(2));

    const Maticinvestor = await getMaticInvestor();
    setInvestors(parseFloat(Maticinvestor).toFixed(2));

    const Maticunclaimeds = await getMaticClaimable();
    const Maticunclaimed = parseFloat(Maticunclaimeds) * parseFloat(MaticliveValue);
    setUnclaimed(parseFloat(Maticunclaimed).toFixed(2));

    const MaticunclaimedRewardsToDeposits = await getMaticRewardsToDeposit();
    const MaticunclaimedRewardsToDeposit = parseFloat(MaticunclaimedRewardsToDeposits) * parseFloat(MaticliveValue);
    setRewardsToDeposit(parseFloat(MaticunclaimedRewardsToDeposit).toFixed(2));

  };

  const USDCfunction = async () => {
    setSymbol("USDC")
    setContractUrl("https://mumbai.polygonscan.com/address/0x94F92F1173F40b0134cD2938E129d2D5EC50B9b0")
    const USDCtotalRewardsPaid = await getUSDCTotalRewardPaid();
    setTotalRewardPaid(parseFloat(USDCtotalRewardsPaid).toFixed(2));

    const USDCAllRewardsWithdrawn = await getUSDCUserAllRewardsWithdrawn();
    setAllRewardsWithdrawn(parseFloat(USDCAllRewardsWithdrawn).toFixed(2));

    const USDCcontractBalance = await getUSDCContractBalance();
    setcontractBalance(parseFloat(USDCcontractBalance).toFixed(2));
    const USDCcontribution = await getUSDCContribution();
    setContribution(parseFloat(USDCcontribution).toFixed(2));

    const CapitalRewardsDeposits = parseFloat(USDCtotalRewardsPaid) + parseFloat(USDCcontribution);
    setCapitalRewardsDeposits(parseFloat(CapitalRewardsDeposits).toFixed(2));

    const USDCinvestor = await getUSDCInvestor();
    setInvestors(parseFloat(USDCinvestor).toFixed(2));
    const USDCunclaimed = await getUSDCClaimable();
    setUnclaimed(parseFloat(USDCunclaimed).toFixed(2));
    const USDCunclaimedRewardsToDeposit = await getUSDCRewardsToDeposit();
    setRewardsToDeposit(parseFloat(USDCunclaimedRewardsToDeposit).toFixed(2));

  };


  const BUSDfunction = async () => {
    setSymbol("BUSD");
    setContractUrl("https://testnet.bscscan.com/address/0xC6eAb8BEDCb10037c9DD95ED8a9bc785B7db64C1")
    const BUSDCtotalRewardsPaid = await getBUSDCTotalRewardPaid();
    setTotalRewardPaid(parseFloat(BUSDCtotalRewardsPaid).toFixed(2));

    const BUSDCAllRewardsWithdrawn = await getBUSDUserAllRewardsWithdrawn();
    setAllRewardsWithdrawn(parseFloat(BUSDCAllRewardsWithdrawn).toFixed(2));

    const BUSDCcontractBalance = await getBUSDCContractBalance();
    setcontractBalance(parseFloat(BUSDCcontractBalance).toFixed(2));

    const BUSDCcontribution = await getBUSDCContribution();
    setContribution(parseFloat(BUSDCcontribution).toFixed(2));

    const CapitalRewardsDeposits = parseFloat(BUSDCtotalRewardsPaid) + parseFloat(BUSDCcontribution);
    setCapitalRewardsDeposits(parseFloat(CapitalRewardsDeposits).toFixed(2));

    const BUSDCinvestor = await getBUSDCInvestor();
    setInvestors(parseFloat(BUSDCinvestor).toFixed(2));

    const BUSDCunclaimed = await getBUSDCClaimable();
    setUnclaimed(parseFloat(BUSDCunclaimed).toFixed(2));

    const BUSDCunclaimedRewardsToDeposit = await getBUSDCRewardsToDeposit();
    setRewardsToDeposit(parseFloat(BUSDCunclaimedRewardsToDeposit).toFixed(2));

  };

  const BNBfunction = async () => {

    setSymbol("BNB");
    setContractUrl("https://testnet.bscscan.com/address/0x429Dfa7C6463391Fa331DEb46C696C9E5a01753a")

    const BNBtotalRewardsPaids = await getBNBTotalRewardPaid();
    const BNBtotalRewardsPaid = parseFloat(BNBtotalRewardsPaids) * parseFloat(BNBliveValue);
    setTotalRewardPaid(parseFloat(BNBtotalRewardsPaid).toFixed(2));

    const BNBAllRewardsWithdrawn = await getBNBUserAllRewardsWithdrawn();
    setAllRewardsWithdrawn(parseFloat(BNBAllRewardsWithdrawn).toFixed(2));

    const BNBcontractBalance = await getBNBContractBalance();
    setcontractBalance(parseFloat(BNBcontractBalance).toFixed(2));
    const BNBcontributions = await getBNBContribution();
    const BNBcontribution = parseFloat(BNBcontributions) * parseFloat(BNBliveValue);
    setContribution(parseFloat(BNBcontribution).toFixed(2));


    const CapitalRewardsDeposits = parseFloat(BNBtotalRewardsPaid) + parseFloat(BNBcontribution);
    setCapitalRewardsDeposits(parseFloat(CapitalRewardsDeposits).toFixed(2));

    const BNBinvestor = await getBNBInvestor();
    setInvestors(parseFloat(BNBinvestor).toFixed(2));
    const BNBunclaimeds = await getBNBClaimable();

    const BNBunclaimed = parseFloat(BNBunclaimeds) * parseFloat(BNBliveValue);
    setUnclaimed(parseFloat(BNBunclaimed).toFixed(2));

    const BNBunclaimedRewardsToDeposits = await getBNBRewardsToDeposit();
    const BNBunclaimedRewardsToDeposit = parseFloat(BNBunclaimedRewardsToDeposits) * parseFloat(BNBliveValue);
    setRewardsToDeposit(parseFloat(BNBunclaimedRewardsToDeposit).toFixed(2));


  };



  useEffect(() => {
    getBNBcurrentepoch()
    const getBNBGraphData = async () => {
      const BNBLatestTimestamp = await getBNBcurrentepoch();
      let valueEpochReturn = await getBNBepochReturns(BNBLatestTimestamp);
      let resultEpochReturn = (valueEpochReturn / 100).toFixed(2)
      setDailyAverage(resultEpochReturn)
    }
    getBNBGraphData()
  }, [])



  const getMaticGraphData = async () => {
    const maticLatestTimestamp = await getMaticcurrentepoch();
    let valueEpochReturn = await getMaticepochReturns(maticLatestTimestamp);
    let resultEpochReturn = (valueEpochReturn / 100).toFixed(2)
    setDailyAverage(resultEpochReturn)

  }


  const getUSDCGraphData = async () => {
    const USDCLatestTimestamp = await getUSDCcurrentepoch();
    let valueEpochReturn = await getUSDCepochReturns(USDCLatestTimestamp);
    let resultEpochReturn = (valueEpochReturn / 100).toFixed(2)
    setDailyAverage(resultEpochReturn)

  }

  const getBUSDGraphData = async () => {
    const BUSDLatestTimestamp = await getBUSDcurrentepoch();
    let valueEpochReturn = await getBUSDepochReturns(BUSDLatestTimestamp);
    let resultEpochReturn = (valueEpochReturn / 100).toFixed(2)
    setDailyAverage(resultEpochReturn)
  }


  const getBNBGraphData = async () => {
    const BNBLatestTimestamp = await getBNBcurrentepoch();
    let valueEpochReturn = await getBNBepochReturns(BNBLatestTimestamp);
    let resultEpochReturn = (valueEpochReturn / 100).toFixed(2)
    setDailyAverage(resultEpochReturn)
  }


  //Get the graph data

  const updateGraphData = (value) => {

    setChartData([])

    const events = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        "Graymarket-API-KEY": "DcREPsakFX",
      },
      body: JSON.stringify({
        "network": value
      })
    };
    fetch("https://test.gray.market/preview/bot/portal/api/graph/getlist", events)
      .then((response) => response.json())
      .then((res) => {

        res.data.forEach((item) => {

          let timestamp = item.date;
          const date = new Date(timestamp * 1000);
          const year = date.getFullYear().toString();
          const month = (date.getMonth() + 1).toString(); // months are zero-indexed, so we add 1
          const day = date.getDate().toString();
          const formattedDate = `${year},${month},${day}`;

          let amchartdate = new Date(formattedDate).getTime();
          const newObject = { date: amchartdate, value: parseFloat(item.value) };

          setChartData(preState => {
            const itemExists = preState?.some(key => key.date == amchartdate && key.value == parseFloat(item.value));
            if (!itemExists) {
              return [...preState, newObject];
            }
            return preState

          })

        })
      })
      .catch((error) => {
        console.error("eror", error.message);
      })

  }

  //find monthly average

  useEffect(() => {
    const length = chartData.length;

    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += chartData[i].value;
    }

    const MonthlyAvg = sum / 30;
    setMonthlyAverage(MonthlyAvg)

  }, [chartData])



  //show by default BNB Data

  useEffect(() => {

    setChartData([])
    const events = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        "Graymarket-API-KEY": "DcREPsakFX",
      },
      body: JSON.stringify({
        "network": "BNB"
      })
    };
    fetch("https://test.gray.market/preview/bot/portal/api/graph/getlist", events)
      .then((response) => response.json())
      .then((res) => {


        res.data.forEach((item) => {

          let timestamp = item.date;
          const date = new Date(timestamp * 1000);
          const year = date.getFullYear().toString();
          const month = (date.getMonth() + 1).toString(); // months are zero-indexed, so we add 1
          const day = date.getDate().toString();
          const formattedDate = `${year},${month},${day}`;

          let amchartdate = new Date(formattedDate).getTime();
          const newObject = { date: amchartdate, value: parseFloat(item.value) };

          setChartData(preState => {
            const itemExists = preState?.some(key => key.date == amchartdate && key.value == parseFloat(item.value));
            if (!itemExists) {
              return [...preState, newObject];
            }
            return preState
          })
        })
      })
      .catch((error) => {
        console.error("eror=======>", error.message);
      })

  }, [])


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>Statistics</p>
          </div>
        </div>
        <div className="row mb-5">
          <div id="tester" class="col-lg-8 mt-md-2 mb-4 mb-lg-0">
            <div className="panel p-4">
              <p>Fund Returns</p>
              <div className="row justify-content-center mb-4">
                <div className="col-md-auto mb-2 mb-md-0">
                  {/* <div className="col-10 col-md-auto mb-2 mb-md-0"> */}
                  <div className="row">
                    <div className="col-auto mb-3 px-2">
                      <input
                        type="radio"
                        className="btn-check"
                        name="fundr"
                        id="fundr-all"
                        autocomplete="off"
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="fundr-all"
                        onClick={(e) => { ALLfunction(e); updateGraphData("BNB") }}
                      >
                        <div className="hstack gap-2">
                          <div className="mt-1">ALL</div>
                        </div>
                      </label>
                    </div>

                    <div className="col-auto mb-3 px-2">
                      <input
                        type="radio"
                        className="btn-check"
                        name="fundr"
                        id="fundr-bnb"
                        autocomplete="off"
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="fundr-bnb"
                        name="BNB"
                        onClick={(e) => { BNBfunction(e); updateGraphData("BNB"); getBNBGraphData() }}
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
                        name="fundr"
                        id="fundr-busd"
                        autocomplete="off"
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="fundr-busd"
                        name="BUSD"
                        onClick={(e) => { BUSDfunction(e); updateGraphData("BUSD"); getBUSDGraphData() }}
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
                        name="fundr"
                        id="fundr-matic"
                        autocomplete="off"
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="fundr-matic"
                        name="Matic"
                        onClick={(e) => { Maticfunction(e); updateGraphData("MATIC"); getMaticGraphData() }}
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
                        name="fundr"
                        id="fundr-usdc"
                        autocomplete="off"
                      />
                      <label
                        className="btn btn-outline-secondary"
                        for="fundr-usdc"
                        name="USDC"
                        onClick={(e) => { USDCfunction(e); updateGraphData("USDC"); getUSDCGraphData() }}
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
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div id="fundreturnschart" style={{ height: 310 }}>
                <LineChart chartData={chartData} />
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-lg-2">
            <div className="panel p-4">
              <div className="row mb-2">
                <div className="col-8">Average Daily Yield:</div>
                <div className="col-4 text-end fw-semibold">
                  {DailyAverage}%
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-7">Contributions:</div>
                <div className="col-5 text-end fw-semibold">${contribution}</div>
              </div>
              <div className="row mb-2">
                <div className="col-7">Investors:</div>
                <div className="col-5 text-end fw-semibold">{investors}</div>
              </div>
              <div className="row mb-5">
                <div className="col-7">Returns:</div>
                <div className="col-5 text-end fw-semibold">{totalRewardPaid}</div>
              </div>
              <p>P&Ls HISTORY</p>
              <div class="overflow-y-scroll pe-4" style={{ height: "220px", marginRight: "-1.4rem" }}>
                {chartData.map((PLHistory) => {
                  const date = new Date(PLHistory.date)
                  var resultformaty = date.toLocaleDateString('en-GB');
                  // var resultDate = date.getDate() + '/' +  date.getMonth() + '/' + date.getFullYear()
                  return (
                    <div className="row mb-2">
                      <div className="col-7">{resultformaty}</div>
                      <div className="col-5 text-end fw-semibold">
                        {PLHistory.value}%
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="row mb-2">
                <div className="col-6"></div>
                <div className="col-6 text-end fw-semibold"></div>
              </div>
              <div className="row mb-2">
                <div className="col-6"></div>
                <div className="col-6 text-end fw-semibold"></div>
              </div>
              <div className="row mb-2">
                <div className="col-6"></div>
                <div className="col-6 text-end fw-semibold"></div>
              </div>
              <div className="row mb-2">
                <div className="col-6"></div>
                <div className="col-6 text-end fw-semibold"></div>
              </div>
              <div className="row">
                <div className="col-6"></div>
                <div className="col-6 text-end fw-semibold"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{/* <p>Statistics</p> */}</div>
        </div>
        <div className="row mb-5">
          <div class="col-md-6 col-lg-4 mb-4">
            <div className="panel p-4">
              <div className="hstack ">
                <p>Contract Balance(s)</p>
                <div className="ms-auto mb-3 linkProp" onClick={() => redirectToContract()}>
                  <i class="bi bi-box-arrow-up-right"></i>
                </div>
              </div>
              <h4 className="fw-normal mb-0">
                {contractBalance} {Symbol}
              </h4>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4">
            <div className="panel p-4">
              <p>Total Deposits</p>
              <h4 className="fw-normal mb-0">{contractBalance} {Symbol}</h4>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4">
            <div className="panel p-4">
              <p>Total Capital Withdrawn</p>
              <h4 className="fw-normal text-secondary mb-0">$0.00</h4>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-0 mt-lg-2">
            <div className="panel p-4">
              <p>Total Rewards Withdrawn</p>
              <h4 className="fw-normal text-secondary mb-0">
                {allRewardWithdraw} {Symbol}
              </h4>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-md-0 mb-lg-0 mt-lg-2">
            <div className="panel p-4">
              <p>All Claimable Rewards</p>
              <h4 className="fw-normal  mb-0">${unclaimed}</h4>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-md-0 mb-lg-0 mt-lg-2">
            <div className="panel p-4">
              <p>Capital + Rewards of Deposits</p>
              <h4 className="fw-normal  mb-0">
                ${CapitalRewardsDeposits}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Stake
        isConnected={isConnected}
        wallet2={wallet2}
        account1={account1}
        DailyAverage={DailyAverage}
        MonthlyAverage={MonthlyAverage}
      ></Stake>
    </>
  );
}
export default Statistics;
