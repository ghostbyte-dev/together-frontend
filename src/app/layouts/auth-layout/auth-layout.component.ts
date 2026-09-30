
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from "src/app/components/footer/footer";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule, Footer],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {

}
