var height;
var width;

// her er arrayet med alle ballene våre. 
var balls;

var id;


// Her er ballene våre, de har en posisjon diameter og fart. Her bruker
// vi vektorer for posisjon og fart. 
function Ball() {
  this.position = createVector(random(width), 50)
  this.color = color(random(0, 255))
  this.diameter = random(30, 70)
    // her har vi satt litt forskjellig fart i x- og y-retning 
  this.speed = createVector(random(-1, 5), random(-3, 5))

  // id variablen brukes til å holde styr på ballene. Her gir vi hver
  // ball en unik id. Når en ball stopper kaller vi en funksjon som fjerner
  // ballen med denne id-en. 
  this.id = id;
  id++;

}

// Metode for å tegne en ball
Ball.prototype.display = function() {
  fill(this.color)
  ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
}

// Metode for å flytte en ball. Denne sjekker også for kollisjon med tak/bunn
// Bruker litt vektor aritmetikk for å flytte ballen
Ball.prototype.move = function() {

  // før vi gjør noe som helst av kollisjons-sjekking lagrer vi posisjonen
  // slik at vi kan sjekket om ballen har flyttet på seg eller ikke 
  oldpos = this.position.copy()

  gravity = createVector(0, -0.3)

  this.position.add(this.speed)
  this.speed.sub(gravity)

  // variabler for å holde styr på 
  bottom = height - this.diameter / 2;
  topp = 0 - this.diameter / 2;
  left = 0 + this.diameter / 2;
  right = height - this.diameter / 2;

  // kollisjon med bunnen av skjermen
  if (this.position.y >= bottom) {
    this.speed.sub(createVector(0, 3))
    this.speed.y = this.speed.y * -1
    this.position = createVector(this.position.x, bottom)

  }

  // kollisjon med toppen av skjermen
  if (this.position.y <= topp) {
    this.speed.sub(createVector(0, -3))
    this.speed.y = this.speed.y * -1
    this.position = createVector(this.position.x, topp)
  }

  // kollisjon med høyre side av skjermen
  if (this.position.x >= right) {
    this.speed.sub(createVector(1, 0))
    this.speed.x = this.speed.x * -1
    this.position = createVector(right, this.position.y)
  }

  // kollisjon med venstre side av skjermen 
  if (this.position.x <= left) {
    this.speed.sub(createVector(-1, 0))
    this.speed.x = this.speed.x * -1
    this.position = createVector(left, this.position.y)
  }

  // når ballen ikke har flyttet seg startes en timer på 5 sekunder
  // som 
  if (this.position.y == oldpos.y) {
    window.setTimeout(function() {
      removeBall(this.id)
    }.bind(this), 5000);
  }

}

// Funksjon for å fjerne ballen med en gitt id. 
function removeBall(id) {
  for (var i = 0; i < balls.length; i++) {
    ball = balls[i]
    if (id == ball.id) {
      // Splice brukes til å ta ut et element av arrayet. Fjerner
      // 1 element fra index i. 
      balls.splice(i, 1)
    }
  }
}

// Funksjon som lager en ny ball og venter 100 - 3000 ms før den lager en ny en
function newBalls() {
  balls.push(new Ball());
  window.setTimeout(newBalls, random(100, 3000));
}

function setup() {

  id = 0;

  height = 500;
  width = 500;

  createCanvas(height, width)

  // Setter opp et tomt array for å lagre ballene 
  balls = [];

  // lag noen baller vi kan starte med! 
  numBalls = 10;
  for (var i = 0; i < numBalls; i++) {
    // lag en ny ball og legg den inn i arrayet som holder styr på ballene
    balls.push(new Ball())
  }

  newBalls()


}

function draw() {
  background(250, 150, 250)

  for (var i = 0; i < balls.length; i++) {
    ball = balls[i]
    ball.move()
    ball.display()
  }
}