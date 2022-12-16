import React, { useState } from 'react'
import { createVoting } from '../util/interact'
import {
  AlertTitle,
  Button,
  CircularProgress,
  InputLabel,
  TextField,
} from '@mui/material'
import { Alert } from '@mui/material'
import { getVotingId } from '../util/getVotingId'
import { TStatus } from '../core/TStatus'

export const CreateVoting = () => {
  const [votingName, setVotingName] = useState('')
  const [voting, setVoting] = useState(null)
  const [status, setStatus] = useState('')

  const handleInputChange = (e) => {
    setVotingName(e.target.value)
  }

  const handleCreateVotingClick = async () => {
    setStatus(TStatus.PENDING)
    try {
      const newVoting = await createVoting(votingName)
      setVoting(newVoting)
      getVotingId(newVoting)
      setStatus(TStatus.SUCCESS)
    } catch (e) {
      console.error(e)
      setStatus(TStatus.ERROR)
    } finally {
      setVotingName('')
    }
  }

  return (
    <>
      <div className="block">
        <InputLabel>Voting name</InputLabel>
        <TextField
          size={'small'}
          fullWidth
          variant="filled"
          value={votingName}
          onChange={handleInputChange}
        />
      </div>
      {votingName && votingName.length > 0 && (
        <div className="block">
          <Button
            variant={'outlined'}
            disabled={status === TStatus.PENDING}
            onClick={handleCreateVotingClick}
          >
            Create a voting
          </Button>
        </div>
      )}

      {status === TStatus.SUCCESS && (
        <Alert severity="success">
          Voting with id {getVotingId(voting)} successfully created!
        </Alert>
      )}

      {status === TStatus.PENDING && <CircularProgress />}

      {status === TStatus.ERROR && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Cannot get voting id. Check console for errors
        </Alert>
      )}
    </>
  )
}
