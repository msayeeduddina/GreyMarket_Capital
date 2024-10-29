import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Statistics from "../Pages/Statistics/Statistics";
import Trading from "../Pages/Trading/Trading";
import Web3 from "web3";
import { getUserBalance } from "../../ABI/contractAction";
// import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import detectEthereumProvider from "@metamask/detect-provider";

import { ethers } from "ethers";

import {
  initWeb3Onboard,
  ethMainnetGasBlockPrices,
  infuraRPC,
} from "../../services";
import {
  useAccountCenter,
  useConnectWallet,
  useNotifications,
  useSetChain,
  useWallets,
  useSetLocale,
} from "@web3-onboard/react";
import Stake from "../Pages/Stake/Stake";
import Claim from "../Pages/Claim/Claim";
import Calcutate from "../Pages/Earnings/Calcutate";
import ClaimDeposit from "../Pages/Claim/ClaimDeposit";
import { ChaikinMoneyFlow } from "@amcharts/amcharts5/.internal/charts/stock/indicators/ChaikinMoneyFlow";

let provider;

function Header() {
  
  const ethers = require("ethers");
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const [address, setAddress] = useState("");
  const [checkNetwork, setcheckNetwork] = useState();
  const [chainId, setChainid] = useState()

  // New wallet connect code

  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] = useConnectWallet();
   

  // const [hideLogoutButton, sethideLogoutButton] = useState(false)
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const [notifications, customNotification, updateNotify] = useNotifications();
  const connectedWallets = useWallets();
  const updateAccountCenter = useAccountCenter();
  const updateLocale = useSetLocale();
  const [web3Onboard, setWeb3Onboard] = useState(null);
  const [connectedAccount, setconnectedAccount] = useState();
  const [ConnectedWallet, setConnectedWallet] = useState()

  const wallet2 = window.localStorage.getItem("wallet1")
  const account1 = window.localStorage.getItem("account")
  const showNetwork = window.localStorage.getItem("ConnectedNetwork")

  useEffect(() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
   provider.on("network", (newNetwork, oldNetwork) => {
     if (oldNetwork) {
        // window.location.reload();
        getchain();
    }
   });
  },[]);

    const getchain = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const currentChainId = await web3.eth.getChainId();
        setChainid(currentChainId)

        if (currentChainId === 137) {
          setcheckNetwork(" Connected to POLYGON network");
          window.localStorage.setItem("ConnectedNetwork", "Connected to POLYGON network")
        }

        if (currentChainId === 56) {
          setcheckNetwork("Connected to BINANCE SMART CHAIN network");
          window.localStorage.setItem("ConnectedNetwork", "Connected to BINANCE SMART CHAIN network")
        }

        if (currentChainId !== 137 && currentChainId !== 56) {
          setcheckNetwork("Switch to BNB/MATIC");
          window.localStorage.setItem("ConnectedNetwork", "Switch to BNB/MATIC")
        }
      }
    }
   


  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
  }, []);
 

  useEffect(() => {

  }, [notifications]);

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null;
    } else {

      provider = new ethers.providers.Web3Provider(wallet.provider, "any");
      const account1 = wallet?.accounts[0].address
      window.localStorage.setItem("account", account1)
      window.localStorage.setItem("wallet1", JSON.stringify(wallet?.label))
      // CheckNetwork()
      getchain()
    }
  }, [wallet]);


  useEffect(() => {

    const account1 = window.localStorage.getItem("account")
    setconnectedAccount(account1)

  }, [wallet])

  const onConnect = () => {
    connect();
    setIsConnected(true);
    setIsNavCollapsed(true)
  }


  const logout = () => {
    disconnect({ label: wallet2 });
    setIsConnected(false);
    window.localStorage.removeItem("account")
    window.localStorage.removeItem("wallet1")
    window.localStorage.removeItem("ConnectedNetwork")
    window.localStorage.removeItem("currentChainId")
    setIsNavCollapsed(true)
  }


  if (!web3Onboard) return <div>Loading...</div>


  return (
    <main>
      <Trading
        matic={ethBalance}
        bnb={ethBalance}
        isConnected={isConnected}
        wallet2={wallet2}
        account1={account1}
      />
      <Statistics address={address} wallet2={wallet2} account1={account1} />
      <Claim isConnected={isConnected} wallet2={wallet2}
        account1={account1} ></Claim>
      <ClaimDeposit wallet2={wallet2} account1={account1} />
      <Calcutate />
      <div className="fixed-top top-header">
        <div className="topbar text-white"
          style={{
            backgroundImage: showNetwork === "Connected to BINANCE SMART CHAIN network" ?
              "linear-gradient(90deg,#ff9933,hsla(0,0%,100%,0)"
              : showNetwork === "Connected to POLYGON network" ?
                "linear-gradient(90deg,#6f41d8,hsla(0,0%,100%,0) 75%)"
                : "linear-gradient(90deg,grey,hsla(0,0%,100%,0) 75%)"
          }}>
          <div className="container" style={{ paddingTop: "2px" }}>
            <small><i class="bi bi-wifi"></i>&nbsp;{wallet2 || account1 ? showNetwork : "  Wrong Network"}</small>
          </div>
        </div>
        <nav className="navbar navbar-expand-xl py-3 py-md-4">
          <div className="container">
            <Link className="navbar-brand me-0 me-md-5" href="/">
              <img src="images/logo.png" width="162" style={{ height: "auto" }} alt="logo" />
            </Link>
            {isNavCollapsed ?
              <button onClick={() => setIsNavCollapsed(false)} class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button> :
              <button onClick={() => setIsNavCollapsed(true)} class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>}
            <div class={`${isNavCollapsed == true ? 'navbar-collapse  collapse ' : 'navbar-collapse  collapse show'}`} id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-md-0 gap-md-3 py-3 py-md-0">
                <li className="nav-item">
                  <Link className="nav-link text-dark" href="Fund">
                    Fund
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" href="TradingBot">
                    Trading Bot
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary opacity-50" href="FAQ">
                    News
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary opacity-50" href="FAQ">
                    Coming soon
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" href="FAQ">
                    FAQ
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <a href="https://discord.gg/graymarket" target="_blank" className="btn  btn-discord me-2 pt-2" rel="noreferrer">
                  <i className="bi bi-discord me-1"></i> Discord
                </a>

                {!wallet2 || !account1 ?
                  <Link
                    className="btn  btn-secondary pt-2"
                    onClick={() => onConnect()}
                  >
                    Connect Wallet
                  </Link>
                  :
                  <div class="dropdown">
                    <Link
                      className="btn  btn-secondary pt-2"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {connectedAccount.slice(
                        0,
                        4
                      )}...{connectedAccount.slice(38)}
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link
                          class="dropdown-item pt-2"
                          onClick={() => logout()}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
              </form>
            </div>
          </div>
        </nav>
      </div>
    </main>
  );
}

export default Header;
