import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventCreateComponent } from './event-create/event-create.component';

@NgModule({
  declarations: [EventCreateComponent],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
  
})
export class EventModule { }
