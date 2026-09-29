
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from "src/app/components/footer/footer";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule, Footer],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {

}
