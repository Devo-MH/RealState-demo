import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAccount, useConnect, useDisconnect, useChainId, useEnsName, useEnsAvatar } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const Navbar = () => {
  const [navHeight, setNavHeight] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: ensName } = useEnsName({ address, chainId: mainnet.id, query: { enabled: Boolean(address) } });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined, chainId: mainnet.id, query: { enabled: Boolean(ensName) } });
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const gotoHome = ()=>{
    navigate('/');
  }
  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
    } catch {}
  };
  return (
    <>
      <nav className={navHeight ? "show nav" : "nav"}>
        <div className="logo" onClick={()=> gotoHome()}>PROPERTY RENTALS</div>
        <ul>
          <li>
            <Link to={"/aboutus"}>ABOUT US</Link>
          </li>
          <li>
            <Link to={"/villas"}>VILLAS</Link>
          </li>
          <li>
            <Link to={"/contact"}>CONTACT</Link>
          </li>
        </ul>
        <RxHamburgerMenu
          className="hamburger"
          onClick={() => setNavHeight(!navHeight)}
        />
        <div className="wallet">
          {isConnected && (
            <span className="badge badge--network">{chainId === 1 ? 'Ethereum' : chainId === 11155111 ? 'Sepolia' : `Chain ${chainId}`}</span>
          )}
          {isConnected ? (
            <div className="wallet__wrap">
              <button className="btn btn--wallet" onClick={() => setWalletOpen(!walletOpen)} title={address}>
                {ensAvatar && <img className="avatar" src={ensAvatar} alt="avatar" />}
                {ensName ?? `${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </button>
              {walletOpen && (
                <div className="wallet__menu">
                  <button className="menu__item" onClick={copyAddress}>Copy address</button>
                  <button className="menu__item" onClick={() => { setWalletOpen(false); disconnect(); }}>Disconnect</button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn--primary" onClick={() => connect({ connector: injected() })} disabled={isConnecting}>
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;