import {gql} from "apollo-boost";

// Queries - Jobs
export const GET_ALL_JOBS = gql`{  
      jobs{
            id
            title
            slug
            commitment {
                title
            }
            company {
                name
                slug
                logoUrl
            }
    }}
`;

export const GET_JOB = gql`
    query($input: JobInput!){
          job(input: $input){
                id
                slug
                title
                postedAt
                description
                applyUrl
                userEmail
                commitment {
                  title
                }
                company {
                  name
                  slug
                  logoUrl
                }
          }
    }
`;

// Mutations - Subscription
export const SUBSCRIBE = gql`
    mutation($input: SubscribeInput!) {
        subscribe(input: $input) {
            id
            name
            email
            subscribe
        }
    }
`;

