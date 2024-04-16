const crypto = require("crypto")

// REFERENCE: https://dev.to/mmainulhasan/30-javascript-tricky-hacks-gfc
const main = (async = () => {
  // // Map
  // let numbers = [1, 2, 3, 4]
  // let doubled = numbers.map((x) => x * 2)
  // console.log(doubled)

  // // Filter
  // const evens = numbers.filter((x) => x % 2 === 0)
  // console.log(evens)

  // // Reduce
  // const sum = numbers.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   0
  // )
  // console.log(sum)

  // const uuid = crypto.randomUUID()
  // console.log(uuid)

  // // Synchronous
  // const randomBytes = crypto.randomBytes(16)
  // console.log(randomBytes.toString("hex"))

  const randomBytesArray = Array.from({ length: 20 }, () =>
    crypto.randomBytes(16).toString("hex")
  )
  console.log(randomBytesArray)
})
main()
