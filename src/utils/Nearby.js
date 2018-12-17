// calculates by grid distance
// takes objects with lat and lng
// returns closest objects by indices
export const Nearby = (first, others) => {
  let output = others.map((v, i) => {
    let dist;
    if (Array.isArray(first)) {
      dist = Math.sqrt(
        Math.pow(first[0] - v[0], 2) + Math.pow(first[1] - v[1], 2)
      );
    } else
      dist = Math.sqrt(
        Math.pow(first.lat - v.lat, 2) + Math.pow(first.lng - v.lng, 2)
      );
    return { index: i, value: dist };
  });

  output.sort((x, y) => (x.value > y.value ? 1 : x.value === y.value ? 0 : -1));
  return output.map(v => v.index);
};

// test
const input = {
  label: "input",
  lat: 51.013,
  lng: 255.366
};

const comparisons = [
  {
    label: 1,
    lat: 61.354,
    lng: 240.161
  },
  {
    label: 2,
    lat: 60.88,
    lng: 235.766
  },
  {
    label: 3,
    lat: 57.657,
    lng: 245.063
  },
  {
    label: 4,
    lat: 51.011,
    lng: 256.0
  }
];

const t = Nearby(input, comparisons);
//console.log(t);

// test 2
const inputList = [51.013, 255.366];

const comparisonList = [
  [61.354, 240.161],
  [60.88, 235.766],
  [57.657, 245.063],
  [51.011, 256.0]
];

const u = Nearby(inputList, comparisonList);
//console.log(u);
