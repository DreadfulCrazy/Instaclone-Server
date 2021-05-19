const { PubSub, withFilter } = require("apollo-server") 
const { NEW_FOLLOWER, NEW_PUBLICATION } = require("./tags")
const userController = require('../controllers/user')
const followController = require('../controllers/follow')
const publicationController = require('../controllers/publication')



const pubSub = new PubSub()

const resolver = {
    Query:{
        // Users
        getUser: (_, { id, username } ) => userController.getUser(id, username),
        search: (_, { search }) => userController.search(search),
        //Follow
        isFollow:(_, { username }, ctx) => followController.isFollow(username, ctx),
        getFollowers:(_, { username }) => followController.getFollowers(username),
        getFollows: (_, { username }) => followController.getFollows(username),

        //Publication
        getPublications: (_, { username }) => publicationController.getPublications(username),
    },
    Mutation:{
        //User
        register: (_, { input }) => userController.register(input),
        login: (_, { input }) => userController.login(input),
        updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
        deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
        updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),

        // FOllow
        follow: (_, { username }, ctx) => followController.follow(username, ctx, pubSub, NEW_FOLLOWER),
        unFollow: (_, {username }, ctx) => followController.unFollow(username, ctx, pubSub, NEW_FOLLOWER),

        //Publication
        publish: (_, { file }, ctx) => publicationController.publish(file, ctx, pubSub)
    }, 
    Subscription:{
        // newFollower: {
        //     subscribe: withFilter (
        //         () => pubSub.asyncIterator([NEW_FOLLOWER]),
        //         /**
        //          * 
        //          * @param {*} payLoad 
        //          * @param {*} args 
        //          * Los args es el arguneto que nosotros estamos recibiendo desde el esquema en este caso es el username
        //          * y el payload es la data que estamos enviando desde  pub/sub.publish en el controlador 
        //          * 
        //          */
        //         (payLoad, args) => {
        //             return(payLoad.newFollower.follow === args.username)
        //         },
        //         /**
        //          * Ademas puede tener un tercer parametro el cual se llama resolver
        //          * Con este pasamos una funcion que recibe el argumento o el payload
        //          * y podemos editarlo antes de que vaya a procesar el dato en uno 
        //          * de los dos procesos 
        //          * 
        //          */
        //         )
        // },
        newPublication: {
            subscribe: withFilter(
                ()=> pubSub.asyncIterator([NEW_PUBLICATION]),
                (payLoad,args) => {
                console.log(payLoad.newPublications.username === args.username)
                return(payLoad.newPublications.username === args.username)
            }),
            resolve: (payLoad) => {console.log(payLoad)}
        }
    }
}

module.exports = resolver