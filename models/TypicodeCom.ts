import QueryString from "qs";

export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export type User = {
  id: number, // 1,
  name: string, // "Leanne Graham",
  username: string, // "Bret",
  email: string, // "Sincere@april.biz",
  address: {
    street: string, // "Kulas Light",
    suite: string, // "Apt. 556",
    city: string, // "Gwenborough",
    zipcode: string, // "92998-3874",
    geo: {
      lat: string, // "-37.3159",
      lng: string, // "81.1496"
    }
  },
  phone: string, // "1-770-736-8031 x56442",
  website: string, // "hildegard.org",
  company: {
    name: string, // "Romaguera-Crona",
    catchPhrase: string, // "Multi-layered client-server neural-net",
    bs: string, // "harness real-time e-markets"
  }
}

export type Photo = {
  albumId: number, // 1,
  id: number, // 1,
  title: string, // "accusamus beatae ad facilis cum similique qui sunt",
  url: string, // "https://via.placeholder.com/600/92c952",
  thumbnailUrl: string, // "https://via.placeholder.com/150/92c952"
}

export default class TypicodeCom {

  public async getPosts(): Promise<Post[]> {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!res.ok) throw new Error('Something went wrong')
    let posts: Post[] = await res.json()
    return posts
  }

  public async getUser(id: number): Promise<User> {
    let res = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
    if (!res.ok) throw new Error('Something went wrong')
    let user: User = await res.json()
    return user
  }

  public async getPhotos(userId: number): Promise<Photo[]> {
    let params = QueryString.stringify({ albumId: userId })
    let res = await fetch('https://jsonplaceholder.typicode.com/photos?' + params)
    if (!res.ok) throw new Error('Something went wrong')
    let photos: Photo[] = await res.json()
    return photos
  }

}