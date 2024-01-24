
import { getProviders } from 'next-auth/react'
export default  async function getProvider(context) {
    const providers = await getProviders()
    console.log(providers)
    return  providers 
}