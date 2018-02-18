export default async (action, data = {}, cb) => {
  const url = `${ajaxurl}?action=${action}&data=${JSON.stringify(data)}`
  return cb(await(await fetch(url, { cache: 'no-store' })).json())
}
