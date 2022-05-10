import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { House } from 'src/services/house/house';
import { HouseService } from 'src/services/house/house.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from 'src/services/character/character.service';
import {distinct} from "rxjs";
@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
export class HouseDetailComponent implements OnInit {
  @Input() house?: House;
  @Input() currentLordName?: string;
  currentLord?: string;
  houseId?: number;
  membersList: { [id: number]: string } = {}
  cadetList: { [id: number]: string } = {}

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private location: Location,
    private characterService: CharacterService
  ) {
    this.route.params.subscribe(params => {
      this.houseId = Number(params['id']);
      this.getHouse()
    })
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.getHouse();
  // }

   ngOnInit(): void {
    this.getHouse();
  }

  getHouse() {
    // const houseId = Number(this.route.snapshot.paramMap.get('id'));

    this.houseId && this.houseService
      .getHouse(this.houseId)
      .subscribe((house) => {
        this.house = house
       this.getCurrentLordName()
        this.getMembers()
        this.getCadets()
      });
  }
  goBack(): void {
    this.location.back();
  }

  getCurrentLordName(): void {
    const lordId = Number(this.house?.currentLord.split('/').pop());

    this.characterService
      .getCharacter(lordId)
      .subscribe((character) => {
        this.currentLordName = character.name
      });
  }

  getMembers() {
    this.house?.swornMembers.map((swornMemberUrl) => {
      const memberId = Number(swornMemberUrl.split('/').pop());

      this.characterService
        .getCharacter(memberId)
        .subscribe((character) => {

            this.membersList[memberId] = character.name;
        });
    })
  }

  getCadets() {
    this.house?.cadetBranches.map((cadetUrl) => {
      const cadetId = Number(cadetUrl.split('/').pop());

      this.houseService
        .getHouse(cadetId)
        .subscribe((house) => {

          this.cadetList[cadetId] = house.name;
        });
    })
  }
}
