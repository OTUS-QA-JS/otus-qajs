// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import supertest from 'supertest'
import config from '../config/configBookstore'

const replaceBook = async ({ userId, fromIsbn, toIsbn, token }: any) => {
  const response = await supertest(config.baseURL)
    .put(`/BookStore/v1/Books/${fromIsbn}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      isbn: toIsbn
    })
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const addListOfBooks = async ({ userId, isbns, token }: any) => {
  const payload = {
    userId,
    collectionOfIsbns: isbns.map((isbn: any) => ({
      isbn
    }))
  }

  const response = await supertest(config.baseURL)
    .post(`/BookStore/v1/Books`)
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json')
    .send(payload)
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const removeAllBooks = async ({ userId, token }: any) => {
  const response = await supertest(config.baseURL)
    .delete(`/BookStore/v1/Books?UserId=${userId}`)
    .set('Authorization', `Bearer ${token}`)
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

export default {
  replace: replaceBook,
  addList: addListOfBooks,
  removeAll: removeAllBooks
}
