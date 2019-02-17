export const formatDate = (date: string | Date): string => {
  const dateObj = new Date(date)

  const day = dateObj.toLocaleDateString(undefined, { day: '2-digit' })
  const month = dateObj.toLocaleDateString(undefined, { month: 'short' })

  return `${day}/${month}`
}

export const formatLongDate = (date: string | Date): string => {
  const dateObj = new Date(date)

  const day = dateObj.toLocaleDateString(undefined, { day: '2-digit' })
  const month = dateObj.toLocaleDateString(undefined, { month: 'long' })
  const weekday = dateObj.toLocaleDateString(undefined, { weekday: 'long' })

  return `${weekday}, ${day}/${month}`
}

export const formatBirthdate = (date: string | Date): string => {
  const dateObj = new Date(date)

  const day = dateObj.toLocaleDateString(undefined, { day: '2-digit' })
  const month = dateObj.toLocaleDateString(undefined, { month: '2-digit' })
  const year = dateObj.toLocaleDateString(undefined, { year: 'numeric' })

  return `${month}/${day}/${year}`
}

export const getAge = (date: string | Date): number => {
  const today = new Date()
  const birthdate = new Date(date)
  const diff = today.getTime() - birthdate.getTime()

  return Math.floor(diff/(1000*60*60*24*365.25))
}
