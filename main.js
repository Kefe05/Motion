let canvas = document.querySelector('canvas');

canvas.width = 1024
canvas.height = 576



let c = canvas.getContext('2d');

//c.fillStyle = 'rgba(255, 0, 0, 0.5)';
//c.fillRect(100, 100, 100, 100);
//c.fillStyle = 'rgba(0, 255, 0, 0.5)';
//c.fillRect(200, 200, 100, 100);
//c.fillStyle = 'rgba(0, 0, 255, 0.5)';
//c.fillRect(300, 300, 100, 100);
//
//c.fillRect(400, 400, 100, 100);


//lines

//c.beginPath();
//c.moveTo(500, 100);
//c.lineTo(500, 400);
//c.lineTo(700, 100);
//c.lineTo(500, 100);
//c.stroke();
//

//arc
//c.beginPath();
//c.arc(900, 100, 50, 180, 0, false);
//c.stroke();

const mouse = {
  x: undefined,
  y: undefined
}


window.addEventListener('mousemove', (e) =>{
  mouse.x = e.x;
  mouse.y = e.y; 
})


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height=  window.innerHeight;

  init();
})

const maxRadius = 40;
const colorArray =['#3A015C', '#FFC49B', '#ADB6C4', '#290025', '#11001C'];




function Circle(x, y, dx, dy, radius){
  this.x = x;
  this.y =y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
  
    this.y += this.dy;
    this.x += this.dx;

    //interactivity

    if( (mouse.x - this.x < 50 && mouse.x - this.x > -50) && (mouse.y - this.y < 50 && mouse.y - this.y >-50)){
      if(this.radius < maxRadius){ 
        this.radius += 1;
      }
    } else if (this.radius >this. minRadius){
      this.radius -= 1;
    }

    this.draw();

  }

} 


var Circles = [];


function init (){
  Circles =[]

  for ( let i = 0; i < 800; i++){
    
      let x = Math.random() * innerWidth;
      let y = Math.random() * innerHeight;
      let dx = (Math.random() - 0.5) * 3;
      let dy =(Math.random() - 0.5) * 3 ;
      let radius = (Math.random() * 3)  + 1; 
  
      const circle = new Circle(x, y, dx, dy, radius);
  
      Circles.push(circle)
    }  
}


function animate(){
  c.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animate);

  Circles.forEach((circle) => {
    circle.update();
  })
  
  
  
 
  
}



init();

animate();



