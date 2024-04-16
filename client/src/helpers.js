export function getCamelot(key, mode) {
  const keys = [
    ["16.8B", "9.5A"], // C
    ["6.3B", "23.12A"], // C#
    ["20.10B", "13.7A"], //D
    ["10.5B", "3.2A"], //D#
    ["24.12B", "17.9A"], //E
    ["14.7B", "7.4A"], //F
    ["4.2B", "21.11A"], //F#
    ["18.9B", "11.6A"], //G
    ["8.4B", "1.1A"], //G#
    ["22.11B", "15.8A"], //A
    ["12.6B", "5.3A"], //A#
    ["2.1B", "19.10A"], //B
  ];

  if (key !== undefined && mode !== undefined) {
    return keys[key][mode];
  }
}

export function roundBpm(bpm, threshold = 0.1) {
  if (!bpm) return;
  const decimalPart = bpm - Math.floor(bpm);
  const distanceToLowerInt = decimalPart;
  const distanceToUpperInt = 1 - decimalPart;
  if (distanceToLowerInt <= threshold) {
    return Math.floor(bpm);
  } else if (distanceToUpperInt <= threshold) {
    return Math.ceil(bpm);
  } else {
    return bpm.toFixed(2);
  }
}

export function msToMS(ms) {
  const time = new Date(ms);
  return `${time.getMinutes()}:${time.getSeconds().toString().padStart(2, "0")}`;
}

export function formatDate(date) {
  const t = new Date(date);
  const d = new Date() - t;
  const day = 24 * 60 * 60 * 1000;
  const fourWeeks = day * 7 * 4;
  const threeWeeks = day * 7 * 3;
  const twoWeeks = day * 7 * 2;
  const oneWeek = day * 7;

  switch (true) {
    case d < day:
      return `${d / 1000 / 60} hours ago`;
    case d < oneWeek:
      return `${d / 1000 / 60 / 24} days ago`;
    case d < twoWeeks:
      return "one weeks ago";
    case d < threeWeeks:
      return "two weeks ago";
    case d < fourWeeks:
      return "four weeks ago";
    case d > fourWeeks:
      return t.toLocaleDateString("uk-en");
  }
}
