import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10);

  //Solo lectura
  public squareCounter= computed( () => this.counter() * this.counter());


  increasyBy(value: number){
    this.counter.update( current => current + value)

    //Otra manera de hacerlo
    // this.counter.set(this.counter() + value);
  }
}
