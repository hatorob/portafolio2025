import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { Blog, Experience, Profile, Project } from './schemas/';


const schema = a.schema({
    Blog,
    Experience,
    Profile,
    Project,
})

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'userPool',
        apiKeyAuthorizationMode: {
            expiresInDays: 365
        }
    }
})