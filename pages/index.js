import { useAccount, useConnect } from 'wagmi'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData}, disconnect] = useAccount({
    fetchEns: true,
  })

  if (accountData) {
    return (
      <div className={styles.accountAddress}>
        {accountData.ens?.name ? `${accountData.ens?.name}` : accountData.address}
        <div className={styles.accountStatus}>Connected to {accountData.connector.name}</div>
          <button className={styles.accountButton} onClick={disconnect}>Disconnect</button>
      </div>
    )
  }


  return (
    <div className={styles.bodyDiv}>
      {data.connectors.map((connector) => (
        <button className={styles.connectButton} disabled={!connector.ready}
        key={connector.id}
        onClick={() => connect(connector)}>
          {connector.name}
          {!connector.ready && '(unsupported)'}
        </button>
      ))}

      {error && <div>{error?.message ?? 'Failed to connect'}</div>}
    </div>
  )
}
