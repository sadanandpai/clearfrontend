import { AppWrite } from "./appwrite"

const getServiceClient = () => {
    return new AppWrite()
}

export const serviceClient = getServiceClient()