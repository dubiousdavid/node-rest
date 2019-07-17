import _ from 'lodash/fp'
import fs from 'fs'
import { parse, format } from 'date-fns'
let { readFile, readdir } = fs.promises

export let parseRows = delimiter =>
  _.flow(
    _.map(_.split(delimiter)),
    _.map(_.map(_.trim)),
  )

export let parseFile = file => {
  let rows = _.split('\n', file).slice(0, -1)
  let firstRow = _.first(rows)
  // CSV
  if (/,/.test(firstRow)) return parseRows(',')(rows)
  // Pipe
  else if (/\|/.test(firstRow)) return parseRows('|')(rows)
  // Space
  else return parseRows(' ')(rows)
}

let toObject = _.zipObject([
  'LastName',
  'FirstName',
  'Gender',
  'FavoriteColor',
  'DateOfBirth',
])

let sortByGender = _.sortBy(['Gender', 'LastName'])
let sortByBirthdate = _.sortBy('DateOfBirth')
let sortByLastName = _.orderBy('LastName', ['desc'])
let formatDate = _.flow(parse, date => format(date, 'M/D/YYYY'))
let formatDates = _.map(_.update('DateOfBirth', formatDate))

let sortContents = contents => {
  let records = _.flow(
    _.map(parseFile),
    _.flatten,
    _.map(toObject),
  )(contents)

  return {
    sortedByGender: formatDates(sortByGender(records)),
    sortedByBirthdate: formatDates(sortByBirthdate(records)),
    sortedByLastName: formatDates(sortByLastName(records)),
  }
}

export let readFiles = async dir => {
  // Read files from directory
  let files = await readdir(dir)

  // Read file contents for each file
  let contents = await _.flow(
    _.map(file => `${dir}/${file}`),
    _.map(path => readFile(path, { encoding: 'utf8' })),
    files => Promise.all(files),
  )(files)

  return sortContents(contents)
}
