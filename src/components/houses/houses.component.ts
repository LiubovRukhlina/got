import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/services/house/house.service';
import { House } from 'src/services/house/house';
import { MessageService } from 'src/services/message/message.service';

type PaginatorEvent = {
  page: number;
};

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css'],
})
export class HousesComponent implements OnInit {
  houses: House[] = [];
  selectedHouse?: House;
  private currentPage = 1;

  constructor(
    private houseService: HouseService,
    private messageService: MessageService
  ) {}
//get houses from house service
  getHouses(): void {
    this.houseService
      .getHouses(this.currentPage)
      .subscribe((houses) => (this.houses = houses));
  }
  ngOnInit(): void {
    this.getHouses();
  }
//choosing a house from the list
  onSelect(house: House): void {
    this.selectedHouse = house;
  }
//show houses list depending on selected page
  paginate(event: PaginatorEvent): void {
    this.currentPage = event.page + 1;
    this.getHouses();
  }
}
