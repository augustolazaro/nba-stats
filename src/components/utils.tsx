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