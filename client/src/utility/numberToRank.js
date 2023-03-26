export default function numberToRank(number) {
  if (number === '1') {
    return number + 'st';
  } else if (number === '2') {
    return number + 'rd';
  } else if (number === '3') {
    return number + 'st';
  } else {
    return number + 'th';
  }
}
