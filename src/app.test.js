import request from 'supertest'
import test from 'ava'
import app from './app'

let data = `Cook | Marie | female | red | 1957-08-30
Knowles | Bruce | male | orange | 1990-09-30
Abner | Josie | female | purple | 1958-09-30`

test.before(async () => {
  await request(app)
    .post('/records')
    .type('text/plain')
    .send(data)
})

test('/records/gender', async t => {
  let res = await request(app).get('/records/gender')
  t.is(res.statusCode, 200)
  t.deepEqual(res.body, [
    {
      LastName: 'Abner',
      FirstName: 'Josie',
      Gender: 'female',
      FavoriteColor: 'purple',
      DateOfBirth: '9/30/1958',
    },
    {
      LastName: 'Cook',
      FirstName: 'Marie',
      Gender: 'female',
      FavoriteColor: 'red',
      DateOfBirth: '8/30/1957',
    },
    {
      LastName: 'Knowles',
      FirstName: 'Bruce',
      Gender: 'male',
      FavoriteColor: 'orange',
      DateOfBirth: '9/30/1990',
    },
  ])
})

test('/records/birthdate', async t => {
  let res = await request(app).get('/records/birthdate')
  t.is(res.statusCode, 200)
  t.deepEqual(res.body, [
    {
      LastName: 'Cook',
      FirstName: 'Marie',
      Gender: 'female',
      FavoriteColor: 'red',
      DateOfBirth: '8/30/1957',
    },
    {
      LastName: 'Abner',
      FirstName: 'Josie',
      Gender: 'female',
      FavoriteColor: 'purple',
      DateOfBirth: '9/30/1958',
    },
    {
      LastName: 'Knowles',
      FirstName: 'Bruce',
      Gender: 'male',
      FavoriteColor: 'orange',
      DateOfBirth: '9/30/1990',
    },
  ])
})

test('/records/name', async t => {
  let res = await request(app).get('/records/name')
  t.is(res.statusCode, 200)
  t.deepEqual(res.body, [
    {
      LastName: 'Knowles',
      FirstName: 'Bruce',
      Gender: 'male',
      FavoriteColor: 'orange',
      DateOfBirth: '9/30/1990',
    },
    {
      LastName: 'Cook',
      FirstName: 'Marie',
      Gender: 'female',
      FavoriteColor: 'red',
      DateOfBirth: '8/30/1957',
    },
    {
      LastName: 'Abner',
      FirstName: 'Josie',
      Gender: 'female',
      FavoriteColor: 'purple',
      DateOfBirth: '9/30/1958',
    },
  ])
})
