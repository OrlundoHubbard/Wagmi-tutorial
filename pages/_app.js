import "../styles/globals.css";
import { Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";



const infuraId = process.env.INFURA_ID;

const chains = defaultChains;


const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: "wagmi-new",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};




function MyApp({ Component, pageProps }) {
  return (
    <Provider autoConnect connectors={connectors}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
