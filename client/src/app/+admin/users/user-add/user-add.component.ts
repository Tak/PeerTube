import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

import { NotificationsService } from 'angular2-notifications'

import { UserService } from '../shared'
import {
  FormReactive,
  USER_USERNAME,
  USER_EMAIL,
  USER_PASSWORD,
  USER_VIDEO_QUOTA
} from '../../../shared'
import { UserCreate } from '../../../../../../shared'

@Component({
  selector: 'my-user-add',
  templateUrl: './user-add.component.html'
})
export class UserAddComponent extends FormReactive implements OnInit {
  error: string = null

  form: FormGroup
  formErrors = {
    'username': '',
    'email': '',
    'password': '',
    'videoQuota': ''
  }
  validationMessages = {
    'username': USER_USERNAME.MESSAGES,
    'email': USER_EMAIL.MESSAGES,
    'password': USER_PASSWORD.MESSAGES,
    'videoQuota': USER_VIDEO_QUOTA.MESSAGES
  }

  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationsService: NotificationsService,
    private userService: UserService
  ) {
    super()
  }

  buildForm () {
    this.form = this.formBuilder.group({
      username: [ '', USER_USERNAME.VALIDATORS ],
      email:    [ '', USER_EMAIL.VALIDATORS ],
      password: [ '', USER_PASSWORD.VALIDATORS ],
      videoQuota: [ '-1', USER_VIDEO_QUOTA.VALIDATORS ]
    })

    this.form.valueChanges.subscribe(data => this.onValueChanged(data))
  }

  ngOnInit () {
    this.buildForm()
  }

  addUser () {
    this.error = null

    const userCreate: UserCreate = this.form.value

    // A select in HTML is always mapped as a string, we convert it to number
    userCreate.videoQuota = parseInt(this.form.value['videoQuota'], 10)

    this.userService.addUser(userCreate).subscribe(
      () => {
        this.notificationsService.success('Success', `User ${userCreate.username} created.`)
        this.router.navigate([ '/admin/users/list' ])
      },

      err => this.error = err.text
    )
  }
}
