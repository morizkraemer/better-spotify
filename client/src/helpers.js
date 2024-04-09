export function getCamelot(key, mode) {
  const keys = [
    ["8B", "5A"], // C
    ["3B", "12A"], // C#
    ["10B", "7A"], //D
    ["5B", "2A"],
    ["12B", "9A"], //D# //E
    ["7B", "4A"], //F
    ["2B", "11A"], //F#
    ["9B", "6A"], //G
    ["4B", "1A"], //G#
    ["11B", "8A"], //A
    ["6B", "3A"], //A#
    ["1B", "10A"], //B
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
