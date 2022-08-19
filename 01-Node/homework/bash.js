const { pwd } = require('./commands');
const commands = require('./commands');

// Output un prompt
process.stdout.write('\nprompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea

//

process.stdin.on('data', function (data) {
  var arg = data.toString().trim().split(' '); // remueve la nueva línea
    var cmd = arg.shift()
  if(commands.hasOwnProperty(cmd)) {
    //process.stdout.write(Date());  
    commands[cmd](arg)
  } else {
    process.stdout.write('el comando no funciona');
  }
  /* if(cmd === 'pwd') {
    process.stdout.write(process.cwd())
  } */
  process.stdout.write('\nprompt > ');
});