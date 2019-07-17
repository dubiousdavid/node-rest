import _ from 'lodash/fp'
import fs from 'fs'
import path from 'path'
import { parse, format } from 'date-fns'

let { readFile, readdir } = fs.promises

let splitColumns = delimiter =>
  _.flow(
    _.map(_.split(delimiter)),
    _.map(_.map(_.trim)),
  )

let parseRows = rows => {
  let firstRow = _.first(rows)
  // CSV
  if (/,/.test(firstRow)) return splitColumns(',')(rows)
  // Pipe
  else if (/\|/.test(firstRow)) return splitColumns('|')(rows)
  // Space
  else return splitColumns(' ')(rows)
}

let toObject = _.zipObject([
  'LastName',
  'FirstName',
  'Gender',
  'FavoriteColor',
  'DateOfBirth',
])

// Date formatting
let formatDate = _.flow(
  parse,
  date => format(date, 'M/D/YYYY'),
)
let formatDates = _.map(_.update('DateOfBirth', formatDate))

// Sorting
export let sortByGender = _.flow(_.sortBy(['Gender', 'LastName']), formatDates)
export let sortByBirthdate = _.flow(_.sortBy('DateOfBirth'), formatDates)
export let sortByLastName = _.flow(_.orderBy('LastName', ['desc']), formatDates)

// Split rows by newlines
let splitRows = _.flow(
  _.trimEnd,
  _.split('\n'),
)

// Parse file content
export let parseContent = _.flow(
  splitRows,
  parseRows,
  _.map(toObject),
)

// Sort content from files
export let sortContents = contents => {
  let records = _.flow(
    _.map(parseContent),
    _.flatten,
  )(contents)

  return {
    sortedByGender: sortByGender(records),
    sortedByBirthdate: sortByBirthdate(records),
    sortedByLastName: sortByLastName(records),
  }
}

// Get content of files from directory
export let getDirContents = async dir => {
  // Read files from directory
  let files = await readdir(dir)

  // Read file contents for each file
  return _.flow(
    _.map(file => path.join(dir, file)),
    _.map(path => readFile(path, { encoding: 'utf8' })),
    files => Promise.all(files),
  )(files)
}
