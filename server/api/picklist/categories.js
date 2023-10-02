
export default defineEventHandler((event) => {

  // console.log('ev', event.req)

  let data = [
    {
      label: 'Electronics',
      value: 'electronics',
    },
    {
      label: 'Fashion',
      value: 'fashion',
    },
    {
      label: 'Jewelery',
      value: 'jewelery',
    },
    {
      label: 'Transportation',
      value: 'transportation',
    },
    {
      label: 'Computer',
      value: 'computer',
    },
    {
      label: 'Gaming Accessories',
      value: 'gaming accessories',
    },
  ]

  const query = getQuery(event)

  if (query?.search && query?.search != '') {

    const filteredData = data.filter((one) => {
      return one.label.toLowerCase().includes(query?.search?.toLowerCase())
    })

    return filteredData
  }

  return data
})