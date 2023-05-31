import {User, userModel} from '../models/userModel'

export async function getUser(userId: string): Promise<User | undefined> {
    await userModel.findById({_id: {$eq: userId}}, (err: string, user: User) => {
        return user
    })
    return undefined;
}