import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/services/house/house.service';
import { House } from 'src/services/house/house';
import { MessageService } from 'src/services/message/message.service';
@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css'],
})
export class HousesComponent implements OnInit {
  houses: House[] = [];
  selectedHouse?: House;

  constructor(
    private houseService: HouseService,
    private messageService: MessageService
  ) {}

  getHouses(): void {
    this.houseService.getHouses().subscribe((houses) => (this.houses = houses));
  }
  ngOnInit(): void {
    this.getHouses();
  }

  onSelect(house: House): void {
    this.selectedHouse = house;
  }
}
