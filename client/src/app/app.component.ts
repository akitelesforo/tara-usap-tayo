import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private chatService: ChatService) {
    this.user = this.randomEl(this.adjectives) + ' ' + this.randomEl(this.nouns);
    this.chatService.userJoin(this.user);
  }

  chats: Chat[] = [];
  user: string;
  message: string;

// tslint:disable-next-line: max-line-length
  adjectives = ['adamant', 'adroit', 'amatory', 'animistic', 'antic', 'arcadian', 'baleful', 'bellicose', 'bilious', 'boorish', 'calamitous', 'caustic', 'cerulean', 'comely', 'concomitant', 'contumacious', 'corpulent', 'crapulous', 'defamatory', 'didactic', 'dilatory', 'dowdy', 'efficacious', 'effulgent', 'egregious', 'endemic', 'equanimous', 'execrable', 'fastidious', 'feckless', 'fecund', 'friable', 'fulsome', 'garrulous', 'guileless', 'gustatory', 'heuristic', 'histrionic', 'hubristic', 'incendiary', 'insidious', 'insolent', 'intransigent', 'inveterate', 'invidious', 'irksome', 'jejune', 'jocular', 'judicious', 'lachrymose', 'limpid', 'loquacious', 'luminous', 'mannered', 'mendacious', 'meretricious', 'minatory', 'mordant', 'munificent', 'nefarious', 'noxious', 'obtuse', 'parsimonious', 'pendulous', 'pernicious', 'pervasive', 'petulant', 'platitudinous', 'precipitate', 'propitious', 'puckish', 'querulous', 'quiescent', 'rebarbative', 'recalcitant', 'redolent', 'rhadamanthine', 'risible', 'ruminative', 'sagacious', 'salubrious', 'sartorial', 'sclerotic', 'serpentine', 'spasmodic', 'strident', 'taciturn', 'tenacious', 'tremulous', 'trenchant', 'turbulent', 'turgid', 'ubiquitous', 'uxorious', 'verdant', 'voluble', 'voracious', 'wheedling', 'withering', 'zealous'];
// tslint:disable-next-line: max-line-length
  nouns = ['ninja', 'chair', 'pancake', 'statue', 'unicorn', 'rainbows', 'laser', 'senor', 'bunny', 'captain', 'nibblets', 'cupcake', 'carrot', 'gnomes', 'glitter', 'potato', 'salad', 'toejam', 'curtains', 'beets', 'toilet', 'exorcism', 'stick figures', 'mermaid eggs', 'sea barnacles', 'dragons', 'jellybeans', 'snakes', 'dolls', 'bushes', 'cookies', 'apples', 'ice cream', 'ukulele', 'kazoo', 'banjo', 'opera singer', 'circus', 'trampoline', 'carousel', 'carnival', 'locomotive', 'hot air balloon', 'praying mantis', 'animator', 'artisan', 'artist', 'colorist', 'inker', 'coppersmith', 'director', 'designer', 'flatter', 'stylist', 'leadman', 'limner', 'make-up artist', 'model', 'musician', 'penciller', 'producer', 'scenographer', 'set decorator', 'silversmith', 'teacher', 'auto mechanic', 'beader', 'bobbin boy', 'clerk of the chapel', 'filling station attendant', 'foreman', 'maintenance engineering', 'mechanic', 'miller', 'moldmaker', 'panel beater', 'patternmaker', 'plant operator', 'plumber', 'sawfiler', 'shop foreman', 'soaper', 'stationary engineer', 'wheelwright', 'woodworkers'];

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((chat: Chat) => {
        this.chats.push(chat);
      });

    this.chatService
      .getNewJoin()
      .subscribe((name: string) => {
        const chat: Chat = {
          user: 'Boy Abunda',
          message: 'User ' + name + ' has joined.',
          time: this.getTime()
        };
        this.chats.push(chat);
      });
  }

  sendMessage() {
    if (this.message !== '') {
      const chat: Chat = {
        user: this.user,
        message: this.message,
        time: this.getTime()
      };

      this.chatService.sendMessage(chat);
      this.message = '';
    }
  }

  getTime() {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    return (hours > 12 ? hours - 12 : hours) + ':' + minutes + (hours > 12 ? ' PM' : ' AM');
  }

  randomEl(list: string[]) {
    const i = Math.floor(Math.random() * list.length);
    return list[i];
  }

}
