import React, { useState } from 'react'
import { connectWallet } from '../util/interact'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button, InputLabel, Link, TextField } from '@mui/material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { TMetamaskStatus } from '../core/TMetamaskStatus'
import { Alert, AlertTitle } from '@mui/lab'

export const Connect = () => {
  const [status, setStatus] = useState(TMetamaskStatus.DISCONNECTED)
  const [wallet, setWallet] = useState()
  const [loading, setLoading] = useState(false)

  const handleConnectClick = async () => {
    setLoading(true)
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
    setLoading(false)
  }

  return (
    <div className="block">
      <div className="block">
        {status === TMetamaskStatus.DISCONNECTED && (
          <LoadingButton
            loading={loading}
            fullWidth
            variant="contained"
            onClick={handleConnectClick}
          >
            Connect to Metamask
          </LoadingButton>
        )}
        {status === TMetamaskStatus.CONNECTED && (
          <Button
            disabled
            fullWidth
            variant="contained"
            endIcon={<CheckOutlinedIcon />}
          >
            {status}
          </Button>
        )}

        {status === TMetamaskStatus.ERROR && (
          <Alert severity="error">
            <AlertTitle>Metamask connect error</AlertTitle>
            Please refresh the page and try again
          </Alert>
        )}

        {status === TMetamaskStatus.ERROR_METAMASK && (
          <Alert severity="error">
            <AlertTitle>Metamask error</AlertTitle>
            Please ensure that you have the Metamask browser extension installed
            <br />
            <Link
              variant="subtitle1"
              target="_blank"
              href={`https://metamask.io/download.html`}
            >
              Download Metamask extension
            </Link>
          </Alert>
        )}
      </div>

      {status === TMetamaskStatus.CONNECTED && (
        <div className="block">
          <InputLabel>Wallet</InputLabel>
          <TextField
            fullWidth
            size={'small'}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            value={wallet}
          />
        </div>
      )}
    </div>
  )
}
