import React, { useState } from 'react'
import { createVoting } from '../util/interact'
import { Button, CircularProgress, InputLabel, TextField } from '@mui/material'
import { Alert } from '@mui/lab'

export const CreateVoting = () => {
  const [votingName, setVotingName] = useState('')
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)

  const handleInputChange = (e) => {
    setVotingName(e.target.value)
  }

  const handleCreateVotingClick = async () => {
    setPending(true)
    try {
      const result = await createVoting(votingName)
      setStatus(result?.value['_hex'])
    } catch (e) {
      setStatus(e.message)
    } finally {
      setPending(false)
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
            disabled={pending}
            onClick={handleCreateVotingClick}
          >
            Create a voting
          </Button>
        </div>
      )}

      {status && !pending && (
        <Alert severity="success">
          Voting with id {status} successfully created!
        </Alert>
      )}

      {pending && <CircularProgress />}
    </>
  )
}
