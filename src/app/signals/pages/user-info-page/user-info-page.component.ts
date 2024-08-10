import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {

  private usersService = inject(UserService);

  public userId = signal(1);

  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>( () =>{
    if(!this.currentUser()) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number){
    if(id <= 0 ) return;

    this.userId.set(id);

    this.currentUser.set(undefined);

    this.usersService.getUserById(id)
    .subscribe({
      next: (value) => {
        this.currentUser.set(value);
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false)
        this.currentUser.set(undefined);
      },
    });
  }

}
