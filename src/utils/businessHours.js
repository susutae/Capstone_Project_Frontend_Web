const BUSINESS_HOURS = {
  0: null,
  1: null,
  2: { open: 11, close: 20 },
  3: { open: 11, close: 20 },
  4: { open: 11, close: 20 },
  5: { open: 11, close: 20 },
  6: { open: 10, close: 18 },
}

export function getBusinessStatus(date = new Date()) {
  const hours = BUSINESS_HOURS[date.getDay()]

  if (!hours) {
    return { isOpen: false, message: 'Closed today · Opens Tuesday at 11:00 AM' }
  }

  const currentTime = date.getHours() + date.getMinutes() / 60
  const isOpen = currentTime >= hours.open && currentTime < hours.close
  const closeLabel = hours.close > 12 ? `${hours.close - 12}:00 PM` : `${hours.close}:00 AM`

  return {
    isOpen,
    message: isOpen
      ? `Open now · Closes at ${closeLabel}`
      : `Closed now · Today's hours ${hours.open}:00 AM–${closeLabel}`,
  }
}

export const hoursSummary = 'Tue–Fri 11 AM–8 PM · Sat 10 AM–6 PM · Sun–Mon closed'
