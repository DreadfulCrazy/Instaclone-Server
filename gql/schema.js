const { gql } = require("apollo-server");

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

  type PublicationsGetiT {
    publications: [Publication]
    username: String
  }

  type Token {
    token: String
  }

  type UpdateAvatar {
    status: Boolean
    urlAvatar: String
  }

  type Publish {
    status: Boolean
    urlFile: String
  }

  type Publication {
    id: ID
    idUser: ID
    file: String
    typeFile: String
    createdAt: String
  }

  type Comment {
    idPublication: ID
    idUser: User
    comment: String
    createdAt: String
  }

  type FeedPublication {
    id: ID
    idUser: User
    file: String
    typeFile: String
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

  input CommentInput {
    idPublication: ID
    comment: String
  }

  type Query {
    # User
    getUser(id: ID, username: String): User
    search(search: String): [User]

    #Follow
    isFollow(username: String!): Boolean
    getFollowers(username: String!): FollowerGetIt
    getFollows(username: String!): [User]
    getNotFolloweds: [User]

    #Publication
    getPublications(username: String): PublicationsGetiT
    getPublicationsFollowed: [FeedPublication]

    #Comments
    getComments(id: ID): [Comment]

    #Like
    isLike(idPublication: ID!): Boolean
    countLikes(idPublication: ID!): Int
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

    #Comments
    addComment(input: CommentInput): Comment

    #Likes
    addLike(idPublication: ID!): Boolean
    deleteLike(idPublication: ID!): Boolean
  }

  type Subscription {
    newFollower(username: String!): FollowerGetIt
    newPublication(username: String!): PublicationsGetiT
    newComment(id: ID): [Comment]
    newLike(idPublication: ID!): Int
  }
`;

module.exports = typeDefs;
