import { Component, OnInit } from '@angular/core';
import { CardData } from '../../core/card';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ContractService } from "src/app/services/contract/contract.service";



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  cardImages = [
    'pDGNBK9A0sk',
    'fYDrhbVlV1E',
    'qoXgaF27zBc',
    'b9drVB7xIOI',
    'TQ-q5WAVHj0',
    'CzwRh5sNOW8'
  ];

  address: string = '0xF213D74c3aA389Ca825F31aEA2694F0e25cE1168';
  amount: number = 1;
  direction: any;
  transactionForm: FormGroup;

  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount = 0;
  coins = 0;

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(private dialog: MatDialog, private fb: FormBuilder, private contract: ContractService) {
    this.transactionForm = new FormGroup({
      sendaddress: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
    });


  contract
    .connectAccount()
    .then((value: any) => {
      this.direction = value;
    })
    .catch((error: any) => {
      console.log(error);
      contract.failure(
        "Could't get the account data, please check if metamask is running correctly and refresh the page"
      );
    });
  }

  ngOnInit(): void {
    this.setupCards();
  }

  playGame(e) {
    console.log(e);
    this.contract
      .trasnferEther(this.direction, this.address, this.amount)
      .then((r) => {
        console.log(r);
        this.contract.success();
        this.coins++;
      })
      .catch((e) => {
        console.log(e);
        this.contract.failure("Transaction failed");
      });
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          this.coins--;
          this.restart();
        }
      }
    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.setupCards();
  }
}
