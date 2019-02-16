export const formatDate = (date: string): string => {
  const dateObj = new Date(date)

  const day = dateObj.toLocaleDateString(undefined, { day: '2-digit' })
  const month = dateObj.toLocaleDateString(undefined, { month: 'short' })

  return `${day}/${month}`
}