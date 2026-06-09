import { Component } from '@angular/core';
import { Contact } from '../contacts.model';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  imports: [RouterLink],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css',
})
export class ContactDetail {
  contact: Contact | null = null;
  id: string = '';

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute){}
  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id)
      }
    );
  }
  onDelete() {
    if(this.contact)
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);

  }
}
