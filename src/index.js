const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root, args) => {
            console.log(`Searching for link with id: ${args.id}`)
            return links.find(item => item.id == args.id)}
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        
        updateLink: (root, args) => {
            links.forEach((element, index, arr) => {
               if(element.id === args.id) arr[index] = args;
            });
    
            return args;
        },

        deleteLink: (root, args) => {
            let deletedItem;
            links.forEach((element, index, arr) => {
                if (element.id === args.id){
                    deletedItem = arr.pop(index);
                } 
            });
            
            return deletedItem;
        }
    },
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))