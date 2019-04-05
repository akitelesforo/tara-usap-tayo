'use strict';

var app = angular.module('tara-usap-tayo', []);

// Controller
app.controller('chatCtrl', chatCtrl);

chatCtrl.$inject = ['socketio'];
function chatCtrl(socket) {
  var vm = this;
  vm.messages = [];
  vm.message = '';
  vm.name = '';
  vm.sendMessage = sendMessage;
  var adjectives = ['adamant', 'adroit', 'amatory', 'animistic', 'antic', 'arcadian', 'baleful', 'bellicose', 'bilious', 'boorish', 'calamitous', 'caustic', 'cerulean', 'comely', 'concomitant', 'contumacious', 'corpulent', 'crapulous', 'defamatory', 'didactic', 'dilatory', 'dowdy', 'efficacious', 'effulgent', 'egregious', 'endemic', 'equanimous', 'execrable', 'fastidious', 'feckless', 'fecund', 'friable', 'fulsome', 'garrulous', 'guileless', 'gustatory', 'heuristic', 'histrionic', 'hubristic', 'incendiary', 'insidious', 'insolent', 'intransigent', 'inveterate', 'invidious', 'irksome', 'jejune', 'jocular', 'judicious', 'lachrymose', 'limpid', 'loquacious', 'luminous', 'mannered', 'mendacious', 'meretricious', 'minatory', 'mordant', 'munificent', 'nefarious', 'noxious', 'obtuse', 'parsimonious', 'pendulous', 'pernicious', 'pervasive', 'petulant', 'platitudinous', 'precipitate', 'propitious', 'puckish', 'querulous', 'quiescent', 'rebarbative', 'recalcitant', 'redolent', 'rhadamanthine', 'risible', 'ruminative', 'sagacious', 'salubrious', 'sartorial', 'sclerotic', 'serpentine', 'spasmodic', 'strident', 'taciturn', 'tenacious', 'tremulous', 'trenchant', 'turbulent', 'turgid', 'ubiquitous', 'uxorious', 'verdant', 'voluble', 'voracious', 'wheedling', 'withering', 'zealous'];
  var nouns = ['ninja', 'chair', 'pancake', 'statue', 'unicorn', 'rainbows', 'laser', 'senor', 'bunny', 'captain', 'nibblets', 'cupcake', 'carrot', 'gnomes', 'glitter', 'potato', 'salad', 'toejam', 'curtains', 'beets', 'toilet', 'exorcism', 'stick figures', 'mermaid eggs', 'sea barnacles', 'dragons', 'jellybeans', 'snakes', 'dolls', 'bushes', 'cookies', 'apples', 'ice cream', 'ukulele', 'kazoo', 'banjo', 'opera singer', 'circus', 'trampoline', 'carousel', 'carnival', 'locomotive', 'hot air balloon', 'praying mantis', 'animator', 'artisan', 'artist', 'colorist', 'inker', 'coppersmith', 'director', 'designer', 'flatter', 'stylist', 'leadman', 'limner', 'make-up artist', 'model', 'musician', 'penciller', 'producer', 'scenographer', 'set decorator', 'silversmith', 'teacher', 'auto mechanic', 'beader', 'bobbin boy', 'clerk of the chapel', 'filling station attendant', 'foreman', 'maintenance engineering', 'mechanic', 'miller', 'moldmaker', 'panel beater', 'patternmaker', 'plant operator', 'plumber', 'sawfiler', 'shop foreman', 'soaper', 'stationary engineer', 'wheelwright', 'woodworkers'];
  vm.name = randomEl(adjectives) + ' ' + randomEl(nouns);

  socket.emit('user:join', vm.name);

  socket.on('send:message', function (message) {
    vm.messages.push(message);
  });

  socket.on('user:join', function (data) {
    vm.messages.push({
      user: 'Boy Abunda', 
      message: 'User ' + data + ' has joined.',
      time: getTime()
    });
  });

  socket.on('user:left', function (data) {
    vm.messages.push({
      user: 'Boy Abunda',
      message: 'User ' + data + ' has left.',
      time: getTime()
    });
  });

  function sendMessage() {
    socket.emit('send:message', {
      user: vm.name,
      message: vm.message,
      time: getTime()
    });

    vm.message = '';
  };

  function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    return (hours > 12 ? hours - 12 : hours) + ':' + minutes + (hours > 12 ? ' PM' : ' AM');
  }

  function randomEl(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
  }
}

// Service
app.factory('socketio', socketio);

socketio.$inject = ['$rootScope'];
function socketio ($rootScope) {

  var socket = io.connect('http://localhost:8080');

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };

};

app.directive('scrollToBottom', scrollToBottom);

scrollToBottom.$inject = ['$timeout'];
function scrollToBottom ($timeout) {
  return {
      restrict: 'A',
      scope: {
          scrollToBottom: "="
      },
      
      link: function(scope, element, attr) {
          scope.$watchCollection('scrollToBottom', function(newVal) {
              if (newVal) {
                  $timeout(function() {
                      element[0].scrollTop =  element[0].scrollHeight;
                  }, 0);
              }

          });
      }
  };

};