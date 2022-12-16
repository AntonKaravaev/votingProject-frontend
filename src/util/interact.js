import contractABI from '../../contract-abi.json'
import { ethers } from 'ethers'
import { TStatus } from '../core/TStatus'

const alchemyKey =
  'wss://eth-goerli.g.alchemy.com/v2/nGHBOv3KDhM8u3UEHExjWVypwaJ3E_xZ'
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)
const contractAddress = '0x085418362824D1fc8d5ae884Ab167A1bE319B9a3'

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

export const votingContract = new web3.eth.Contract(
  contractABI,
  contractAddress,
)

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return {
        status: TStatus.CONNECTED,
        address: addressArray[0],
      }
    } catch (err) {
      return {
        address: '',
        status: TStatus.ERROR,
      }
    }
  } else {
    return {
      address: '',
      status: TStatus.ERROR_METAMASK,
    }
  }
}

export const getCurrentWalletConnected = async () => {}

export const createVoting = async (votingName) => {
  if (!votingName?.length) {
    throw new Error('Voting name cannot be empty')
  }

  const alchemyProvider = new ethers.providers.AlchemyProvider(
    (network = 'goerli'),
    API_KEY,
  )

  const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

  const votingContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI,
    signer,
  )
  return await votingContract.createVoting('testVoting', 0)
}
