const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: ID
        name: String
        username: String
        email: String
        siteWeb: String
        description: String
        password: String
        avatar: String
        createdAt: String
    }

    type FollowerGetIt {
        followers: [User]
        follow: String
    }

    type Token {
        token: String
    }

    type UpdateAvatar {
        status: Boolean,
        urlAvatar: String
    }

    type Publish {
        status: Boolean,
        urlFile: String
    }

    type Publication{
        id: ID,
        idUser: ID,
        file: String,
        typeFile: String,
        createdAt: String
    }

    input UserInput {
        name: String! 
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String
        email: String
        password: String
        currentPassword: String
        newPassword: String
        siteWeb: String
        description: String
    }

    type Query {
        # User 
        getUser(id: ID, username: String): User
        search(search: String): [User]

        #Follow
        isFollow( username: String!): Boolean
        getFollowers(username: String!): FollowerGetIt
        getFollows( username: String!): [User]

        #Publication
        getPublications(username: String): [Publication]

    }

    type Mutation {
        # User 
        register(input: UserInput): User
        login(input: LoginInput): Token
        updateAvatar(file: Upload): UpdateAvatar
        deleteAvatar: Boolean
        updateUser(input: UserUpdateInput): Boolean

        #follow
        follow(username: String!): Boolean
        unFollow(username: String!): Boolean

        #Publication
        publish(file: Upload): Publish
    }

    type Subscription {
        newFollower(username: String): FollowerGetIt
    }
`

module.exports = typeDefs