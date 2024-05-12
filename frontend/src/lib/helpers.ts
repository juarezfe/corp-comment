// if time < 10m then return "Just Now"
// if time < 1h then return "Xm"
// if time < 24h then return "Xh"

// if time > 24h then return "Xd"
export const formatDate = (date: number) => {
  const parsedDate = parseDaysAgo(date);
  const now = new Date();
  const createdAt = new Date(parsedDate);
  const diff = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 10) {
    return "Just Now";
  } else if (hours < 1) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else {
    return `${days}d`;
  }
};

// return date time no formatted, just the date
const parseDaysAgo = (daysAgo: number) => {
  const now = new Date();
  const createdAt = new Date(now);
  createdAt.setDate(now.getDate() - daysAgo);
  return createdAt.getTime();
};

export const getBadgeLetter = (companyName: string) => companyName.charAt(0);
