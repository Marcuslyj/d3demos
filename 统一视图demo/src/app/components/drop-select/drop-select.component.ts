import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'drop-select',
  templateUrl: './drop-select.component.html',
  styleUrls: ['./drop-select.component.css'],
  animations: [
    trigger('listState', [
      state("active", style({
        opacity: 1
      })),
      state('inactive', style({
        height: 0,
        opacity: 0
      })),
      state("void", style({
        opacity: 0
      })),
      transition('void=>inactive', animate("300ms")),
      transition('inactive=>active', animate("100ms linear")),
      transition('active=>inactive', animate("300ms ease-out")),
    ])]
})
export class DropSelectComponent implements OnInit {
  @Input() data;
  @Input() selected;
  public state = 'inactive';
  public listhidden = true;
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    if (this.data) {
      if (this.selected == null) {
        this.selected = 0;
      }
    }
  }
  toggleState(index?) {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    if (null == index) {
      return;
    }
    if (index != this.selected) {
      this.change.emit();
    }
    this.selected = index;
  }
  animationStart(event) {
    if ("active" === event['toState']) {
      this.listhidden = false;
    }
  }
  animationDone(event) {
    if ("inactive" === event['toState']) {
      this.listhidden = true;
    } else if ("active" === event['toState']) {
      this.listhidden = false;
    }
  }
  blur(){
    this.toggleState();
  }
}
