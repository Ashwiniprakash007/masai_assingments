const fs = require('fs');
const PREF_FILE = 'preferences.json';

function loadPreference() {
  if (!fs.existsSync(PREF_FILE)) {
    fs.writeFileSync(PREF_FILE, JSON.stringify({ filter: "all" }));
  }
  const data = fs.readFileSync(PREF_FILE, 'utf-8');
  return JSON.parse(data);
}

function savePreference(pref) {
  fs.writeFileSync(PREF_FILE, JSON.stringify(pref, null, 2));
}

function setFilter(filter) {
  if (!["all", "completed", "pending"].includes(filter)) {
    console.log("Invalid filter. Use: all, completed, pending.");
    return;
  }
  savePreference({ filter });
  console.log(`Preference updated to show only "${filter}" tasks.`);
}

module.exports = {
  loadPreference,
  setFilter,
};
