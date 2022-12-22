process.on('message', cantidad => {
  let randomNumber
  const randoms = {}
  for (let i = 0; i < cantidad; i++) {
    randomNumber = Math.round(Math.ceil(Math.random() * 1000))
    if (Object.keys(randoms).find(number => number == randomNumber)) {
      randoms[randomNumber]++
    } else {
      randoms[randomNumber] = 1
    }
  }
  process.send(randoms)
})
