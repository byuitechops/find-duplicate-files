/*eslint-env node, es6*/

/* Module Description 
 * 
 * Finds all of the files that are duplicates
*/

/* Put dependencies here */
const canvas = require('canvas-wrapper')
const request = require('request')
const md5 = require('md5')

/**
 * Retrieves the list of files from canvas
 * @param {number} ou 
 */
function getFiles(ou){
  return new Promise((res,rej) => {
    canvas.get(`https://byui.instructure.com/api/v1/courses/${ou}/files`,(err,files) => {
      if(err) return rej(err)
      res(files)
    })
  })
}

/**
 * Downloads and hashes the file at the given url
 * @param {string} url 
 */
function hashFile(url){
  return new Promise((resolve,reject) => {
    var content = []
    request.get(url)
      .on('error',reject)
      .on('data',chunk => content.push(chunk))
      .on('end', () => {
        var buffer = Buffer.concat(content)
        var hash = md5(buffer)
        resolve(hash)
      })
  })
}

/**
 * Find all the duplicate files
 * @param {string} course 
 */
async function findem(course){
  var files = await getFiles(course.info.canvasOU)
  var hashes = {}
  await Promise.all(files.map(async file => {
    var hash = await hashFile(file.url)
    if(hashes[hash]){
      course.log('Duplicate Files Found',{
        "File1 Name":file.display_name,
        "File1 Id":file.id,
        "File2 Name":hashes[hash].display_name,
        "File2 Id":hashes[hash].id,
      })
    } else {
      hashes[hash] = file
    }
  }))
}

module.exports = (course, stepCallback) => {
  findem(course)
    .catch(course.error)
    .then(() => stepCallback(null, course))
};
