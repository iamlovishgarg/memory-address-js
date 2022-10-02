const a = { name: "arthur" };
const b = a
const c = 'gj'
const d = 'gdasj'

//This generator doesn't garantee uniqueness, but looks way more memoryish than a incremental counter
//if you use this code for real, do incremental or something else unique!
function* generator() {
  while (true) {
    const random = Math.random()
      .toString(16)
      .slice(2, 10);
    yield `0x${random}`;
  }
}

const preload = (knowObjects, refs, generate) => (reference = false) => {
  if (reference) {
    return refs;
  } else {
    return object => {
      let address;
      if (knowObjects.has(object)) {
        address = knowObjects.get(object);
      } else {
        address = generate.next().value;
        knowObjects.set(object, address);
        refs[address] = object;
      }
      return address;
    };
  }
};

const setup = preload(new Map(), {}, generator());
const findRef = setup(false);

findRef(a)
findRef(b)
findRef(c)
findRef(d)
/*
console.log something like that, and builds up the knowObjects map / refs object
[
 "0xf094c649",
 "0x7de35306",
 "0x6a99aa2f",
 "0xf094c649"
]
*/

const refs = setup(true);
console.log(refs)