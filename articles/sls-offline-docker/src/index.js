import moment from 'moment'

export default async (event, context) => ({
  statusCode: 200,
  body: await new Promise(resolve =>
    setTimeout(() =>
      resolve(`Hello, this is your lambda speaking. Today is ${moment().format('dddd')}!`), 2000))
})
