import test from 'ava'
import { getDirContents, sortContents } from './parse'

test('properly parse files in a directory', async t => {
  let contents = await getDirContents('examples')
  t.deepEqual(contents, [
    'Jobs, Steve, male, flursch, 1983-02-24\n' +
      'Leach, Robert, male, Magenta, 1983-02-28\n',
    'Cook | Marie | female | red | 1957-08-30\n' +
      'Knowles | Bruce | male | orange | 1990-09-30\n',
    'Kalb Joseph male silver 1971-05-20\n' +
      'Thurman Angelina female Gold 1976-12-03\n',
  ])
  let sortedContents = sortContents(contents)
  t.deepEqual(sortedContents, {
    sortedByGender: [
      {
        LastName: 'Cook',
        FirstName: 'Marie',
        Gender: 'female',
        FavoriteColor: 'red',
        DateOfBirth: '8/30/1957',
      },
      {
        LastName: 'Thurman',
        FirstName: 'Angelina',
        Gender: 'female',
        FavoriteColor: 'Gold',
        DateOfBirth: '12/3/1976',
      },
      {
        LastName: 'Jobs',
        FirstName: 'Steve',
        Gender: 'male',
        FavoriteColor: 'flursch',
        DateOfBirth: '2/24/1983',
      },
      {
        LastName: 'Kalb',
        FirstName: 'Joseph',
        Gender: 'male',
        FavoriteColor: 'silver',
        DateOfBirth: '5/20/1971',
      },
      {
        LastName: 'Knowles',
        FirstName: 'Bruce',
        Gender: 'male',
        FavoriteColor: 'orange',
        DateOfBirth: '9/30/1990',
      },
      {
        LastName: 'Leach',
        FirstName: 'Robert',
        Gender: 'male',
        FavoriteColor: 'Magenta',
        DateOfBirth: '2/28/1983',
      },
    ],
    sortedByBirthdate: [
      {
        LastName: 'Cook',
        FirstName: 'Marie',
        Gender: 'female',
        FavoriteColor: 'red',
        DateOfBirth: '8/30/1957',
      },
      {
        LastName: 'Kalb',
        FirstName: 'Joseph',
        Gender: 'male',
        FavoriteColor: 'silver',
        DateOfBirth: '5/20/1971',
      },
      {
        LastName: 'Thurman',
        FirstName: 'Angelina',
        Gender: 'female',
        FavoriteColor: 'Gold',
        DateOfBirth: '12/3/1976',
      },
      {
        LastName: 'Jobs',
        FirstName: 'Steve',
        Gender: 'male',
        FavoriteColor: 'flursch',
        DateOfBirth: '2/24/1983',
      },
      {
        LastName: 'Leach',
        FirstName: 'Robert',
        Gender: 'male',
        FavoriteColor: 'Magenta',
        DateOfBirth: '2/28/1983',
      },
      {
        LastName: 'Knowles',
        FirstName: 'Bruce',
        Gender: 'male',
        FavoriteColor: 'orange',
        DateOfBirth: '9/30/1990',
      },
    ],
    sortedByLastName: [
      {
        LastName: 'Thurman',
        FirstName: 'Angelina',
        Gender: 'female',
        FavoriteColor: 'Gold',
        DateOfBirth: '12/3/1976',
      },
      {
        LastName: 'Leach',
        FirstName: 'Robert',
        Gender: 'male',
        FavoriteColor: 'Magenta',
        DateOfBirth: '2/28/1983',
      },
      {
        LastName: 'Knowles',
        FirstName: 'Bruce',
        Gender: 'male',
        FavoriteColor: 'orange',
        DateOfBirth: '9/30/1990',
      },
      {
        LastName: 'Kalb',
        FirstName: 'Joseph',
        Gender: 'male',
        FavoriteColor: 'silver',
        DateOfBirth: '5/20/1971',
      },
      {
        LastName: 'Jobs',
        FirstName: 'Steve',
        Gender: 'male',
        FavoriteColor: 'flursch',
        DateOfBirth: '2/24/1983',
      },
      {
        LastName: 'Cook',
        FirstName: 'Marie',
        Gender: 'female',
        FavoriteColor: 'red',
        DateOfBirth: '8/30/1957',
      },
    ],
  })
})
