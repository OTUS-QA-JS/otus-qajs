import config from '../../framework/config/configBookstore'
import { BookService, AuthService, UserService, UserBookService } from '../../framework'
// @ts-expect-error TS(2732): Cannot find module '../../framework/fixtures/Books... Remove this comment to see the full error message
import { books } from '../../framework/fixtures/Books.json'

describe('Books', () => {
  const userId = config.userId
  const [book1, book2] = books
  const isbn = book1.isbn

  let token: string

  beforeAll(async () => {
    token = await AuthService.getTokenFromCache({
      userName: config.username,
      password: config.password
    })
  })

  it('Список книг', async () => {
    const response = await BookService.getAll()

    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
  })

  it('Удаление всех книг из коллекции пользователя', async () => {
    const responseRemoveAll = await UserBookService.removeAll({
      userId,
      token
    })
    expect(responseRemoveAll.status).toBe(204)

    const responseUser = await UserService.get({
      userId,
      token
    })
    expect(responseUser.data.books).toEqual([])
  })

  it('Добавление книги в коллекцию к пользователю', async () => {
    const responseAddListOfBooks = await UserBookService.addList({
      userId,
      isbns: [isbn],
      token
    })

    expect(responseAddListOfBooks.data).toEqual({ books: [{ isbn }] })
  })

  it('Заменить книгу в коллекции пользователя', async () => {
    const responseAddBook = await UserBookService.replace({
      userId,
      fromIsbn: isbn,
      toIsbn: book2.isbn,
      token
    })
    expect(responseAddBook.data).toEqual({
      books: [book2],
      userId,
      username: config.username
    })
  })
})
