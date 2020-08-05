
function addElement(elId,e) {
  var holder = document.getElementById(elId),
      num = e.currentTarget.dataset.count++,
      divIdName = elId + num,
      newdiv = document.createElement('div');

  newdiv.setAttribute("id", divIdName);
  newdiv.innerHTML = "<div class=\"drag-item\"><a href=\"javascript:;\" onclick=\"moveElement(\'" + divIdName + "\',\'" + elId + "\')\">m</a></br><a href=\"javascript:;\" onclick=\"removeElement(\'" + divIdName + "\',\'" + elId + "\')\">x</a><textarea class=\"form-control\" name=\"text" + num + "\"></textarea></div>";

  holder.appendChild(newdiv);
  setTimeout(function() {
      newdiv.className += "show";
  }, 10);
}

function moveElement(divNum,elId) {
  var holder = document.getElementById(elId);
  var olddiv = document.getElementById(divNum);
  olddiv.className = "";
  
  setTimeout(function() {
      holder.removeChild(olddiv);
  }, 600);
}

function removeElement(divNum,elId) {
  var holder = document.getElementById(elId);
  var olddiv = document.getElementById(divNum);
  olddiv.className = "";
  
  setTimeout(function() {
      holder.removeChild(olddiv);
  }, 600);
}

// first, we need to set up the canvas
const canvas = document.getElementById('sketcher');
canvas.style.cursor = 'crosshair';
// instantiate Atrament
const atrament = new Atrament(canvas, {
  width: canvas.offsetWidth,
  height: canvas.offsetHeight,
});


// a little helper tool for logging events
const eventsLog = [];
const logElement = document.getElementById('events');
const log = (...messages) => {
  if (eventsLog.push(messages.map(m => JSON.stringify(m)).join()) > 5) {
    eventsLog.shift();
  }

  //logElement.innerText = eventsLog.join('\n');
  console.log(...messages);
};

// we only display the Clear button if canvas is dirty
const clearButton = document.getElementById('clear');
atrament.addEventListener('dirty', () => {
  log('event: dirty');
  clearButton.style.display = atrament.isDirty ? 'inline-block' : 'none';
});

atrament.addEventListener('clean', () => {
  log('event: clean');
});

atrament.addEventListener('fillstart', ({ x, y }) => {
  canvas.style.cursor = 'wait';
  log(`event: fillstart x: ${x} y: ${y}`);
});

atrament.addEventListener('fillend', () => {
  canvas.style.cursor = 'crosshair';
  log('event: fillend');
});

atrament.addEventListener('strokestart', () => log('event: strokestart'));
atrament.addEventListener('strokeend', () => log('event: strokeend'));

atrament.recordStrokes = true;
atrament.addEventListener('strokerecorded', ({ stroke }) => {
  log(`event: strokerecorded - ${stroke.points.length} points`);
});  

// utility to add delay to drawing steps
const sleep = async time => new Promise((r) => setTimeout(r, time)); 