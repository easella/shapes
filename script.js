alert('click to reset / enter seed and click / enter nothing for random')
// play with the code for even more trippy stuff

let animate = true
let size = 15
let i = 0
let gens = []
let seed;
let seedArray = [0, 0, 0];

function genr(R, r, c) {
  var x = 0
  var y = 0
  var ox = width / 2
  var oy = height / 2
  var len = c / r
  var con = r / R
  var rand = random(20) < 1
  this.line = function (ang) {
    x = width / 2
    y = height / 2
    x += ((1 - con) * cos(ang) + len * con * sin(ang * ((1 - con) / con))) * size * R
    y += ((1 - con) * sin(ang) + len * con * cos(ang * ((1 - con) / con))) * R * size
    stroke(36)
    strokeWeight(1)
    line(ox, oy, x, y)
    ox = x
    if (!rand) {
      oy = y
    }
  }
  return this
}

function generate() {
  background(255)
  gens = []
  i = 0
  for (var m = 0; m < floor(random(1, 7) * 2); m += 1) {
    _R = floor(random(1) * 10)
    _r = floor(random(1) * 10)
    _p = floor(random(1) * 10)
    gens.push(new genr(_R, _r, _p))
  }
}

function queueValues(array, item, length) {
  if (array.unshift(item) > length) {
    array.pop();
    return array;
  }
  return array;
}


function setup() {
  let canvas = createCanvas(innerWidth, innerHeight)
  seedInput = document.getElementById("seed");
  seeds = document.getElementsByClassName("seed");
  seedInput.oninput = function () {
    setup();
  }
  if (seedInput.value) {
    seed = seedInput.value;
  } else {
    seed = Math.random().toString().slice(2, 11)
  }
  seedArray = queueValues(seedArray, seed, 3)
  seeds[0].innerText = seedArray[0];
  seeds[1].innerText = seedArray[1];
  seeds[2].innerText = seedArray[2];
  console.log("seed :", seed)
  randomSeed(seed)
  generate()
  spd = 0.1
  drawn = false
  fc = 400
  //console.log(gens.length)

  canvas.elt.onclick = function () {
    setup();
  }

}


function draw() {
  if (animate == false) {
    drawn = true
    noLoop()
  } else {
    drawn = false
  }
  //bt.mousePressed(stop)
  //console.log(animate)
  background(255)

  for (j = i; j < 100 + i; j += spd) {
    gens.forEach(function (gen) {
      gen.line(j)
    })
    //if(drawn) break
  }
  i = j
}