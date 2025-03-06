
export const RAMADAN_START_DATE = new Date('2025-03-06');
export const RAMADAN_END_DATE = new Date('2025-04-04');

export function getRamadanDaysRemaining(): number {
  const today = new Date();
  const endDate = new Date(RAMADAN_END_DATE);
  
  // Set both dates to midnight for accurate day calculation
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  
  const differenceInTime = endDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
  return Math.max(0, differenceInDays);
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('ml-IN', options);
}

export function isDateInRamadan(dateString: string): boolean {
  const date = new Date(dateString);
  return date >= RAMADAN_START_DATE && date <= RAMADAN_END_DATE;
}

export function getDefaultDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'ഇപ്പോൾ';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} മിനിറ്റ് മുമ്പ്`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} മണിക്കൂർ മുമ്പ്`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ദിവസം മുമ്പ്`;
  }
}
