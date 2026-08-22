const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_MIN = 60 * 1000;
const MS_PER_SEC = 1000;

export function formatBirthday(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export function getAge(birthDate, now = new Date()) {
  let age = now.getFullYear() - birthDate.getFullYear();
  const beforeBirthday =
    now.getMonth() < birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() &&
      now.getDate() < birthDate.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export function getDaysLived(birthDate, now = new Date()) {
  const start = new Date(
    birthDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  return Math.floor((now - start) / MS_PER_DAY);
}

export function getDaysUntilNextBirthday(birthDate, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const next = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.floor((next - today) / MS_PER_DAY);
}

export function isBirthdayToday(birthDate, now = new Date()) {
  return (
    now.getMonth() === birthDate.getMonth() &&
    now.getDate() === birthDate.getDate()
  );
}

export function getLastBirthday(birthDate, now = new Date()) {
  const candidate = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (candidate > now) candidate.setFullYear(now.getFullYear() - 1);
  return candidate;
}

export function getTimeAlive(birthDate, now = new Date()) {
  const years = getAge(birthDate, now);
  const last = getLastBirthday(birthDate, now);
  const diff = now - last;
  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MIN);
  const seconds = Math.floor((diff % MS_PER_MIN) / MS_PER_SEC);
  return { years, days, hours, minutes, seconds };
}
