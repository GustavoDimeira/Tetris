let a = [1, 2, 3]

let b = a.every((number) => {
  console.log(number)
  return !(number > 4)
});

console.log(b)