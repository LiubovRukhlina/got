import { Component, OnInit, Input } from '@angular/core';
import { House } from 'src/services/house/house';
import { HouseService } from 'src/services/house/house.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from 'src/services/character/character.service';
@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
export class HouseDetailComponent implements OnInit {
  @Input() house?: House;
  @Input() currentLordName?: string;
  currentLord?: string;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private location: Location,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.getHouse();
    this.getCurrentLordName();
  }

  getHouse(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.houseService.getHouse(id).subscribe((house) => (this.house = house));
    this.getCurrentLordName();
  }
  goBack(): void {
    this.location.back();
  }

  getCurrentLordName(): void {
    const id = Number(this.house?.currentLord.split('/').pop());
    this.characterService
      .getCharacter(id)
      .subscribe((character) => (this.currentLordName = character.name));
  }
}
