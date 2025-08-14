
const STORAGE_KEY = "top36_logs";

interface EnrollmentLog {
  email: string;
  source: string;
  enrolledOn: string; // ISO date
  partners: string[];
  raffleId: string;
}

interface OptOutLog {
  email: string;
  optedOutOn: string; // ISO date
}

function getDB() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { enrollments: [], optOuts: [] };
  try {
    return JSON.parse(raw);
  } catch { return { enrollments: [], optOuts: [] }; }
}

function saveDB(db: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

// Enrollment
export function addEnrollment(log: EnrollmentLog) {
  const db = getDB();
  db.enrollments.unshift(log);
  saveDB(db);
}

export function getEnrollments(): EnrollmentLog[] {
  return getDB().enrollments || [];
}

// OptOut
export function optOut(email: string) {
  const db = getDB();
  db.optOuts.unshift({
    email,
    optedOutOn: new Date().toISOString(),
  });
  saveDB(db);
}

export function isOptedOut(email: string): boolean {
  return (getDB().optOuts || []).some((o: OptOutLog) => o.email === email);
}

export function removeEnrollment(email: string) {
  const db = getDB();
  db.enrollments = db.enrollments.filter((e: EnrollmentLog) => e.email !== email);
  saveDB(db);
}
